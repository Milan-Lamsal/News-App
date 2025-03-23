import axios from 'axios'
import { generateCacheKey, setCache, getCache, EXPIRATION } from './cacheService';

// Load environment variables
const getEnvVariable = (key, defaultValue = '') => {
    // Check for Vite's import.meta.env first (preferred)
    if (import.meta && import.meta.env && import.meta.env[`VITE_${key}`] !== undefined) {
        return import.meta.env[`VITE_${key}`];
    }
    
    // Fallback to process.env if available
    if (typeof process !== 'undefined' && process.env && process.env[`VITE_${key}`] !== undefined) {
        return process.env[`VITE_${key}`];
    }
    
    // Final fallback to direct process.env without VITE_ prefix (for non-Vite environments)
    if (typeof process !== 'undefined' && process.env && process.env[key] !== undefined) {
        return process.env[key];
    }
    
    console.warn(`Environment variable ${key} not found, using default value`);
    return defaultValue;
};

// API Keys from environment variables
const GUARDIAN_API_KEY = getEnvVariable('GUARDIAN_API_KEY', 'test'); 
const GUARDIAN_BASE_URL = 'https://content.guardianapis.com';

// NewsAPI for US Health News
const NEWS_API_KEY = getEnvVariable('NEWS_API_KEY'); 
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// MediaStack API for Health News
const MEDIASTACK_API_KEY = getEnvVariable('MEDIASTACK_API_KEY'); 
const MEDIASTACK_BASE_URL = 'http://api.mediastack.com/v1';

// Category mapping (NewsAPI to Guardian sections)
const categoryMapping = {
    technology: 'technology',
    sports: 'sport',
    business: 'business',
    science: 'science',
    entertainment: 'culture',
    health: 'lifeandstyle/health-and-wellbeing'
};

// Function to fetch top headlines with pagination
export const fetchTopHeadlines = async (page = 1, pageSize = 10) => {
    try {
        // Generate cache key
        const cacheKey = generateCacheKey('headlines', { page, pageSize });
        
        // Check cache first
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            console.log('Using cached headlines data');
            return cachedData;
        }
        
        // No cache or expired, fetch from API
        console.log('Fetching fresh headlines data from API');
        const response = await axios.get(
            `${GUARDIAN_BASE_URL}/search`,
            {
                params: {
                    'api-key': GUARDIAN_API_KEY,
                    'show-fields': 'headline,trailText,thumbnail,body,byline,publication',
                    'page': page,
                    'page-size': pageSize
                }
            }
        );
        
        const responseData = {
            articles: formatGuardianResponse(response.data.response.results),
            currentPage: response.data.response.currentPage,
            totalPages: response.data.response.pages,
            hasMore: response.data.response.currentPage < response.data.response.pages
        };
        
        // Save to cache
        await setCache(cacheKey, responseData, EXPIRATION.TOP_HEADLINES);
        
        return responseData;
    } catch (error) {
        console.error('Error fetching news:', error);
        return { articles: [], currentPage: page, totalPages: 0, hasMore: false };
    }
};

// Function to fetch technology news and trends with pagination
export const fetchTechNews = async (page = 1, pageSize = 10) => {
    try {
        // Generate cache key
        const cacheKey = generateCacheKey('tech', { page, pageSize });
        
        // Check cache first
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            console.log('Using cached tech news data');
            return cachedData;
        }
        
        // No cache or expired, fetch from API
        console.log('Fetching fresh tech news from API');
        const response = await axios.get(
            `${GUARDIAN_BASE_URL}/search`,
            {
                params: {
                    'section': 'technology',
                    'api-key': GUARDIAN_API_KEY,
                    'show-fields': 'headline,trailText,thumbnail,body,byline,publication',
                    'page': page,
                    'page-size': pageSize
                }
            }
        );
        
        const responseData = {
            articles: formatGuardianResponse(response.data.response.results),
            currentPage: response.data.response.currentPage,
            totalPages: response.data.response.pages,
            hasMore: response.data.response.currentPage < response.data.response.pages
        };
        
        // Save to cache
        await setCache(cacheKey, responseData, EXPIRATION.CATEGORY_NEWS);
        
        return responseData;
    } catch (error) {
        console.error("Error fetching tech news", error);
        return { articles: [], currentPage: page, totalPages: 0, hasMore: false };
    }
};

// Specialized function to fetch health news with pagination using MediaStack
export const fetchHealthNews = async (page = 1, pageSize = 10) => {
    try {
        // Generate cache key
        const cacheKey = generateCacheKey('health', { page, pageSize });
        
        // Check cache first
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            console.log('Using cached health news data');
            return cachedData;
        }
        
        console.log("Fetching health news from MediaStack API...");
        
        // MediaStack API doesn't have pagination with page numbers, but uses offset
        const offset = (page - 1) * pageSize;
        
        // Use MediaStack for health news - works without CORS issues
        const response = await axios.get(
            `${MEDIASTACK_BASE_URL}/news`,
            {
                params: {
                    access_key: MEDIASTACK_API_KEY,
                    categories: 'health',
                    languages: 'en',
                    limit: pageSize,
                    offset: offset,
                    sort: 'published_desc'
                }
            }
        );
        
        console.log("Health API response status:", response.status);
        
        // If successful, format the MediaStack response
        if (response.data && response.data.data && response.data.data.length > 0) {
            const responseData = {
                articles: formatMediaStackResponse(response.data.data, 'health'),
                currentPage: page,
                totalPages: Math.ceil(response.data.pagination?.total / pageSize) || 10,
                hasMore: response.data.data.length === pageSize,
            };
            
            // Save to cache
            await setCache(cacheKey, responseData, EXPIRATION.HEALTH_NEWS);
            
            return responseData;
        }
        
        console.log("No health news from MediaStack, falling back to Guardian...");
        
        // Fallback to Guardian if MediaStack API fails or returns no results
        return fetchCategoryNews('health', page, pageSize);
    } catch (error) {
        console.error("Error fetching health news", error);
        
        // If the specialized API fails, fallback to Guardian
        try {
            console.log("Fallback to Guardian for health news...");
            return fetchCategoryNews('health', page, pageSize);
        } catch (fallbackError) {
            console.error("Error fetching fallback health news", fallbackError);
            return { articles: [], currentPage: page, totalPages: 0, hasMore: false };
        }
    }
};

// Function to fetch news by category with pagination
export const fetchNewsByCategory = async (category, page = 1, pageSize = 10) => {
    try {
        // Use specialized API for health category
        if (category === 'health') {
            return fetchHealthNews(page, pageSize);
        }
        
        // Generate cache key for other categories
        const cacheKey = generateCacheKey('category', { category, page, pageSize });
        
        // Check cache first
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            console.log(`Using cached ${category} news data`);
            return cachedData;
        }
        
        // No cache or expired, fetch from API
        console.log(`Fetching fresh ${category} news from API`);
        const responseData = await fetchCategoryNews(category, page, pageSize);
        
        // Save to cache
        await setCache(cacheKey, responseData, EXPIRATION.CATEGORY_NEWS);
        
        return responseData;
    } catch (error) {
        console.error("Error fetching news by category", error);
        return { articles: [], currentPage: page, totalPages: 0, hasMore: false };
    }
};

// Helper function to fetch news by category from Guardian API
const fetchCategoryNews = async (category, page = 1, pageSize = 10) => {
    try {
        const guardianSection = categoryMapping[category] || category;
        
        const response = await axios.get(
            `${GUARDIAN_BASE_URL}/search`,
            {
                params: {
                    'section': guardianSection,
                    'api-key': GUARDIAN_API_KEY,
                    'show-fields': 'headline,trailText,thumbnail,body,byline,publication',
                    'page': page,
                    'page-size': pageSize
                }
            }
        );
        
        return {
            articles: formatGuardianResponse(response.data.response.results, category),
            currentPage: response.data.response.currentPage,
            totalPages: response.data.response.pages,
            hasMore: response.data.response.currentPage < response.data.response.pages
        };
    } catch (error) {
        console.error("Error fetching category news", error);
        return { articles: [], currentPage: page, totalPages: 0, hasMore: false };
    }
};

// Helper function to format MediaStack API response
const formatMediaStackResponse = (articles, categoryOverride = null) => {
    return articles.map(article => {
        return {
            title: article.title || 'Health News Article',
            description: article.description || '',
            content: article.description || '',
            url: article.url,
            urlToImage: article.image || 'https://www.healthcareitnews.com/sites/default/files/styles/tablet/public/HealthNewsThumb.jpg?itok=4vHuC8ze',
            publishedAt: article.published_at || new Date().toISOString(),
            source: {
                id: article.source || 'mediastack',
                name: article.source || 'MediaStack'
            },
            author: article.author || 'Health Reporter',
            category: categoryOverride || 'health'
        };
    });
};

// Helper function to format Guardian API response to match our app's format
const formatGuardianResponse = (articles, categoryOverride = null) => {
    return articles.map(article => {
        // Determine category from section or use override
        let category = categoryOverride;
        if (!category) {
            // Extract category from Guardian section
            const section = article.sectionName?.toLowerCase() || '';
            if (section.includes('tech')) category = 'technology';
            else if (section.includes('sport')) category = 'sports';
            else if (section.includes('business')) category = 'business';
            else if (section.includes('science')) category = 'science';
            else if (section.includes('culture') || section.includes('film') || section.includes('music')) category = 'entertainment';
            else if (section.includes('health') || section.includes('lifeandstyle')) category = 'health';
            else category = 'general';
        }

        return {
            title: article.webTitle,
            description: article.fields?.trailText || '',
            content: article.fields?.body || '',
            url: article.webUrl,
            urlToImage: article.fields?.thumbnail || 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png',
            publishedAt: article.webPublicationDate,
            source: {
                id: 'the-guardian',
                name: 'The Guardian'
            },
            author: article.fields?.byline || '',
            category: category
        };
    });
};

import localforage from 'localforage';

// Initialize cache store
localforage.config({
  name: 'news-app-cache',
  storeName: 'news_cache',
});

// Cache expiration times (in milliseconds)
const EXPIRATION = {
  TOP_HEADLINES: 15 * 60 * 1000, // 15 minutes
  CATEGORY_NEWS: 30 * 60 * 1000, // 30 minutes
  HEALTH_NEWS: 60 * 60 * 1000, // 1 hour
  SEARCH_RESULTS: 10 * 60 * 1000, // 10 minutes
};

/**
 * Generate a cache key based on request parameters
 * @param {string} type - The type of request (headlines, category, health, search)
 * @param {Object} params - Request parameters (page, category, query, etc.)
 * @returns {string} - Unique cache key
 */
const generateCacheKey = (type, params = {}) => {
  const paramsString = Object.entries(params)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  
  return `${type}${paramsString ? '_' + paramsString : ''}`;
};

/**
 * Set data in cache with expiration
 * @param {string} key - Cache key
 * @param {*} data - Data to cache
 * @param {number} expiration - Expiration time in milliseconds
 */
const setCache = async (key, data, expiration) => {
  try {
    const cacheItem = {
      data,
      timestamp: Date.now(),
      expiration,
    };
    await localforage.setItem(key, cacheItem);
  } catch (error) {
    console.error('Cache set error:', error);
  }
};

/**
 * Get data from cache if it exists and is not expired
 * @param {string} key - Cache key
 * @returns {*} - Cached data or null if expired/not found
 */
const getCache = async (key) => {
  try {
    const cacheItem = await localforage.getItem(key);
    
    if (!cacheItem) return null;
    
    const { data, timestamp, expiration } = cacheItem;
    const now = Date.now();
    
    // Check if cache is expired
    if (now - timestamp > expiration) {
      await localforage.removeItem(key); // Clean up expired item
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
};

/**
 * Clear all cached data
 */
const clearCache = async () => {
  try {
    await localforage.clear();
  } catch (error) {
    console.error('Cache clear error:', error);
  }
};

/**
 * Clear specific category of cached data
 * @param {string} type - Type prefix to clear (e.g., 'category', 'headlines')
 */
const clearCacheByType = async (type) => {
  try {
    const keys = await localforage.keys();
    const targetKeys = keys.filter(key => key.startsWith(type));
    
    for (const key of targetKeys) {
      await localforage.removeItem(key);
    }
  } catch (error) {
    console.error('Cache clear by type error:', error);
  }
};

export {
  generateCacheKey,
  setCache,
  getCache,
  clearCache,
  clearCacheByType,
  EXPIRATION,
}; 
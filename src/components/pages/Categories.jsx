import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the category from the URL
import { fetchNewsByCategory, fetchTechNews, fetchHealthNews } from '../../services/newsAPI';
import ArticleCard from '../ArticleCard/ArticleCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import DateFilter from '../DateFilter/DateFilter';
import BackToTop from '../BackToTop/BackToTop';

// Category color mapping
const categoryColors = {
    technology: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    sports: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    business: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
    science: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    entertainment: 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100',
    health: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
    general: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
};

const PAGE_SIZE = 10; // Number of articles to load per page

const Categories = ({ searchQuery }) => {
    const { category } = useParams(); // Get the category from the URL (e.g., /technology, /sports, /business)
    const [articles, setArticles] = useState([]); // State to store news articles
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [selectedDate, setSelectedDate] = useState('all');
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalArticles, setTotalArticles] = useState(0);
    
    // Ref for our observer (last element)
    const observer = useRef();
    
    // Last element callback for infinite scroll
    const lastArticleElementRef = useCallback(node => {
        if (isLoadingMore) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMoreArticles();
            }
        }, { threshold: 0.5 });
        
        if (node) observer.current.observe(node);
    }, [isLoadingMore, hasMore, category]);
    
    // Function to load more articles
    const loadMoreArticles = async () => {
        if (!hasMore || isLoadingMore) return;
        
        try {
            setIsLoadingMore(true);
            const nextPage = currentPage + 1;
            let response;
            
            if (category === 'technology') {
                response = await fetchTechNews(nextPage, PAGE_SIZE);
            } else if (category === 'health') {
                response = await fetchHealthNews(nextPage, PAGE_SIZE);
            } else {
                response = await fetchNewsByCategory(category, nextPage, PAGE_SIZE);
            }
            
            if (response.articles.length > 0) {
                setArticles(prevArticles => [...prevArticles, ...response.articles]);
                setCurrentPage(nextPage);
                setHasMore(response.hasMore);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error loading more articles:', error);
            setError("Failed to load more articles. Please try again later.");
        } finally {
            setIsLoadingMore(false);
        }
    };

    // Fetch news articles when the category changes
    useEffect(() => {
        const getNews = async () => {
            try {
                setIsLoading(true);
                setError(null);
                setArticles([]);
                setCurrentPage(1);
                setHasMore(true);
                
                let response;
                
                if (category === 'technology') {
                    response = await fetchTechNews(1, PAGE_SIZE);
                } else if (category === 'health') {
                    response = await fetchHealthNews(1, PAGE_SIZE);
                } else {
                    response = await fetchNewsByCategory(category, 1, PAGE_SIZE);
                }
                
                if (response.articles.length === 0) {
                    setError(`No articles found for ${category}. Try a different category.`);
                }
                
                setArticles(response.articles);
                setCurrentPage(response.currentPage);
                setHasMore(response.hasMore);
                
            } catch (error) {
                console.error('Error fetching news:', error);
                setError("Failed to load articles. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };
        getNews();
    }, [category]); // Re-run this effect when the category changes

    // Function to filter articles by date
    const filterByDate = (article) => {
        if (selectedDate === 'all') return true;
        
        const articleDate = new Date(article.publishedAt);
        const now = new Date();
        
        // Set time to start of day for today's comparison
        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);
        
        // Set time to start of week (Sunday)
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        
        // Set time to start of month
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        
        // Set time to start of year
        const startOfYear = new Date(now.getFullYear(), 0, 1);

        switch (selectedDate) {
            case 'today':
                return articleDate >= startOfDay;
            case 'week':
                return articleDate >= startOfWeek;
            case 'month':
                return articleDate >= startOfMonth;
            case 'year':
                return articleDate >= startOfYear;
            default:
                return true;
        }
    };

    // Enhanced search and date filter
    const filteredArticles = articles
        .filter((article) => {
            if (!searchQuery) return true;
            const searchLower = searchQuery.toLowerCase();
            return (
                article.title?.toLowerCase().includes(searchLower) ||
                article.description?.toLowerCase().includes(searchLower) ||
                article.source?.name?.toLowerCase().includes(searchLower)
            );
        })
        .filter(filterByDate)
        .filter((article) => {
            return article.title && article.url;
        });

    // Get category color
    const categoryColor = categoryColors[category] || categoryColors.general;
    
    // Get category display name
    const getCategoryDisplayName = () => {
        if (category === 'technology') return 'Technology Trends';
        if (category === 'health') return 'Health & Wellness';
        return `${category.charAt(0).toUpperCase() + category.slice(1)} News`;
    };
    
    // Reset infinite scroll when filters change
    useEffect(() => {
        setHasMore(true);
    }, [searchQuery, selectedDate]);

    return (
        <div className='p-4'>
            <div className="flex items-center gap-4 mb-4">
                <h1 className='text-2xl font-bold dark:text-white'>
                    {getCategoryDisplayName()}
                </h1> {/* Display the category name */}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColor}`}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
            </div>
            <DateFilter selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            {isLoading ? (
                <LoadingSpinner />
            ) : error && articles.length === 0 ? (
                <div className="p-4 text-center">
                    <p className="text-red-500 dark:text-red-400">{error}</p>
                </div>
            ) : (
                <>
                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        {filteredArticles.length} articles found
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {filteredArticles.map((article, index) => {
                            // Add ref to last element for infinite scroll
                            const isLastElement = index === filteredArticles.length - 1;
                            
                            return (
                                <ArticleCard 
                                    key={index} 
                                    article={article} 
                                    ref={isLastElement ? lastArticleElementRef : null}
                                    categoryColor={categoryColor}
                                /> /* Display each article using ArticleCard */
                            );
                        })}
                    </div>
                    
                    {/* Loading more indicator */}
                    {isLoadingMore && (
                        <div className="flex justify-center my-4">
                            <LoadingSpinner size="small" />
                        </div>
                    )}
                    
                    {/* No more articles message */}
                    {!hasMore && articles.length > 0 && !isLoadingMore && (
                        <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                            No more articles to load
                        </div>
                    )}
                </>
            )}
            
            {/* Back to Top Button */}
            <BackToTop />
        </div>
    );
};

export default Categories;
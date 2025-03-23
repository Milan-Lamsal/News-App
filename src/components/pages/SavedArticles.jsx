import React, { useEffect, useState } from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import BackToTop from '../BackToTop/BackToTop';

const SavedArticles = () => {
    const [savedArticles, setSavedArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load saved articles from localStorage
        const loadSavedArticles = () => {
            try {
                const saved = localStorage.getItem('savedArticles');
                if (saved) {
                    setSavedArticles(JSON.parse(saved));
                }
            } catch (error) {
                console.error('Error loading saved articles:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadSavedArticles();
    }, []);

    const removeArticle = (articleToRemove) => {
        const updatedArticles = savedArticles.filter(
            article => article.url !== articleToRemove.url
        );
        setSavedArticles(updatedArticles);
        localStorage.setItem('savedArticles', JSON.stringify(updatedArticles));
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4 dark:text-white'>Saved Articles</h1>
            {savedArticles.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">No saved articles yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedArticles.map((article, index) => (
                        <div key={index} className="relative">
                            <ArticleCard article={article} />
                            <button
                                onClick={() => removeArticle(article)}
                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                title="Remove from saved"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Back to Top Button */}
            <BackToTop />
        </div>
    );
};

export default SavedArticles; 
// src/components/ArticleCard/ArticleCard.jsx
import React, { useState, useEffect, forwardRef } from 'react';

const ArticleCard = forwardRef(({ article, categoryColor = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100' }, ref) => {
    const [isSaved, setIsSaved] = useState(false);
    const hasImage = article.urlToImage && article.urlToImage.startsWith('http');
    const hasURL = article.url && article.url.startsWith('http');

    // Check if article is saved when component mounts
    useEffect(() => {
        const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');
        setIsSaved(savedArticles.some(saved => saved.url === article.url));
    }, [article.url]);

    const toggleSave = () => {
        try {
            const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');
            let updatedArticles;

            if (isSaved) {
                // Remove article
                updatedArticles = savedArticles.filter(saved => saved.url !== article.url);
            } else {
                // Add article
                updatedArticles = [...savedArticles, article];
            }

            localStorage.setItem('savedArticles', JSON.stringify(updatedArticles));
            setIsSaved(!isSaved);
        } catch (error) {
            console.error('Error saving article:', error);
        }
    };

    return (
        <div ref={ref} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden relative">
            {/* Save Button */}
            <button
                onClick={toggleSave}
                className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-10"
                title={isSaved ? "Remove from saved" : "Save for later"}
            >
                <svg
                    className={`w-5 h-5 ${isSaved ? 'text-yellow-500 fill-current' : 'text-gray-500'}`}
                    fill={isSaved ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                </svg>
            </button>

            {/* Article Image */}
            {hasImage && (
                <div className="relative">
                    <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&h=200&fit=crop&auto=format&q=80';
                        }}
                    />
                    {/* Category Badge */}
                    {article.category && (
                        <span className={`absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
                            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                        </span>
                    )}
                </div>
            )}

            {/* Article Content */}
            <div className="p-4">
                <h2 className="font-bold text-xl mb-2 dark:text-white">{article.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{article.description}</p>

                {/* Read More Link */}
                {hasURL && (
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline dark:text-blue-400"
                    >
                        Read more
                    </a>
                )}
            </div>
        </div>
    );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
import { useState } from 'react';
import { clearCache, clearCacheByType } from '../../services/cacheService';

const CacheControl = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleClearAllCache = async () => {
    try {
      await clearCache();
      setMessage('All cached data cleared successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error clearing cache: ' + error.message);
      setTimeout(() => setMessage(''), 5000);
    }
  };
  
  const handleClearCategoryCache = async (category) => {
    try {
      await clearCacheByType(category);
      setMessage(`${category} cache cleared successfully!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error clearing cache: ' + error.message);
      setTimeout(() => setMessage(''), 5000);
    }
  };
  
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-dark focus:outline-none"
        aria-label="Cache settings"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-64">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Cache Control</h3>
          
          <div className="space-y-2">
            <button
              onClick={() => handleClearAllCache()}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Clear All Cache
            </button>
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Clear by Category:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleClearCategoryCache('headlines')}
                  className="bg-blue-500 text-white py-1 px-2 rounded text-sm hover:bg-blue-600"
                >
                  Headlines
                </button>
                <button
                  onClick={() => handleClearCategoryCache('tech')}
                  className="bg-blue-500 text-white py-1 px-2 rounded text-sm hover:bg-blue-600"
                >
                  Tech
                </button>
                <button
                  onClick={() => handleClearCategoryCache('health')}
                  className="bg-blue-500 text-white py-1 px-2 rounded text-sm hover:bg-blue-600"
                >
                  Health
                </button>
                <button
                  onClick={() => handleClearCategoryCache('category')}
                  className="bg-blue-500 text-white py-1 px-2 rounded text-sm hover:bg-blue-600"
                >
                  Categories
                </button>
              </div>
            </div>
          </div>
          
          {message && (
            <div className="mt-3 p-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded">
              {message}
            </div>
          )}
          
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            <p>Cache reduces API calls and improves performance.</p>
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default CacheControl; 
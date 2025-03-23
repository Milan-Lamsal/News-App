// src/components/Navbar/SearchBar.jsx
import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen }) => {
    return (
        <>
            {/* Search Icon */}
            <button
                className="text-white focus:outline-none lg:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </button>

            {/* Search Bar (Mobile) */}
            {isSearchOpen && (
                <div className="lg:hidden p-4 bg-blue-600 dark:bg-gray-800 absolute top-16 left-0 right-0">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded p-2 focus:outline-none dark:bg-gray-700 dark:text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            )}
        </>
    );
};

export default SearchBar;
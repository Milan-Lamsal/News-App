// src/components/Navbar/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ searchQuery, setSearchQuery, toggleDarkMode, isDarkMode }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for categories dropdown
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
    const [isSearchOpen, setIsSearchOpen] = useState(false); // State for search bar
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // State for user menu

    return (
        <div className="bg-blue-600 p-4 dark:bg-gray-800">
            <div className="container mx-auto flex justify-between items-center">
                {/* Hamburger Menu (Mobile) */}
                <button
                    className="text-white focus:outline-none lg:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>

                {/* Logo/Name */}
                <Link to="/" className="text-white text-xl font-bold dark:text-gray-200">
                    News Aggregator
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex space-x-4">
                    <Link to="/" className="text-white hover:text-gray-200 dark:text-gray-200 dark:hover:text-white">
                        Home
                    </Link>
                    <div
                        className="relative"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <button className="text-white hover:text-gray-200 focus:outline-none dark:text-gray-200 dark:hover:text-white">
                            Categories
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 dark:bg-gray-700">
                                <Link
                                    to="/categories/technology"
                                    className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white dark:text-gray-200 dark:hover:bg-gray-600"
                                >
                                    Technology
                                </Link>
                                <Link
                                    to="/categories/sports"
                                    className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white dark:text-gray-200 dark:hover:bg-gray-600"
                                >
                                    Sports
                                </Link>
                                <Link
                                    to="/categories/business"
                                    className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white dark:text-gray-200 dark:hover:bg-gray-600"
                                >
                                    Business
                                </Link>
                                <Link
                                    to="/categories/science"
                                    className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white dark:text-gray-200 dark:hover:bg-gray-600"
                                >
                                    Science
                                </Link>
                                <Link
                                    to="/categories/entertainment"
                                    className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white dark:text-gray-200 dark:hover:bg-gray-600"
                                >
                                    Entertainment
                                </Link>
                                <Link
                                    to="/categories/health"
                                    className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white dark:text-gray-200 dark:hover:bg-gray-600"
                                >
                                    Health
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link to="/about" className="text-white hover:text-gray-200 dark:text-gray-200 dark:hover:text-white">
                        About
                    </Link>
                </div>

                {/* Icons (Search, Saved, and Dark Mode) */}
                <div className="flex items-center space-x-4">
                    {/* Search Bar (Desktop) */}
                    <div className="hidden lg:flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="rounded-l p-2 focus:outline-none dark:bg-gray-700 dark:text-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            className="bg-blue-500 text-white rounded-r p-2 hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            Search
                        </button>
                    </div>

                    {/* Saved Link (Desktop) */}
                    <Link 
                        to="/saved" 
                        className="hidden lg:flex items-center text-white hover:text-gray-200 dark:text-gray-200 dark:hover:text-white"
                        title="Saved Articles"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
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
                    </Link>

                    {/* Search Icon (Mobile) */}
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

                    {/* Saved Icon (Mobile) */}
                    <Link 
                        to="/saved" 
                        className="text-white focus:outline-none lg:hidden"
                        title="Saved Articles"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
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
                    </Link>

                    {/* Dark Mode Toggle */}
                    <button onClick={toggleDarkMode} className="text-white hover:text-gray-200 dark:text-gray-200 dark:hover:text-white">
                        {isDarkMode ? '☀️' : '🌙'}
                    </button>
                </div>
            </div>

            {/* Mobile Menu (Expanded) */}
            {isMenuOpen && (
                <div className="lg:hidden bg-blue-600 dark:bg-gray-800 p-4">
                    <Link to="/" className="block text-white py-2">
                        Home
                    </Link>
                    <Link to="/categories/technology" className="block text-white py-2">
                        Technology
                    </Link>
                    <Link to="/categories/sports" className="block text-white py-2">
                        Sports
                    </Link>
                    <Link to="/categories/business" className="block text-white py-2">
                        Business
                    </Link>
                    <Link to="/categories/science" className="block text-white py-2">
                        Science
                    </Link>
                    <Link to="/categories/entertainment" className="block text-white py-2">
                        Entertainment
                    </Link>
                    <Link to="/categories/health" className="block text-white py-2">
                        Health
                    </Link>
                    <Link to="/saved" className="block text-white py-2 flex items-center">
                        <svg
                            className="w-5 h-5 mr-1"
                            fill="currentColor"
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
                        Saved Articles
                    </Link>
                    <Link to="/about" className="block text-white py-2">
                        About
                    </Link>
                </div>
            )}

            {/* Search Bar (Mobile) */}
            {isSearchOpen && (
                <div className="lg:hidden p-4 bg-blue-600 dark:bg-gray-800">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded p-2 focus:outline-none dark:bg-gray-700 dark:text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
};

export default Navbar;
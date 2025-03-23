// src/components/Navbar/HamburgerMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu = ({ isMenuOpen, setIsMenuOpen }) => {
    return (
        <>
            {/* Hamburger Icon */}
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

            {/* Mobile Menu (Expanded) */}
            {isMenuOpen && (
                <div className="lg:hidden bg-blue-600 dark:bg-gray-800 p-4 absolute top-16 left-0 right-0">
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
                    <Link to="/about" className="block text-white py-2">
                        About
                    </Link>
                </div>
            )}
        </>
    );
};

export default HamburgerMenu;
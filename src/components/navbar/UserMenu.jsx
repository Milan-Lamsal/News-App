// src/components/Navbar/UserMenu.jsx
import React from 'react';

const UserMenu = ({ isUserMenuOpen, setIsUserMenuOpen }) => {
    return (
        <>
            {/* User Icon */}
            <button
                className="text-white focus:outline-none lg:hidden"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
            </button>

            {/* User Menu (Mobile) */}
            {isUserMenuOpen && (
                <div className="lg:hidden p-4 bg-blue-600 dark:bg-gray-800 absolute top-16 right-0">
                    <button className="block text-white py-2">Profile</button>
                    <button className="block text-white py-2">Settings</button>
                    <button className="block text-white py-2">Logout</button>
                </div>
            )}
        </>
    );
};

export default UserMenu;
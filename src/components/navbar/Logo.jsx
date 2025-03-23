// src/components/Navbar/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to="/" className="text-white text-xl font-bold dark:text-gray-200">
            News Aggregator
        </Link>
    );
};

export default Logo;
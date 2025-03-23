import React from 'react';

const LoadingSpinner = ({ size = 'regular' }) => {
    const sizeClasses = {
        small: 'w-6 h-6',
        regular: 'w-12 h-12',
        large: 'w-16 h-16'
    };

    return (
        <div className="flex justify-center items-center p-4">
            <div className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-500 ${sizeClasses[size]}`}></div>
        </div>
    );
};

export default LoadingSpinner; 
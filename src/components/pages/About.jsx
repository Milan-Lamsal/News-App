import React from 'react';
import BackToTop from '../BackToTop/BackToTop';
import profileImage from '../../assets/NewLogo.jpg';

const About = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-primary text-white p-6">
                    <h1 className="text-3xl font-bold">About News Explorer</h1>
                    <p className="mt-2 opacity-90">A modern news aggregation platform for the digital age</p>
                </div>
                
                {/* Main content */}
                <div className="p-6 space-y-8 dark:text-white">
                    {/* App description */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-primary-light">Our Mission</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            News Explorer is designed to provide a streamlined and personalized news experience. 
                            In today's fast-paced world, staying informed can be overwhelming. 
                            Our application curates news from multiple reliable sources, offering a 
                            comprehensive view of current events while giving you control over what you see and how you interact with it.
                        </p>
                    </section>
                    
                    {/* Features */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-primary-light">Key Features</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <Feature 
                                title="Multi-Source Aggregation" 
                                description="Content from various trusted news providers including The Guardian and specialized health news sources." 
                                icon={<NewsIcon />}
                            />
                            <Feature 
                                title="Category Filtering" 
                                description="Browse news by categories like Technology, Sports, Business, Science, Entertainment, and Health." 
                                icon={<CategoryIcon />}
                            />
                            <Feature 
                                title="Intelligent Search" 
                                description="Search across all news sources to find specific topics or keywords." 
                                icon={<SearchIcon />}
                            />
                            <Feature 
                                title="Save Articles" 
                                description="Bookmark articles to read later, even when you're offline." 
                                icon={<BookmarkIcon />}
                            />
                            <Feature 
                                title="Time-Based Filtering" 
                                description="Filter articles by recency: Today, This Week, This Month, or This Year." 
                                icon={<TimeIcon />}
                            />
                            <Feature 
                                title="Performance Optimized" 
                                description="Advanced caching system reduces API calls and improves loading speed." 
                                icon={<SpeedIcon />}
                            />
                            <Feature 
                                title="Dark Mode" 
                                description="Easy on the eyes with full dark mode support for comfortable reading day or night." 
                                icon={<DarkModeIcon />}
                            />
                            <Feature 
                                title="Responsive Design" 
                                description="Optimized for all devices - desktop, tablet, and mobile." 
                                icon={<DeviceIcon />}
                            />
                        </div>
                    </section>
                    
                    {/* Technology */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-primary-light">Technology Stack</h2>
                        <div className="flex flex-wrap gap-3">
                            <TechBadge name="React" />
                            <TechBadge name="Vite" />
                            <TechBadge name="Tailwind CSS" />
                            <TechBadge name="React Router" />
                            <TechBadge name="Axios" />
                            <TechBadge name="LocalForage" />
                            <TechBadge name="The Guardian API" />
                            <TechBadge name="MediaStack API" />
                        </div>
                    </section>
                    
                    {/* Attribution */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-primary-light">Data Sources</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            News Explorer is powered by the following news APIs:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                            <li><a href="https://open-platform.theguardian.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">The Guardian Open Platform</a> - Our primary source for most categories</li>
                            <li><a href="https://mediastack.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">MediaStack API</a> - Used for health news</li>
                            <li><a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">NewsAPI</a> - Used for development testing</li>
                        </ul>
                    </section>
                    
                    {/* Developer info */}
                    <section className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-primary-light">Developer</h2>
                        <div className="flex flex-col md:flex-row items-center md:items-start">
                            <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-1 mb-4 md:mr-6 md:mb-0 w-40 h-40 overflow-hidden flex items-center justify-center">
                                <img 
                                    src={profileImage} 
                                    alt="Milan Lamsal"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = 'none';
                                        e.target.nextElementSibling.style.display = 'block';
                                    }}
                                    className="w-full h-full object-cover rounded-full object-center"
                                    style={{
                                        objectPosition: "20% 30%", /* Adjust these values to better center the face */
                                        objectFit: "cover"
                                    }}
                                />
                                <DeveloperIcon className="hidden" />
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="font-medium text-xl">Milan Lamsal</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-2">Currently Exploring Web Development</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                    News Explorer was created as a modern news aggregation platform to demonstrate
                                    proficiency in React development, API integration, and responsive design.
                                </p>
                                <div className="flex justify-center md:justify-start space-x-3">
                                    <a href="https://github.com/Milan-Lamsal" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light">
                                        <GithubIcon />
                                    </a>
                                    <a href="https://linkedin.com/in/milanlamsal" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light">
                                        <LinkedinIcon />
                                    </a>
                                    <a href="https://twitter.com/Milan24lamsal" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light">
                                        <TwitterIcon />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Version */}
                    <section className="text-center text-gray-500 dark:text-gray-400 text-sm">
                        <p>News Explorer v1.0.0</p>
                        <p className="mt-1">©{new Date().getFullYear()} All Rights Reserved</p>
                    </section>
                </div>
            </div>
            
            <BackToTop />
        </div>
    );
};

// Feature component
const Feature = ({ title, description, icon }) => (
    <div className="flex p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="text-primary dark:text-primary-light mr-4 flex-shrink-0">
            {icon}
        </div>
        <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
        </div>
    </div>
);

// Tech badge component
const TechBadge = ({ name }) => (
    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">
        {name}
    </span>
);

// Icons
const NewsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
);

const CategoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const BookmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);

const TimeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const SpeedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const DarkModeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const DeviceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

const DeveloperIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const GithubIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
);

const LinkedinIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const TwitterIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.023 10.023 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.826 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
    </svg>
);

export default About;

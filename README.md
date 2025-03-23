# News App

A modern news application built with React, Vite, and Tailwind CSS. The app displays news from various sources, allows searching for specific topics, and offers category-based filtering.

## Features

- Latest news articles from multiple sources
- Category-based news filtering (Technology, Sports, Business, etc.)
- Date-based filtering (Today, This Week, This Month, This Year)
- Save articles for later reading
- Search functionality
- Infinite scroll for smooth browsing
- Responsive design with dark mode support
- **API Caching** - Reduce API calls and improve performance
- "Back to Top" button for easy navigation

## Performance Features

### API Caching System
The app includes a sophisticated caching system to reduce API calls and improve performance:

- **Automatic Caching**: API responses are automatically cached with different expiration times:
  - Top Headlines: 15 minutes
  - Category News: 30 minutes
  - Health News: 60 minutes
  - Search Results: 10 minutes

- **Cache Control**: Users can manage cached data through the cache control panel (gear icon in the bottom left):
  - Clear all cached data
  - Clear specific categories of cache
  - Visual feedback on cache operations

- **Benefits**:
  - Reduced API usage (respects API rate limits)
  - Faster content loading
  - Works offline for previously viewed content
  - Reduced bandwidth consumption

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   cd News
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your API keys for:
     - The Guardian API (free tier available)
     - NewsAPI (for local development)
     - MediaStack API (for health news)
   ```
   VITE_GUARDIAN_API_KEY=your_guardian_api_key
   VITE_NEWS_API_KEY=your_news_api_key
   VITE_MEDIASTACK_API_KEY=your_mediastack_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

```bash
npm run build
```

The production build will be in the `dist` folder, which you can deploy to any static site hosting service.

## API Information

This project uses multiple news APIs:
- The Guardian API: Primary source for most categories
- MediaStack API: Used for health news
- NewsAPI: Optional, used for local development only (free tier has CORS limitations)

## Technologies Used

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- LocalForage (for caching)

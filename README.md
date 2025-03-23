# News Explorer


A modern React application for browsing news from various sources with category filtering, search functionality, and article bookmarking.

## 🚀 Features

- **Multi-source News Aggregation** - Content from The Guardian, MediaStack and more
- **Category Filtering** - Browse news by Technology, Sports, Business, Science, Entertainment, and Health
- **Date Filtering** - Filter articles by Today, This Week, This Month, or This Year
- **Search Functionality** - Find articles by keywords across all categories
- **Save for Later** - Bookmark articles to read later
- **Infinite Scroll** - Seamlessly load more articles as you scroll
- **Responsive Design** - Works on mobile, tablet, and desktop devices
- **Dark Mode** - Toggle between light and dark themes
- **API Caching** - Reduced API calls with intelligent browser caching

## 🔴Live Demoe(https://milan-news-app-nine-kappa.vercel.app/)

## 🔧 Technologies

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- LocalForage (for caching)
- Intersection Observer API (for infinite scroll)

## 📋 Prerequisites

- Node.js (v14.0+)
- npm or yarn
- API keys for:
  - The Guardian API
  - MediaStack API (for health news)

## 🚀 Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/news-explorer.git
cd news-explorer
```

2. **Install dependencies**

```bash
npm install
# or
yarn
```

3. **Set up environment variables**

Create a `.env` file in the root directory and add your API keys:

```
VITE_GUARDIAN_API_KEY=your_guardian_api_key
VITE_MEDIASTACK_API_KEY=your_mediastack_api_key
```

4. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Build for production**

```bash
npm run build
# or
yarn build
```

## 🌐 API Usage

The application uses the following APIs:

- **The Guardian API**: For general news across multiple categories
- **MediaStack API**: Primarily used for health news
- **News API**: Used for development testing only (free tier has CORS limitations)

## 📂 Project Structure

```
/
├── public/             # Static files
├── src/
│   ├── assets/         # Images and static assets
│   ├── components/     # React components
│   │   ├── ArticleCard/    # Article card components
│   │   ├── common/         # Common UI components
│   │   ├── layout/         # Layout components
│   │   └── pages/          # Page components
│   ├── services/       # API and utility services
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Entry point
├── .env               # Environment variables (not in repo)
├── .env.example       # Example environment variables
└── package.json       # Dependencies and scripts
```

## 🔄 Caching Strategy

The application implements a sophisticated caching system to minimize API requests:

- **Headlines**: 15 minute cache
- **Category News**: 30 minute cache
- **Health News**: 1 hour cache

Cache can be manually cleared via the settings panel.

## 📱 Responsive Design

The application is fully responsive with three main breakpoints:
- **Mobile**: Up to 640px
- **Tablet**: 641px to 1024px
- **Desktop**: 1025px and above

## 🌙 Dark Mode

The app includes a toggleable dark mode that respects the user's system preferences by default but can be manually overridden.

## 🚨 Common Issues & Solutions

### API Rate Limits
- The Guardian API: 12 requests/second, 5,000 requests/day
- MediaStack: 500 requests/month (free tier)
- The caching system helps prevent hitting these limits

### CORS Issues with NewsAPI
- The free tier of NewsAPI only works on localhost
- The app automatically falls back to other sources when not in development

## 🛣️ Roadmap

- [ ] User Authentication
- [ ] Personalized News Feed
- [ ] Push Notifications for Breaking News
- [ ] Article Reading Statistics
- [ ] Multi-language Support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by Milan Lamsal 

## 👏 Acknowledgements

- [The Guardian API](https://open-platform.theguardian.com/) for providing news content
- [MediaStack](https://mediastack.com/) for health news content
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for the development environment
- [React Icons](https://react-icons.github.io/react-icons/) for icons

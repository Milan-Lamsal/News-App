import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Add this import
import Nav from './components/navbar/Nav'
import Categories from './components/pages/Categories';
import About from './components/pages/About';
import Home from './components/pages/Home';
import SavedArticles from './components/pages/SavedArticles';
import CacheControl from './components/CacheControl/CacheControl';

function App() {
  // The searchQuery holds the user's search input, and setSearchQuery updates it as the user types.
  const [searchQuery, setSearchQuery] = useState('') // state for search query 
  const [isDarkMode, setisDarkMode] = useState(false)//state for dark mode

  //function to toggle dark mode
  const toggleDarkMode = () => {
    setisDarkMode(!isDarkMode);
  }

  //Apply darkmode class to the <bod>element
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark')
    }

  }, [isDarkMode])


  return (
    <>
      <div className={isDarkMode ? 'dark' : ""}>
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900"> {/* Dark mode background */}
          <Router> {/* Wrap your app in Router */}
            <Nav
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              toggleDarkMode={toggleDarkMode} // Pass toggleDarkMode to Navbar
              isDarkMode={isDarkMode}
            />

            <div className='flex-1'>
              <Routes>
                <Route path='/' element={<Home searchQuery={searchQuery} />} />  {/* Pass searchQuery to Home */}
                <Route path='/categories/:category' element={<Categories searchQuery={searchQuery} />} /> {/* Dynamic route for categories */}
                <Route path='/about' element={<About />} />
                <Route path='/saved' element={<SavedArticles />} />
              </Routes>
            </div>
            
            {/* Add Cache Control component */}
            <CacheControl />
          </Router >
        </div>
      </div>
    </>
  )
}

export default App

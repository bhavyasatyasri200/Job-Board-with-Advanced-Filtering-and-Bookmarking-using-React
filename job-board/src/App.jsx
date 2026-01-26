// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import JobListingsPage from './pages/JobListingPage';
import TrackerPage from './pages/TrackerPage';
import useJobStore from './store/jobStore';
import './App.css';

/**
 * App Component
 * 
 * Why React Router?
 * - Standard routing library for React
 * - Enables navigation without page reloads (SPA)
 * - Clean URL structure: / for listings, /tracker for bookmarks
 * - Browser history management
 * 
 * Layout Structure:
 * - Header with navigation
 * - Routes for different pages
 * - Responsive design
 */

function Navigation() {
  const location = useLocation();
  const { bookmarkedJobs } = useJobStore();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          💼 Job Board
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Browse Jobs
          </Link>
          <Link 
            to="/tracker" 
            className={`nav-link ${location.pathname === '/tracker' ? 'active' : ''}`}
          >
            My Tracker
            {bookmarkedJobs.length > 0 && (
              <span className="bookmark-badge">{bookmarkedJobs.length}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        
        <div className="app-container">
          <Routes>
            <Route path="/" element={<JobListingsPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
          </Routes>
        </div>

        <footer className="footer">
          <p>© 2024 Job Board - Built with React & Zustand</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
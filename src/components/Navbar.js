import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, isAuthenticated, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    closeMobileMenu();
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="brand-logo">
            <span className="heart-icon">❤️</span>
            <span className="brand-text">BloodDonate</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-menu desktop-menu">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/request-blood" 
            className={`nav-link ${location.pathname === '/request-blood' ? 'active' : ''}`}
          >
            Request Blood
          </Link>
          {isAuthenticated ? (
            <>
              {user?.role === 'donor' && (
                <Link 
                  to="/dashboard" 
                  className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                >
                  Dashboard
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
                >
                  Admin Panel
                </Link>
              )}
              <div className="user-menu">
                <span className="user-name">Welcome, {user?.name}</span>
                <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link 
            to="/request-blood" 
            className={`mobile-nav-link ${location.pathname === '/request-blood' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Request Blood
          </Link>
          {isAuthenticated ? (
            <>
              {user?.role === 'donor' && (
                <Link 
                  to="/dashboard" 
                  className={`mobile-nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className={`mobile-nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Admin Panel
                </Link>
              )}
              <div className="mobile-user-info">
                <span className="user-name">Welcome, {user?.name}</span>
                <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="mobile-auth-buttons">
              <Link to="/login" className="btn btn-secondary btn-sm" onClick={closeMobileMenu}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm" onClick={closeMobileMenu}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const stats = [
    { number: '15,000+', label: 'Total Donors', icon: '👥' },
    { number: '45,000+', label: 'Lives Saved', icon: '❤️' },
    { number: '120+', label: 'Blood Drives', icon: '🏥' },
    { number: '98%', label: 'Success Rate', icon: '📈' }
  ];

  const features = [
    {
      icon: '🩸',
      title: 'Easy Blood Donation',
      description: 'Simple and quick blood donation process with professional medical staff.'
    },
    {
      icon: '🔍',
      title: 'Find Blood Quickly',
      description: 'Locate blood donors and blood banks in your area instantly.'
    },
    {
      icon: '📱',
      title: 'Real-time Updates',
      description: 'Get notifications about blood requests and donation schedules.'
    },
    {
      icon: '🛡️',
      title: 'Safe & Secure',
      description: 'Your personal information is protected with industry-standard security.'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Save Lives Through
                <span className="hero-title-highlight"> Blood Donation</span>
              </h1>
              <p className="hero-description">
                Join thousands of donors who are making a difference every day. 
                Your blood donation can save up to 3 lives. Start your journey to become a lifesaver today.
              </p>
              <div className="hero-buttons">
                <Link to="/register" className="btn btn-primary btn-large">
                  Become a Donor
                </Link>
                <Link to="/request-blood" className="btn btn-secondary btn-large">
                  Request Blood
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-illustration">
                <div className="blood-drop">🩸</div>
                <div className="heart-beat">❤️</div>
                <div className="medical-cross">🏥</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose BloodDonate?</h2>
            <p className="section-description">
              We make blood donation and requests simple, safe, and efficient
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Make a Difference?</h2>
            <p className="cta-description">
              Every drop counts. Join our community of donors and help save lives today.
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary btn-large">
                Start Donating
              </Link>
              <Link to="/request-blood" className="btn btn-secondary btn-large">
                Need Blood?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="brand-logo">
                <span className="heart-icon">❤️</span>
                <span className="brand-text">BloodDonate</span>
              </div>
              <p className="footer-description">
                Connecting donors with those in need, one drop at a time.
              </p>
            </div>
            <div className="footer-links">
              <div className="footer-section">
                <h4>Quick Links</h4>
                <Link to="/">Home</Link>
                <Link to="/request-blood">Request Blood</Link>
                <Link to="/register">Become a Donor</Link>
                <Link to="/login">Login</Link>
              </div>
              <div className="footer-section">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#contact">Contact Us</a>
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 BloodDonate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

 
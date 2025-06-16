import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DonorDashboard from './pages/DonorDashboard';
import RecipientRequest from './pages/RecipientRequest';
import AdminPanel from './pages/AdminPanel';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Check for existing user session on app load
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar 
          user={user} 
          isAuthenticated={isAuthenticated} 
          onLogout={logout} 
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} /> : 
                <Login onLogin={login} />
              } 
            />
            <Route 
              path="/register" 
              element={
                isAuthenticated ? 
                <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} /> : 
                <Register onRegister={login} />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated && user?.role === 'donor' ? 
                <DonorDashboard user={user} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/request-blood" 
              element={<RecipientRequest />} 
            />
            <Route 
              path="/admin" 
              element={
                isAuthenticated && user?.role === 'admin' ? 
                <AdminPanel user={user} /> : 
                <Navigate to="/login" />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 
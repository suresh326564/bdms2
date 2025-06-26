import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import InputField from '../components/InputField';
import AlertBox from '../components/AlertBox';
import './Login.css';

const Login = ({ onLogin, role: propRole }) => {
  const location = useLocation();
  const role = location.state?.role || propRole || 'donor';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: role
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setAlert(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on role
      const userData = {
        id: 1,
        name: formData.email.split('@')[0],
        email: formData.email,
        role: formData.role,
        bloodGroup: formData.role === 'donor' ? 'O+' : null
      };

      onLogin(userData);
      setAlert({
        type: 'success',
        message: 'Login successful! Redirecting...'
      });
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Login failed. Please check your credentials.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-card card">
            <div className="login-header">
              <div className="login-logo">
                <span className="heart-icon">❤️</span>
                <h1>BloodDonate</h1>
              </div>
              <h2>Welcome Back</h2>
              <p>Sign in to your account to continue</p>
            </div>

            {alert && (
              <AlertBox
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
              />
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <InputField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                error={errors.email}
                required
              />

              <InputField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                error={errors.password}
                required
              />

              {role !== 'admin' && (
                <div className="form-group">
                  <label className="form-label">Login As</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="donor">Blood Donor</option>
                    <option value="recipient">Blood Recipient</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-large login-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner-small"></div>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="login-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="link-primary">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 
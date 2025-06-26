import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import InputField from '../components/InputField';
import AlertBox from '../components/AlertBox';
import './Register.css';

const Register = ({ onRegister, role: propRole }) => {
  const location = useLocation();
  const role = location.state?.role || propRole || 'donor';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bloodGroup: '',
    phone: '',
    role: role
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

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

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    if ((formData.role === 'donor' || formData.role === 'recipient') && !formData.bloodGroup) {
      newErrors.bloodGroup = 'Blood group is required';
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
      
      // Mock user data
      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        bloodGroup: formData.bloodGroup,
        phone: formData.phone
      };

      onRegister(userData);
      setAlert({
        type: 'success',
        message: 'Registration successful! Welcome to BloodDonate!'
      });
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="container">
        <div className="register-container">
          <div className="register-card card">
            <div className="register-header">
              <div className="register-logo">
                <span className="heart-icon">❤️</span>
                <h1>BloodDonate</h1>
              </div>
              <h2>Create Account</h2>
              <p>Join our community of lifesavers</p>
            </div>

            {alert && (
              <AlertBox
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
              />
            )}

            <form onSubmit={handleSubmit} className="register-form">
              <InputField
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                error={errors.name}
                required
              />

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
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                error={errors.phone}
                required
              />

              <div className="form-group">
                <label className="form-label">Register As</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="donor">Blood Donor</option>
                  <option value="recipient">Blood Recipient</option>
                </select>
              </div>

              {(formData.role === 'donor' || formData.role === 'recipient') && (
                <div className="form-group">
                  <label className="form-label">Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                  {errors.bloodGroup && (
                    <div className="error-message">{errors.bloodGroup}</div>
                  )}
                </div>
              )}

              <InputField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                error={errors.password}
                required
              />

              <InputField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                error={errors.confirmPassword}
                required
              />

              <button
                type="submit"
                className="btn btn-primary btn-large register-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner-small"></div>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="register-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="link-primary">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 
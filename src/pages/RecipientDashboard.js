import React, { useState, useEffect } from 'react';
import './DonorDashboard.css';

const RecipientDashboard = ({ user }) => {
  const [requestHistory, setRequestHistory] = useState([]);
  const [upcomingRequests, setUpcomingRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const loadDashboardData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock data
      setRequestHistory([
        {
          id: 1,
          date: '2024-01-10',
          bloodGroup: 'A+',
          units: 2,
          hospital: 'City Hospital',
          status: 'fulfilled'
        },
        {
          id: 2,
          date: '2023-12-05',
          bloodGroup: 'A+',
          units: 1,
          hospital: 'Red Cross Center',
          status: 'fulfilled'
        },
        {
          id: 3,
          date: '2023-11-01',
          bloodGroup: 'A+',
          units: 3,
          hospital: 'Community Blood Bank',
          status: 'fulfilled'
        }
      ]);
      setUpcomingRequests([
        {
          id: 1,
          date: '2024-02-25',
          time: '09:00 AM',
          hospital: 'City Hospital',
          units: 1,
          bloodGroup: 'A+',
          status: 'pending'
        }
      ]);
      setNotifications([
        {
          id: 1,
          type: 'info',
          message: 'Your next blood request is scheduled for February 25, 2024',
          date: '2024-01-20'
        },
        {
          id: 2,
          type: 'success',
          message: 'Your request on January 10, 2024 was fulfilled',
          date: '2024-01-11'
        }
      ]);
      setIsLoading(false);
    };
    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="donor-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Manage your blood requests and track your status</p>
        </div>
        <div className="dashboard-grid">
          {/* Quick Stats */}
          <div className="dashboard-card card">
            <div className="card-header">
              <h3>Your Request Stats</h3>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{requestHistory.length}</div>
                <div className="stat-label">Total Requests</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{requestHistory.reduce((sum, req) => sum + req.units, 0)}</div>
                <div className="stat-label">Units Received</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{user?.bloodGroup}</div>
                <div className="stat-label">Blood Group</div>
              </div>
            </div>
          </div>
          {/* Recent Requests */}
          <div className="dashboard-card card">
            <div className="card-header">
              <h3>Recent Requests</h3>
            </div>
            <div className="donation-history">
              {requestHistory.slice(0, 3).map(request => (
                <div key={request.id} className="donation-item">
                  <div className="donation-date">
                    <div className="date">{new Date(request.date).toLocaleDateString()}</div>
                  </div>
                  <div className="donation-details">
                    <h4>{request.bloodGroup} - {request.units} unit(s)</h4>
                    <p>{request.hospital}</p>
                  </div>
                  <div className="donation-status completed">
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Notifications */}
          <div className="dashboard-card card">
            <div className="card-header">
              <h3>Notifications</h3>
            </div>
            <div className="notifications">
              {notifications.map(notification => (
                <div key={notification.id} className={`notification-item ${notification.type}`}>
                  <div className="notification-icon">
                    {notification.type === 'success' ? '✅' : 'ℹ️'}
                  </div>
                  <div className="notification-content">
                    <p>{notification.message}</p>
                    <small>{new Date(notification.date).toLocaleDateString()}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientDashboard; 
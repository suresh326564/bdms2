import React, { useState, useEffect } from 'react';
import './DonorDashboard.css';

const DonorDashboard = ({ user }) => {
  const [donationHistory, setDonationHistory] = useState([]);
  const [upcomingDonations, setUpcomingDonations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const loadDashboardData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setDonationHistory([
        {
          id: 1,
          date: '2024-01-15',
          bloodGroup: 'O+',
          units: 1,
          location: 'City Hospital',
          status: 'completed'
        },
        {
          id: 2,
          date: '2023-12-20',
          bloodGroup: 'O+',
          units: 1,
          location: 'Red Cross Center',
          status: 'completed'
        },
        {
          id: 3,
          date: '2023-11-10',
          bloodGroup: 'O+',
          units: 1,
          location: 'Community Blood Bank',
          status: 'completed'
        }
      ]);

      setUpcomingDonations([
        {
          id: 1,
          date: '2024-02-20',
          time: '10:00 AM',
          location: 'City Hospital',
          type: 'Regular Donation'
        }
      ]);

      setNotifications([
        {
          id: 1,
          type: 'info',
          message: 'Your next donation is scheduled for February 20, 2024',
          date: '2024-01-25'
        },
        {
          id: 2,
          type: 'success',
          message: 'Thank you for your donation on January 15, 2024',
          date: '2024-01-16'
        }
      ]);

      setIsLoading(false);
    };

    loadDashboardData();
  }, []);

  const getEligibilityStatus = () => {
    const lastDonation = donationHistory[0];
    if (!lastDonation) return { status: 'eligible', message: 'You are eligible to donate' };
    
    const lastDonationDate = new Date(lastDonation.date);
    const today = new Date();
    const daysSinceLastDonation = Math.floor((today - lastDonationDate) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastDonation < 56) {
      const daysRemaining = 56 - daysSinceLastDonation;
      return {
        status: 'ineligible',
        message: `You can donate again in ${daysRemaining} days`
      };
    }
    
    return { status: 'eligible', message: 'You are eligible to donate' };
  };

  const eligibility = getEligibilityStatus();

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
          <p>Manage your blood donation activities and track your impact</p>
        </div>

        <div className="dashboard-grid">
          {/* Eligibility Status */}
          <div className="dashboard-card card">
            <div className="card-header">
              <h3>Eligibility Status</h3>
            </div>
            <div className={`eligibility-status ${eligibility.status}`}>
              <div className="status-icon">
                {eligibility.status === 'eligible' ? '✅' : '⏳'}
              </div>
              <div className="status-content">
                <h4>{eligibility.status === 'eligible' ? 'Eligible to Donate' : 'Not Yet Eligible'}</h4>
                <p>{eligibility.message}</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="dashboard-card card">
            <div className="card-header">
              <h3>Your Impact</h3>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{donationHistory.length}</div>
                <div className="stat-label">Total Donations</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{donationHistory.length * 3}</div>
                <div className="stat-label">Lives Saved</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{user?.bloodGroup}</div>
                <div className="stat-label">Blood Group</div>
              </div>
            </div>
          </div>

          {/* Upcoming Donations */}
          <div className="dashboard-card card">
            <div className="card-header">
              <h3>Upcoming Donations</h3>
            </div>
            <div className="upcoming-donations">
              {upcomingDonations.length > 0 ? (
                upcomingDonations.map(donation => (
                  <div key={donation.id} className="donation-item">
                    <div className="donation-date">
                      <div className="date">{new Date(donation.date).toLocaleDateString()}</div>
                      <div className="time">{donation.time}</div>
                    </div>
                    <div className="donation-details">
                      <h4>{donation.type}</h4>
                      <p>{donation.location}</p>
                    </div>
                    <button className="btn btn-primary btn-sm">Reschedule</button>
                  </div>
                ))
              ) : (
                <p className="no-data">No upcoming donations scheduled</p>
              )}
            </div>
          </div>

          {/* Recent Donations */}
          <div className="dashboard-card card">
            <div className="card-header">
              <h3>Recent Donations</h3>
            </div>
            <div className="donation-history">
              {donationHistory.slice(0, 3).map(donation => (
                <div key={donation.id} className="donation-item">
                  <div className="donation-date">
                    <div className="date">{new Date(donation.date).toLocaleDateString()}</div>
                  </div>
                  <div className="donation-details">
                    <h4>{donation.bloodGroup} - {donation.units} unit</h4>
                    <p>{donation.location}</p>
                  </div>
                  <div className="donation-status completed">
                    Completed
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

export default DonorDashboard; 
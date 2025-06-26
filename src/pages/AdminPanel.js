import React, { useState } from 'react';
import './AdminPanel.css';

const mockDonors = [
  { id: 1, name: 'Alice', email: 'alice@example.com', bloodGroup: 'O+', donations: 5, status: 'active' },
  { id: 2, name: 'Bob', email: 'bob@example.com', bloodGroup: 'A-', donations: 2, status: 'blocked' },
];

const mockRecipients = [
  { id: 1, name: 'Charlie', email: 'charlie@example.com', bloodGroup: 'B+', requests: 3, status: 'active' },
  { id: 2, name: 'Diana', email: 'diana@example.com', bloodGroup: 'AB-', requests: 1, status: 'active' },
];

const AdminPanel = ({ user }) => {
  const [donors, setDonors] = useState(mockDonors);
  const [recipients, setRecipients] = useState(mockRecipients);
  const [selectedTab, setSelectedTab] = useState('donors');

  const handleStatusChange = (type, id, newStatus) => {
    if (type === 'donor') {
      setDonors(donors.map(d => d.id === id ? { ...d, status: newStatus } : d));
    } else {
      setRecipients(recipients.map(r => r.id === id ? { ...r, status: newStatus } : r));
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user?.name || 'Admin'}! Manage donors and recipients below.</p>
      </div>
      <div className="admin-tabs">
        <button className={selectedTab === 'donors' ? 'active' : ''} onClick={() => setSelectedTab('donors')}>Donor Reports</button>
        <button className={selectedTab === 'recipients' ? 'active' : ''} onClick={() => setSelectedTab('recipients')}>Recipient Reports</button>
      </div>
      <div className="admin-content">
        {selectedTab === 'donors' && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Blood Group</th>
                <th>Donations</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donors.map(donor => (
                <tr key={donor.id}>
                  <td>{donor.name}</td>
                  <td>{donor.email}</td>
                  <td>{donor.bloodGroup}</td>
                  <td>{donor.donations}</td>
                  <td>{donor.status}</td>
                  <td>
                    <button onClick={() => handleStatusChange('donor', donor.id, donor.status === 'active' ? 'blocked' : 'active')}>
                      {donor.status === 'active' ? 'Block' : 'Unblock'}
                    </button>
                    <button onClick={() => setDonors(donors.filter(d => d.id !== donor.id))} style={{ marginLeft: 8 }}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {selectedTab === 'recipients' && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Blood Group</th>
                <th>Requests</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map(recipient => (
                <tr key={recipient.id}>
                  <td>{recipient.name}</td>
                  <td>{recipient.email}</td>
                  <td>{recipient.bloodGroup}</td>
                  <td>{recipient.requests}</td>
                  <td>{recipient.status}</td>
                  <td>
                    <button onClick={() => handleStatusChange('recipient', recipient.id, recipient.status === 'active' ? 'blocked' : 'active')}>
                      {recipient.status === 'active' ? 'Block' : 'Unblock'}
                    </button>
                    <button onClick={() => setRecipients(recipients.filter(r => r.id !== recipient.id))} style={{ marginLeft: 8 }}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 
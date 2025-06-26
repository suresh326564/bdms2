import React from 'react';
import { useNavigate } from 'react-router-dom';

const DonorSelection = () => {
  const navigate = useNavigate();
  return (
    <div className="selection-page">
      <h2>Donor Access</h2>
      <div className="selection-buttons">
        <button className="btn btn-primary btn-large" onClick={() => navigate('/login', { state: { role: 'donor' } })}>
          Login as Donor
        </button>
        <button className="btn btn-secondary btn-large" onClick={() => navigate('/register', { state: { role: 'donor' } })}>
          Register as Donor
        </button>
      </div>
    </div>
  );
};

export default DonorSelection; 
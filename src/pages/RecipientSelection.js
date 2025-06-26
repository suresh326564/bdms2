import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipientSelection = () => {
  const navigate = useNavigate();
  return (
    <div className="selection-page">
      <h2>Recipient Access</h2>
      <div className="selection-buttons">
        <button className="btn btn-primary btn-large" onClick={() => navigate('/login', { state: { role: 'recipient' } })}>
          Login as Recipient
        </button>
        <button className="btn btn-secondary btn-large" onClick={() => navigate('/register', { state: { role: 'recipient' } })}>
          Register as Recipient
        </button>
      </div>
    </div>
  );
};

export default RecipientSelection; 
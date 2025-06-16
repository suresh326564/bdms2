import React from 'react';
import './AlertBox.css';

const AlertBox = ({ 
  type = 'info', 
  message, 
  title, 
  onClose, 
  className = '',
  children 
}) => {
  const alertClass = `alert alert-${type}`;
  const iconMap = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  if (!message && !children) return null;

  return (
    <div className={`${alertClass} ${className}`}>
      <div className="alert-content">
        <div className="alert-icon">
          {iconMap[type]}
        </div>
        <div className="alert-body">
          {title && <div className="alert-title">{title}</div>}
          {message && <div className="alert-message">{message}</div>}
          {children}
        </div>
        {onClose && (
          <button 
            className="alert-close" 
            onClick={onClose}
            aria-label="Close alert"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertBox; 
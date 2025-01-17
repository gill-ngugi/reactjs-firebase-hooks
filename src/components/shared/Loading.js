// src/components/shared/Loading.js
import { useEffect, useState } from 'react';
import './Loading.css';

function Loading({ type = 'spinner', text = 'Loading...' }) {
  const [dots, setDots] = useState('');

  // Animated dots effect
  useEffect(() => {
    if (type === 'dots') {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);

      return () => clearInterval(interval);
    }
  }, [type]);

  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return (
          <div className="loader-spinner">
            <div className="spinner"></div>
            <p className="loading-text">{text}</p>
          </div>
        );

      case 'dots':
        return (
          <div className="loader-dots">
            <p className="loading-text">{text}{dots}</p>
          </div>
        );

      case 'pulse':
        return (
          <div className="loader-pulse">
            <div className="pulse"></div>
            <p className="loading-text">{text}</p>
          </div>
        );

      case 'skeleton':
        return (
          <div className="loader-skeleton">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
        );

      default:
        return (
          <div className="loader-default">
            <p className="loading-text">{text}</p>
          </div>
        );
    }
  };

  return (
    <div className="loading-container">
      {renderLoader()}
    </div>
  );
}

export default Loading;

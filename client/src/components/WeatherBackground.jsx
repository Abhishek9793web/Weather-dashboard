import React from 'react';
import './WeatherBackground.css';

const WeatherBackground = ({ isDarkMode }) => {
    return (
        <div className={`weather-background ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="clouds">
                <div className="cloud cloud-1"></div>
                <div className="cloud cloud-2"></div>
                <div className="cloud cloud-3"></div>
            </div>
            <div className="sun"></div>
            <div className="stars">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="star" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`
                    }}></div>
                ))}
            </div>
        </div>
    );
};

export default WeatherBackground; 
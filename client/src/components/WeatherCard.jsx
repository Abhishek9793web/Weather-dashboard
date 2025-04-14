import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weatherData }) => {
    if (!weatherData) return null;

    const { temperature, description, icon, humidity, windSpeed, city, country } = weatherData;

    return (
        <div className="weather-card">
            <div className="card-body">
                <div className="weather-header">
                    <div>
                        <h2 className="card-title">{city}, {country}</h2>
                        <p className="text-muted">{new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</p>
                    </div>
                    <img 
                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`} 
                        alt={description}
                        className="weather-icon"
                    />
                </div>
                
                <div className="temperature-display">
                    <div className="temperature">
                        {Math.round(temperature)}°C
                    </div>
                    <div className="condition">
                        {description}
                    </div>
                </div>
                
                <div className="weather-info">
                    <div className="weather-info-card">
                        <div className="info-content">
                            <i className="bi bi-droplet-fill info-icon"></i>
                            <div>
                                <div className="info-label">Humidity</div>
                                <div className="info-value">{humidity}%</div>
                            </div>
                        </div>
                    </div>
                    <div className="weather-info-card">
                        <div className="info-content">
                            <i className="bi bi-wind info-icon"></i>
                            <div>
                                <div className="info-label">Wind Speed</div>
                                <div className="info-value">{windSpeed} m/s</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;

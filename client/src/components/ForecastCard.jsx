import React from 'react';
import './Forecast.css';

const ForecastCard = ({ date, temperature, condition, icon }) => {
  return (
    <div className="forecast-card">
      <div className="forecast-body">
        <h4 className="forecast-date">{new Date(date).toDateString()}</h4>
        <img className="forecast-icon" src={icon} alt={condition} />
        <p className="forecast-condition">{condition}</p>
        <p className="forecast-temp"><strong>{Math.round(temperature)}°C</strong></p>
      </div>
    </div>
  );
};

export default ForecastCard;

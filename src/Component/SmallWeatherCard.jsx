import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './SmallWeatherCard.css';
import cloudy from '../assets/cloudy.png';
import rainy from '../assets/rainy.png';
import sunny from '../assets/sunny.png';
import snow from '../assets/snow.png';

const SmallWeatherCard = ({ weather = 'sunny', temperature = '0', day = 'Today' }) => {
  const cardRef = useRef();

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.classList.add('animated');
    }
  }, []);

  const weatherIcons = {
    cloudy: cloudy,
    rain: rainy,
    sunny: sunny,
    snow: snow,
  };

  return (
    <div className="small-card" ref={cardRef}>
      <img
        src={weatherIcons[weather] || sunny}
        alt={weather}
        className="small-weather-icon"
      />
      <div className="temp-icon">{temperature}°C</div>
      <p className="small-day">{day}</p>
    </div>
  );
};

SmallWeatherCard.propTypes = {
  weather: PropTypes.oneOf(['cloudy', 'rain', 'sunny', 'snow']),
  temperature: PropTypes.string,
  day: PropTypes.string,
};

export default SmallWeatherCard;

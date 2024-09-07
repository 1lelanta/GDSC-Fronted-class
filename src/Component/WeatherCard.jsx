import React, { useEffect, useRef, useState } from 'react';
import './WeatherCard.css';
import searchIcon from '../assets/search.png';
import sunny from '../assets/sunny.png';
import cloudy from '../assets/cloudy.png';
import rainy from '../assets/rainy.png';
import snow from '../assets/snow.png';
import humidity from '../assets/humidity.png';
import stormy from '../assets/stormy.png';
import SmallWeatherCard from './SmallWeatherCard';

const WeatherCard = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [apiFailed, setApiFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const allIcons = {
    'clear-day': sunny,
    'cloudy': cloudy,
    'rain': rainy,
    'snow': snow,
  };

  const defaultSmallCards = [
    { weather: 'cloudy', temperature: 25, day: 'Mon' },
    { weather: 'rain', temperature: 18, day: 'Tue' },
    { weather: 'sunny', temperature: 22, day: 'Wed' },
  ];

  const apiKey = '63573c3022e34534ac4144228240709'; // WeatherAPI key

  const search = async (city) => {
    if (city === '') {
      alert('Enter City Name');
      return;
    }
    setLoading(true);
    try {
      const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: { accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error('API request failed with status ' + response.status);
      }

      const data = await response.json();
      if (!data || !data.location || !data.current) {
        throw new Error('Unexpected data format');
      }

      const icon = allIcons[data.current.condition.text.toLowerCase()] || sunny;
      setWeatherData({
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        location: data.location.name,
        icon: icon,
      });

      const forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
      const forecastResponse = await fetch(forecastUrl);
      if (!forecastResponse.ok) {
        throw new Error('Forecast API failed');
      }

      const forecast = await forecastResponse.json();
      setForecastData(forecast.forecast.forecastday.map(day => ({
        weather: day.day.condition.text.toLowerCase(),
        temperature: day.day.avgtemp_c,
        day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })
      })));
      setApiFailed(false);
    } catch (error) {
      setWeatherData(null);
      setForecastData(defaultSmallCards);
      setApiFailed(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search('Addis Ababa'); // Default city
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search(inputRef.current.value);
    }
  };

  return (
    <div className="weather-app">
      {/* Main weather card on the left */}
      <div className="weather-card">
        <div className="search-bar">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for a city"
            className="search-input"
            onKeyPress={handleKeyPress}
          />
          <img
            src={searchIcon}
            alt="Search"
            className="search-icon"
            onClick={() => search(inputRef.current.value)}
          />
        </div>

        <div className="main-weather-card">
          {loading ? (
            <div className="loading">
              <p>Loading...</p>
            </div>
          ) : weatherData ? (
            <>
              <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
              <p className="temp">{weatherData.temperature}°C</p>
              <p className="city">{weatherData.location}</p>
              <div className="weather-data">
                <div className="col">
                  <img src={humidity} alt="Humidity" />
                  <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                  </div>
                </div>
                <div className="col">
                  <img src={stormy} alt="Wind Speed" />
                  <div>
                    <p>{weatherData.windSpeed} km/h</p>
                    <span>Wind Speed</span>
                  </div>
                </div>
              </div>
            </>
          ) : apiFailed ? (
            <div className="default-layout">
              <img src={cloudy} alt="API Error" className="weather-icon" />
              <h2>Weather data is currently unavailable</h2>
              <p>Default data shown</p>
            </div>
          ) : (
            <div className="loading">
              <p>Loading weather data...</p>
            </div>
          )}
        </div>
      </div>

      {/* Small cards on the right-hand side */}
      <div className="small-cards-container">
        {forecastData.length > 0 ? (
          forecastData.map((day, index) => (
            <SmallWeatherCard
              key={index}
              weather={day.weather}
              temperature={day.temperature}
              day={day.day}
            />
          ))
        ) : (
          defaultSmallCards.map((day, index) => (
            <SmallWeatherCard
              key={index}
              weather={day.weather}
              temperature={day.temperature}
              day={day.day}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WeatherCard;

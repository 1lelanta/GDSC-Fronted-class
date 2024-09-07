import React from 'react';
import WeatherCard from './Component/WeatherCard';
import SmallWeatherCard from './Component/SmallWeatherCard';

const App = () => {
  return (
    <div className='w_app'>
      {/* Left Side: Weather Card */}
      <div className="left-container">
        <WeatherCard />
      </div>
      
      {/* Right Side: Small Weather Cards */}
      <div className="right-container">
        <SmallWeatherCard />
      </div>
    </div>
  );
}

export default App;

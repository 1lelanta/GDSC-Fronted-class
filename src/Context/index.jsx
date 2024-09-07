import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const stateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [Weather, setWeather] = useState({});
    const [place, setPlace] = useState('Addis Ababa');
    const [thisLocation, setThisLocation] = useState('');

    const fetchWeather = async () => {
        try {
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: place,
                    units: 'metric', // or 'imperial' for Fahrenheit
                    appid: import.meta.env.VITE_API_KEY // Your OpenWeatherMap API key
                }
            });
            const data = response.data;
            setThisLocation(data.name);
            setWeather({
                wind_speed: data.wind.speed,
                humidity: data.main.humidity,
                temp_c: data.main.temp,
                condition: data.weather[0]
            });
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('This place does not exist or an error occurred. Please try again.');
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [place]);

    return (
        <stateContext.Provider value={{
            Weather,
            setWeather,
            setPlace,
            thisLocation,
            place
        }}>
            {children}
        </stateContext.Provider>
    );
};

export const useStateContext = () => useContext(stateContext);

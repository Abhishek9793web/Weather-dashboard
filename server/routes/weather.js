const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get weather data for a specific city
router.get('/', async (req, res) => {
    try {
        const { city } = req.query;

        // Check if city parameter is provided
        if (!city) {
            return res.status(400).json({
                error: 'City parameter is required',
                message: 'Please provide a city name in the query parameters'
            });
        }

        // Make API call to OpenWeatherMap
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            }
        });

        // Extract and structure the required data
        const weatherData = {
            temperature: response.data.main.temp,
            condition: response.data.weather[0].main,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            city: response.data.name,
            country: response.data.sys.country
        };

        res.json(weatherData);
    } catch (error) {
        // Handle different types of errors
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status === 404) {
                return res.status(404).json({
                    error: 'City not found',
                    message: 'The specified city could not be found'
                });
            }
            return res.status(error.response.status).json({
                error: 'Weather API error',
                message: error.response.data.message
            });
        } else if (error.request) {
            // The request was made but no response was received
            return res.status(503).json({
                error: 'Service unavailable',
                message: 'Could not connect to the weather service'
            });
        } else {
            // Something happened in setting up the request that triggered an Error
            return res.status(500).json({
                error: 'Internal server error',
                message: 'An unexpected error occurred'
            });
        }
    }
});

module.exports = router; 
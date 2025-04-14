const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weather');
const forecastweatherRoutes = require('./routes/forecast'); // Imported correctly

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Weather Dashboard API',
        endpoints: {
            currentWeather: '/api/weather?city=YOUR_CITY',
            forecast: '/api/forecast?city=YOUR_CITY' // Added forecast endpoint
        }
    });
});

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/forecast', forecastweatherRoutes); // ✅ Now using forecast route

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested endpoint does not exist'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong on the server'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Current weather: http://localhost:${PORT}/api/weather?city=YOUR_CITY`);
    console.log(`Forecast: http://localhost:${PORT}/api/forecast?city=YOUR_CITY`);
});

const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.WEATHER_API_KEY;

router.get('/', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    console.log(`Fetching forecast from: ${url}`);

    const response = await axios.get(url);
    const forecastList = response.data.list;

    // Sample: Return 5 days with 12:00 PM temperature
    const dailyForecast = forecastList.filter(f => f.dt_txt.includes("12:00:00")).map(f => ({
      date: f.dt_txt.split(" ")[0],
      temperature: f.main.temp,
      condition: f.weather[0].main,
      icon: `https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`,
    }));

    res.json({ city: response.data.city.name, forecast: dailyForecast });
  } catch (error) {
    console.error("Forecast Error:", error.response?.data || error.message);
    res.status(404).json({ error: 'Forecast not found or API error' });
  }
});

module.exports = router;

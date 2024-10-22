// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS to allow cross-origin requests
app.use(cors());

// Your OpenWeatherMap API key (replace with your own key)
const apiKey = 'c8f2fa7aac5d1fae524d0ec365740f93';

// Route to get weather data by city name
app.get('/weather', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(apiUrl);

    const weatherData = {
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      cityName: response.data.name,
    };

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch weather data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


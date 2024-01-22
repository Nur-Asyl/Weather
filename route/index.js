const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const OPENWEATHERMAP_API_KEY = '709d0ff50ae9221f8ae9916496ba77cc';
const VISUAL_CROSSING_API_KEY = '3A5QWCLECANGUPR99GW52YWU9';

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', { weatherData: null, error: null });
});

app.post('/weather', async (req, res) => {
    const city = req.body.city;

    try {
        const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API_KEY}`
        );

        const weatherData = {
            cityId: response.data.id,
            city: response.data.name,
            temperature: response.data.main.temp,
            feelsLike: response.data.main.feels_like,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            coordinates: response.data.coord,
            humidity: response.data.main.humidity,
            pressure: response.data.main.pressure,
            windSpeed: response.data.wind.speed,
            countryCode: response.data.sys.country,
            rainVolume: response.data.rain ? response.data.rain['1h'] : 0, // Rain volume for the last 3 hours
          };

        const visualCrossingResponse = await axios.get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${VISUAL_CROSSING_API_KEY}`
        );

        const forecastData = visualCrossingResponse.data;

        res.render('index.ejs', { weatherData, forecastData, error: null });
    } catch (error) {
        console.error(error);
        res.render('index.ejs', { weatherData: null, forecastData: null, error: 'Error fetching weather data' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');

const OPENWEATHERMAP_API_KEY = '709d0ff50ae9221f8ae9916496ba77cc';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../views')));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); // Set the view engine to EJS

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
        res.render('index.ejs', { weatherData, error: null });
    } catch (error) {
        console.error(error);
        res.render('index.ejs', { weatherData: null, error: 'Error fetching weather data' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

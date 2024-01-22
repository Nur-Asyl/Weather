# Weather App
Node.js app to check the weather today and forecast for 14 days in your city (temperature, humidity, wind speed, feels like and etc.)

## Dependencies
npm install axios express body-parser ejs path

## Settings

const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
const path = require('path');

port -> 3000

## API's
### OpenWeather: https://openweathermap.org/price <br/>
Uses for fetch weather data 
### Visual Crossing Weather https://www.visualcrossing.com/weather-data-editions <br/>
Uses for forecast for 14 days
### GoogleMap
Uses for show your city in the map



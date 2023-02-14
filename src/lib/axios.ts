import axios from 'axios';

export const geoApi = axios.create({
  baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_GEO_API_KEY,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
});

export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

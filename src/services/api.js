import axios from 'axios';

const api = axios.create({
    baseURL: 'https://job-scrapping-api-production.up.railway.app',
});

export default api;
import axios from 'axios';

// Axios instance with a base URL
const api = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        "Content-Type": "application/json",
    }
});

// Intercept every request to add the token dynamically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
        config.headers['x-access-token'] = token; // Add token to request headers
    }
    return config;
}, (error) => {
    return Promise.reject(error); // Forward any request errors
});

export default api;

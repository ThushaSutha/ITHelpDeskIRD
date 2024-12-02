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
    const token = localStorage.getItem('token');
    const id = localStorage.getItem("Auth");
    const iv = localStorage.getItem("AuthIv");

    if (token) {
        config.headers['x-access-token'] = token;
        config.headers['X-Auth-Id'] = id;
        config.headers['X-Auth-Iv'] = iv;
    }
    return config;
}, (error) => {
    return Promise.reject(error); // Forward any request errors
});

export default api;

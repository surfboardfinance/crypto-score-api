// src/apiClient.js

const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

// Create an Axios instance with default configuration
const apiClient = axios.create({
  baseURL: process.env.BASE_API_URL, // Base URL for the API (set in .env file)
  headers: {
    'Content-Type': 'application/json', // Default content type for requests
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add custom logic here (e.g., adding authentication tokens)
    // Example: if (localStorage.getItem('token')) {
    //   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data; // Return only the data part of the response
  },
  (error) => {
    // Handle errors globally
    console.error('API call error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

module.exports = apiClient;

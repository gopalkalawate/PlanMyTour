import axios from 'axios';

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: "http://localhost:5000", // Use environment variable for base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    // Other headers can be added here if needed
  },
});

export default api;

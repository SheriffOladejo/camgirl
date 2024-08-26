// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:6000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;

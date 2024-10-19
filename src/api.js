// src/api.js
import axios from './utils/axiosConfig';  // Changed from '../utils/axiosConfig' to './utils/axiosConfig'

const API_URL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Authorization header set:', config.headers['Authorization']);
    } else {
      console.log('No token found in localStorage');
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const addClient = async (clientData) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/clients`, clientData);
    return response.data;
  } catch (error) {
    console.error('Error in addClient:', error);
    throw error;
  }
};

export default axiosInstance;
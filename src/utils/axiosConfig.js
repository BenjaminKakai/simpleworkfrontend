// src/utils/axiosConfig.js
import axios from 'axios';

function isTokenExpired(token) {
  try {
    if (!token) {
      return true;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const timeUntilExpiry = expirationTime - currentTime;
    
    // Consider token expired if less than 5 minutes remaining (300000ms)
    return timeUntilExpiry < 300000;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
}

// Request interceptor
axios.interceptors.request.use(
  config => {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        if (!isTokenExpired(token)) {
          config.headers['Authorization'] = `Bearer ${token}`;
          console.log('Token valid, request proceeding with authorization');
        } else {
          console.warn('Token expired, clearing local storage');
          localStorage.removeItem('token');
          // You might want to trigger a refresh token flow here
          // or redirect to login page
          window.location.href = '/login'; // Uncomment if you want automatic redirect
        }
      } else {
        console.log('No token found in localStorage');
      }
      
      // Add common headers
      config.headers['Content-Type'] = 'application/json';
      config.headers['Accept'] = 'application/json';
      
      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      return Promise.reject(error);
    }
  },
  error => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  response => {
    console.log('Response received:', response.status);
    return response;
  },
  error => {
    if (error.response) {
      const status = error.response.status;
      
      // Handle 401 Unauthorized
      if (status === 401) {
        console.warn('Unauthorized access, clearing credentials');
        localStorage.removeItem('token');
        // Redirect to login page
        window.location.href = '/login'; // Uncomment if you want automatic redirect
      }
      
      // Handle 403 Forbidden
      if (status === 403) {
        console.warn('Forbidden access');
        // Handle forbidden access (e.g., show error message)
      }
      
      // Handle 500 Server Error
      if (status >= 500) {
        console.error('Server error:', error.response.data);
        // Handle server error (e.g., show error message)
      }
    }
    
    return Promise.reject(error);
  }
);

// Set base URL if needed
// axios.defaults.baseURL = 'http://localhost:3000';

export default axios;
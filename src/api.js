// src/api.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://simple-work-database-24wn6b3nw-benjaminkakais-projects.vercel.app',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

// Add response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(`${axiosInstance.defaults.baseURL}/refresh-token`, { 
          refreshToken: localStorage.getItem('refreshToken') 
        });
        localStorage.setItem('token', data.token);
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${data.token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh error (e.g., logout user, redirect to login)
        console.error('Error refreshing token:', refreshError);
        // You might want to call a logout function or redirect to the login page here
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios from 'axios';

// Create Axios instance with base URL
const axiosInstance = axios.create({
  baseURL: 'https://simple-work-database.vercel.app'
});

// Interceptor to attach token to every request
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(`${axiosInstance.defaults.baseURL}/refresh-token`, { 
          refreshToken: localStorage.getItem('refreshToken') 
        });
        localStorage.setItem('token', data.token);
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${data.token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // Handle token refresh error (e.g., logout user, redirect to login)
        // e.g., window.location.href = '/login'; or a logout function call
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

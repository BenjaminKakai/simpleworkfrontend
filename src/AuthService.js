// src/AuthService.js
import axiosInstance from './api'; // Updated import

const AuthService = {
  refreshToken: async () => {
    const currentToken = localStorage.getItem('token');
    try {
      const response = await axiosInstance.post('/refresh-token', {}, {
        headers: { 'Authorization': `Bearer ${currentToken}` }
      });
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      return newToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Handle failed refresh (e.g., logout user)
    }
  },

  setupInterceptors: (axiosInstance) => {
    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const newToken = await AuthService.refreshToken();
            axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
            // Handle refresh error (e.g., logout user)
          }
        }
        return Promise.reject(error);
      }
    );
  }
};

export default AuthService;

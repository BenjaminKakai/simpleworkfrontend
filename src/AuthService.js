import axios from 'axios';

const AuthService = {
  refreshToken: async () => {
    const currentToken = localStorage.getItem('token');
    try {
      const response = await axios.post('https://simple-work-database-24wn6b3nw-benjaminkakais-projects.vercel.app/refresh-token', {}, {
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
          const newToken = await AuthService.refreshToken();
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
          return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
      }
    );
  }
};

export default AuthService;

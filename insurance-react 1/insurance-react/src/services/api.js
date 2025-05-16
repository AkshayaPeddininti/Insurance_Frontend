import axios from 'axios';


export const api = axios.create({
  baseURL: 'http://localhost:8081/',
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('jwtToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);
export default api;
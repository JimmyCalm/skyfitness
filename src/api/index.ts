import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://wedev-api.sky.pro/api/fitness',
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
        error.response?.status === 401 &&
        error.config?.url?.includes('/users/me/progress')
    ) {
        return Promise.resolve({ data: null });
    }
    
    return Promise.reject(error);
  }
);

export default api;
import axios from 'axios';
import { authToken } from './authToken';
import { BASE_URL } from '@/lib/constants';

const api = (authenticate: any) => {
  const config = axios.create({ baseURL: BASE_URL });
  config.defaults.headers.post['Content-Type'] = 'application/json';
  if (authenticate) {
    config.interceptors.request.use(
      async (c) => {
        const token = await authToken('access');
        if (token) {
          c.headers.Authorization = 'Bearer ' + token;
        }
        return c;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  return config;
};

export default api;

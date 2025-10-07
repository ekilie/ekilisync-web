import axios from 'axios';
import { authToken } from './authToken';
import { BASE_URL } from '@/lib/constants';
import { isJwtExpired } from '@/lib/utils';

const api = (authenticate: boolean) => {
  const config = axios.create({ baseURL: BASE_URL });
  config.defaults.headers.post['Content-Type'] = 'application/json';
  if (authenticate) {
    config.interceptors.request.use(
      async (c) => {
        const token = await authToken('access');
        if (token) {
          checkTokenValidity(token);
          c.headers.Authorization = 'Bearer ' + token;
          //
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

function checkTokenValidity(token: string){
  if(isJwtExpired(token)) return window.location.href = "sign-in"
  return
}

export default api;

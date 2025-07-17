// import { logger } from '../logger';
import { setAuthToken } from './authToken';
import api from './config';


export interface SignupDto {
  officeName: string;
  adminEmail: string;
  adminPassword: string;
  phoneNumber: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

class Api {
  static async signup(payload: SignupDto) {
    try {
      const res = await api(false).post('/auth/signup', payload);
      setAuthToken({ access: res.data.token });
      return res.data;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'Signup failed');
    }
  }

  static async login(credentials: LoginDto) {
    // logger.info('login', 'Attempting login', { email: credentials.email });
    try {
      const res = await api(false).post('/auth/login', credentials);
      // logger.success('login', 'Login successful', { 
      //   userId: res.data.user?.id,
      //   role: res.data.user?.role 
      // });
      setAuthToken({ access: res.data.token });
      return res.data;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      // logger.error('login', 'Login failed', error);
      throw new Error(err.response?.data?.message || 'Authentication failed');
    }
  }

  static async logout() {
    // logger.info('logout', 'Attempting logout');
    try {
      const res = await api(true).post('/auth/logout');
      // logger.success('logout', 'Logout successful');
      setAuthToken({ access: '' });
      return res.data;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      // logger.error('logout', 'Logout failed', error);
      throw new Error(err.response?.data?.message || 'Logout failed');
    }
  }

}

export default Api;

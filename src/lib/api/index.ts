import { saveUser, setAuthToken } from './authToken';
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
      const res = await api(false).post('/auth/register', payload);
      window.location.href = '/sign-in'
      return res.data;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'Signup failed');
    }
  }

  static async login(credentials: LoginDto) {
    try {
      const res = await api(false).post('/auth/login', credentials);
      setAuthToken({ access: res.data.data.access_token });
      setAuthToken({ refresh: res.data.data.refresh_token });
      saveUser(res.data.data.user)
      window.location.href = '/dashboard'
      return res.data;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'Authentication failed');
    }
  }

  static async logout() {
    try {
      const res = await api(true).post('/auth/logout');
      setAuthToken({ access: '' });
      return res.data;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'Logout failed');
    }
  }

  static async getCount(officeId: string) {
    try {
      const res = await api(true).get('/offices/count/'+officeId);
      console.log('getCount', res.data.data);
      return res.data.data;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'failed');
    }
  }

  static async getEmployees(officeId: string) {
    try {
      const res = await api(true).get('/employees/office/'+officeId);
      console.log('getEmployees', res.data.data);
      return res.data.data;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'failed');
    }
  }

  static async getUsers(){
    
  }
  

}

export default Api;

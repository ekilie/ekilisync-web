// import { logger } from '../logger';
import { setAuthToken } from './authToken';
import api from './config';

export interface AssignClassTeacherDto {
  className: string;
  teacherEmail: string;
  schoolUid: string;
}

export interface CreateSubjectDto {
  name: string;
  code: string;
  description?: string;
  schoolUid: string;
}

class Api {
  static async login(credentials: object) {
    // logger.info('login', 'Attempting login', { email: (credentials as any).email });
    try {
      const res = await api(false).post('/auth/login', credentials);
      // logger.success('login', 'Login successful', { 
      //   userId: res.data.user?.id,
      //   role: res.data.user?.role 
      // });
      setAuthToken({ access: res.data.token });
      return res.data;
    } catch (error: any) {
      // logger.error('login', 'Login failed', error);
      throw new Error(error.response?.data?.message || 'Authentication failed');
    }
  }

  static async logout() {
    // logger.info('logout', 'Attempting logout');
    try {
      const res = await api(true).post('/auth/logout');
      // logger.success('logout', 'Logout successful');
      setAuthToken({ access: '' });
      return res.data;
    } catch (error: any) {
      // logger.error('logout', 'Logout failed', error);
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  }

}

export default Api;

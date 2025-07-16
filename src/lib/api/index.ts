// import { logger } from '../logger';
import { setAuthToken } from './authToken';
import api from './config';

export interface CreateTeacherDto {
  name: string;
  email: string;
  mobile: string;
  schoolUid: string;
}

export interface CreateClassDto {
  className: string;
  schoolUid: string;
}

export interface AssignClassTeacherDto {
  className: string;
  teacherEmail: string;
  schoolUid: string;
}

export interface Subject {
  id: number;
  name: string;
  code: string;
  description?: string;
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

  static async getCount(schoolUid: string) {
    // logger.info('getCount', 'Fetching counts', { schoolUid });
    try {
      const res = await api(true).get(`/schools/${schoolUid}/count-all`);
      // logger.success('getCount', 'Counts fetched successfully', res.data);
      return res.data;
    } catch (error: any) {
      // logger.error('getCount', 'Failed to fetch counts', error);
      throw error;
    }
  }
  // === Schools ===
  static async createSchool(data: object) {
    // logger.info('createSchool', 'Creating new school', data);
    try {
      const res = await api(true).post('/schools', data);
      // logger.success('createSchool', 'School created successfully', { 
      //   schoolId: res.data.id,
      //   schoolName: res.data.name 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('createSchool', 'Failed to create school', error);
      throw error;
    }
  }

  static async updateSchool(id: number, data: object) {
    // logger.info('updateSchool', 'Updating school', { schoolId: id, updateData: data });
    try {
      const res = await api(true).put(`/schools/${id}`, data);
      // logger.success('updateSchool', 'School updated successfully', { 
      //   schoolId: id,
      //   updatedFields: Object.keys(data) 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('updateSchool', 'Failed to update school', error);
      throw error;
    }
  }

  static async getSchoolById(id: number) {
    // logger.info('getSchoolById', 'Fetching school by ID', { schoolId: id });
    try {
      const res = await api(true).get(`/schools/${id}`);
      // logger.success('getSchoolById', 'School fetched successfully', { 
      //   schoolId: id,
      //   schoolName: res.data.name 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('getSchoolById', 'Failed to fetch school', error);
      throw error;
    }
  }

  static async getSchoolByUniqueId(uniqueId: string) {
    // logger.info('getSchoolByUniqueId', 'Fetching school by unique ID', { uniqueId });
    try {
      const res = await api(true).get(`/schools/unique/${uniqueId}`);
      // logger.success('getSchoolByUniqueId', 'School fetched successfully', { 
      //   uniqueId,
      //   schoolName: res.data.name 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('getSchoolByUniqueId', 'Failed to fetch school', error);
      throw error;
    }
  }

  static async getSchools(params: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    // logger.info('getSchools', 'Fetching schools list', { params });
    try {
      const res = await api(true).get('/schools', { params });
      // logger.success('getSchools', 'Schools list fetched successfully', { 
      //   total: res.data.total,
      //   page: params.page,
      //   limit: params.limit 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('getSchools', 'Failed to fetch schools list', error);
      throw error;
    }
  }

  static async deleteSchool(id: number) {
    // logger.info('deleteSchool', 'Deleting school', { schoolId: id });
    try {
      const res = await api(true).delete(`/schools/${id}`);
      // logger.success('deleteSchool', 'School deleted successfully', { schoolId: id });
      return res.data;
    } catch (error: any) {
      // logger.error('deleteSchool', 'Failed to delete school', error);
      throw error;
    }
  }

  // === Teachers ===
  static async getTeacherById(id: number) {
    // logger.info('getTeacherById', 'Fetching teacher by ID', { teacherId: id });
    try {
      const res = await api(true).get(`/teachers/${id}`);
      // logger.success('getTeacherById', 'Teacher fetched successfully', { 
      //   teacherId: id,
      //   teacherName: res.data.name 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('getTeacherById', 'Failed to fetch teacher', error);
      throw error;
    }
  }

  static async getTeacherByEmail(email: string) {
    // logger.info('getTeacherByEmail', 'Fetching teacher by email', { email });
    try {
      const res = await api(true).get(`/teachers/email/${email}`);
      // logger.success('getTeacherByEmail', 'Teacher fetched successfully', { 
      //   email,
      //   teacherName: res.data.data?.name 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('getTeacherByEmail', 'Failed to fetch teacher', error);
      throw error;
    }
  }

  static async getTeachers(schoolUid: string) {
    // logger.info('getTeachers', 'Fetching teachers list', { schoolUid });
    try {
      const res = await api(true).get(`/schools/${schoolUid}/teachers`);
      // logger.success('getTeachers', 'Teachers list fetched successfully', { 
      //   schoolUid,
      //   count: res.data.data?.length 
      // });
      return res.data.data;
    } catch (error: any) {
      // logger.error('getTeachers', 'Failed to fetch teachers list', error);
      throw error;
    }
  }

  static async createTeacher(data: CreateTeacherDto) {
    // logger.info('createTeacher', 'Creating new teacher', { 
    //   name: data.name,
    //   email: data.email,
    //   schoolUid: data.schoolUid 
    // });
    try {
      const res = await api(true).post('/teachers', data);
      // logger.success('createTeacher', 'Teacher created successfully', { 
      //   teacherId: res.data.data?.id,
      //   teacherName: res.data.data?.name 
      // });
      return res.data.data;
    } catch (error: any) {
      // logger.error('createTeacher', 'Failed to create teacher', error);
      throw error;
    }
  }

  // === Students ===
  static async getStudentById(id: number) {
    // logger.info('getStudentById', 'Fetching student by ID', { studentId: id });
    try {
      const res = await api(true).get(`/students/${id}`);
      // logger.success('getStudentById', 'Student fetched successfully', { 
      //   studentId: id,
      //   studentName: res.data.name 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('getStudentById', 'Failed to fetch student', error);
      throw error;
    }
  }

  static async getStudentByEmail(email: string) {
    // logger.info('getStudentByEmail', 'Fetching student by email', { email });
    try {
      const res = await api(true).get(`/students/email/${email}`);
      // logger.success('getStudentByEmail', 'Student fetched successfully', { 
      //   email,
      //   studentName: res.data.name 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('getStudentByEmail', 'Failed to fetch student', error);
      throw error;
    }
  }

  static async getStudents(schoolUid: string) {
    // logger.info('getStudents', 'Fetching students list', { schoolUid });
    try {
      const res = await api(true).get(`/schools/${schoolUid}/students`);
      // logger.success('getStudents', 'Students list fetched successfully', { 
      //   schoolUid,
      //   count: res.data.length 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('getStudents', 'Failed to fetch students list', error);
      throw error;
    }
  }

  // === Classes ===
  static async getClassById(id: number) {
    // logger.info('getClassById', 'Fetching class by ID', { classId: id });
    try {
      const res = await api(true).get(`/classes/${id}`);
      // logger.success('getClassById', 'Class fetched successfully', { 
      //   classId: id,
      //   className: res.data.name 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('getClassById', 'Failed to fetch class', error);
      throw error;
    }
  }

  static async getClassByName(name: string) {
    // logger.info('getClassByName', 'Fetching class by name', { className: name });
    try {
      const res = await api(true).get(`/classes/name/${name}`);
      // logger.success('getClassByName', 'Class fetched successfully', { 
      //   className: name,
      //   classId: res.data.id 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('getClassByName', 'Failed to fetch class', error);
      throw error;
    }
  }

  static async getClasses(schoolUid: string) {
    // logger.info('getClasses', 'Fetching classes list', { schoolUid });
    try {
      const res = await api(true).get(`/schools/${schoolUid}/classes`);
      // logger.success('getClasses', 'Classes list fetched successfully', { 
      //   schoolUid,
      //   count: res.data.length 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('getClasses', 'Failed to fetch classes list', error);
      throw error;
    }
  }

  static async createClass(data: CreateClassDto) {
    // logger.info('createClass', 'Creating new class', { 
    //   className: data.className,
    //   schoolUid: data.schoolUid 
    // });
    try {
      const res = await api(true).post('/classes', data);
      // logger.success('createClass', 'Class created successfully', { 
      //   classId: res.data.id,
      //   className: res.data.name 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('createClass', 'Failed to create class', error);
      throw error;
    }
  }

  static async updateClass(id: number, data: object) {
    // logger.info('updateClass', 'Updating class', { 
    //   classId: id,
    //   updateData: data 
    // });
    try {
      const res = await api(true).put(`/classes/${id}`, data);
      // logger.success('updateClass', 'Class updated successfully', { 
      //   classId: id,
      //   updatedFields: Object.keys(data) 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('updateClass', 'Failed to update class', error);
      throw error;
    }
  }

  static async deleteClass(id: number) {
    // logger.info('deleteClass', 'Deleting class', { classId: id });
    try {
      const res = await api(true).delete(`/classes/${id}`);
      // logger.success('deleteClass', 'Class deleted successfully', { classId: id });
      return res.data;
    } catch (error: any) {
      // logger.error('deleteClass', 'Failed to delete class', error);
      throw error;
    }
  }

  // === Class Teachers ===
  static async isClassTeacher(schoolUid: string, teacherId: number) {
    // logger.info('isClassTeacher', 'Checking class teacher status', { 
    //   schoolUid,
    //   teacherId 
    // });
    try {
      const res = await api(true).get(
        `/schools/${schoolUid}/class-teacher/${teacherId}`
      );
      // logger.success('isClassTeacher', 'Class teacher status checked', { 
      //   schoolUid,
      //   teacherId,
      //   isClassTeacher: res.data 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('isClassTeacher', 'Failed to check class teacher status', error);
      throw error;
    }
  }

  static async assignClassTeacher(data: AssignClassTeacherDto) {
    // logger.info('assignClassTeacher', 'Assigning class teacher', { 
    //   className: data.className,
    //   teacherEmail: data.teacherEmail,
    //   schoolUid: data.schoolUid 
    // });
    try {
      const res = await api(true).post('/class-teachers/assign', data);
      // logger.success('assignClassTeacher', 'Class teacher assigned successfully', { 
      //   className: data.className,
      //   teacherEmail: data.teacherEmail 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('assignClassTeacher', 'Failed to assign class teacher', error);
      throw error;
    }
  }

  // === Subjects ===
  static async getSubjects(schoolUid: string) {
    // logger.info('getSubjects', 'Fetching subjects list', { schoolUid });
    try {
      const res = await api(true).get(`/schools/${schoolUid}/subjects`);
      // logger.success('getSubjects', 'Subjects list fetched successfully', { 
      //   schoolUid,
      //   count: res.data.length 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('getSubjects', 'Failed to fetch subjects list', error);
      throw error;
    }
  }

  static async createSubject(data: CreateSubjectDto) {
    // logger.info('createSubject', 'Creating new subject', data);
    try {
      const res = await api(true).post('/subjects', data);
      // logger.success('createSubject', 'Subject created successfully', { 
      //   subjectId: res.data.id,
      //   subjectName: res.data.name 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('createSubject', 'Failed to create subject', error);
      throw error;
    }
  }

  static async updateSubject(id: number, data: Partial<CreateSubjectDto>) {
    // logger.info('updateSubject', 'Updating subject', { subjectId: id, updateData: data });
    try {
      const res = await api(true).put(`/subjects/${id}`, data);
      // logger.success('updateSubject', 'Subject updated successfully', { 
      //   subjectId: id,
      //   updatedFields: Object.keys(data) 
      // });
      return res.data;
    } catch (error: any) {
      // logger.error('updateSubject', 'Failed to update subject', error);
      throw error;
    }
  }

  static async deleteSubject(id: number) {
    // logger.info('deleteSubject', 'Deleting subject', { subjectId: id });
    try {
      const res = await api(true).delete(`/subjects/${id}`);
      // logger.success('deleteSubject', 'Subject deleted successfully', { subjectId: id });
      return res.data;
    } catch (error: any) {
      // logger.error('deleteSubject', 'Failed to delete subject', error);
      throw error;
    }
  }
}

export default Api;

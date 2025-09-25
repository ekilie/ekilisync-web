// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Auth Types
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

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: CurrentUser;
}

export interface VerifyEmailDto {
  email: string;
  otp: string;
}

export interface RefreshTokenDto {
  refresh_token: string;
}

// User Types
export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  office: Office;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  officeId: string;
  office?: Office;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  role: UserRole;
  officeId: string;
  password?: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: UserRole;
  officeId?: string;
}

// Employee Types
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  officeId: string;
  office?: Office;
  status: EmployeeStatus;
  createdAt: string;
  updatedAt: string;
}

export interface InviteEmployeeDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  officeId: string;
}

export interface VerifyEmployeeOtpDto {
  email: string;
  otp: string;
  password: string;
}

export interface UpdateEmployeeDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  position?: string;
  department?: string;
  status?: EmployeeStatus;
}

// Office Types
export interface Office {
  id: string;
  name: string;
  latitude: number | null;
  longitude: number | null;
  address: string;
  phoneNumber: string;
  email: string;
  logoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOfficeDto {
  name: string;
  latitude?: number;
  longitude?: number;
  address: string;
  phoneNumber: string;
  email: string;
  logoUrl?: string;
}

export interface UpdateOfficeDto {
  name?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  phoneNumber?: string;
  email?: string;
  logoUrl?: string;
}

export interface OfficeCountResponse {
  employees: number;
  checkedIn: number;
  lateCheckedIn: number;
}

// Attendance Types
export interface Attendance {
  id: string;
  employeeId: string;
  employee?: Employee;
  officeId: string;
  office?: Office;
  checkInTime: string;
  checkOutTime?: string;
  checkInLocation?: Location;
  checkOutLocation?: Location;
  status: AttendanceStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAttendanceDto {
  employeeId: string;
  officeId: string;
  checkInTime: string;
  checkInLocation?: Location;
  notes?: string;
}

export interface UpdateAttendanceDto {
  checkOutTime?: string;
  checkOutLocation?: Location;
  status?: AttendanceStatus;
  notes?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface AttendanceReport {
  date: string;
  totalEmployees: number;
  presentEmployees: number;
  absentEmployees: number;
  lateEmployees: number;
  attendanceRate: number;
  attendances: Attendance[];
}

// Role Types
export interface Role {
  id: string;
  name: UserRole;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateRoleDto {
  permissions: string[];
}

// Notification Types
export interface SendSmsDto {
  phoneNumber: string;
  message: string;
}

export interface SendEmailDto {
  email: string;
  subject: string;
  message: string;
  template?: string;
}

export interface NotificationResponse {
  success: boolean;
  messageId: string;
  provider: string;
}

// Enum Types
export type UserRole = 'superadmin' | 'admin' | 'manager' | 'cashier' | 'employee';

export type EmployeeStatus = 'active' | 'inactive' | 'pending' | 'suspended';

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'early_departure' | 'on_break';

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Query Parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AttendanceFilters extends PaginationParams {
  startDate?: string;
  endDate?: string;
  employeeId?: string;
  status?: AttendanceStatus;
}

export interface EmployeeFilters extends PaginationParams {
  department?: string;
  position?: string;
  status?: EmployeeStatus;
}

export interface UserFilters extends PaginationParams {
  role?: UserRole;
  officeId?: string;
}
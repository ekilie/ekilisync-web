import { saveUser, setAuthToken } from './authToken'
import api from './config'
import type {
  SignupDto,
  RegisterDto,
  LoginDto,
  AuthResponse,
  VerifyEmailDto,
  RefreshTokenDto,
  User,
  CreateUserDto,
  UpdateUserDto,
  SetPasswordDto,
  UserFilters,
  Employee,
  CreateEmployeeDto,
  InviteEmployeeDto,
  VerifyEmployeeOtpDto,
  VerifyOtpDto,
  UpdateEmployeeDto,
  EmployeeFilters,
  Office,
  CreateOfficeDto,
  UpdateOfficeDto,
  OfficeCountResponse,
  Attendance,
  CreateAttendanceDto,
  UpdateAttendanceDto,
  AttendanceFilters,
  AttendanceReport,
  Role,
  UpdateRoleDto,
  SendSmsDto,
  SendEmailDto,
  NotificationResponse,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  UpdateOfficeLocationDto,
  SubscriptionPlan,
  UpdateSubscriptionDto,
} from './types'

export * from './types'

class Api {
  // ==========================================
  // Authentication Endpoints
  // ==========================================

  static async signup(payload: SignupDto): Promise<ApiResponse> {
    try {
      const res = await api(false).post('/auth/register', payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Signup failed')
    }
  }

  static async register(payload: RegisterDto): Promise<ApiResponse> {
    try {
      const res = await api(false).post('/auth/register', payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Registration failed')
    }
  }

  static async login(
    credentials: LoginDto
  ): Promise<ApiResponse<AuthResponse>> {
    try {
      const res = await api(false).post('/auth/login', credentials)
      setAuthToken({ access: res.data.data.access_token })
      setAuthToken({ refresh: res.data.data.refresh_token })
      saveUser(res.data.data.user)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Authentication failed')
    }
  }

  static async resendInvitation(id: string): Promise<ApiResponse> {
    try {
      const res = await api(true).post(`/employees/re-invite/${id}`)
      console.log('Resend invitation response:', res.data)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to resend invitation'
      )
    }
  }

  static async verifyEmail(payload: VerifyEmailDto): Promise<ApiResponse> {
    try {
      const res = await api(false).post('/auth/verify-email', payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Email verification failed'
      )
    }
  }

  static async refreshToken(
    payload: RefreshTokenDto
  ): Promise<ApiResponse<AuthResponse>> {
    try {
      const res = await api(false).post('/auth/refresh-token', payload)
      setAuthToken({ access: res.data.data.access_token })
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Token refresh failed')
    }
  }

  static async logout(): Promise<ApiResponse> {
    try {
      // Backend doesn't have logout endpoint, just clear tokens locally
      setAuthToken({ access: '' })
      setAuthToken({ refresh: '' })
      window.location.href = '/sign-in'
      return { success: true, message: 'Logged out successfully', data: null }
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Logout failed')
    }
  }

  // ==========================================
  // Office Management Endpoints
  // ==========================================

  static async createOffice(
    payload: CreateOfficeDto
  ): Promise<ApiResponse<Office>> {
    try {
      const res = await api(true).post('/offices', payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to create office')
    }
  }

  static async getOffices(
    params?: PaginationParams
  ): Promise<ApiResponse<PaginatedResponse<Office>>> {
    try {
      const res = await api(true).get('/offices', { params })
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to fetch offices')
    }
  }

  static async getOffice(id: string): Promise<ApiResponse<Office>> {
    try {
      const res = await api(true).get(`/offices/${id}`)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to fetch office')
    }
  }

  static async getCurrentPlan(officeId: string): Promise<ApiResponse<any>> {
    try {
      const res = await api(true).get(`/subscriptions/current-plan/${officeId}`)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to fetch office')
    }
  }

  static async getAllPlans(): Promise<ApiResponse<SubscriptionPlan[]>> {
    try {
      const res = await api(true).get(`/subscriptions/plans`)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to fetch subscription plans'
      )
    }
  }

  static async updateSubscription(
    officeId: string,
    payload: UpdateSubscriptionDto
  ): Promise<ApiResponse<any>> {
    try {
      const res = await api(true).patch(
        `/subscriptions/update-plan/${officeId}`,
        payload
      )
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to update subscription'
      )
    }
  }

  static async updateOffice(
    id: string,
    payload: UpdateOfficeDto
  ): Promise<ApiResponse<Office>> {
    try {
      const res = await api(true).patch(`/offices/${id}`, payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to update office')
    }
  }

  static async updateOfficeLocation(
    id: string,
    payload: UpdateOfficeLocationDto
  ): Promise<ApiResponse<Office>> {
    try {
      const res = await api(true).patch(
        `/offices/update-location/${id}`,
        payload
      )
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to update office location'
      )
    }
  }

  static async deleteOffice(id: string): Promise<ApiResponse> {
    try {
      const res = await api(true).delete(`/offices/${id}`)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to delete office')
    }
  }

  static async getOfficeCount(officeId: string): Promise<OfficeCountResponse> {
    try {
      const res = await api(true).get(`/offices/count/${officeId}`)
      return res.data.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to get office count'
      )
    }
  }

  // Legacy method for backward compatibility
  static async getCount(officeId: string): Promise<OfficeCountResponse> {
    return this.getOfficeCount(officeId)
  }

  // ==========================================
  // User Management Endpoints
  // ==========================================

  static async createUser(payload: CreateUserDto): Promise<ApiResponse<User>> {
    try {
      const res = await api(true).post('/users', payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to create user')
    }
  }

  static async getUsers(
    params?: UserFilters
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    try {
      const res = await api(true).get('/users', { params })
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to fetch users')
    }
  }

  static async getUser(id: string): Promise<ApiResponse<User>> {
    try {
      const res = await api(true).get(`/users/${id}`)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to fetch user')
    }
  }

  static async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const res = await api(true).get(`/users/me`)
      return res.data
    } catch (error) {
      console.log('Error fetching current user:', error)
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to fetch user')
    }
  }

  static async updateUser(
    id: string,
    payload: UpdateUserDto
  ): Promise<ApiResponse<User>> {
    try {
      const res = await api(true).patch(`/users/${id}`, payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to update user')
    }
  }

  static async deleteUser(id: string): Promise<ApiResponse> {
    try {
      const res = await api(true).delete(`/users/${id}`)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to delete user')
    }
  }

  static async getUsersByOffice(
    officeId: string,
    params?: PaginationParams
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    try {
      const res = await api(true).get(`/users/office/${officeId}`, { params })
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to fetch office users'
      )
    }
  }

  static async setUserPassword(
    id: string,
    payload: SetPasswordDto
  ): Promise<ApiResponse> {
    try {
      const res = await api(true).post(`/users/${id}/set-password`, payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to set password')
    }
  }

  static async createUserForOffice(
    officeId: string,
    payload: CreateUserDto
  ): Promise<ApiResponse<User>> {
    try {
      const res = await api(true).post(`/users/office/${officeId}`, payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to create user for office'
      )
    }
  }

  static async getUserByOffice(
    officeId: string,
    id: string
  ): Promise<ApiResponse<User>> {
    try {
      const res = await api(true).get(`/users/office/${officeId}/${id}`)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to fetch user')
    }
  }

  static async updateUserForOffice(
    officeId: string,
    id: string,
    payload: UpdateUserDto
  ): Promise<ApiResponse<User>> {
    try {
      const res = await api(true).patch(
        `/users/office/${officeId}/${id}`,
        payload
      )
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to update user')
    }
  }

  static async deleteUserForOffice(
    officeId: string,
    id: string
  ): Promise<ApiResponse> {
    try {
      const res = await api(true).delete(`/users/office/${officeId}/${id}`)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to delete user')
    }
  }

  // ==========================================
  // Employee Management Endpoints
  // ==========================================

  static async inviteEmployee(
    payload: InviteEmployeeDto
  ): Promise<ApiResponse> {
    try {
      const res = await api(true).post('/employees/invite', payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to invite employee'
      )
    }
  }

  static async verifyEmployeeOtp(
    payload: VerifyEmployeeOtpDto
  ): Promise<ApiResponse> {
    try {
      const res = await api(false).post('/employees/verify-otp', payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'OTP verification failed')
    }
  }

  static async verifyOtp(payload: VerifyOtpDto): Promise<ApiResponse> {
    try {
      const res = await api(false).post('/employees/verify-otp', payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'OTP verification failed')
    }
  }

  static async createEmployee(
    payload: CreateEmployeeDto
  ): Promise<ApiResponse<Employee>> {
    try {
      const res = await api(true).post('/employees', payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to create employee'
      )
    }
  }

  static async createEmployeeForOffice(
    officeId: string,
    payload: CreateEmployeeDto
  ): Promise<ApiResponse<Employee>> {
    try {
      const res = await api(true).post(`/employees/office/${officeId}`, payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to create employee for office'
      )
    }
  }

  static async getEmployeeByOffice(
    officeId: string,
    id: string
  ): Promise<ApiResponse<Employee>> {
    try {
      const res = await api(true).get(`/employees/office/${officeId}/${id}`)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to fetch employee')
    }
  }

  static async updateEmployeeForOffice(
    officeId: string,
    id: string,
    payload: UpdateEmployeeDto
  ): Promise<ApiResponse<Employee>> {
    try {
      const res = await api(true).patch(
        `/employees/office/${officeId}/${id}`,
        payload
      )
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to update employee'
      )
    }
  }

  static async deleteEmployeeForOffice(
    officeId: string,
    id: string
  ): Promise<ApiResponse> {
    try {
      const res = await api(true).delete(`/employees/office/${officeId}/${id}`)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to delete employee'
      )
    }
  }

  static async getEmployees(
    params?: EmployeeFilters
  ): Promise<ApiResponse<PaginatedResponse<Employee>>>
  static async getEmployees(officeId: string): Promise<Employee[]>
  static async getEmployees(
    paramsOrOfficeId?: EmployeeFilters | string
  ): Promise<ApiResponse<PaginatedResponse<Employee>> | Employee[]> {
    if (typeof paramsOrOfficeId === 'string') {
      // Legacy method for backward compatibility
      return this.getEmployeesByOffice(paramsOrOfficeId)
    } else {
      // New method with filters
      try {
        const res = await api(true).get('/employees', {
          params: paramsOrOfficeId,
        })
        return res.data
      } catch (error) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(
          err.response?.data?.message || 'Failed to fetch employees'
        )
      }
    }
  }

  static async getEmployee(id: string): Promise<ApiResponse<Employee>> {
    try {
      const res = await api(true).get(`/employees/${id}`)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to fetch employee')
    }
  }

  static async updateEmployee(
    id: string,
    payload: UpdateEmployeeDto
  ): Promise<ApiResponse<Employee>> {
    try {
      const res = await api(true).put(`/employees/${id}`, payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to update employee'
      )
    }
  }

  static async deleteEmployee(id: string): Promise<ApiResponse> {
    try {
      const res = await api(true).delete(`/employees/${id}`)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to delete employee'
      )
    }
  }

  static async getEmployeesByOffice(
    officeId: string,
    params?: PaginationParams
  ): Promise<Employee[]> {
    try {
      const res = await api(true).get(`/employees/office/${officeId}`, {
        params,
      })
      return res.data.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to fetch office employees'
      )
    }
  }

  // ==========================================
  // Attendance Management Endpoints
  // ==========================================

  static async createAttendance(
    payload: CreateAttendanceDto
  ): Promise<ApiResponse<Attendance>> {
    try {
      const res = await api(true).post('/attendances', payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to create attendance'
      )
    }
  }

  static async getAttendances(
    params?: AttendanceFilters
  ): Promise<ApiResponse<PaginatedResponse<Attendance>>> {
    try {
      const res = await api(true).get('/attendances', { params })
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to fetch attendances'
      )
    }
  }

  static async getAttendance(id: string): Promise<ApiResponse<Attendance>> {
    try {
      const res = await api(true).get(`/attendances/${id}`)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to fetch attendance'
      )
    }
  }

  static async updateAttendance(
    id: string,
    payload: UpdateAttendanceDto
  ): Promise<ApiResponse<Attendance>> {
    try {
      const res = await api(true).put(`/attendances/${id}`, payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to update attendance'
      )
    }
  }

  static async deleteAttendance(id: string): Promise<ApiResponse> {
    try {
      const res = await api(true).delete(`/attendances/${id}`)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to delete attendance'
      )
    }
  }

  static async getAttendancesByOffice(
    officeId: string,
    params?: AttendanceFilters
  ): Promise<ApiResponse<PaginatedResponse<Attendance>>> {
    try {
      const res = await api(true).get(`/attendances/office/${officeId}`, {
        params,
      })
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to fetch office attendances'
      )
    }
  }

  static async createAttendanceForOffice(
    officeId: string,
    payload: CreateAttendanceDto
  ): Promise<ApiResponse<Attendance>> {
    try {
      const res = await api(true).post(
        `/attendances/office/${officeId}`,
        payload
      )
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to create attendance for office'
      )
    }
  }

  static async getAttendanceByOffice(
    officeId: string,
    id: string
  ): Promise<ApiResponse<Attendance>> {
    try {
      const res = await api(true).get(`/attendances/office/${officeId}/${id}`)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to fetch attendance'
      )
    }
  }

  static async updateAttendanceForOffice(
    officeId: string,
    id: string,
    payload: UpdateAttendanceDto
  ): Promise<ApiResponse<Attendance>> {
    try {
      const res = await api(true).patch(
        `/attendances/office/${officeId}/${id}`,
        payload
      )
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to update attendance'
      )
    }
  }

  static async deleteAttendanceForOffice(
    officeId: string,
    id: string
  ): Promise<ApiResponse> {
    try {
      const res = await api(true).delete(
        `/attendances/office/${officeId}/${id}`
      )
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to delete attendance'
      )
    }
  }

  static async getAttendanceReport(
    officeId: string,
    startDate: string,
    endDate: string
  ): Promise<ApiResponse<AttendanceReport>> {
    try {
      const res = await api(true).get(
        `/attendances/office/${officeId}/report`,
        {
          params: { startDate, endDate },
        }
      )
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(
        err.response?.data?.message || 'Failed to fetch attendance report'
      )
    }
  }

  // Check-in and Check-out are handled through regular attendance creation and update
  static async checkIn(
    payload: CreateAttendanceDto
  ): Promise<ApiResponse<Attendance>> {
    return this.createAttendance(payload)
  }

  static async checkOut(
    attendanceId: string,
    payload: UpdateAttendanceDto
  ): Promise<ApiResponse<Attendance>> {
    return this.updateAttendance(attendanceId, payload)
  }

  // ==========================================
  // Role Management Endpoints
  // ==========================================

  static async getRoles(): Promise<ApiResponse<Role[]>> {
    try {
      const res = await api(true).get('/roles')
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to fetch roles')
    }
  }

  static async getRole(id: number): Promise<ApiResponse<Role>> {
    try {
      const res = await api(true).get(`/roles/${id}`)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to fetch role')
    }
  }

  static async updateRole(
    id: number,
    payload: UpdateRoleDto
  ): Promise<ApiResponse<Role>> {
    try {
      const res = await api(true).patch(`/roles/${id}`, payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to update role')
    }
  }

  // ==========================================
  // Notification Endpoints
  // ==========================================

  static async sendSms(
    payload: SendSmsDto
  ): Promise<ApiResponse<NotificationResponse>> {
    try {
      const res = await api(true).post('/notifications/sms', payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to send SMS')
    }
  }

  static async sendEmail(
    payload: SendEmailDto
  ): Promise<ApiResponse<NotificationResponse>> {
    try {
      const res = await api(true).post('/notifications/email', payload)
      return res.data
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      throw new Error(err.response?.data?.message || 'Failed to send email')
    }
  }

  // ==========================================
  // Geolocation Helpers
  // ==========================================

  static async getCurrentLocation(): Promise<{
    latitude: number
    longitude: number
  }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`))
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      )
    })
  }

  static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1)
    const dLon = this.deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in kilometers
    return distance * 1000 // Convert to meters
  }

  private static deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
  }

  static isWithinRange(
    userLat: number,
    userLon: number,
    officeLat: number,
    officeLon: number,
    maxDistance: number = 100 // meters
  ): boolean {
    const distance = this.calculateDistance(
      userLat,
      userLon,
      officeLat,
      officeLon
    )
    return distance <= maxDistance
  }
}

export default Api

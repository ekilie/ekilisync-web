import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import Api from '@/lib/api'
import type {
  LoginDto,
  RegisterDto,
  VerifyEmailDto,
  RefreshTokenDto,
  CreateUserDto,
  UpdateUserDto,
  SetPasswordDto,
  UserFilters,
  CreateEmployeeDto,
  InviteEmployeeDto,
  VerifyOtpDto,
  UpdateEmployeeDto,
  EmployeeFilters,
  CreateOfficeDto,
  UpdateOfficeDto,
  CreateAttendanceDto,
  UpdateAttendanceDto,
  AttendanceFilters,
  UpdateRoleDto,
  SendSmsDto,
  SendEmailDto,
  PaginationParams,
} from '@/lib/api/types'

// Auth Hooks
export const useAuth = () => {
  const queryClient = useQueryClient()

  const login = useMutation({
    mutationFn: (credentials: LoginDto) => Api.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      toast.success('Logged in successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const register = useMutation({
    mutationFn: (data: RegisterDto) => Api.register(data),
    onSuccess: () => {
      toast.success('Registration successful! Please check your email.')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const verifyEmail = useMutation({
    mutationFn: (data: VerifyEmailDto) => Api.verifyEmail(data),
    onSuccess: () => {
      toast.success('Email verified successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const refreshToken = useMutation({
    mutationFn: (data: RefreshTokenDto) => Api.refreshToken(data),
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const logout = useMutation({
    mutationFn: () => Api.logout(),
    onSuccess: () => {
      queryClient.clear()
      toast.success('Logged out successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return {
    login,
    register,
    verifyEmail,
    refreshToken,
    logout,
  }
}

// Office Hooks
export const useOffices = () => {
  const queryClient = useQueryClient()

  const offices = useQuery({
    queryKey: ['offices'],
    queryFn: () => Api.getOffices(),
  })

  const createOffice = useMutation({
    mutationFn: (data: CreateOfficeDto) => Api.createOffice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offices'] })
      toast.success('Office created successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const updateOffice = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOfficeDto }) =>
      Api.updateOffice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offices'] })
      toast.success('Office updated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const deleteOffice = useMutation({
    mutationFn: (id: string) => Api.deleteOffice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offices'] })
      toast.success('Office deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return {
    offices,
    createOffice,
    updateOffice,
    deleteOffice,
  }
}

export const useOffice = (id: string) => {
  return useQuery({
    queryKey: ['office', id],
    queryFn: () => Api.getOffice(id),
    enabled: !!id,
  })
}

export const useOfficeCount = (officeId: string) => {
  return useQuery({
    queryKey: ['office-count', officeId],
    queryFn: () => Api.getOfficeCount(officeId),
    enabled: !!officeId,
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}

// User Hooks
export const useUsers = (filters?: UserFilters) => {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => Api.getUsers(filters),
  })
}

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => Api.getUser(id),
    enabled: !!id,
  })
}

export const useUserActions = () => {
  const queryClient = useQueryClient()

  const createUser = useMutation({
    mutationFn: (data: CreateUserDto) => Api.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User created successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const updateUser = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      Api.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User updated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const deleteUser = useMutation({
    mutationFn: (id: string) => Api.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const setPassword = useMutation({
    mutationFn: ({ id, data }: { id: string; data: SetPasswordDto }) =>
      Api.setUserPassword(id, data),
    onSuccess: () => {
      toast.success('Password set successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return {
    createUser,
    updateUser,
    deleteUser,
    setPassword,
  }
}

// Office-specific User Hooks
export const useUsersByOffice = (
  officeId: string,
  params?: PaginationParams
) => {
  return useQuery({
    queryKey: ['users', 'office', officeId, params],
    queryFn: () => Api.getUsersByOffice(officeId, params),
    enabled: !!officeId,
  })
}

export const useOfficeUserActions = () => {
  const queryClient = useQueryClient()

  const createUser = useMutation({
    mutationFn: ({
      officeId,
      data,
    }: {
      officeId: string
      data: CreateUserDto
    }) => Api.createUserForOffice(officeId, data),
    onSuccess: (_, { officeId }) => {
      queryClient.invalidateQueries({ queryKey: ['users', 'office', officeId] })
      toast.success('User created successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const updateUser = useMutation({
    mutationFn: ({
      officeId,
      id,
      data,
    }: {
      officeId: string
      id: string
      data: UpdateUserDto
    }) => Api.updateUserForOffice(officeId, id, data),
    onSuccess: (_, { officeId }) => {
      queryClient.invalidateQueries({ queryKey: ['users', 'office', officeId] })
      toast.success('User updated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const deleteUser = useMutation({
    mutationFn: ({ officeId, id }: { officeId: string; id: string }) =>
      Api.deleteUserForOffice(officeId, id),
    onSuccess: (_, { officeId }) => {
      queryClient.invalidateQueries({ queryKey: ['users', 'office', officeId] })
      toast.success('User deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return {
    createUser,
    updateUser,
    deleteUser,
  }
}

// Employee Hooks
export const useEmployees = (filters?: EmployeeFilters) => {
  return useQuery({
    queryKey: ['employees', filters],
    queryFn: () => Api.getEmployees(filters),
  })
}

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: () => Api.getEmployee(id),
    enabled: !!id,
  })
}

export const useEmployeeActions = () => {
  const queryClient = useQueryClient()

  const inviteEmployee = useMutation({
    mutationFn: (data: InviteEmployeeDto) => Api.inviteEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Employee invitation sent successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const verifyOtp = useMutation({
    mutationFn: (data: VerifyOtpDto) => Api.verifyOtp(data),
    onSuccess: () => {
      toast.success('OTP verified successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const createEmployee = useMutation({
    mutationFn: (data: CreateEmployeeDto) => Api.createEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Employee created successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const updateEmployee = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEmployeeDto }) =>
      Api.updateEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Employee updated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const deleteEmployee = useMutation({
    mutationFn: (id: string) => Api.deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Employee deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return {
    inviteEmployee,
    verifyOtp,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  }
}

// Office-specific Employee Hooks
export const useEmployeesByOffice = (
  officeId: string,
  params?: PaginationParams
) => {
  return useQuery({
    queryKey: ['employees', 'office', officeId, params],
    queryFn: () => Api.getEmployeesByOffice(officeId, params),
    enabled: !!officeId,
  })
}

export const useOfficeEmployeeActions = () => {
  const queryClient = useQueryClient()

  const createEmployee = useMutation({
    mutationFn: ({
      officeId,
      data,
    }: {
      officeId: string
      data: CreateEmployeeDto
    }) => Api.createEmployeeForOffice(officeId, data),
    onSuccess: (_, { officeId }) => {
      queryClient.invalidateQueries({
        queryKey: ['employees', 'office', officeId],
      })
      toast.success('Employee created successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const updateEmployee = useMutation({
    mutationFn: ({
      officeId,
      id,
      data,
    }: {
      officeId: string
      id: string
      data: UpdateEmployeeDto
    }) => Api.updateEmployeeForOffice(officeId, id, data),
    onSuccess: (_, { officeId }) => {
      queryClient.invalidateQueries({
        queryKey: ['employees', 'office', officeId],
      })
      toast.success('Employee updated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const deleteEmployee = useMutation({
    mutationFn: ({ officeId, id }: { officeId: string; id: string }) =>
      Api.deleteEmployeeForOffice(officeId, id),
    onSuccess: (_, { officeId }) => {
      queryClient.invalidateQueries({
        queryKey: ['employees', 'office', officeId],
      })
      toast.success('Employee deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return {
    createEmployee,
    updateEmployee,
    deleteEmployee,
  }
}

// Attendance Hooks
export const useAttendances = (filters?: AttendanceFilters) => {
  return useQuery({
    queryKey: ['attendances', filters],
    queryFn: () => Api.getAttendances(filters),
  })
}

export const useAttendance = (id: string) => {
  return useQuery({
    queryKey: ['attendance', id],
    queryFn: () => Api.getAttendance(id),
    enabled: !!id,
  })
}

export const useAttendanceActions = () => {
  const queryClient = useQueryClient()

  const createAttendance = useMutation({
    mutationFn: (data: CreateAttendanceDto) => Api.createAttendance(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendances'] })
      toast.success('Attendance recorded successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const updateAttendance = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAttendanceDto }) =>
      Api.updateAttendance(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendances'] })
      toast.success('Attendance updated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const deleteAttendance = useMutation({
    mutationFn: (id: string) => Api.deleteAttendance(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendances'] })
      toast.success('Attendance deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const checkIn = useMutation({
    mutationFn: (data: CreateAttendanceDto) => Api.checkIn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendances'] })
      toast.success('Checked in successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const checkOut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAttendanceDto }) =>
      Api.checkOut(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendances'] })
      toast.success('Checked out successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return {
    createAttendance,
    updateAttendance,
    deleteAttendance,
    checkIn,
    checkOut,
  }
}

// Office-specific Attendance Hooks
export const useAttendancesByOffice = (
  officeId: string,
  filters?: AttendanceFilters
) => {
  return useQuery({
    queryKey: ['attendances', 'office', officeId, filters],
    queryFn: () => Api.getAttendancesByOffice(officeId, filters),
    enabled: !!officeId,
  })
}

export const useAttendanceReport = (
  officeId: string,
  startDate: string,
  endDate: string
) => {
  return useQuery({
    queryKey: ['attendance-report', officeId, startDate, endDate],
    queryFn: () => Api.getAttendanceReport(officeId, startDate, endDate),
    enabled: !!officeId && !!startDate && !!endDate,
  })
}

export const useOfficeAttendanceActions = () => {
  const queryClient = useQueryClient()

  const createAttendance = useMutation({
    mutationFn: ({
      officeId,
      data,
    }: {
      officeId: string
      data: CreateAttendanceDto
    }) => Api.createAttendanceForOffice(officeId, data),
    onSuccess: (_, { officeId }) => {
      queryClient.invalidateQueries({
        queryKey: ['attendances', 'office', officeId],
      })
      toast.success('Attendance recorded successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const updateAttendance = useMutation({
    mutationFn: ({
      officeId,
      id,
      data,
    }: {
      officeId: string
      id: string
      data: UpdateAttendanceDto
    }) => Api.updateAttendanceForOffice(officeId, id, data),
    onSuccess: (_, { officeId }) => {
      queryClient.invalidateQueries({
        queryKey: ['attendances', 'office', officeId],
      })
      toast.success('Attendance updated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const deleteAttendance = useMutation({
    mutationFn: ({ officeId, id }: { officeId: string; id: string }) =>
      Api.deleteAttendanceForOffice(officeId, id),
    onSuccess: (_, { officeId }) => {
      queryClient.invalidateQueries({
        queryKey: ['attendances', 'office', officeId],
      })
      toast.success('Attendance deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return {
    createAttendance,
    updateAttendance,
    deleteAttendance,
  }
}

// Role Hooks
export const useRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: () => Api.getRoles(),
  })
}

export const useRole = (id: number) => {
  return useQuery({
    queryKey: ['role', id],
    queryFn: () => Api.getRole(id),
    enabled: !!id,
  })
}

export const useRoleActions = () => {
  const queryClient = useQueryClient()

  const updateRole = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRoleDto }) =>
      Api.updateRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast.success('Role updated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return {
    updateRole,
  }
}

// Notification Hooks
export const useNotificationActions = () => {
  const sendSms = useMutation({
    mutationFn: (data: SendSmsDto) => Api.sendSms(data),
    onSuccess: () => {
      toast.success('SMS sent successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const sendEmail = useMutation({
    mutationFn: (data: SendEmailDto) => Api.sendEmail(data),
    onSuccess: () => {
      toast.success('Email sent successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return {
    sendSms,
    sendEmail,
  }
}

// Location and Geolocation Hooks
export const useGeolocation = () => {
  const getCurrentLocation = useMutation({
    mutationFn: () => Api.getCurrentLocation(),
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return {
    getCurrentLocation,
    calculateDistance: Api.calculateDistance,
    isWithinRange: Api.isWithinRange,
  }
}

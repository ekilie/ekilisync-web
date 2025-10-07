# EkiliSync API Integration Summary

## Overview
This document outlines the complete API integration between the EkiliSync backend (NestJS) and web frontend (React + TypeScript). All endpoints have been mapped and integrated with comprehensive error handling and type safety.

## Backend API Structure

### Authentication Endpoints (`/auth`)
- `POST /auth/login` - User login with email/password
- `POST /auth/register` - Register new office with admin user
- `POST /auth/verify-email` - Verify user email with token
- `POST /auth/refresh-token` - Refresh access token

### Office Management (`/offices`)
- `GET /offices` - List all offices
- `POST /offices` - Create new office (public endpoint)
- `GET /offices/:id` - Get office by ID
- `PATCH /offices/:id` - Update office (admin only)
- `DELETE /offices/:id` - Delete office (admin only)
- `GET /offices/count/:id` - Get office statistics (employees, checked-in, late)

### User Management (`/users`)
- `GET /users` - List all users
- `POST /users` - Create new user
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `POST /users/:id/set-password` - Set user password
- `GET /users/office/:officeId` - Get users by office
- `POST /users/office/:officeId` - Create user for office
- `GET /users/office/:officeId/:id` - Get user by office and ID
- `PATCH /users/office/:officeId/:id` - Update user for office
- `DELETE /users/office/:officeId/:id` - Delete user from office

### Employee Management (`/employees`)
- `POST /employees/invite` - Invite employee (sends OTP)
- `GET /employees` - List all employees
- `POST /employees/verify-otp` - Verify employee OTP (public)
- `GET /employees/office/:officeId` - Get employees by office
- `POST /employees/office/:officeId` - Create employee for office
- `GET /employees/office/:officeId/:id` - Get employee by office and ID
- `PATCH /employees/office/:officeId/:id` - Update employee for office
- `DELETE /employees/office/:officeId/:id` - Delete employee from office
- `GET /employees/:id` - Get employee by ID
- `PATCH /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

### Attendance Management (`/attendances`)
- `POST /attendances` - Create attendance record
- `GET /attendances` - List all attendance records
- `GET /attendances/office/:officeId` - Get attendance by office
- `POST /attendances/office/:officeId` - Create attendance for office
- `GET /attendances/:id` - Get attendance by ID
- `GET /attendances/office/:officeId/:id` - Get attendance by office and ID
- `PATCH /attendances/:id` - Update attendance
- `PATCH /attendances/office/:officeId/:id` - Update attendance for office
- `DELETE /attendances/:id` - Delete attendance
- `DELETE /attendances/office/:officeId/:id` - Delete attendance from office

### Role Management (`/roles`)
- `GET /roles` - List all roles
- `GET /roles/:id` - Get role by ID (ID is number)
- `PATCH /roles/:id` - Update role permissions

### Notification System (`/notifications`)
- `POST /notifications/sms` - Send SMS (public)
- `POST /notifications/email` - Send email

## Frontend Integration

### 1. API Client (`/src/lib/api/index.ts`)
Complete API client class with all backend endpoints mapped, including:
- Proper error handling with user-friendly error messages
- Authentication token management
- Type-safe request/response handling
- Geolocation utilities for attendance tracking

### 2. Type Definitions (`/src/lib/api/types.ts`)
Comprehensive TypeScript interfaces covering:
- Authentication types (LoginDto, RegisterDto, AuthResponse, etc.)
- User management types (User, CreateUserDto, UpdateUserDto, SetPasswordDto)
- Employee types (Employee, InviteEmployeeDto, VerifyOtpDto)
- Office types (Office, CreateOfficeDto, UpdateOfficeDto)
- Attendance types (Attendance, CreateAttendanceDto, UpdateAttendanceDto)
- Role and notification types
- Generic API response and pagination types

### 3. React Query Hooks (`/src/hooks/use-api.ts`)
Production-ready hooks for:
- **Authentication**: login, register, verifyEmail, logout, refreshToken
- **Office Management**: CRUD operations, office statistics
- **User Management**: Full CRUD with office-specific operations
- **Employee Management**: Invitation flow, OTP verification, CRUD operations
- **Attendance**: Check-in/out, reporting, office-specific tracking
- **Roles**: View and update role permissions
- **Notifications**: SMS and email sending
- **Geolocation**: Location tracking and range validation

### 4. Authentication System
- Updated AuthContext with proper type safety
- Zustand store for state management
- Token management with automatic refresh
- JWT expiration checking

### 5. Configuration
- Axios interceptors for authentication
- Base URL configuration from environment variables
- Error handling and token refresh logic

## Key Features Implemented

### 1. Authentication Flow
- Complete login/register flow
- Email verification process
- Token refresh mechanism
- Secure logout with cache clearing

### 2. Office-Centric Architecture
All entities (users, employees, attendance) support both global and office-specific operations, matching the multi-tenant backend structure.

### 3. Real-time Updates
React Query provides automatic cache invalidation and background refetching for real-time data updates.

### 4. Location-Based Attendance
- Browser geolocation integration
- Distance calculation utilities
- Location validation for check-in/check-out

### 5. Comprehensive Error Handling
- User-friendly error messages
- Toast notifications for all operations
- Proper loading states and error boundaries

### 6. Type Safety
- Full TypeScript coverage
- Strict type checking for all API interactions
- Runtime validation of API responses

## Usage Examples

### Authentication
```typescript
const { login, register, logout } = useAuth()

// Login
await login.mutateAsync({ email, password })

// Register new office
await register.mutateAsync({ 
  officeName, 
  adminEmail, 
  adminPassword, 
  phoneNumber 
})
```

### Office Management
```typescript
const { offices, createOffice, updateOffice } = useOffices()
const { data: officeCount } = useOfficeCount(officeId)

// Create office
await createOffice.mutateAsync({ name, address, email, phoneNumber })
```

### Employee Management
```typescript
const { inviteEmployee, verifyOtp } = useEmployeeActions()
const { data: employees } = useEmployeesByOffice(officeId)

// Invite employee
await inviteEmployee.mutateAsync({ 
  name, 
  email, 
  phoneNumber, 
  officeId 
})
```

### Attendance Tracking
```typescript
const { checkIn, checkOut } = useAttendanceActions()
const { getCurrentLocation } = useGeolocation()

// Check in with location
const location = await getCurrentLocation.mutateAsync()
await checkIn.mutateAsync({
  employeeId,
  officeId,
  checkInTime: new Date().toISOString(),
  checkInLocation: location
})
```

## Environment Setup

Ensure the following environment variables are set:
```env
REACT_APP_API_URL=http://localhost:3001  # Backend URL
```

## Testing Recommendations

1. **Authentication Flow**: Test login, registration, email verification
2. **Office Operations**: Create, update, delete offices
3. **User Management**: CRUD operations with proper role permissions
4. **Employee Workflow**: Complete invitation and verification process
5. **Attendance System**: Check-in/out with location validation
6. **Error Handling**: Network failures, invalid tokens, validation errors

## Security Considerations

- JWT tokens stored securely with automatic refresh
- Location data handled with user permission
- Role-based access control implemented
- Input validation on all forms
- HTTPS enforcement for production

This integration provides a complete, type-safe, and production-ready connection between the EkiliSync backend and web frontend with comprehensive error handling and real-time updates.
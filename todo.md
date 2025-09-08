# Web Application Frontend Integration Checklist

## TypeScript & Build Fixes
- [ ] Fix all TypeScript compilation errors (CurrentUser interface conflicts, unused imports, role type mismatches).
- [ ] Update avatar references to use office logos.
- [ ] Resolve route tree generation and navigation types.

## Comprehensive API Client
- [ ] Create a complete API client with 40+ endpoints covering all backend modules.
- [ ] Add full TypeScript interfaces (15+ types) for type safety.
- [ ] Implement endpoints for:
  - [ ] Auth
  - [ ] Users
  - [ ] Employees
  - [ ] Offices
  - [ ] Attendances
  - [ ] Roles
  - [ ] Notifications
- [ ] Add proper error handling and response validation.
- [ ] Maintain backward compatibility with existing code.

## Employee Management System
- [ ] Update employee invite dialog with real API integration.
- [ ] Add comprehensive form fields (firstName, lastName, email, phone, position, department).
- [ ] Connect to the backend employee invite endpoint with proper error handling.
- [ ] Add success feedback and automatic page refresh.

## Attendance Management System (Core Feature)
- [ ] Create a complete attendance tracking interface with 4 tabs (Overview, Employees, History, Reports).
- [ ] Implement real-time location tracking for check-in/check-out.
- [ ] Add an attendance dashboard with key metrics (total employees, present today, checked in, attendance rate).
- [ ] Create individual employee status tracking with manual check-in/out capabilities.
- [ ] Integrate calendar-based attendance history viewing.
- [ ] Connect to all attendance API endpoints (create, read, update by office).
- [ ] Add geolocation validation for accurate attendance tracking.
- [ ] Enhance navigation with an attendance route in the sidebar.

## API Integration Coverage
- [ ] **Authentication**: login, register, verify-email, refresh-token, logout.
- [ ] **Office Management**: CRUD operations + count endpoint.
- [ ] **User Management**: Full CRUD + office-specific operations.
- [ ] **Employee Management**: Invite, verify-OTP, CRUD + office-specific operations.
- [ ] **Attendance System**: Full CRUD + office-specific operations.
- [ ] **Role Management**: Read and update operations.
- [ ] **Notifications**: SMS and email sending.

## Core Web Application Requirements
- [ ] Dashboard displays real-time attendance data.
- [ ] Employee management with full CRUD operations.
- [ ] Attendance tracking with reports/analytics interface.
- [ ] Office management structure (ready for geolocation setup).
- [ ] Responsive design working on all screen sizes.
- [ ] Error handling and loading states for all interactions.

import {
  IconUsersGroup,
} from '@tabler/icons-react'
import { UserStatus } from './schema'

export const callTypes = new Map<UserStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'suspended',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

export const userTypes = [
  {
    label: 'Employee',
    value: 'employee',
    icon: IconUsersGroup,
  },
  {
    label: 'Super Admin',
    value: 'superadmin',
    icon: IconUsersGroup,
  },
  {
    label: 'Admin',
    value: 'admin',
    icon: IconUsersGroup,
  },
  {
    label: 'Cashier',
    value: 'cashier',
    icon: IconUsersGroup,
  },
  {
    label: 'Manager',
    value: 'manager',
    icon: IconUsersGroup,
  },
] as const

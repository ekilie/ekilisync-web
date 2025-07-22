import { createFileRoute } from '@tanstack/react-router'
import Employees from '@/features/employees'

export const Route = createFileRoute('/_authenticated/employees/')({
  component: Employees,
})

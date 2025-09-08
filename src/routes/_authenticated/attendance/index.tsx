import { createFileRoute } from '@tanstack/react-router'
import AttendanceFeature from '@/features/attendance'

export const Route = createFileRoute('/_authenticated/attendance/')({
  component: () => <AttendanceFeature />,
})
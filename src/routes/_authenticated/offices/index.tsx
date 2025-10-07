import { createFileRoute } from '@tanstack/react-router'
import Offices from '@/features/offices'

export const Route = createFileRoute('/_authenticated/offices/')({
  component: Offices,
}) 
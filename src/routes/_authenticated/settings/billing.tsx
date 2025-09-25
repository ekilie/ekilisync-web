import { createFileRoute } from '@tanstack/react-router'
import SettingsBilling from '@/features/settings/billing'

export const Route = createFileRoute('/_authenticated/settings/billing')({
  component: SettingsBilling,
})
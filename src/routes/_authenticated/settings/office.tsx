import { createFileRoute } from '@tanstack/react-router'
import SettingsOffice from '@/features/settings/office'

export const Route = createFileRoute('/_authenticated/settings/office')({
  component: SettingsOffice,
})


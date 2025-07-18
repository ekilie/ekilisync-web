import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { AuthProvider } from '@/context/AuthContext'

export const Route = createFileRoute('/_authenticated')({
  component: () => (
    <AuthProvider>
      <AuthenticatedLayout />
    </AuthProvider>
  ),
})
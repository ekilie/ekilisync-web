import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { authToken, currentUser } from '@/lib/api/authToken'
import { isJwtExpired } from '@/lib/utils'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    try {
      const token = await authToken('access')
      const user = await currentUser()
      
      // If no token or token is expired or no user, redirect to sign-in
      if (!token || isJwtExpired(token) || !user) {
        throw redirect({
          to: '/sign-in',
          search: {
            redirect: location.href,
          },
        })
      }
    } catch (error) {
      // If there's an error checking auth, redirect to sign-in
      if (error instanceof Response) {
        throw error // Re-throw redirect
      }
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: () => <AuthenticatedLayout />,
})
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { currentUser, clearCache } from '@/lib/api/authToken'
import type { CurrentUser } from '@/lib/api/types'

interface AuthState {
  user: CurrentUser | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: CurrentUser | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
        })
      },

      setLoading: (isLoading) => {
        set({ isLoading })
      },

      logout: async () => {
        await clearCache()
        set({
          user: null,
          isAuthenticated: false,
        })
      },

      checkAuth: async () => {
        try {
          set({ isLoading: true })
          const user = await currentUser()
          set({
            user,
            isAuthenticated: !!user,
            isLoading: false,
          })
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

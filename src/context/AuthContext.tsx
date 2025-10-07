import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import Api from '@/lib/api'
import { authToken, currentUser, clearCache } from '@/lib/api/authToken/index'
import type {
  CurrentUser,
  LoginDto,
  RegisterDto,
  VerifyEmailDto,
} from '@/lib/api/types'
import { isJwtExpired } from '@/lib/utils'

interface AuthContextType {
  user: CurrentUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginDto) => Promise<void>
  register: (data: RegisterDto) => Promise<void>
  verifyEmail: (data: VerifyEmailDto) => Promise<void>
  logout: () => Promise<void>
  refreshToken: (token: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        const token = await authToken('access')
        const storedUser = await currentUser()
        if (token && !isJwtExpired(token) && storedUser) {
          setUser(storedUser)
          setIsAuthenticated(true)
        } else {
          setUser(null)
          setIsAuthenticated(false)
        }
      } catch (error) {
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])

  const login = async (credentials: LoginDto) => {
    try {
      setIsLoading(true)
      const response = await Api.login(credentials)

      setUser(response.data.user)
      setIsAuthenticated(true)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (registerData: RegisterDto) => {
    try {
      setIsLoading(true)
      await Api.register(registerData)
      // Registration successful, user needs to verify email
    } finally {
      setIsLoading(false)
    }
  }

  const verifyEmail = async (verifyData: VerifyEmailDto) => {
    try {
      setIsLoading(true)
      await Api.verifyEmail(verifyData)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshToken = async (refreshTokenValue: string) => {
    await Api.refreshToken({ refresh_token: refreshTokenValue })
  }

  const logout = async () => {
    try {
      await Api.logout()
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      // Still clear local state even if API call fails
      await clearCache()
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        verifyEmail,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext

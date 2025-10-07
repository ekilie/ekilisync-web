import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { isJwtExpired } from '@/lib/utils'
import { authToken, setAuthToken, saveUser, currentUser, clearCache } from '@/lib/api/authToken/index'
import { useAuth as useAuthHook } from '@/hooks/use-api'
import type { CurrentUser, LoginDto, RegisterDto, VerifyEmailDto } from '@/lib/api/types'

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
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      const { access_token, refresh_token, user: userData } = data.data

      await setAuthToken({ access: access_token, refresh: refresh_token })
      await saveUser(userData)
      
      setUser(userData)
      setIsAuthenticated(true)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (registerData: RegisterDto) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      // Registration successful, user needs to verify email
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const verifyEmail = async (verifyData: VerifyEmailDto) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verifyData),
      })

      if (!response.ok) {
        throw new Error('Email verification failed')
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const refreshToken = async (refreshTokenValue: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshTokenValue }),
      })

      if (!response.ok) {
        throw new Error('Token refresh failed')
      }

      const data = await response.json()
      await setAuthToken({ access: data.data.access_token })
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await clearCache()
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      // Still clear local state even if server call fails
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
        refreshToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;


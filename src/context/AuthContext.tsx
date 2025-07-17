import React, { createContext } from 'react'

const AuthContext = createContext(null)

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null)

interface User {
    id: string;
    name: string;
    email: string;
}

interface LoginFunction {
    (userData: User): void;
}

const login: LoginFunction = (userData) => {
    setUser(userData)
}

  const logout = () => {
    setUser(null)
  }
    const isAuthenticated = () => {
      return user !== null
    }
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
function useState(_arg0: null): [any, any] {
    throw new Error('Function not implemented.');
}


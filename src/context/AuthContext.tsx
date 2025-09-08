import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isJwtExpired } from '@/lib/utils';
import { authToken, setAuthToken, saveUser, currentUser, clearCache, CurrentUser } from '@/lib/api/authToken/index';

interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await authToken('access');
      const storedUser = await currentUser();
      if (token && !isJwtExpired(token) && storedUser) {
        // Convert CurrentUser to User interface
        const userForState: User = {
          id: storedUser.id,
          name: storedUser.name,
          email: storedUser.email,
          role: storedUser.role,
          office: storedUser.office
        };
        setUser(userForState);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (userData: User, token: string) => {
    await setAuthToken({ access: token });
    // Convert User to CurrentUser for storage
    const currentUserData: CurrentUser = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'employee',
      office: userData.office || {
        id: '',
        name: '',
        latitude: null,
        longitude: null,
        address: '',
        phoneNumber: '',
        email: '',
        logoUrl: '',
        createdAt: '',
        updatedAt: ''
      }
    };
    await saveUser(currentUserData);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await clearCache();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;


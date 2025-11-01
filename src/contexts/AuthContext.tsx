
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, login, loginAsGuest, logout, getCurrentUser } from '@/lib/mockService';
import { useAppStore } from '@/store/useAppStore';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const setCurrentUser = useAppStore((state) => state.setCurrentUser);

  useEffect(() => {
    const initializeAuth = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setCurrentUser(currentUser);
      setIsLoading(false);
    };

    initializeAuth();
  }, [setCurrentUser]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await login(email, password);
      setUser(user);
      setCurrentUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await loginAsGuest();
      setUser(user);
      setCurrentUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login: handleLogin,
        loginAsGuest: handleGuestLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
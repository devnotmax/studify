import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import authService from '../services/authService';
import { sessionService } from '../services/sessionService';
import type { User, RegisterData, LoginData, ApiResponse, AuthResponse, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar si hay un usuario autenticado al cargar la aplicación
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedUser = authService.getUser();
        if (savedUser && authService.isAuthenticated()) {
          setUser(savedUser);
        } else {
          // Si no hay usuario válido, limpiar datos de sesiones
          try {
            sessionService.clearSessionData();
          } catch (error) {
            console.error('Error clearing session data on init:', error);
          }
        }
      } catch {
        console.error('Error al cargar datos de usuario');
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Efecto para limpiar datos cuando cambia el usuario
  useEffect(() => {
    if (user) {
      console.log('👤 Usuario autenticado:', user.email);
    } else {
      console.log('👤 No hay usuario autenticado');
    }
  }, [user]);

  const login = async (credentials: LoginData): Promise<ApiResponse<AuthResponse>> => {
    setLoading(true);
    setError(null);
    
    try {
      // Limpiar datos de sesiones del usuario anterior
      try {
        sessionService.clearSessionData();
      } catch (error) {
        console.error('Error clearing previous session data:', error);
      }
      
      const result = await authService.login(credentials);
      
      if (result.success && result.data) {
        setUser(result.data.user);
        return result;
      } else {
        setError(result.error || 'Error de autenticación');
        return result;
      }
    } catch {
      const errorMessage = 'Error de conexión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    setLoading(true);
    setError(null);
    
    try {
      // Limpiar datos de sesiones del usuario anterior
      try {
        sessionService.clearSessionData();
      } catch (error) {
        console.error('Error clearing previous session data:', error);
      }
      
      const result = await authService.register(userData);
      
      if (result.success && result.data) {
        setUser(result.data.user);
        return result;
      } else {
        setError(result.error || 'Error de registro');
        return result;
      }
    } catch {
      const errorMessage = 'Error de conexión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Limpiar datos de sesiones antes del logout
    try {
      sessionService.clearSessionData();
    } catch (error) {
      console.error('Error clearing session data:', error);
    }
    
    authService.logout();
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}; 
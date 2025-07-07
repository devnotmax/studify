import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sessionService } from '../services/sessionService';

export const useAuthRedirect = (redirectTo: string = '/auth/login') => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Limpiar datos de sesiones antes de redirigir
      try {
        sessionService.clearSessionData();
      } catch (error) {
        console.error('Error clearing session data on redirect:', error);
      }
      navigate(redirectTo);
    }
  }, [isAuthenticated, loading, navigate, redirectTo]);

  return { isAuthenticated, loading };
}; 
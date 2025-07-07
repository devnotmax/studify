import api from './api';
import type { User, AuthResponse, RegisterData, LoginData, ApiResponse } from '../types';

interface AxiosError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

class AuthService {
  async register(userData: RegisterData): Promise<ApiResponse<AuthResponse>> {
    try {
      console.log('📝 Intentando registrar usuario:', { email: userData.email, firstName: userData.firstName });
      
      // Limpiar cualquier token/usuario previo antes de registrar
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.clear();

      const response = await api.post<AuthResponse>('/auth/register', userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      // Refrescar header de Axios
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Forzar recarga de la página para reiniciar el estado global y usar el token correcto
      window.location.reload();
      
      console.log('✅ Usuario registrado exitosamente:', user.email);
      return { success: true, data: response.data };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data?.message || 'Error de conexión';
      console.error('❌ Error en registro:', errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  async login(credentials: LoginData): Promise<ApiResponse<AuthResponse>> {
    try {
      console.log('🔐 Intentando login:', { email: credentials.email });
      
      // Limpiar cualquier token/usuario previo antes de login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.clear();

      const response = await api.post<AuthResponse>('/auth/login', credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      // Refrescar header de Axios
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Forzar recarga de la página para reiniciar el estado global y usar el token correcto
      window.location.reload();
      
      console.log('✅ Login exitoso:', user.email);
      return { success: true, data: response.data };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data?.message || 'Error de conexión';
      console.error('❌ Error en login:', errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  logout(): void {
    console.log('🚪 Cerrando sesión...');
    
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Limpiar sessionStorage
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
    
    // Limpiar cualquier caché del navegador relacionado con la aplicación
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          if (cacheName.includes('studify') || cacheName.includes('vite')) {
            caches.delete(cacheName);
          }
        });
      }).catch(error => {
        console.error('Error clearing caches:', error);
      });
    }
    
    // Forzar recarga de la página para limpiar completamente el estado
    window.location.reload();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    const hasToken = !!this.getToken();
    console.log('🔍 Verificando autenticación:', hasToken ? '✅ Autenticado' : '❌ No autenticado');
    return hasToken;
  }
}

export default new AuthService(); 
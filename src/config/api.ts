// Configuración de la API para diferentes entornos
const getApiUrl = () => {
  // Para Vite, usar VITE_API_URL
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // URL del backend según la documentación
  return 'https://tu-backend.onrender.com/api';
};

export const API_CONFIG = {
  BASE_URL: getApiUrl(),
  TIMEOUT: 10000,
  WITH_CREDENTIALS: true,
};

// Función para verificar si estamos en desarrollo
export const isDevelopment = () => {
  return import.meta.env.DEV;
};

// Función para verificar si estamos en producción
export const isProduction = () => {
  return import.meta.env.PROD;
};

// Log de configuración
console.log('🔧 Configuración API:', {
  BASE_URL: API_CONFIG.BASE_URL,
  ENVIRONMENT: isDevelopment() ? 'development' : 'production',
  WITH_CREDENTIALS: API_CONFIG.WITH_CREDENTIALS,
}); 
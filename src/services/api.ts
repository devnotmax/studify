import axios from "axios";
import { API_CONFIG, isDevelopment } from "../config/api";

// Crear instancia de axios con configuración CORS
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // Configuración importante para CORS
  withCredentials: API_CONFIG.WITH_CREDENTIALS,
  timeout: API_CONFIG.TIMEOUT,
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log para debugging (solo en desarrollo)
    if (isDevelopment()) {
      console.log("🚀 Request:", config.method?.toUpperCase(), config.url);
      console.log("📋 Headers:", config.headers);
      if (config.data) {
        console.log("📦 Data:", config.data);
      }
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => {
    if (isDevelopment()) {
      console.log("✅ Response:", response.status, response.data);
    }
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
      },
    });

    // Manejo específico de errores
    if (error.response?.status === 401) {
      console.log("🔒 Token expirado o inválido");

      // Solo redirigir si no estamos en una página de autenticación
      const currentPath = window.location.pathname;
      const isAuthPage = currentPath.includes("/auth/");

      if (!isAuthPage) {
        console.log("🔄 Redirigiendo a login...");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/auth/login";
      } else {
        console.log("📍 Ya estamos en página de auth, no redirigiendo");
      }
    } else if (error.response?.status === 403) {
      console.log("🚫 Acceso denegado");
    } else if (error.response?.status === 404) {
      console.log("🔍 Endpoint no encontrado");
    } else if (error.response?.status >= 500) {
      console.log("💥 Error del servidor");
    } else if (!error.response) {
      console.log("🌐 Error de red - verifica la conexión");
    }

    return Promise.reject(error);
  }
);

// Función de prueba para verificar conexión
export const testConnection = async () => {
  try {
    const response = await api.get("/test");
    console.log("✅ Conexión exitosa:", response.data);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    console.error("❌ Error de conexión:", error);
    const axiosError = error as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    return {
      success: false,
      error:
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Error de conexión",
    };
  }
};

export default api;

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginData) => Promise<ApiResponse<AuthResponse>>;
  register: (userData: RegisterData) => Promise<ApiResponse<AuthResponse>>;
  logout: () => void;
  clearError: () => void;
} 
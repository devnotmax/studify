import api from './api';
import type { 
  Session, 
  SessionResponse, 
  SessionResults, 
  SessionHistory, 
  StreakInfo 
} from '../types';

export class SessionService {
  private static instance: SessionService;
  private currentSession: Session | null = null;
  private sessionTimer: number | null = null;
  private onTick: ((remaining: number) => void) | null = null;
  private onComplete: (() => void) | null = null;
  private onPause: (() => void) | null = null;
  private onResume: (() => void) | null = null;

  private constructor() {}
  

  static getInstance(): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService();
    }
    return SessionService.instance;
  }

  // Configurar callbacks del timer
  setCallbacks(callbacks: {
    onTick?: (remaining: number) => void;
    onComplete?: () => void;
    onPause?: () => void;
    onResume?: () => void;
  }) {
    this.onTick = callbacks.onTick || null;
    this.onComplete = callbacks.onComplete || null;
    this.onPause = callbacks.onPause || null;
    this.onResume = callbacks.onResume || null;
  }

  // Iniciar una nueva sesión
  async startSession(sessionType: string, duration: number): Promise<Session> {
    try {
      const response = await api.post<SessionResponse>('/sessions', {
        sessionType,
        duration
      });

      const session = response.data.session;
      this.currentSession = session;
      this.startLocalTimer(session);
      
      return session;
    } catch (error) {
      console.error('Error starting session:', error);
      throw error;
    }
  }

  // Obtener sesión activa
  async getActiveSession(): Promise<Session | null> {
    try {
      const response = await api.get<{ session: Session | null }>('/sessions/active');
      const session = response.data.session;
      
      if (session) {
        this.currentSession = session;
        this.startLocalTimer(session);
      }
      
      return session;
    } catch (error) {
      console.error('Error getting active session:', error);
      return null;
    }
  }

  // Finalizar sesión
  async endSession(sessionId: string, completedTime: number): Promise<SessionResults> {
    try {
      const response = await api.put<SessionResults>(`/sessions/${sessionId}/end`, {
        completedTime
      });

      this.stopTimer();
      this.currentSession = null;
      
      return response.data;
    } catch (error) {
      console.error('Error ending session:', error);
      throw error;
    }
  }

  // Cancelar sesión
  async cancelSession(sessionId: string): Promise<void> {
    try {
      await api.put(`/sessions/${sessionId}/cancel`);
      this.stopTimer();
      this.currentSession = null;
    } catch (error) {
      console.error('Error canceling session:', error);
      throw error;
    }
  }

  // Obtener historial de sesiones
  async getSessionHistory(page: number = 1, limit: number = 10): Promise<SessionHistory> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay token de autenticación');
      }
      const response = await api.get<SessionHistory>(`/sessions/history?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error getting session history:', error);
      throw error;
    }
  }

  // Obtener información de racha
  async getStreakInfo(): Promise<{ streak: StreakInfo }> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay token de autenticación');
      }
      const response = await api.get<{ streak: StreakInfo }>('/sessions/streak');
      return response.data;
    } catch (error) {
      console.error('Error getting streak info:', error);
      throw error;
    }
  }

  // Timer local
  private startLocalTimer(session: Session): void {
    this.stopTimer(); // Detener timer anterior si existe
    
    const startTime = new Date(session.startTime);
    const duration = session.duration;
    
    this.sessionTimer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime.getTime()) / 1000);
      const remaining = duration - elapsed;
      
      if (this.onTick) {
        this.onTick(remaining);
      }
      
      if (remaining <= 0) {
        this.stopTimer();
        if (this.onComplete) {
          this.onComplete();
        }
      }
    }, 1000);
  }

  // Detener timer
  stopTimer(): void {
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
      this.sessionTimer = null;
    }
  }

  // Pausar sesión (solo en frontend)
  pauseSession(): void {
    this.stopTimer();
    if (this.onPause) {
      this.onPause();
    }
  }

  // Reanudar sesión
  resumeSession(): void {
    if (this.currentSession && !this.sessionTimer) {
      this.startLocalTimer(this.currentSession);
      if (this.onResume) {
        this.onResume();
      }
    }
  }

  // Obtener sesión actual
  getCurrentSession(): Session | null {
    return this.currentSession;
  }

  // Verificar si hay sesión activa
  hasActiveSession(): boolean {
    return this.currentSession !== null && this.sessionTimer !== null;
  }

  // Obtener tiempo restante
  getRemainingTime(): number {
    if (!this.currentSession || !this.sessionTimer) {
      return 0;
    }
    
    const startTime = new Date(this.currentSession.startTime);
    const elapsed = Math.floor((Date.now() - startTime.getTime()) / 1000);
    return Math.max(0, this.currentSession.duration - elapsed);
  }

  // Formatear tiempo en MM:SS
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Calcular progreso (0-100)
  getProgress(): number {
    if (!this.currentSession) {
      return 0;
    }
    
    const remaining = this.getRemainingTime();
    const total = this.currentSession.duration;
    return Math.max(0, Math.min(100, ((total - remaining) / total) * 100));
  }

  // Obtener estadísticas de sesiones (hoy, semana, total)
  async getSessionStats(): Promise<{ today: number; week: number; total: number }> {
    try {
      const response = await api.get<{ today: number; week: number; total: number }>(
        '/sessions/stats'
      );
      return response.data;
    } catch (error) {
      console.error('Error getting session stats:', error);
      throw error;
    }
  }

  // Limpiar todos los datos de sesiones locales
  clearSessionData(): void {
    console.log('🧹 Limpiando datos de sesiones locales...');
    this.stopTimer();
    this.currentSession = null;
    this.onTick = null;
    this.onComplete = null;
    this.onPause = null;
    this.onResume = null;
  }

  // Resetear completamente el servicio
  reset(): void {
    this.clearSessionData();
    // Limpiar cualquier caché o datos persistentes
    try {
      // Limpiar datos específicos del navegador si existen
      if (typeof window !== 'undefined') {
        // Limpiar cualquier dato de sesión en sessionStorage
        sessionStorage.removeItem('currentSession');
        sessionStorage.removeItem('sessionTimer');
        sessionStorage.removeItem('sessionProgress');
      }
    } catch (error) {
      console.error('Error clearing session storage:', error);
    }
  }

  // Pausar sesión
  async pauseSessionApi(sessionId: string): Promise<{ message: string; session: Session }> {
    try {
      const response = await api.put(`/sessions/${sessionId}/pause`);
      return response.data;
    } catch (error) {
      console.error('Error pausing session:', error);
      throw error;
    }
  }

  // Reanudar sesión
  async resumeSessionApi(sessionId: string): Promise<{ message: string; session: Session }> {
    try {
      const response = await api.put(`/sessions/${sessionId}/resume`);
      return response.data;
    } catch (error) {
      console.error('Error resuming session:', error);
      throw error;
    }
  }

  // Consultar tiempo restante real
  async getRemainingTimeApi(sessionId: string): Promise<number> {
    try {
      const response = await api.get<{ remaining: number }>(`/sessions/${sessionId}/remaining`);
      return response.data.remaining;
    } catch (error) {
      console.error('Error getting remaining time:', error);
      throw error;
    }
  }
}

// Exportar instancia singleton
export const sessionService = SessionService.getInstance(); 
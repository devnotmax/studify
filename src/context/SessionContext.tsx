import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { sessionService } from "../services/sessionService";
import { useAuth } from "./AuthContext";
import type { Session, SessionType, SessionResults } from "../types";
import { SESSION_CONFIG } from "../types";
import { toast } from "react-toastify";
import notification from "/notification.mp3";

interface SessionContextType {
  currentSession: Session | null;
  isActive: boolean;
  isPaused: boolean;
  timeRemaining: number;
  progress: number;
  sessionResults: SessionResults | null;
  showResults: boolean;
  startSession: (sessionType: SessionType, duration: number) => Promise<void>;
  pauseSession: () => void;
  resumeSession: () => void;
  endSession: () => Promise<SessionResults | undefined>;
  cancelSession: () => Promise<void>;
  closeResults: () => void;
  formatTime: (seconds: number) => string;
  getSessionConfig: (sessionType: SessionType) => typeof SESSION_CONFIG[SessionType];
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [progress, setProgress] = useState(0);
  const [sessionResults, setSessionResults] = useState<SessionResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  // Timer local para actualizar el tiempo restante sin consultar el backend cada segundo
  const timerInterval = useRef<number | null>(null);

  // Limpiar estado cuando cambia el usuario
  useEffect(() => {
    if (!isAuthenticated || !user) {
      // Clear all state when there is no authenticated user
      setCurrentSession(null);
      setIsActive(false);
      setIsPaused(false);
      setTimeRemaining(0);
      setProgress(0);
      setSessionResults(null);
      setShowResults(false);
      
      // Limpiar datos del servicio
      try {
        sessionService.clearSessionData();
      } catch (error) {
        console.error('Error clearing session data on user change:', error);
      }
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    sessionService.setCallbacks({
      onTick: (remaining: number) => {
        setTimeRemaining(remaining);
        if (currentSession) {
          const newProgress = Math.max(0, Math.min(100, ((currentSession.duration - remaining) / currentSession.duration) * 100));
          setProgress(newProgress);
        }
      },
      onComplete: async () => {
        setIsActive(false);
        setIsPaused(false);
        setTimeRemaining(0);
        setProgress(100);
        if (currentSession) {
          try {
            await endSession();
            toast.success("Session completed!");
            try {
              const audio = new Audio(notification);
              audio.play();
            } catch {
              // Si el navegador bloquea el audio, no hacer nada
            }
          } catch (error) {
            console.error('Error al finalizar la sesión:', error);
            toast.error("Error al finalizar la sesión");
          }
        }
      },
      onPause: () => {
        setIsPaused(true);
        setIsActive(false);
      },
      onResume: () => {
        setIsPaused(false);
        setIsActive(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSession]);

  useEffect(() => {
    const checkActiveSession = async () => {
      // Solo verificar sesión activa si hay un usuario autenticado
      if (!isAuthenticated || !user) {
        return;
      }

      try {
        const activeSession = await sessionService.getActiveSession();
        if (activeSession) {
          setCurrentSession(activeSession);
          setIsActive(true);
          setIsPaused(false);
          setTimeRemaining(sessionService.getRemainingTime());
          setProgress(sessionService.getProgress());
        }
      } catch (error) {
        console.error('Error checking active session:', error);
      }
    };
    checkActiveSession();
  }, [isAuthenticated, user]); // Agregar dependencias para que se ejecute cuando cambie el usuario

  // Calcular tiempo transcurrido y restante según la nueva especificación del backend
  const calculateTimes = () => {
    if (!currentSession) return { elapsed: 0, remaining: 0 };
    const { duration, completedTime, startTime, isPaused } = currentSession;
    let elapsed = completedTime || 0;
    if (!isPaused) {
      const now = Date.now();
      const start = new Date(startTime).getTime();
      elapsed += Math.floor((now - start) / 1000);
    }
    const remaining = Math.max(0, duration - elapsed);
    return { elapsed, remaining };
  };

  // Actualizar el timer localmente
  useEffect(() => {
    if (!currentSession) {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        timerInterval.current = null;
      }
      setTimeRemaining(0);
      setProgress(0);
      return;
    }
    if (currentSession.isPaused) {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        timerInterval.current = null;
      }
      const { remaining } = calculateTimes();
      setTimeRemaining(remaining);
      setProgress(((currentSession.duration - remaining) / currentSession.duration) * 100);
      return;
    }
    // Si está activa, actualizar cada segundo localmente
    timerInterval.current = window.setInterval(() => {
      const { remaining } = calculateTimes();
      setTimeRemaining(remaining);
      setProgress(((currentSession.duration - remaining) / currentSession.duration) * 100);
      if (remaining <= 0) {
        clearInterval(timerInterval.current!);
        timerInterval.current = null;
        setIsActive(false);
        setIsPaused(false);
        setProgress(100);
        endSession();
      }
    }, 1000);
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        timerInterval.current = null;
      }
    };
  }, [currentSession]);

  const startSession = useCallback(async (sessionType: SessionType, duration: number) => {
    try {
      const session = await sessionService.startSession(sessionType, duration);
      setCurrentSession(session);
      setIsActive(true);
      setIsPaused(false);
      setTimeRemaining(duration);
      setProgress(0);
    } catch (error) {
      console.error('Error starting session:', error);
      throw error;
    }
  }, []);

  // Al pausar, sincronizar con backend y detener timer local
  const pauseSession = useCallback(async () => {
    if (!currentSession) return;
    try {
      const { session } = await sessionService.pauseSessionApi(currentSession.id);
      setCurrentSession(session);
      setIsPaused(true);
      setIsActive(false);
    } catch (error) {
      console.error('Error pausing session:', error);
    }
  }, [currentSession]);

  // Al reanudar, sincronizar con backend y reiniciar timer local
  const resumeSession = useCallback(async () => {
    if (!currentSession) return;
    try {
      const { session } = await sessionService.resumeSessionApi(currentSession.id);
      setCurrentSession(session);
      setIsPaused(false);
      setIsActive(true);
    } catch (error) {
      console.error('Error resuming session:', error);
    }
  }, [currentSession]);

  // Al finalizar, consultar el backend para validar el tiempo restante
  const endSession = useCallback(async () => {
    if (!currentSession) return;
    try {
      const remaining = await sessionService.getRemainingTimeApi(currentSession.id);
      if (remaining > 0) {
        toast.error("Cannot end the session, there is still time left");
        return;
      }
      const startTime = new Date(currentSession.startTime);
      const now = new Date();
      const elapsedSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      const completedTime = Math.min(elapsedSeconds, currentSession.duration);
      const results = await sessionService.endSession(currentSession.id, completedTime);
      setCurrentSession(null);
      setIsActive(false);
      setIsPaused(false);
      setTimeRemaining(0);
      setProgress(0);
      setSessionResults(results);
      setShowResults(true);
      return results;
    } catch (error: unknown) {
      console.error('Error ending session:', error);
      const axiosError = error as { response?: { data?: unknown, status?: number } };
      const data = axiosError.response?.data;
      const errorMessage = typeof data === 'object' && data !== null && 'message' in data ? (data as { message?: string }).message : undefined;
      if (
        typeof data === 'object' &&
        data !== null &&
        'error' in data &&
        typeof (data as { error?: { message?: string } }).error === 'object' &&
        (data as { error?: { message?: string } }).error?.message === "User stats not found"
      ) {
        toast.error("Error: User stats not found. Contact the administrator.");
      } else if (axiosError.response?.status === 500) {
        toast.error("Server error when ending the session");
      } else if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("Error ending session");
      }
      throw error;
    }
  }, [currentSession]);

  const cancelSession = useCallback(async () => {
    if (!currentSession) return;
    try {
      await sessionService.cancelSession(currentSession.id);
      setCurrentSession(null);
      setIsActive(false);
      setIsPaused(false);
      setTimeRemaining(0);
      setProgress(0);
    } catch (error) {
      console.error('Error canceling session:', error);
      throw error;
    }
  }, [currentSession]);

  const closeResults = useCallback(() => {
    setShowResults(false);
    setSessionResults(null);
  }, []);

  const formatTime = useCallback((seconds: number): string => {
    return sessionService.formatTime(seconds);
  }, []);

  const getSessionConfig = useCallback((sessionType: SessionType) => {
    return SESSION_CONFIG[sessionType];
  }, []);

  return (
    <SessionContext.Provider
      value={{
        currentSession,
        isActive,
        isPaused,
        timeRemaining,
        progress,
        sessionResults,
        showResults,
        startSession,
        pauseSession,
        resumeSession,
        endSession,
        cancelSession,
        closeResults,
        formatTime,
        getSessionConfig,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
}; 
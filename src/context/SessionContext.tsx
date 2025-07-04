import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { sessionService } from "../services/sessionService";
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
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [progress, setProgress] = useState(0);
  const [sessionResults, setSessionResults] = useState<SessionResults | null>(null);
  const [showResults, setShowResults] = useState(false);

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
            toast.success("¡Sesión completada!");
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
  }, []);

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

  const pauseSession = useCallback(() => {
    sessionService.pauseSession();
  }, []);

  const resumeSession = useCallback(() => {
    sessionService.resumeSession();
  }, []);

  const endSession = useCallback(async () => {
    if (!currentSession) return;
    try {
      // Calcular el tiempo completado basado en el tiempo transcurrido real
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
      
      // Manejar errores específicos del backend
      const axiosError = error as { response?: { data?: { error?: { message?: string } }, status?: number } };
      if (axiosError.response?.data?.error?.message === "User stats not found") {
        toast.error("Error: Estadísticas de usuario no encontradas. Contacta al administrador.");
      } else if (axiosError.response?.status === 500) {
        toast.error("Error del servidor al finalizar la sesión");
      } else {
        toast.error("Error al finalizar la sesión");
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
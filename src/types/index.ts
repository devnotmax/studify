import type { SVGProps } from "react";
import type { FC } from "react";

// Exportar tipos de autenticación
export * from './auth';

export interface SideBarItemProps {
  decorator: FC<SVGProps<SVGSVGElement>>;
  title?: string;
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
  decoratorClassName?: string;
}

// Tipos para el sistema de sesiones
export type SessionType = "focus" | "short_break" | "long_break";

export interface Session {
  id: string;
  sessionType: SessionType;
  duration: number; // duración en segundos
  startTime: string; // ISO string
  completedTime: number; // tiempo completado en segundos
  isCompleted: boolean;
  isCancelled: boolean;
  isPaused?: boolean;
  userId: string;
}

export interface SessionResponse {
  message: string;
  session: Session;
}

export interface StartSessionRequest {
  sessionType: SessionType;
  duration: number;
}

export interface EndSessionRequest {
  completedTime: number;
}

export interface SessionResults {
  message: string;
  session: Session;
  streak: {
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: string;
  };
  newAchievements: Array<{ name: string; description?: string }>; // Tipos específicos de logros se pueden definir después
}

export interface SessionHistory {
  sessions: Session[];
  total: number;
  page: number;
  limit: number;
}

export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
}

// Configuración de tipos de sesión
export interface SessionConfig {
  duration: number;
  label: string;
}

export const SESSION_CONFIG: Record<SessionType, SessionConfig> = {
  focus: {
    duration: 1500, // 25 minutos
    label: "Focus Session"
  },
  short_break: {
    duration: 300, // 5 minutos
    label: "Short Break"
  },
  long_break: {
    duration: 900, // 15 minutos
    label: "Long Break"
  }
};

export interface SessionItemProps {
  type: string;
  duration: React.ReactNode;
  date: string;
  decorator: FC<SVGProps<SVGSVGElement>>;
  className?: string;
}

export interface PomodoroSession {
  id: string;
  type: SessionType;
  date: string;
  time: string;
  duration: number;
}

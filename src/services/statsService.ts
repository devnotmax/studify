import api from './api';

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
  }[];
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
}

export interface AverageSessionData {
  overall: number;
}

export class StatsService {
  // Horas productivas por franja horaria
  static async getProductivityHours(): Promise<ChartData> {
    const response = await api.get('/stats/productivity-hours');
    return response.data;
  }

  // Horas productivas por día de la semana
  static async getWeeklyProductivity(): Promise<ChartData> {
    const response = await api.get('/stats/weekly-productivity');
    return response.data;
  }

  // Distribución de tipos de sesión
  static async getTypeDistribution(): Promise<ChartData> {
    const response = await api.get('/stats/type-distribution');
    return response.data;
  }

  // Historial de sesiones por día
  static async getDailyHistory(days: number = 30): Promise<ChartData> {
    const response = await api.get(`/stats/daily-history?days=${days}`);
    return response.data;
  }

  // Horas productivas por mes
  static async getMonthlyProductivity(): Promise<ChartData> {
    const response = await api.get('/stats/monthly-productivity');
    return response.data;
  }

  // Racha de días consecutivos
  static async getStreak(): Promise<StreakData> {
    const response = await api.get('/stats/streak');
    return response.data;
  }

  // Duración promedio de sesiones
  static async getAverageSessionDuration(): Promise<AverageSessionData> {
    const response = await api.get('/stats/average-session-duration');
    return response.data;
  }

  // Distribución de estados de sesión
  static async getSessionStatus(): Promise<ChartData> {
    const response = await api.get('/stats/session-status');
    return response.data;
  }

  // Sesiones por semana del mes actual
  static async getWeeklyInMonth(): Promise<ChartData> {
    const response = await api.get('/stats/weekly-in-month');
    return response.data;
  }
}

export default StatsService; 
import { useState, useEffect } from 'react';
import StatsService, { type ChartData, type StreakData, type AverageSessionData } from '../services/statsService';

export const useStats = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    productivityHours: null as ChartData | null,
    weeklyProductivity: null as ChartData | null,
    typeDistribution: null as ChartData | null,
    dailyHistory: null as ChartData | null,
    monthlyProductivity: null as ChartData | null,
    streak: null as StreakData | null,
    averageSessionDuration: null as AverageSessionData | null,
    sessionStatus: null as ChartData | null,
    weeklyInMonth: null as ChartData | null,
  });

  const fetchAllStats = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [
        productivityHours,
        weeklyProductivity,
        typeDistribution,
        dailyHistory,
        monthlyProductivity,
        streak,
        averageSessionDuration,
        sessionStatus,
        weeklyInMonth
      ] = await Promise.all([
        StatsService.getProductivityHours(),
        StatsService.getWeeklyProductivity(),
        StatsService.getTypeDistribution(),
        StatsService.getDailyHistory(30),
        StatsService.getMonthlyProductivity(),
        StatsService.getStreak(),
        StatsService.getAverageSessionDuration(),
        StatsService.getSessionStatus(),
        StatsService.getWeeklyInMonth()
      ]);

      setStats({
        productivityHours,
        weeklyProductivity,
        typeDistribution,
        dailyHistory,
        monthlyProductivity,
        streak,
        averageSessionDuration,
        sessionStatus,
        weeklyInMonth
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Error al cargar las estadísticas. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStats();
  }, []);

  const refreshStats = () => {
    fetchAllStats();
  };

  return {
    stats,
    loading,
    error,
    refreshStats
  };
}; 
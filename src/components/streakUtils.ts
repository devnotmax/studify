import { useState, useEffect } from "react";
import { sessionService } from "../services/sessionService";
import type { StreakInfo } from "../types";

export function useStreakInfo() {
  const [streakInfo, setStreakInfo] = useState<StreakInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [noStreak, setNoStreak] = useState(false);

  const loadStreakInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      setNoStreak(false);
      const response = await sessionService.getStreakInfo();

      // Manejar el nuevo formato de respuesta que incluye el objeto "streak"
      if (response && typeof response === "object" && "streak" in response) {
        const streakData = response.streak as StreakInfo;
        setStreakInfo(streakData);
      } else if (
        response &&
        typeof response === "object" &&
        "message" in response
      ) {
        setNoStreak(true);
        setStreakInfo(null);
      } else {
        // Fallback para el formato anterior
        setStreakInfo(response as StreakInfo);
      }
    } catch (err) {
      setError("Error loading streak statistics");
      console.error("Error loading streak info:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStreakInfo();
  }, []);

  return { streakInfo, loading, error, noStreak, reload: loadStreakInfo };
}

export const formatDate = (dateString: string) => {
  try {
    console.log('Original date string:', dateString);
    
    // Parsear la fecha de manera más explícita para evitar problemas de zona horaria
    const date = new Date(dateString + 'T00:00:00'); // Agregar tiempo para evitar problemas de zona horaria
    
    console.log('Parsed date:', date);
    console.log('Date.getDate():', date.getDate());
    console.log('Date.getMonth():', date.getMonth());
    console.log('Date.getFullYear():', date.getFullYear());
    
    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateString);
      return 'Invalid date';
    }
    
    // Usar una implementación más explícita que no dependa del locale
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const monthName = months[date.getMonth()];
    const dayNumber = date.getDate();
    const yearNumber = date.getFullYear();
    
    const result = `${monthName} ${dayNumber}, ${yearNumber}`;
    console.log('Formatted result:', result);
    
    return result;
  } catch (error) {
    console.error('Error formatting date:', error, dateString);
    return 'Invalid date';
  }
};

export const getStreakEmoji = (streak: number) => {
  if (streak === 0) return "🌱";
  if (streak < 3) return "🔥";
  if (streak < 7) return "🔥🔥";
  if (streak < 14) return "🔥🔥🔥";
  if (streak < 30) return "🔥🔥🔥🔥";
  return "🔥🔥🔥🔥🔥";
};

export const getStreakMessage = (streak: number) => {
  if (streak === 0) return "Start your streak today!";
  if (streak === 1) return "Great! Keep up the pace";
  if (streak < 7) return "Nice streak! Keep going";
  if (streak < 14) return "Impressive streak!";
  if (streak < 30) return "You are a study master!";
  return "Legend! Your dedication is amazing";
};

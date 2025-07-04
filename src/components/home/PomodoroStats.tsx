import React, { useEffect, useState } from "react";
import StreakStatsCompact from "../StreakStatsCompact";
import { sessionService } from "../../services/sessionService";

interface PomodoroStatsProps {
  todayCount?: number;
  weekCount?: number;
  totalCount?: number;
}

const DAILY_GOAL = 6;

const PomodoroStats: React.FC<PomodoroStatsProps> = () => {
  const [todayCount, setTodayCount] = useState(0);
  const [weekCount, setWeekCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sessionService.getSessionStats()
      .then((data) => {
        setTodayCount(data.today);
        setWeekCount(data.week);
        setTotalCount(data.total);
        setLoading(false);
      })
      .catch(() => {
        setError("Error loading session stats");
        setLoading(false);
      });
  }, []);

  const progress = Math.min(todayCount / DAILY_GOAL, 1) * 100;

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md w-full p-4 min-h-[100px] flex items-center justify-center">
        <span className="text-gray-400">Loading session stats...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md w-full p-4 min-h-[100px] flex items-center justify-center">
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md w-full p-4 min-h-[100px] mb-4">
      <div className="flex flex-row items-center justify-between mb-2">
        <span className="text-sm text-gray-700 font-medium flex items-center">
          <span className="material-icons text-base mr-1">schedule</span>
          your pomodoros
        </span>
        <span className="text-xs text-gray-500">
          {todayCount} of {DAILY_GOAL} pomodoros
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-brown h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex flex-row gap-4 mb-4">
        <div className="flex-1 bg-gray-100 rounded-xl flex flex-col items-center py-3">
          <span className="text-2xl font-bold text-gray-800">{todayCount}</span>
          <span className="text-xs text-gray-500 mt-1">today</span>
        </div>
        <div className="flex-1 bg-gray-100 rounded-xl flex flex-col items-center py-3">
          <span className="text-2xl font-bold text-gray-800">{weekCount}</span>
          <span className="text-xs text-gray-500 mt-1">week</span>
        </div>
        <div className="flex-1 bg-gray-100 rounded-xl flex flex-col items-center py-3">
          <span className="text-2xl font-bold text-gray-800">{totalCount}</span>
          <span className="text-xs text-gray-500 mt-1">total</span>
        </div>
      </div>
      <div className="mt-2">
        <StreakStatsCompact />
      </div>
    </div>
  );
};

export default PomodoroStats;

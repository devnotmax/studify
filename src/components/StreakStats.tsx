import React from "react";
import { RibbonIcon } from "../icons/RibbonIcon";
import {
  useStreakInfo,
  getStreakEmoji,
  getStreakMessage,
  formatDate,
} from "./streakUtils";

interface StreakStatsProps {
  className?: string;
}

export const StreakStats: React.FC<StreakStatsProps> = ({ className = "" }) => {
  const { streakInfo, loading, error, noStreak, reload } = useStreakInfo();
  const isValidStreak =
    streakInfo &&
    typeof streakInfo.currentStreak === "number" &&
    !isNaN(streakInfo.currentStreak);

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading statistics...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="text-red-600 mb-2">⚠️</div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={reload}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (noStreak || !isValidStreak) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🌱</div>
          <p className="text-gray-700 font-semibold mb-2">
            You don't have an active streak yet
          </p>
          <p className="text-gray-500 mb-4">
            Start your first focus session today and begin your streak!
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
            <div className="text-sm text-gray-700">
              <div className="font-medium mb-1">💡 Tip:</div>
              Consistency is key! Even a short session every day can make a
              difference.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <RibbonIcon className="w-5 h-5 mr-2" />
          Your Streak
        </h2>
        <div className="text-2xl">
          {getStreakEmoji(streakInfo.currentStreak)}
        </div>
      </div>

      <div className="space-y-6">
        {/* Current Streak */}
        <div className="text-center">
          <div className="text-4xl font-bold text-primaryDark mb-2">
            {streakInfo.currentStreak}
          </div>
          <div className="text-sm text-gray-600 mb-2">consecutive days</div>
          <div className="text-sm text-gray-500">
            {getStreakMessage(streakInfo.currentStreak)}
          </div>
        </div>

        {/* Longest Streak */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Longest streak</div>
              <div className="text-2xl font-bold text-gray-800">
                {streakInfo.longestStreak} days
              </div>
            </div>
            <div className="text-2xl">🏆</div>
          </div>
        </div>

        {/* Last Activity */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Last activity</div>
              <div className="text-sm font-medium text-gray-800">
                {formatDate(streakInfo.lastActivityDate)}
              </div>
            </div>
            <div className="text-2xl">📅</div>
          </div>
        </div>

        {/* Progress to next goal */}
        {streakInfo.currentStreak > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Next goal</span>
              <span className="font-medium text-gray-800">
                {Math.ceil(streakInfo.currentStreak / 7) * 7} days
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primaryDark h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(
                    100,
                    ((streakInfo.currentStreak % 7) / 7) * 100
                  )}%`,
                }}
              />
            </div>
            <div className="text-xs text-gray-500 text-center">
              {7 - (streakInfo.currentStreak % 7)} days to next goal
            </div>
          </div>
        )}

        {/* Motivational Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <div className="text-sm text-gray-700">
            <div className="font-medium mb-1">💡 Tip of the day:</div>
            {streakInfo.currentStreak === 0 &&
              "Start with a 25-minute session today to begin your study streak."}
            {streakInfo.currentStreak > 0 &&
              streakInfo.currentStreak < 3 &&
              "Stay consistent. Even 15 minutes of daily study can make a difference."}
            {streakInfo.currentStreak >= 3 &&
              streakInfo.currentStreak < 7 &&
              "Great progress! Consider gradually increasing your study time."}
            {streakInfo.currentStreak >= 7 &&
              "You're a dedication example! Share your method with other students."}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import type { SessionResults as SessionResultsType } from '../types';
import { RibbonIcon } from '../icons/RibbonIcon';
import TimerIcon from '../icons/TimerIcon';

interface SessionResultsProps {
  results: SessionResultsType;
  onClose: () => void;
  className?: string;
}

export const SessionResults: React.FC<SessionResultsProps> = ({ 
  results, 
  onClose, 
  className = '' 
}) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getSessionTypeLabel = (sessionType: string) => {
    switch (sessionType) {
      case 'focus':
        return 'Focus Session';
      case 'short_break':
        return 'Short Break';
      case 'long_break':
        return 'Long Break';
      default:
        return sessionType;
    }
  };

  const getStreakEmoji = (streak: number) => {
    if (streak === 0) return '🔥';
    if (streak < 3) return '🔥';
    if (streak < 7) return '🔥🔥';
    if (streak < 14) return '🔥🔥🔥';
    if (streak < 30) return '🔥🔥🔥🔥';
    return '🔥🔥🔥🔥🔥';
  };

  const getAchievementMessage = (achievements: Array<{ name: string; description?: string }>) => {
    if (achievements.length === 0) return null;
    
    // Aquí puedes personalizar los mensajes según los logros
    return (
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 mb-4">
        <div className="flex items-center mb-2">
          <span className="text-2xl mr-2">🏆</span>
          <span className="font-semibold text-gray-800">¡Nuevos Logros!</span>
        </div>
        <div className="text-sm text-gray-700">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center mb-1">
              <span className="mr-2">✨</span>
              <span>{achievement.name || `Logro ${index + 1}`}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${className}`}>
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Session Completed!
          </h2>
          <p className="text-gray-600">
            {getSessionTypeLabel(results.session.sessionType)}
          </p>
        </div>

        {/* Session details */}
        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TimerIcon className="w-5 h-5 mr-2 text-blue-600" />
                <span className="text-sm text-gray-600">Completed time</span>
              </div>
              <span className="text-lg font-bold text-blue-600">
                {formatDuration(results.session.completedTime)}
              </span>
            </div>
          </div>

          {/* Streak information */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <RibbonIcon className="w-5 h-5 mr-2 text-green-600" />
                <span className="text-sm text-gray-600">Your current streak</span>
              </div>
              <span className="text-2xl">{getStreakEmoji(results.streak.currentStreak)}</span>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {results.streak.currentStreak}
              </div>
              <div className="text-sm text-gray-600">consecutive days</div>
            </div>
          </div>

          {/* Longest streak */}
          {results.streak.longestStreak > results.streak.currentStreak && (
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Longest streak</div>
                  <div className="text-lg font-bold text-purple-600">
                    {results.streak.longestStreak} days
                  </div>
                </div>
                <span className="text-2xl">🏆</span>
              </div>
            </div>
          )}

          {/* New achievements */}
          {results.newAchievements && results.newAchievements.length > 0 && 
            getAchievementMessage(results.newAchievements)
          }
        </div>

        {/* Motivational message */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-700">
            <div className="font-medium mb-1">💪 Great job!</div>
            {results.streak.currentStreak === 1 && 
              "You've started your study streak! Keep up the consistency."}
            {results.streak.currentStreak > 1 && results.streak.currentStreak < 7 && 
              "You're building a solid foundation! Every session counts."}
            {results.streak.currentStreak >= 7 && 
              "You're an example of dedication! Your discipline is admirable."}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}; 
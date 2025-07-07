import React from "react";
import { type StreakData } from "../../services/statsService";
import { HeartIcon } from "../../icons/HeartIcon";

interface StreakCardProps {
  streak: StreakData;
}

const StreakCard: React.FC<StreakCardProps> = ({ streak }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-transparent from-peach to-lavender rounded-xl p-6 shadow-sm border border-lightBorder">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text">Racha de Estudio</h3>
        <div className="text-brown">
          <HeartIcon style={{ width: 24, height: 24 }} fill="currentColor" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-text mb-1">
            {streak.currentStreak}
          </div>
          <div className="text-sm text-secondaryText">Días actuales</div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-text mb-1">
            {streak.longestStreak}
          </div>
          <div className="text-sm text-secondaryText">Mejor racha</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-lightBorder">
        <div className="text-sm text-secondaryText">
          Última actividad: {formatDate(streak.lastActivityDate)}
        </div>
      </div>

      {streak.currentStreak > 0 && (
        <div className="mt-3 flex items-center justify-center">
          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            ¡Mantén la racha! 🔥
          </div>
        </div>
      )}
    </div>
  );
};

export default StreakCard;

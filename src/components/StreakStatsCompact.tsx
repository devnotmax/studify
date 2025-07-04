import React, { useState } from "react";
import BaseModal from "./modals/BaseModal/BaseModal";
import { StreakStats } from "./StreakStats";
import { useStreakInfo } from "./streakUtils";

const StreakStatsCompact: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const { streakInfo, loading, error } = useStreakInfo();
  const [open, setOpen] = useState(false);

  let content = <span className="text-gray-400">...</span>;
  if (loading) content = <span className="text-gray-400">Loading...</span>;
  else if (error) content = <span className="text-red-500">Error</span>;
  else if (
    !streakInfo ||
    !streakInfo.currentStreak ||
    streakInfo.currentStreak === 0
  ) {
    content = (
      <span className="flex items-center gap-1 cursor-pointer select-none">
        <span className="text-xl">🌱</span>
        <span className="font-semibold text-text">No active streak</span>
      </span>
    );
  } else {
    content = (
      <span className="flex items-center gap-1 cursor-pointer select-none">
        <span className="font-semibold text-text">
          🌱 {streakInfo.currentStreak} days
        </span>
      </span>
    );
  }

  return (
    <>
      <div
        className={`inline-flex w-full items-center px-2 py-1 rounded-lg bg-white shadow cursor-pointer hover:bg-blue-50 transition ${className}`}
        onClick={() => setOpen(true)}
        title="View your streak details"
      >
        {content}
      </div>
      <BaseModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Your study streak"
      >
        <StreakStats />
      </BaseModal>
    </>
  );
};

export default StreakStatsCompact;

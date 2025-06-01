import React, { useState } from "react";
import { SoundIcon } from "../../../icons/SoundIcon";
import TimerIcon from "../../../icons/TimerIcon";
import { PaintIcon } from "../../../icons/PaintIcon";
type Tab = "timer" | "sound" | "appearance";

interface ConfigMenuProps {
  onSelect: (tab: Tab) => void;
}

const ConfigMenu: React.FC<ConfigMenuProps> = ({ onSelect }) => {
  const [activeTab, setActiveTab] = useState<Tab>("timer");

  const handleClick = (tab: Tab) => {
    setActiveTab(tab);
    onSelect(tab);
  };

  const tabStyles = (tab: Tab) =>
    `px-4 py-1 rounded-md text-md font-light transition-all duration-200 ${
      activeTab === tab
        ? "bg-white text-text shadow-sm"
        : "bg-transparent text-secondaryText hover:text-text"
    }`;

  return (
    <div className="flex gap-2 bg-lightGray p-1 rounded-md">
      <button
        className={tabStyles("timer")}
        onClick={() => handleClick("timer")}
        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
      >
        <TimerIcon className="w-5 h-5" />
        <p>timer</p>
      </button>
      <button
        className={tabStyles("sound")}
        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        onClick={() => handleClick("sound")}
      >
        <SoundIcon className="w-5 h-5" />
        <p>sound</p>
      </button>
      <button
        className={tabStyles("appearance")}
        onClick={() => handleClick("appearance")}
        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
      >
        <PaintIcon className="w-5 h-5" />
        <p>appearance</p>
      </button>
    </div>
  );
};

export default ConfigMenu;

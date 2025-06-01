import React, { useState } from "react";
import TextInput from "../../inputs/TextInput"; // Ajusta la ruta según tu estructura

interface TimerSettings {
  focus: number;
  shortBreak: number;
  longBreak: number;
  autoStart: boolean;
}

interface TimerConfigProps {
  initialSettings?: TimerSettings;
  onSave?: (settings: TimerSettings) => void;
  onReset?: () => void;
}

const TimerConfig: React.FC<TimerConfigProps> = ({
  initialSettings = {
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStart: false,
  },
  onSave,
  onReset,
}) => {
  const [settings, setSettings] = useState<TimerSettings>(initialSettings);

  const handleInputChange = (
    field: keyof Omit<TimerSettings, "autoStart">,
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    setSettings((prev) => ({
      ...prev,
      [field]: Math.max(1, Math.min(999, numValue)), // Limitar entre 1 y 999
    }));
  };

  const handleToggleChange = () => {
    setSettings((prev) => ({
      ...prev,
      autoStart: !prev.autoStart,
    }));
  };

  const handleSave = () => {
    onSave?.(settings);
  };

  const handleReset = () => {
    const defaultSettings = {
      focus: 25,
      shortBreak: 5,
      longBreak: 15,
      autoStart: false,
    };
    setSettings(defaultSettings);
    onReset?.();
  };

  return (
    <div className="space-y-6">
      {/* Duration Section */}
      <div>
        <h3 className="text-md font-light text-text mb-4">
          duration (minutes)
        </h3>

        {/* Focus Time */}
        <div className="mb-4">
          <TextInput
            label="focus"
            value={settings.focus.toString()}
            onChange={(value) => handleInputChange("focus", value)}
            placeholder="Enter focus time"
            unity="mins"
          />
        </div>

        {/* Short Break */}
        <div className="mb-4">
          <TextInput
            label="short break"
            value={settings.shortBreak.toString()}
            onChange={(value) => handleInputChange("shortBreak", value)}
            placeholder="Enter short break time"
            unity="mins"
          />
        </div>

        {/* Long Break */}
        <div className="mb-6">
          <TextInput
            label="long break"
            value={settings.longBreak.toString()}
            onChange={(value) => handleInputChange("longBreak", value)}
            placeholder="Enter long break time"
            unity="mins"
          />
        </div>
      </div>

      {/* Auto Start Toggle */}
      <div className="flex items-center justify-between py-4 px-2">
        <span className="text-md font-light text-text">
          start automatically
        </span>
        <button
          onClick={handleToggleChange}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            settings.autoStart ? "bg-greenPastel" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
              settings.autoStart ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-6">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-peach text-text rounded-md hover:bg-brown hover:text-white transition-colors duration-150 text-md font-light"
        >
          save settings
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-white border border-gray-200 text-text rounded-md hover:bg-gray-50 transition-colors duration-150 text-md font-light"
        >
          reset default settings
        </button>
      </div>
    </div>
  );
};

export default TimerConfig;

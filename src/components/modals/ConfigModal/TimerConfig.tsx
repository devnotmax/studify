import React, { useState } from "react";
import TextInput from "../../inputs/TextInput";
import { useTimer } from "../../../context/TimerContext";
import { toast } from "react-toastify";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { InfoIcon } from "../../../icons/InfoIcon";

interface TimerConfigProps {
  onSave?: () => void;
  onReset?: () => void;
}

const TimerConfig: React.FC<TimerConfigProps> = ({ onSave, onReset }) => {
  const { settings, updateSettings, studyTechniques } = useTimer();
  const [localSettings, setLocalSettings] = useState(settings);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleInputChange = (
    field: keyof Omit<typeof settings, "autoStart" | "selectedTechnique">,
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    setLocalSettings((prev) => ({
      ...prev,
      [field]: value === "" ? "" : Math.max(1, Math.min(999, numValue)),
    }));
  };

  const handleToggleChange = () => {
    setLocalSettings((prev) => ({
      ...prev,
      autoStart: !prev.autoStart,
    }));
  };

  const handleTechniqueChange = (techniqueId: string) => {
    const technique = studyTechniques.find((t) => t.id === techniqueId);
    if (technique) {
      setLocalSettings((prev) => ({
        ...prev,
        selectedTechnique: techniqueId,
        focus: technique.defaultSettings.focus,
        shortBreak: technique.defaultSettings.shortBreak,
        longBreak: technique.defaultSettings.longBreak,
      }));
    }
  };

  const handleSave = () => {
    if (!localSettings.focus || !localSettings.shortBreak || !localSettings.longBreak) {
      toast.error("Please fill in all duration fields");
      return;
    }
    updateSettings(localSettings);
    onSave?.();
    toast.success("Settings saved");
  };

  const handleReset = () => {
    const defaultSettings = {
      focus: 25,
      shortBreak: 5,
      longBreak: 15,
      autoStart: false,
      selectedTechnique: "classic",
    };
    setLocalSettings(defaultSettings);
    updateSettings(defaultSettings);
    onReset?.();
    toast.success("Settings reset to default");
  };

  return (
    <div className="space-y-6">
      {/* Auto Start Toggle */}
      <div className="flex items-center justify-between py-4 px-2">
        <span className="text-md font-light text-text">
          start automatically
        </span>
        <button
          onClick={handleToggleChange}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            localSettings.autoStart ? "bg-greenPastel" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
              localSettings.autoStart ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Study Technique Selection - Solo visible cuando autoStart está activado */}
      {localSettings.autoStart && (
        <div>
          <h3 className="text-md font-light text-text mb-4">
            study technique
          </h3>
          <div className="space-y-3">
            {studyTechniques.map((technique) => (
              <div key={technique.id} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={technique.id}
                  name="technique"
                  checked={localSettings.selectedTechnique === technique.id}
                  onChange={() => handleTechniqueChange(technique.id)}
                  className="w-4 h-4 text-peach focus:ring-peach"
                />
                <label
                  htmlFor={technique.id}
                  className="text-text text-md font-light flex items-center gap-2"
                >
                  {technique.name}
                  <div className="relative group">
                    <InfoIcon className="w-4 h-4 text-secondaryText cursor-help" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white rounded-lg shadow-lg text-sm text-text w-64 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {technique.description}
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Duration Section */}
      <div>
        <h3 className="text-md font-light text-text mb-4">
          duration (minutes)
        </h3>

        {/* Focus Time */}
        <div className="mb-4">
          <TextInput
            label="focus"
            value={localSettings.focus.toString()}
            onChange={(value) => handleInputChange("focus", value)}
            placeholder="Enter focus time"
            unity="mins"
          />
        </div>

        {/* Short Break */}
        <div className="mb-4">
          <TextInput
            label="short break"
            value={localSettings.shortBreak.toString()}
            onChange={(value) => handleInputChange("shortBreak", value)}
            placeholder="Enter short break time"
            unity="mins"
          />
        </div>

        {/* Long Break */}
        <div className="mb-6">
          <TextInput
            label="long break"
            value={localSettings.longBreak.toString()}
            onChange={(value) => handleInputChange("longBreak", value)}
            placeholder="Enter long break time"
            unity="mins"
          />
        </div>
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
          onClick={() => setShowResetConfirm(true)}
          className="px-4 py-2 bg-white border border-gray-200 text-text rounded-md hover:bg-gray-50 transition-colors duration-150 text-md font-light"
        >
          reset default settings
        </button>
      </div>

      <ConfirmModal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={() => {
          handleReset();
          setShowResetConfirm(false);
        }}
        title="Reset Settings"
        message="Are you sure you want to reset all settings to default values?"
        confirmText="Reset"
        cancelText="Cancel"
      />
    </div>
  );
};

export default TimerConfig;

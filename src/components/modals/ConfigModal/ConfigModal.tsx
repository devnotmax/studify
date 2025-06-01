import React, { useState } from "react";
import BaseModal from "../BaseModal/BaseModal";
import ConfigMenu from "./ConfigMenu";
import TimerConfig from "./TimerConfig";

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string;
}

type Tab = "timer" | "sound" | "appearance";

const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  width,
}) => {
  const [selectedTab, setSelectedTab] = useState<Tab>("timer");

  const handleTimerSave = (settings: any) => {
    console.log("Timer settings saved:", settings);
    // Aquí puedes manejar el guardado de configuraciones
  };

  const handleTimerReset = () => {
    console.log("Timer settings reset to default");
    // Aquí puedes manejar el reset de configuraciones
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "timer":
        return (
          <TimerConfig onSave={handleTimerSave} onReset={handleTimerReset} />
        );
      case "sound":
        return <div>Sound settings content here</div>;
      case "appearance":
        return <div>Appearance settings content here</div>;
      default:
        return null;
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} width={width} title="settings">
      <ConfigMenu onSelect={setSelectedTab} />
      <div className="mt-6">{renderTabContent()}</div>
    </BaseModal>
  );
};

export default ConfigModal;

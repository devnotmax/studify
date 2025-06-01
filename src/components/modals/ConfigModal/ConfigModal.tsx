import React, { useState } from "react";
import BaseModal from "../BaseModal/BaseModal";
import ConfigMenu from "./ConfigMenu";

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

  const renderTabContent = () => {
    switch (selectedTab) {
      case "timer":
        return <div>Timer settings content here</div>;
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

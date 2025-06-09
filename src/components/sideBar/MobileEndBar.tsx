import { useState } from "react";
import ConfigModal from "../modals/ConfigModal/ConfigModal";
import { SettingsIcon } from "../../icons/SettingsIcon";
import { MusicIcon } from "../../icons/MusicIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";

const MobileEndBar = () => {
  const [openConfig, setOpenConfig] = useState(false);
  return (
    <div className="flex justify-around items-center w-full h-full">
      <button onClick={() => setOpenConfig(true)}>
        <SettingsIcon />
      </button>
      <button>
        <MusicIcon />
      </button>
      <button>
        <YoutubeIcon />
      </button>
      <ConfigModal isOpen={openConfig} onClose={() => setOpenConfig(false)} />
    </div>
  );
};

export default MobileEndBar;

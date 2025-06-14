import { useState } from "react";
import ConfigModal from "../modals/ConfigModal/ConfigModal";
import { SettingsIcon } from "../../icons/SettingsIcon";
import { MusicIcon } from "../../icons/MusicIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { UserIcon } from "../../icons/UserIcon";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeIcon } from "../../icons/HomeIcon";

const MobileEndBar = () => {
  const [openConfig, setOpenConfig] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="flex justify-around items-center w-full h-full">
      <button onClick={() => setOpenConfig(true)}>
        <SettingsIcon
          className={
            location.pathname === "/settings" ? "text-brown" : "text-gray-400"
          }
        />
      </button>
      <button>
        <MusicIcon
          className={
            location.pathname === "/music" ? "text-brown" : "text-gray-400"
          }
        />
      </button>
      <button onClick={() => navigate("/")}>
        <HomeIcon
          className={location.pathname === "/" ? "text-brown" : "text-gray-400"}
        />
      </button>
      <button>
        <YoutubeIcon
          className={
            location.pathname === "/youtube" ? "text-brown" : "text-gray-400"
          }
        />
      </button>
      <button onClick={() => navigate("/profile")}>
        <UserIcon
          className={
            location.pathname === "/profile" ? "text-brown" : "text-gray-400"
          }
        />
      </button>
      <ConfigModal isOpen={openConfig} onClose={() => setOpenConfig(false)} />
    </div>
  );
};

export default MobileEndBar;

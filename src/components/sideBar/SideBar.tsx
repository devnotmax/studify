import SideBarLogo from "./SideBarLogo";
import { SideBarItem } from "./SideBarItem";
import { BrainIcon } from "../../icons/BrainIcon";
import { SideBarTitle } from "./SideBarTitle";
import { CoffeeIcon } from "../../icons/CoffeeIcon";
import { useTimer } from "../../context/TimerContext";
import { Avocado } from "../../icons/Avocado";
import { MusicIcon } from "../../icons/MusicIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SettingsIcon } from "../../icons/SettingsIcon";
import ConfigModal from "../modals/ConfigModal/ConfigModal";
import { useState } from "react";


const StudifySidebar = () => {
  const { mode, setMode } = useTimer();
  const [settingsModal, setSettingsModal] = useState(false);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-md flex flex-col">
        <SideBarLogo />
        <main className="mt-10">
          <section>
            <SideBarTitle title="timer" />
            <div className="flex flex-col">
              <SideBarItem
                decorator={BrainIcon}
                title="focus"
                selected={mode === "focus"}
                onSelect={() => setMode("focus")}
              />
              <SideBarItem
                decorator={CoffeeIcon}
                title="short break"
                selected={mode === "short-break"}
                onSelect={() => setMode("short-break")}
              />
              <SideBarItem
                decorator={Avocado}
                title="long break"
                selected={mode === "long-break"}
                onSelect={() => setMode("long-break")}
              />
            </div>
          </section>
          <section>
            <SideBarTitle title="media" />
            <div className="flex flex-col">
              <SideBarItem
                decorator={MusicIcon}
                title="spotify"
                onSelect={() => console.log("music")}
              />
              <SideBarItem
                decorator={YoutubeIcon}
                title="youtube"
                onSelect={() => console.log("youtube")}
              />
            </div>
          </section>
          <section>
            <SideBarTitle title="settings" />
            <div className="flex flex-col">
              <SideBarItem
                decorator={SettingsIcon}
                title="settings"
                onSelect={() => setSettingsModal(true)}
              />
            </div>
          </section>
        </main>
      </div>
      <ConfigModal
        isOpen={settingsModal}
        onClose={() => setSettingsModal(false)}
        width="50%"
      />
    </div>
  );
};

export default StudifySidebar;

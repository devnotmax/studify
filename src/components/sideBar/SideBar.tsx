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
import { MenuIcon } from "../../icons/MenuIcon";
import { UserIcon } from "../../icons/UserIcon";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeIcon } from "../../icons/HomeIcon";

const StudifySidebar = () => {
  const { mode, setMode } = useTimer();
  const [settingsModal, setSettingsModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <MenuIcon className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-0 z-40 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="h-screen bg-white shadow-md flex flex-col w-52">
          <SideBarLogo />
          <main className="mt-4 overflow-y-auto">
            <section>
              <SideBarTitle title="timer" />
              <div className="flex flex-col">
                {location.pathname !== "/" && (
                  <SideBarItem
                    decorator={HomeIcon}
                    title="home"
                    onSelect={() => {
                      navigate("/");
                      setIsMobileMenuOpen(false);
                    }}
                  />
                )}
                <SideBarItem
                  decorator={BrainIcon}
                  title="focus"
                  selected={mode === "focus"}
                  onSelect={() => {
                    setMode("focus");
                    setIsMobileMenuOpen(false);
                  }}
                />
                <SideBarItem
                  decorator={CoffeeIcon}
                  title="short break"
                  selected={mode === "short-break"}
                  onSelect={() => {
                    setMode("short-break");
                    setIsMobileMenuOpen(false);
                  }}
                />
                <SideBarItem
                  decorator={Avocado}
                  title="long break"
                  selected={mode === "long-break"}
                  onSelect={() => {
                    setMode("long-break");
                    setIsMobileMenuOpen(false);
                  }}
                />
              </div>
            </section>
            <section>
              <SideBarTitle title="media" />
              <div className="flex flex-col">
                <SideBarItem
                  decorator={MusicIcon}
                  title="spotify"
                  onSelect={() => {
                    console.log("music");
                    setIsMobileMenuOpen(false);
                  }}
                />
                <SideBarItem
                  decorator={YoutubeIcon}
                  title="youtube"
                  onSelect={() => {
                    console.log("youtube");
                    setIsMobileMenuOpen(false);
                  }}
                />
              </div>
            </section>
            <section>
              <SideBarTitle title="account" />
              <div className="flex flex-col">
                <SideBarItem
                  decorator={SettingsIcon}
                  title="settings"
                  onSelect={() => {
                    setSettingsModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                />
                <SideBarItem
                  decorator={UserIcon}
                  title="profile"
                  onSelect={() => {
                    navigate("/profile");
                    setIsMobileMenuOpen(false);
                  }}
                />
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <ConfigModal
        isOpen={settingsModal}
        onClose={() => setSettingsModal(false)}
        width="50%"
      />
    </>
  );
};

export default StudifySidebar;

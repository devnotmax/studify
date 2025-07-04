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
import { MoonIcon } from "../../icons/MoonIcon";
import LoginCard from "../ui/LoginCard";
import YoutubeSearchModal from "../RigthSideBar/YoutubeSearchModal";

const StudifySidebar = () => {
  const { mode, setMode } = useTimer();
  const [settingsModal, setSettingsModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({
    timer: false,
    media: false,
    account: false,
    nature: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [youtubeModalOpen, setYoutubeModalOpen] = useState(false);

  const handleSectionToggle = (sectionName: string, collapsed: boolean) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionName]: collapsed,
    }));
  };

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
        <div className="h-screen w-full bg-white shadow-md flex flex-col justify-between overflow-y-auto">
          <div>
            <SideBarLogo />
            <main className="mt-4 overflow-y-auto">
              <section>
                <SideBarTitle
                  title="timer"
                  collapsible={true}
                  defaultCollapsed={collapsedSections.timer}
                  onToggle={(collapsed) =>
                    handleSectionToggle("timer", collapsed)
                  }
                />
                {!collapsedSections.timer && (
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
                    {location.pathname === "/" && (
                      <>
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
                      </>
                    )}
                  </div>
                )}
              </section>
              <section>
                <SideBarTitle
                  title="media"
                  collapsible={true}
                  defaultCollapsed={collapsedSections.media}
                  onToggle={(collapsed) =>
                    handleSectionToggle("media", collapsed)
                  }
                />
                {!collapsedSections.media && (
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
                        setYoutubeModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                    />
                  </div>
                )}
              </section>
              <section>
                <SideBarTitle
                  title="account"
                  collapsible={true}
                  defaultCollapsed={collapsedSections.account}
                  onToggle={(collapsed) =>
                    handleSectionToggle("account", collapsed)
                  }
                />
                {!collapsedSections.account && (
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
                      selected={location.pathname === "/profile"}
                      onSelect={() => {
                        navigate("/profile");
                        setIsMobileMenuOpen(false);
                      }}
                    />
                  </div>
                )}
              </section>
              <section>
                <SideBarTitle
                  title="NATURE"
                  collapsible={true}
                  defaultCollapsed={collapsedSections.nature}
                  onToggle={(collapsed) =>
                    handleSectionToggle("nature", collapsed)
                  }
                />
                {!collapsedSections.nature && (
                  <div className="flex flex-col">
                    <SideBarItem
                      decorator={MoonIcon}
                      title="lunar cycle"
                      selected={location.pathname === "/lunar-cycle"}
                      onSelect={() => {
                        navigate("/lunar-cycle");
                        setIsMobileMenuOpen(false);
                      }}
                    />
                  </div>
                )}
              </section>
            </main>
          </div>
          <LoginCard />
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

      <YoutubeSearchModal
        isOpen={youtubeModalOpen}
        onClose={() => setYoutubeModalOpen(false)}
      />
    </>
  );
};

export default StudifySidebar;

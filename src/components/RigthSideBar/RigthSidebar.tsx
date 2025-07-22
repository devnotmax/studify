import React, { useState } from "react";
import { PlayingTitle } from "./PlayingTitle";
import { RecentSessions } from "./RecentSessions";
import { YoutubeVideo } from "./YoutubeVideo";
import { SideBarTitle } from "../sideBar/SideBarTitle";

type SectionKey = "playing" | "youtube" | "recent";

// Títulos de las secciones
const sections: {
  key: SectionKey;
  title: string;
  component: React.ReactElement;
}[] = [
  {
    key: "playing",
    title: "Now Playing",
    component: <PlayingTitle />,
  },
  { key: "recent", title: "History", component: <RecentSessions /> },
];

type Props = {
  onClose?: () => void;
  className?: string;
};

const StudifyEndSidebar = ({ onClose, className = "" }: Props) => {
  // Estado de colapso por sección
  const [collapsed, setCollapsed] = useState<Record<SectionKey, boolean>>({
    playing: false,
    youtube: false,
    recent: false,
  });

  const handleToggle = (key: SectionKey, isCollapsed: boolean) => {
    setCollapsed((prev) => ({ ...prev, [key]: isCollapsed }));
  };

  return (
    <div
      className={`w-80 max-w-full bg-white shadow-md p-4 overflow-y-auto h-screen ${className}`}
    >
      {/* Botón de cerrar solo en mobile */}
      {onClose && (
        <button
          className="block lg:hidden ml-auto mb-4 text-2xl font-bold text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
      )}
      {/* Secciones colapsables con SideBarTitle */}
      {sections.map((section) => (
        <div key={section.key}>
          <SideBarTitle
            title={section.title}
            collapsible={true}
            defaultCollapsed={collapsed[section.key]}
            onToggle={(isCollapsed) => handleToggle(section.key, isCollapsed)}
          />
          {!collapsed[section.key] && (
            <div className="mt-2">{section.component}</div>
          )}
          {/* Always mount YoutubeVideo, but only show it when Now Playing is expanded */}
          {section.key === "playing" && (
            <div className={collapsed.playing ? "hidden" : "mt-2"}>
              <YoutubeVideo />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StudifyEndSidebar;

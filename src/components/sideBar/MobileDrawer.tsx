import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "../../icons/XIcon";
import { BrainIcon } from "../../icons/BrainIcon";
import { CoffeeIcon } from "../../icons/CoffeeIcon";
import { Avocado } from "../../icons/Avocado";
import { useState } from "react";
import ConfigModal from "../modals/ConfigModal/ConfigModal";
import { SessionItem } from "../RigthSideBar/SessionItem";
import { SideBarTitle } from "./SideBarTitle";
import { Divider } from "../ui/Divider";
import { YoutubeVideo } from "../RigthSideBar/YoutubeVideo";
import { PlayingTitle } from "../RigthSideBar/PlayingTitle";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PomodoroSession {
  id: string;
  type: "focus" | "short-break" | "long-break";
  date: string;
  time: string;
  duration: number;
}

const sessionConfig = {
  focus: {
    title: "Focus Session",
    icon: BrainIcon,
    color: "text-gray-900",
    iconBg: "bg-amber-50",
  },
  "short-break": {
    title: "Short Break",
    icon: CoffeeIcon,
    color: "text-gray-900",
    iconBg: "bg-green-50",
  },
  "long-break": {
    title: "Long Break",
    icon: Avocado,
    color: "text-gray-900",
    iconBg: "bg-blue-50",
  },
};

const mockSessions: PomodoroSession[] = [
  {
    id: "1",
    type: "focus",
    date: "Today",
    time: "10:30 AM",
    duration: 25,
  },
  {
    id: "2",
    type: "short-break",
    date: "Today",
    time: "11:00 AM",
    duration: 5,
  },
  {
    id: "3",
    type: "long-break",
    date: "Today",
    time: "11:05 AM",
    duration: 15,
  },
  {
    id: "4",
    type: "focus",
    date: "Yesterday",
    time: "2:15 PM",
    duration: 25,
  },
  {
    id: "5",
    type: "short-break",
    date: "Yesterday",
    time: "2:45 PM",
    duration: 5,
  },
];

const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  const [showSettings, setShowSettings] = useState(false);

  const groupedSessions = mockSessions.reduce((acc, session) => {
    if (!acc[session.date]) {
      acc[session.date] = [];
    }
    acc[session.date]?.push(session);
    return acc;
  }, {} as Record<string, PomodoroSession[]>);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed w-full min-h-screen inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 h-screen w-72 bg-white shadow-xl z-[999] flex flex-col overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
              <h2 className="text-xl font-light text-text">menu</h2>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <XIcon className="w-6 h-6 text-text" />
              </motion.button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1">
              <div className="w-full mt-4">
                <PlayingTitle />
              </div>

              <div className="w-full mt-4">
                <YoutubeVideo />
              </div>

              {/* Recent Sessions Section */}
              <div className="w-full mt-4 px-4">
                <SideBarTitle
                  title="recent sessions"
                  tooltip="take a look at your work"
                  className="w-full"
                />
                <Divider fullWidth />

                {Object.entries(groupedSessions).map(([date, sessions]) => (
                  <div key={date} className="space-y-2 px-2">
                    <h2 className="text-sm font-light text-gray-700 px-2 mt-2">
                      {date}
                    </h2>
                    {sessions.map((session) => {
                      const config = sessionConfig[session.type];
                      const IconComponent = config.icon;

                      return (
                        <SessionItem
                          key={session.id}
                          type={config.title}
                          duration={session.duration.toString()}
                          date={`${session.time}`}
                          decorator={IconComponent}
                          className={config.color}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Settings Modal */}
          <ConfigModal
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;

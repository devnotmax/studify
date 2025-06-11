import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "../../icons/XIcon";
import { BrainIcon } from "../../icons/BrainIcon";
import { CoffeeIcon } from "../../icons/CoffeeIcon";
import { Avocado } from "../../icons/Avocado";
import { useTimer } from "../../context/TimerContext";
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

type TimerMode = "focus" | "short-break" | "long-break";

const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  const { mode } = useTimer();
  const [showSettings, setShowSettings] = useState(false);

  const menuItems = [
    {
      icon: BrainIcon,
      label: "focus session",
      mode: "focus" as TimerMode,
    },
    {
      icon: CoffeeIcon,
      label: "short break",
      mode: "short-break" as TimerMode,
    },
    {
      icon: Avocado,
      label: "long break",
      mode: "long-break" as TimerMode,
    },
  ];

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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 h-full w-72 bg-white shadow-xl z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-light text-text">menu</h2>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <XIcon className="w-6 h-6 text-text" />
              </motion.button>
            </div>

            <div className="w-full mt-4">
              <PlayingTitle />
            </div>

            <div className="w-full mt-4">
              <YoutubeVideo />
            </div>

            <div className="w-full mt-4">
              <SideBarTitle title="recent Sessions" />
              <Divider fullWidth />
            </div>

            {/* Menu Items */}
            <div className="w-full">
              {menuItems.map((item) => (
                <motion.button
                  key={item.label}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {}}
                  className={`w-full flex items-center rounded-lg transition-colors ${
                    item.mode === mode
                      ? "bg-peach/10 text-text"
                      : "hover:bg-gray-100 text-text"
                  }`}
                >
                  <SessionItem
                    type={
                      item.label as
                        | "focus session"
                        | "short break"
                        | "long break"
                    }
                    duration="25:00"
                    date="2025-06-09"
                    decorator={item.icon}
                    className="w-full"
                  />
                </motion.button>
              ))}
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

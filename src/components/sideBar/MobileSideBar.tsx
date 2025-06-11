import { MenuIcon } from "../../icons/MenuIcon";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.svg";

interface MobileSideBarProps {
  onMenuClick: () => void;
}

const MobileSideBar = ({ onMenuClick }: MobileSideBarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 left-0 right-0 h-16 px-4 flex items-center justify-between transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md" : "bg-white"
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <img src={logo} alt="logo" className="w-20 h-20" />
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onMenuClick}
        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
      >
        <MenuIcon className="w-6 h-6 text-text" />
      </motion.button>
    </motion.div>
  );
};

export default MobileSideBar;

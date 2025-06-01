import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { SoundIcon } from "../../../icons/SoundIcon";
import TimerIcon from "../../../icons/TimerIcon";
import { PaintIcon } from "../../../icons/PaintIcon";

type Tab = "timer" | "sound" | "appearance";

interface ConfigMenuProps {
  onSelect: (tab: Tab) => void;
}

const ConfigMenu: React.FC<ConfigMenuProps> = ({ onSelect }) => {
  const [activeTab, setActiveTab] = useState<Tab>("timer");
  const [sliderVisible, setSliderVisible] = useState(false);

  const refs = {
    timer: useRef<HTMLButtonElement>(null),
    sound: useRef<HTMLButtonElement>(null),
    appearance: useRef<HTMLButtonElement>(null),
  };

  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (tab: Tab) => {
    setActiveTab(tab);
    onSelect(tab);
  };

  // Función para posicionar el slider
  const positionSlider = () => {
    const activeBtn = refs[activeTab].current;
    const slider = sliderRef.current;
    const container = containerRef.current;

    if (activeBtn && slider && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();

      if (containerRect.width > 0 && btnRect.width > 0) {
        const left = btnRect.left - containerRect.left;
        const width = btnRect.width;

        gsap.set(slider, { left, width });
        return true;
      }
    }
    return false;
  };

  // Inicialización con múltiples intentos
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10;

    const tryInitialize = () => {
      attempts++;
      const success = positionSlider();

      if (success) {
        setSliderVisible(true);
      } else if (attempts < maxAttempts) {
        setTimeout(tryInitialize, 100);
      }
    };

    // Empezar después de un delay generoso
    const timer = setTimeout(tryInitialize, 300);
    return () => clearTimeout(timer);
  }, []);

  // Actualizar posición cuando cambia el tab
  useLayoutEffect(() => {
    if (sliderVisible) {
      const activeBtn = refs[activeTab].current;
      const slider = sliderRef.current;
      const container = containerRef.current;

      if (activeBtn && slider && container) {
        const containerRect = container.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();

        const left = btnRect.left - containerRect.left;
        const width = btnRect.width;

        gsap.to(slider, {
          left,
          width,
          duration: 0.15,
          ease: "power2.out",
        });
      }
    }
  }, [activeTab, sliderVisible]);

  const tabs: { key: Tab; icon: React.ReactNode; label: string }[] = [
    { key: "timer", icon: <TimerIcon className="w-5 h-5" />, label: "timer" },
    { key: "sound", icon: <SoundIcon className="w-5 h-5" />, label: "sound" },
    {
      key: "appearance",
      icon: <PaintIcon className="w-5 h-5" />,
      label: "appearance",
    },
  ];

  const tabBaseStyles =
    "px-4 py-1 rounded-md text-md font-light transition-colors duration-150 relative z-10";

  const getTextColor = (tab: Tab) =>
    activeTab === tab ? "text-text" : "text-secondaryText hover:text-text";

  return (
    <div
      className="flex gap-2 bg-lightGray p-1 rounded-md relative overflow-hidden"
      ref={containerRef}
    >
      <div
        ref={sliderRef}
        className="absolute top-1 left-0 h-[calc(100%-0.5rem)] bg-white rounded-md shadow-sm z-0"
        style={{
          width: 0,
          visibility: sliderVisible ? "visible" : "hidden",
          opacity: sliderVisible ? 1 : 0,
          transition: sliderVisible ? "opacity 0.2s ease-out" : "none",
        }}
      />
      {tabs.map(({ key, icon, label }) => (
        <button
          key={key}
          ref={refs[key]}
          onClick={() => handleClick(key)}
          className={`${tabBaseStyles} ${getTextColor(
            key
          )} flex items-center gap-2`}
        >
          {icon}
          <p>{label}</p>
        </button>
      ))}
    </div>
  );
};

export default ConfigMenu;

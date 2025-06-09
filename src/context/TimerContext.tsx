/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode, useEffect } from "react";

type TimerMode = "focus" | "short-break" | "long-break";

export type StudyTechnique = {
  id: string;
  name: string;
  description: string;
  sequence: TimerMode[];
  defaultSettings: {
    focus: number;
    shortBreak: number;
    longBreak: number;
  };
};

export const STUDY_TECHNIQUES: StudyTechnique[] = [
  {
    id: "classic",
    name: "Classic Pomodoro",
    description: "The traditional Pomodoro technique: 25 minutes of focus, followed by short breaks, and a long break after 4 focus sessions.",
    sequence: ["focus", "short-break", "focus", "short-break", "focus", "long-break"],
    defaultSettings: {
      focus: 25,
      shortBreak: 5,
      longBreak: 15,
    },
  },
  {
    id: "modified-pomodoro",
    name: "Modified Pomodoro",
    description: "A variation with longer work sessions (50 minutes) and longer breaks (10 minutes) for more intensive work periods.",
    sequence: ["focus", "short-break", "focus", "short-break", "focus", "long-break"],
    defaultSettings: {
      focus: 50,
      shortBreak: 10,
      longBreak: 20,
    },
  },
  {
    id: "time-blocking",
    name: "Time Blocking",
    description: "Divide your day into specific time blocks dedicated to particular tasks, with flexible breaks between blocks.",
    sequence: ["focus", "short-break"],
    defaultSettings: {
      focus: 60,
      shortBreak: 15,
      longBreak: 30,
    },
  },
  {
    id: "52-17",
    name: "52/17 Technique",
    description: "Work for 52 minutes and rest for 17 minutes, based on research showing this ratio maintains optimal focus.",
    sequence: ["focus", "short-break"],
    defaultSettings: {
      focus: 52,
      shortBreak: 17,
      longBreak: 30,
    },
  },
  {
    id: "ultradian",
    name: "Ultradian Rhythm",
    description: "Work in 90-120 minute blocks followed by short breaks, aligning with your body's natural energy cycles.",
    sequence: ["focus", "short-break"],
    defaultSettings: {
      focus: 90,
      shortBreak: 20,
      longBreak: 30,
    },
  },
  {
    id: "90-minutes",
    name: "90 Minutes Method",
    description: "Work for 90 minutes followed by a 20-minute break, based on ultradian cycles.",
    sequence: ["focus", "short-break"],
    defaultSettings: {
      focus: 90,
      shortBreak: 20,
      longBreak: 30,
    },
  },
];

interface TimerSettings {
  focus: number;
  shortBreak: number;
  longBreak: number;
  autoStart: boolean;
  selectedTechnique: string;
}

interface TimerContextType {
  mode: TimerMode;
  setMode: (mode: TimerMode) => void;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  settings: TimerSettings;
  updateSettings: (newSettings: TimerSettings) => void;
  currentSequenceIndex: number;
  setCurrentSequenceIndex: (index: number) => void;
  studyTechniques: StudyTechnique[];
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

const DEFAULT_SETTINGS: TimerSettings = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
  autoStart: false,
  selectedTechnique: "classic",
};

const STORAGE_KEY = "studify_timer_settings";

const loadSettings = (): TimerSettings => {
  try {
    const savedSettings = localStorage.getItem(STORAGE_KEY);
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
  } catch (error) {
    console.error("Error loading settings from localStorage:", error);
  }
  return DEFAULT_SETTINGS;
};

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [isRunning, setIsRunning] = useState(false);
  const [settings, setSettings] = useState<TimerSettings>(loadSettings);
  const [timeLeft, setTimeLeft] = useState(settings.focus * 60);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);

  // Guardar configuración en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error("Error saving settings to localStorage:", error);
    }
  }, [settings]);

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    const duration = newMode === "focus" 
      ? settings.focus 
      : newMode === "short-break" 
        ? settings.shortBreak 
        : settings.longBreak;
    setTimeLeft(duration * 60);
    setIsRunning(false);
  };

  const updateSettings = (newSettings: TimerSettings) => {
    setSettings(newSettings);
    // Actualizar el tiempo actual si estamos en el modo correspondiente
    const currentDuration = mode === "focus" 
      ? newSettings.focus 
      : mode === "short-break" 
        ? newSettings.shortBreak 
        : newSettings.longBreak;
    setTimeLeft(currentDuration * 60);
  };

  return (
    <TimerContext.Provider
      value={{
        mode,
        setMode: handleModeChange,
        isRunning,
        setIsRunning,
        timeLeft,
        setTimeLeft,
        settings,
        updateSettings,
        currentSequenceIndex,
        setCurrentSequenceIndex,
        studyTechniques: STUDY_TECHNIQUES,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};

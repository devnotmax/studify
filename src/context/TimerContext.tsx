/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";

type TimerMode = "focus" | "short-break" | "long-break";

interface TimerContextType {
  mode: TimerMode;
  setMode: (mode: TimerMode) => void;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  timeLeft: number;
  setTimeLeft: (time: number) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

const TIMER_DURATIONS = {
  focus: 0.1 * 60,
  "short-break": 5 * 60,
  "long-break": 15 * 60,
};

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATIONS[mode]);

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(TIMER_DURATIONS[newMode]);
    setIsRunning(false);
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

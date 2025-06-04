import { useEffect } from "react";
import { useTimer } from "../../context/TimerContext";
import { PauseIcon } from "../../icons/PauseIcon";
import { PlayIcon } from "../../icons/PlayIcon";
import ResetIcon from "../../icons/ResetIcon";
import { Tooltip } from "../ui/Tooltip";

export const Clock = () => {
  const { timeLeft, setTimeLeft, isRunning, setIsRunning, mode } = useTimer();

  useEffect(() => {
    let intervalId: number;

    if (isRunning && timeLeft > 0) {
      intervalId = window.setInterval(() => {
        setTimeLeft(Math.max(0, timeLeft - 1));
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, timeLeft, setTimeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress =
    (timeLeft /
      (mode === "focus" ? 1500 : mode === "short-break" ? 300 : 900)) *
    100;

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="relative w-64 h-64">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="#E8E8E8"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="#D6E5C6"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-5xl font-light text-text">
            {formatTime(minutes)}:{formatTime(seconds)}
          </div>
          <div className="text-xl text-secondaryText font-light mt-2">minutes</div>
        </div>
      </div>
      <div className="flex gap-4">
        <Tooltip label={isRunning ? "Pausar temporizador" : "Iniciar temporizador"}>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="w-12 h-12 rounded-full bg-peach flex items-center justify-center hover:bg-peach/80 transition-colors"
          >
            {isRunning ? <PauseIcon /> : <PlayIcon />}
          </button>
        </Tooltip>
        <Tooltip label="Reiniciar temporizador">
          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(
                mode === "focus" ? 1500 : mode === "short-break" ? 300 : 900
              );
            }}
            className="w-12 h-12 rounded-full bg-peach flex items-center justify-center hover:bg-peach/80 transition-colors"
          >
            <ResetIcon fill="#2B4E52" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

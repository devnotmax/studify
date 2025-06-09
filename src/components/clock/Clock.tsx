import { useEffect } from "react";
import { PauseIcon } from "../../icons/PauseIcon";
import { PlayIcon } from "../../icons/PlayIcon";
import ResetIcon from "../../icons/ResetIcon";
import { Tooltip } from "../ui/Tooltip";
import { toast } from "react-toastify";
import notification from "/notification.mp3";
import { useTimer } from "../../context/TimerContext";

export const Clock = () => {
  const {
    timeLeft,
    setTimeLeft,
    isRunning,
    setIsRunning,
    mode,
    setMode,
    settings,
    currentSequenceIndex,
    setCurrentSequenceIndex,
    studyTechniques,
  } = useTimer();

  const currentTechnique = studyTechniques.find(
    (t) => t.id === settings.selectedTechnique
  );

  const focusTime = settings.focus * 60;
  const shortBreakTime = settings.shortBreak * 60;
  const longBreakTime = settings.longBreak * 60;

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
      (mode === "focus"
        ? focusTime
        : mode === "short-break"
        ? shortBreakTime
        : longBreakTime)) *
    100;

  useEffect(() => {
    if (timeLeft === 0 && currentTechnique) {
      const nextIndex = (currentSequenceIndex + 1) % currentTechnique.sequence.length;
      const nextMode = currentTechnique.sequence[nextIndex] || "focus";
      
      setCurrentSequenceIndex(nextIndex);
      setMode(nextMode);
      
      const nextDuration = nextMode === "focus"
        ? focusTime
        : nextMode === "short-break"
        ? shortBreakTime
        : longBreakTime;
      
      setTimeLeft(nextDuration);
      
      if (settings.autoStart) {
        setIsRunning(true);
      }

      // Notificaciones según el modo
      if (mode === "focus") {
        toast.success("¡Tiempo de focus terminado! Toma un descanso.");
      } else if (mode === "short-break") {
        toast.success("¡Descanso corto terminado! Volvamos a trabajar.");
      } else if (mode === "long-break") {
        toast.success("¡Descanso largo terminado! Prepárate para una nueva sesión.");
      }

      const audio = new Audio(notification);
      audio.play();
    }
  }, [timeLeft, currentTechnique, currentSequenceIndex, settings.autoStart]);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const handleReset = () => {
    setIsRunning(false);
    setCurrentSequenceIndex(0);
    const initialMode = currentTechnique?.sequence[0] || "focus";
    setMode(initialMode);
    setTimeLeft(
      initialMode === "focus"
        ? focusTime
        : initialMode === "short-break"
        ? shortBreakTime
        : longBreakTime
    );
  };

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
          <div className="text-xl text-secondaryText font-light mt-2">
            {minutes > 0 ? "minutes" : "seconds"}
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Tooltip
          label={isRunning ? "pausar temporizador" : "iniciar temporizador"}
        >
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="w-12 h-12 rounded-full bg-peach flex items-center justify-center hover:bg-peach/80 transition-colors"
          >
            {isRunning ? <PauseIcon /> : <PlayIcon />}
          </button>
        </Tooltip>
        <Tooltip label="reiniciar temporizador">
          <button
            onClick={handleReset}
            className="w-12 h-12 rounded-full bg-peach flex items-center justify-center hover:bg-peach/80 transition-colors"
          >
            <ResetIcon fill="#2B4E52" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

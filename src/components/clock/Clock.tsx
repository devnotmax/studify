import { useEffect } from "react";
import { PauseIcon } from "../../icons/PauseIcon";
import { PlayIcon } from "../../icons/PlayIcon";
import ResetIcon from "../../icons/ResetIcon";
import { Tooltip } from "../ui/Tooltip";
import { toast } from "react-toastify";
import notification from "/notification.mp3";
import { useTimer } from "../../context/TimerContext";
import useWindowSize from "../../hooks/useWindowSize";

export const Clock = () => {
  const { width } = useWindowSize();
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

  // Tamaño dinámico del reloj SOLO para PC, en móvil queda como antes
  const isMobile = width < 768;
  const clockSize = isMobile ? 256 : Math.max(100, Math.min(width * 0.15, 220));
  const radius = clockSize / 2 - 12; // 12 es el strokeWidth
  const center = clockSize / 2;
  const circumference = 2 * Math.PI * radius;

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

  // Tamaños proporcionales
  const timeTextSize = Math.round(clockSize / 5.5); // Ej: 5xl en 256px
  const labelTextSize = Math.round(clockSize / 13); // Ej: xl en 256px
  const buttonSize = Math.round(clockSize / 5.5); // Ej: 48px en 256px

  return (
    <div className="flex flex-col items-center justify-center gap-8 mb-6 mt-6">
      <div
        className="relative flex items-center justify-center"
        style={{ width: clockSize, height: clockSize }}
      >
        <svg
          width={clockSize}
          height={clockSize}
          className="block"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#E8E8E8"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#D6E5C6"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div
          className="absolute top-1/2 left-1/2 text-center"
          style={{
            transform: "translate(-50%, -50%)",
            width: clockSize * 0.8,
          }}
        >
          <div
            style={{ fontSize: timeTextSize, lineHeight: 1, fontWeight: 300, color: "#2B4E52" }}
          >
            {formatTime(minutes)}:{formatTime(seconds)}
          </div>
          <div
            style={{ fontSize: labelTextSize, color: "#7A8C8E", fontWeight: 300, marginTop: 8 }}
          >
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
            style={{ width: buttonSize, height: buttonSize }}
            className="rounded-full bg-peach flex items-center justify-center hover:bg-peach/80 transition-colors"
          >
            {isRunning ? <PauseIcon /> : <PlayIcon />}
          </button>
        </Tooltip>
        <Tooltip label="reiniciar temporizador">
          <button
            onClick={handleReset}
            style={{ width: buttonSize, height: buttonSize }}
            className="rounded-full bg-peach flex items-center justify-center hover:bg-peach/80 transition-colors"
          >
            <ResetIcon fill="#2B4E52" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

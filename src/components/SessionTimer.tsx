import React, { useEffect, useState } from "react";
import { useTimer } from "../context/TimerContext";
import { useSession } from "../hooks/useSession";
import { PlayIcon, PauseIcon, ResetIcon, XIcon } from "../icons";
import { SessionResults } from "./SessionResults";
import type { SessionType } from "../types";

const CIRCLE_RADIUS = 80;
const CIRCLE_STROKE = 9;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export const SessionTimer: React.FC = () => {
  // Timer visual y configuración
  const {
    mode,
    setMode,
    isRunning,
    setIsRunning,
    timeLeft,
    setTimeLeft,
    settings,
    setCurrentSequenceIndex,
  } = useTimer();

  // Sesión backend
  const {
    currentSession,
    sessionResults,
    showResults,
    startSession,
    pauseSession,
    resumeSession,
    endSession,
    cancelSession,
    closeResults,
  } = useSession();

  // Estado para modal de cancelar
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  // Efecto para decrementar el tiempo
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

  // Sincronizar inicio de sesión y timer
  const handleStartSession = async () => {
    try {
      let duration = 0;
      let sessionType: SessionType = "focus";
      
      if (mode === "focus") {
        duration = settings.focus * 60;
        sessionType = "focus";
      } else if (mode === "short-break") {
        duration = settings.shortBreak * 60;
        sessionType = "short_break";
      } else {
        duration = settings.longBreak * 60;
        sessionType = "long_break";
      }
      
      await startSession(sessionType, duration);
      setIsRunning(true);
    } catch (error) {
      console.error("Error starting session:", error);
    }
  };

  // Sincronizar pausa/reanudación
  const handlePauseResume = () => {
    if (isRunning) {
      pauseSession();
      setIsRunning(false);
    } else {
      resumeSession();
      setIsRunning(true);
    }
  };

  // Sincronizar finalización
  const handleEndSession = async () => {
    try {
      await endSession();
      setIsRunning(false);
      setCurrentSequenceIndex(0);
      setMode("focus");
      setTimeLeft(settings.focus * 60);
    } catch (error) {
      console.error("Error ending session:", error);
    }
  };

  // Sincronizar cancelación
  const handleCancelSession = async () => {
    try {
      await cancelSession();
      setIsRunning(false);
      setCurrentSequenceIndex(0);
      setMode("focus");
      setTimeLeft(settings.focus * 60);
      setShowConfirmCancel(false);
    } catch (error) {
      console.error("Error canceling session:", error);
    }
  };

  // Progreso del círculo
  const focusTime = settings.focus * 60;
  const shortBreakTime = settings.shortBreak * 60;
  const longBreakTime = settings.longBreak * 60;
  const totalTime =
    mode === "focus"
      ? focusTime
      : mode === "short-break"
      ? shortBreakTime
      : longBreakTime;
  const progressValue = ((totalTime - timeLeft) / totalTime) * 100;
  const dashOffset = CIRCLE_CIRCUMFERENCE * (1 - progressValue / 100);

  // Formatear tiempo
  const formatTime = (num: number) => num.toString().padStart(2, "0");
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-[20vh] flex flex-col items-center justify-center bg-transparent rounded-xl shadow-none p-0">
      {/* Círculo con timer */}
      <div
        className="relative flex flex-col items-center justify-center"
        style={{ marginTop: 24, marginBottom: 24 }}
      >
        <svg
          width={2 * (CIRCLE_RADIUS + CIRCLE_STROKE)}
          height={2 * (CIRCLE_RADIUS + CIRCLE_STROKE)}
        >
          <circle
            cx={CIRCLE_RADIUS + CIRCLE_STROKE}
            cy={CIRCLE_RADIUS + CIRCLE_STROKE}
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="#d6e6c7"
            strokeWidth={CIRCLE_STROKE}
          />
          <circle
            cx={CIRCLE_RADIUS + CIRCLE_STROKE}
            cy={CIRCLE_RADIUS + CIRCLE_STROKE}
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="#b7d7a8"
            strokeWidth={CIRCLE_STROKE}
            strokeDasharray={CIRCLE_CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.5s linear" }}
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <div className="text-4xl font-helveticaNeue text-text font-thin">
            {formatTime(minutes)}:{formatTime(seconds)}
          </div>
          <div className="text-base font-light text-secondaryText mt-1">
            {minutes > 0 ? "minutes" : "seconds"}
          </div>
        </div>
      </div>

      {/* Botones debajo del círculo */}
      <div className="flex flex-row items-center justify-center gap-5 mt-2">
        {/* Play/Pausa o Iniciar */}
        {currentSession ? (
          <button
            onClick={handlePauseResume}
            className="w-11 h-11 rounded-full bg-[#f7e7e1] flex items-center justify-center shadow hover:bg-[#f3d6c7] transition-colors"
            aria-label={isRunning ? "Pausar" : "Reanudar"}
          >
            {isRunning ? (
              <PauseIcon className="w-6 h-6 text-[#3a5156]" />
            ) : (
              <PlayIcon className="w-6 h-6 text-[#3a5156]" />
            )}
          </button>
        ) : (
          <button
            onClick={handleStartSession}
            className="w-11 h-11 rounded-full bg-[#f7e7e1] flex items-center justify-center shadow hover:bg-[#f3d6c7] transition-colors"
            aria-label="Iniciar sesión"
          >
            <PlayIcon className="w-6 h-6 text-[#3a5156]" />
          </button>
        )}
        {/* Completar (reset) */}
        {currentSession && (
          <button
            onClick={handleEndSession}
            className="w-11 h-11 rounded-full bg-[#f7e7e1] flex items-center justify-center shadow hover:bg-[#f3d6c7] transition-colors"
            aria-label="Completar sesión"
          >
            <ResetIcon className="w-6 h-6 text-[#3a5156]" />
          </button>
        )}
        {/* Cancelar */}
        {currentSession && (
          <button
            onClick={() => setShowConfirmCancel(true)}
            className="w-11 h-11 rounded-full bg-[#f7e7e1] flex items-center justify-center shadow hover:bg-[#f3d6c7] transition-colors"
            aria-label="Cancelar sesión"
          >
            <XIcon className="w-6 h-6 text-[#3a5156]" />
          </button>
        )}
      </div>

      {/* Modal de confirmación para cancelar */}
      {showConfirmCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              ¿Cancelar sesión?
            </h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que quieres cancelar esta sesión? El progreso se perderá.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmCancel(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCancelSession}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de resultados */}
      {showResults && sessionResults && (
        <SessionResults results={sessionResults} onClose={closeResults} />
      )}
    </div>
  );
};

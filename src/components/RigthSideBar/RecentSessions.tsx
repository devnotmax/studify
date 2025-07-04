import { useEffect, useState } from "react";
import { SideBarTitle } from "../sideBar/SideBarTitle";
import { Divider } from "../ui/Divider";
import { SessionItem } from "./SessionItem";
import { BrainIcon } from "../../icons/BrainIcon";
import { Avocado } from "../../icons/Avocado";
import { CoffeeIcon } from "../../icons/CoffeeIcon";
import { sessionService } from '../../services/sessionService';
import type { Session } from '../../types';

const sessionConfig = {
  focus: {
    title: "Focus Session",
    icon: BrainIcon,
    color: "text-gray-900",
    iconBg: "bg-amber-50",
  },
  short_break: {
    title: "Short Break",
    icon: CoffeeIcon,
    color: "text-gray-900",
    iconBg: "bg-green-50",
  },
  long_break: {
    title: "Long Break",
    icon: Avocado,
    color: "text-gray-900",
    iconBg: "bg-blue-50",
  },
};

function getDateLabel(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return "today";
  if (isYesterday) return "yesterday";
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getTimeLabel(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

const CheckIcon = () => (
  <svg
    className="inline ml-1"
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="10" fill="#22c55e"/>
    <path d="M6 10.5L9 13.5L14 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const RecentSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await sessionService.getSessionHistory(1, 5); // Solo las 5 más recientes
        setSessions(data.sessions);
      } catch {
        setError('Error al cargar las sesiones recientes');
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  // Filtrar sesiones: no mostrar canceladas con completedTime = 0
  const filteredSessions = sessions.filter(
    (session) => !(session.isCancelled && session.completedTime === 0)
  );

  const groupedSessions = filteredSessions.reduce((acc, session) => {
    const dateLabel = getDateLabel(session.startTime);
    if (!acc[dateLabel]) acc[dateLabel] = [];
    acc[dateLabel].push(session);
    return acc;
  }, {} as Record<string, Session[]>);

  return (
    <div className="flex flex-col mt-2 w-full">
      <SideBarTitle
        title="recent sessions"
        tooltip="take a look at your work"
        className="w-full"
      />
      <Divider fullWidth />

      {loading ? (
        <div className="text-center py-8 text-gray-500">Cargando...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No hay sesiones recientes</div>
      ) : (
        Object.entries(groupedSessions).map(([date, sessions]) => (
          <div key={date} className="space-y-2 px-2">
            <h2 className="text-sm font-light text-gray-700 px-2 mt-2">{date}</h2>
            {sessions.map((session) => {
              const config = sessionConfig[session.sessionType];
              const IconComponent = config.icon;
              const durationMin = Math.round(session.duration / 60);
              const completedMin = Math.round(session.completedTime / 60);
              // Si el tiempo completado es diferente al estipulado, mostrar ambos
              const durationLabel = (session.isCompleted && completedMin !== durationMin && completedMin > 0)
                ? `${durationMin} min - ${completedMin}`
                : `${durationMin} min`;
              return (
                <SessionItem
                  key={session.id}
                  type={config.title}
                  duration={
                    <>
                      {durationLabel}
                      {session.isCompleted && <CheckIcon />}
                    </>
                  }
                  date={getTimeLabel(session.startTime)}
                  decorator={IconComponent}
                  className={config.color}
                />
              );
            })}
          </div>
        ))
      )}
    </div>
  );
};

import { SideBarTitle } from "../sideBar/SideBarTitle";
import { Divider } from "../ui/Divider";
import { SessionItem } from "./SessionItem";
import { BrainIcon } from "../../icons/BrainIcon";
import { Avocado } from "../../icons/Avocado";
import { CoffeeIcon } from "../../icons/CoffeeIcon";

interface PomodoroSession {
  id: string;
  type: "focus" | "short-break" | "long-break";
  date: string;
  time: string;
  duration: number;
}

const sessionConfig = {
  focus: {
    title: "Focus Session",
    icon: BrainIcon,
    color: "text-gray-900",
    iconBg: "bg-amber-50",
  },
  "short-break": {
    title: "Short Break",
    icon: CoffeeIcon,
    color: "text-gray-900",
    iconBg: "bg-green-50",
  },
  "long-break": {
    title: "Long Break",
    icon: Avocado,
    color: "text-gray-900",
    iconBg: "bg-blue-50",
  },
};

const mockSessions: PomodoroSession[] = [
  {
    id: "1",
    type: "focus",
    date: "Today",
    time: "10:30 AM",
    duration: 25,
  },
  {
    id: "2",
    type: "short-break",
    date: "Today",
    time: "11:00 AM",
    duration: 5,
  },
  {
    id: "3",
    type: "long-break",
    date: "Today",
    time: "11:05 AM",
    duration: 15,
  },
  {
    id: "4",
    type: "focus",
    date: "Yesterday",
    time: "2:15 PM",
    duration: 25,
  },
  {
    id: "5",
    type: "short-break",
    date: "Yesterday",
    time: "2:45 PM",
    duration: 5,
  },
];

export const RecentSessions = () => {
  const groupedSessions = mockSessions.reduce((acc, session) => {
    if (!acc[session.date]) {
      acc[session.date] = [];
    }
    acc[session.date]?.push(session);
    return acc;
  }, {} as Record<string, PomodoroSession[]>);

  return (
    <div className="flex flex-col mt-2 w-full">
      <SideBarTitle
        title="recent sessions"
        tooltip="take a look at your work"
        className="w-full"
      />
      <Divider fullWidth />

      {Object.entries(groupedSessions).map(([date, sessions]) => (
        <div key={date} className="space-y-2 px-2">
          <h2 className="text-sm font-light text-gray-700 px-2 mt-2">{date}</h2>
          {sessions.map((session) => {
            const config = sessionConfig[session.type];
            const IconComponent = config.icon;

            return (
              <SessionItem
                key={session.id}
                type={config.title}
                duration={session.duration.toString()}
                date={`${session.time}`}
                decorator={IconComponent}
                className={config.color}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

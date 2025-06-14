import type { SVGProps } from "react";

import type { FC } from "react";

export interface SideBarItemProps {
  decorator: FC<SVGProps<SVGSVGElement>>;
  title?: string;
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
  decoratorClassName?: string;
}

type SessionType = "focus" | "short-break" | "long-break";

export interface SessionItemProps {
  type: string;
  duration: string;
  date: string;
  decorator: FC<SVGProps<SVGSVGElement>>;
  className?: string;
}

export interface PomodoroSession {
  id: string;
  type: SessionType;
  date: string;
  time: string;
  duration: number;
}

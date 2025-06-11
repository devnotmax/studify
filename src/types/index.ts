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

type SessionType = "focus session" | "short break" | "long break";

export interface SessionItemProps {
  type: SessionType;
  duration: string;
  date: string;
  decorator: FC<SVGProps<SVGSVGElement>>;
  className?: string;
}

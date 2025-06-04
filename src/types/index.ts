import type { SVGProps } from "react";

import type { FC } from "react";

export interface SideBarItemProps {
  decorator: FC<SVGProps<SVGSVGElement>>;
  title: string;
  selected?: boolean;
  onSelect?: () => void;
}

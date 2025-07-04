import { InfoIcon } from "../../icons/InfoIcon";
import { Tooltip } from "../ui/Tooltip";
import { useState } from "react";

interface SideBarTitleProps {
  title: string;
  tooltip?: string;
  className?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
}

export const SideBarTitle = ({
  title,
  tooltip,
  className,
  collapsible = false,
  defaultCollapsed = false,
  onToggle,
}: SideBarTitleProps) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const handleToggle = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onToggle?.(newCollapsed);
  };

  return (
    <div className={`flex items-center justify-between h-10 px-4 ${className}`}>
      <div className="flex items-center gap-2">
        <p className="text-gray-500 text-sm">{title.toUpperCase()}</p>
        {tooltip && (
          <Tooltip label={tooltip} placement="top" delay={200}>
            <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
              <InfoIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          </Tooltip>
        )}
      </div>
      {collapsible && (
        <button
          onClick={handleToggle}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg
            className={`w-4 h-4 text-gray-400 hover:text-gray-600 transition-transform duration-200 ${
              isCollapsed ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

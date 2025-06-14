import { InfoIcon } from "../../icons/InfoIcon";
import { Tooltip } from "../ui/Tooltip";

interface SideBarTitleProps {
  title: string;
  tooltip?: string;
  className?: string;
}

export const SideBarTitle = ({
  title,
  tooltip,
  className,
}: SideBarTitleProps) => {
  return (
    <div className={`flex items-center justify-between h-10 px-4 ${className}`}>
      <p className="text-gray-500 text-sm">{title.toUpperCase()}</p>
      {tooltip && (
        <Tooltip label={tooltip} placement="top" delay={200}>
          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <InfoIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        </Tooltip>
      )}
    </div>
  );
};

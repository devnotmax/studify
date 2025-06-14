import { useRef } from "react";
import type { SessionItemProps } from "../../types";

export const SessionItem = ({
  type,
  duration,
  date,
  decorator: Decorator,
  className = "",
}: SessionItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`flex items-center h-22 ${className}`}>
      <div
        ref={itemRef}
        className="flex first:items-center justify-between w-full mb-2 rounded-lg cursor-pointer transition-colors duration-200 border-[0.1px] border-gray-200 hover:shadow-md hover:scale-[1.02]"
      >
        <div className="flex flex-col justify-center h-12 m-1 pl-4">
          <p className="font-light tracking-wide text-md text-left">{type}</p>
          <div className="flex flex-row items-center gap-2 justify-between text-secondaryText">
            <p className="text-sm">{date}</p>
            <span className="text-gray-400">•</span>
            <p className="text-sm">{`${duration} min`}</p>
          </div>
        </div>
        <div className="flex items-center justify-center w-8 h-8 mr-2 bg-brown rounded-full">
          <Decorator className="w-6 h-6" fill="#fff" />
        </div>
      </div>
    </div>
  );
};

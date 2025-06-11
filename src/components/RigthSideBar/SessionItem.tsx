import { useRef } from "react";
import type { SessionItemProps } from "../../types";

export const SessionItem = ({
  type,
  duration,
  date,
  decorator: Decorator,
  className,
}: SessionItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`flex items-center h-22 p-1 ${className}`}>
      <div
        ref={itemRef}
        className={`flex shadow-md items-center justify-between w-full mb-2 rounded-lg cursor-pointer transition-colors duration-200 bg-background`}
      >
        <div className="flex flex-col justify-center h-12 pl-4">
          <p className={`font-ligth tracking-wide text-md text-left`}>{type}</p>
          <p className="text-sm text-gray-400">{`${date} - ${duration}`}</p>
        </div>
        <div className="flex items-center justify-center w-8 h-8 mr-2 bg-brown rounded-full">
          <Decorator className="w-6 h-6 " fill="#fff" />
        </div>
      </div>
    </div>
  );
};

import { useRef } from "react";
import type { SessionItemProps } from "../../types";

export const SessionItem = ({
  type,
  duration,
  date,
  decorator: Decorator,
}: SessionItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex items-center h-22 p-2">
      <div
        ref={itemRef}
        className={`flex shadow-md p-2 items-center justify-between w-full m-1.5 rounded-lg cursor-pointer transition-colors duration-200 bg-background`}
      >
        <div className="flex flex-col justify-center h-12 pl-4">
          <p className={`font-medium tracking-wide text-md`}>{type}</p>
          <p className="text-sm text-gray-400">{`${date} - ${duration}`}</p>
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-brown rounded-full">
          <Decorator className="w-8 h-8 " fill="#fff" />
        </div>
      </div>
    </div>
  );
};

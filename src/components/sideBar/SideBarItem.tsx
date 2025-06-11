import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { SideBarItemProps } from "../../types";
import useWindowSize from "../../hooks/useWindowSize";

export const SideBarItem = ({
  decorator: Decorator,
  decoratorClassName,
  className,
  title,
  selected = false,
  onSelect,
}: SideBarItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  useEffect(() => {
    if (selected && itemRef.current) {
      gsap.fromTo(
        itemRef.current,
        { scale: 0.95, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, [selected]);

  if (isMobile) {
    return (
      <div className="flex items-center h-12 w-full">
        <div
          ref={itemRef}
          className={`flex items-center w-full m-1.5 rounded-lg cursor-pointer transition-colors duration-200 ${className} ${
            selected ? "bg-peach" : "hover:bg-peach/20"
          }`}
          onClick={onSelect}
        >
          <div className="flex items-center h-10 pl-4">
            <Decorator
              className={`w-5 h-5 ${decoratorClassName}`}
              fill={selected ? "#2B4E52" : "#6B7280"}
            />
          </div>
          <div className="flex-1 flex justify-center">
            <p
              className={`font-light text-base ${
                selected ? "text-text" : "text-gray-500"
              }`}
            >
              {title}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center h-12">
      <div
        ref={itemRef}
        className={`flex items-center w-full m-1.5 rounded-lg cursor-pointer transition-colors duration-200 ${className} ${
          selected ? "bg-peach" : "hover:bg-peach/20"
        }`}
        onClick={onSelect}
      >
        <div className="flex items-center h-10 pl-4">
          <Decorator
            className={`w-5 h-5 ${decoratorClassName}`}
            fill={selected ? "#2B4E52" : "#6B7280"}
          />
        </div>
        <div className="flex items-center h-10 pl-4">
          <p
            className={`font-light text-base ${
              selected ? "text-text" : "text-gray-500"
            }`}
          >
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

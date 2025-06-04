import { useState, useRef } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useInteractions,
  FloatingPortal,
  arrow,
  type Placement,
} from "@floating-ui/react";

interface TooltipProps {
  label: string;
  children: React.ReactNode;
  delay?: number;
  placement?: Placement;
}

export const Tooltip = ({
  children,
  label,
  delay = 500,
  placement = "top",
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowRef, padding: 8 }),
    ],
  });

  const hover = useHover(context, {
    delay: {
      open: delay,
      close: 150,
    },
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  // Estilos para la flecha
  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[placement.split("-")[0]];

  const arrowStyle = {
    left: middlewareData.arrow?.x ?? undefined,
    top: middlewareData.arrow?.y ?? undefined,
    [staticSide as string]: "-4px",
  };

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="bg-text text-lightGray px-2 py-1 rounded text-sm font-light opacity-70 relative"
          >
            {label}
            {/* Elemento de la flecha */}
            <div
              ref={arrowRef}
              style={arrowStyle}
              className="absolute w-3 h-3 bg-text rotate-45"
            />
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

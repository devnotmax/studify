import React, { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
  title?: string;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  children,
  width = "90%",
  title,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  const handleClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isClosingRef.current = false;
        onClose();
      },
    });

    // Animación de salida
    tl.to(
      modalRef.current,
      {
        scale: 0.9,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      0
    ).to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      },
      0
    );
  };

  useEffect(() => {
    if (isOpen && overlayRef.current && modalRef.current) {
      // Resetear estados iniciales
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(modalRef.current, { scale: 0.8, opacity: 0 });

      const tl = gsap.timeline();

      // Animación de entrada
      tl.to(
        overlayRef.current,
        {
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
        },
        0
      ).to(
        modalRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          ease: "back.out(1.2)",
        },
        0.1
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 text-neutral-700"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="bg-gray-100 p-8 rounded-xl relative shadow-lg"
        style={{ width, maxWidth: "100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con título y botón de cerrar */}
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h2 className="text-2xl font-normal text-text m-0">{title}</h2>
          )}
          <button
            className="text-2xl text-secondaryText hover:text-text cursor-pointer leading-none transition-colors duration-150"
            onClick={handleClose}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default BaseModal;

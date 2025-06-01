import React from "react";
import type { ReactNode } from "react";

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
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 text-neutral-700"
      onClick={onClose}
    >
      <div
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
            className="text-2xl text-secondaryText hover:text-text cursor-pointer leading-none"
            onClick={onClose}
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

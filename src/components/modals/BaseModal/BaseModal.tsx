import React, { useState } from "react";
import type { ReactNode } from "react";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children: ReactNode;
  width?: string;
  title?: string;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  children,
  width = "90%",
  title,
}) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(true);
    onConfirm?.();
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 text-neutral-700"
      onClick={handleClose}
    >
      <div
        className="bg-gray-100 p-4 md:p-8 rounded-2xl md:rounded-xl relative shadow-lg w-full max-w-lg md:max-w-xl mx-2 md:mx-0 max-h-[95vh] overflow-y-auto"
        style={{ width: "100%", maxWidth: width }}
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
        {isConfirming ? (
          <ConfirmModal
            isOpen={isConfirming}
            onClose={() => setIsConfirming(false)}
            onConfirm={handleConfirm}
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default BaseModal;

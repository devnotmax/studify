import BaseModal from "../BaseModal/BaseModal";
import ReactDOM from "react-dom";

interface ConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal = ({
  onClose,
  onConfirm,
  isOpen,
  title = "Confirm",
  message = "Are you sure you want to confirm?",
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center">
      <BaseModal title={title} isOpen={isOpen} onClose={onClose} width="500px">
        <div className="space-y-6">
          <p className="text-text text-md font-light">{message}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-200 text-text rounded-md hover:bg-gray-50 transition-colors duration-150 text-md font-light"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-peach text-text rounded-md hover:bg-brown hover:text-white transition-colors duration-150 text-md font-light"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </BaseModal>
    </div>,
    document.body
  );
};

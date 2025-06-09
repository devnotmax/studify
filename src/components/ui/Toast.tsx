import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const Toast = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      style={
        {
          "--toastify-icon-color-success": "#BAA398",
          "--toastify-color-progress-success": "#8aa18e",
          "--toastify-icon-color-error": "#FF6B6B",
          "--toastify-color-progress-error": "#FF6B6B",
          "--toastify-toast-background": "#FFFFFF",
          "--toastify-text-color-light": "#2B4E52",
        } as React.CSSProperties
      }
    />
  );
};

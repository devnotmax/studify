// filepath: c:\Users\masi\Desktop\proyects\Rebrand studify\studify\src\main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  </StrictMode>
);

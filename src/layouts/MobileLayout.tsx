import { useState } from "react";
import Home from "../pages/home";
import { Toast } from "../components/ui/Toast";
import MobileSideBar from "../components/sideBar/MobileSideBar";
import StudifyEndSidebar from "../components/RigthSideBar/RigthSidebar";
import MobileSelectionMode from "../components/sideBar/MobileSelectionMode";
import MobileEndBar from "../components/sideBar/MobileEndBar";

const MobileLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header móvil */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white z-50 shadow-sm">
        <MobileSideBar onMenuClick={() => setSidebarOpen(true)} />
      </header>

      {/* Drawer Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Fondo oscuro para cerrar */}
          <div
            className="flex-1 bg-black bg-opacity-40"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar */}
          <div className="w-72 max-w-full h-full bg-white shadow-lg">
            <StudifyEndSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <main className="flex-1 mt-16">
        <Home />
        <div className="flex justify-center items-center">
          <MobileSelectionMode />
        </div>
      </main>
      {/* Barra de navegación inferior */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
        {/* Aquí irá la navegación móvil */}
        <MobileEndBar />
      </nav>

      <Toast />
    </div>
  );
};

export default MobileLayout;

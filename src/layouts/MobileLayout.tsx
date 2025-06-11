import { useState } from "react";
import Home from "../pages/home";
import { Toast } from "../components/ui/Toast";
import MobileSideBar from "../components/sideBar/MobileSideBar";
import MobileSelectionMode from "../components/sideBar/MobileSelectionMode";
import MobileEndBar from "../components/sideBar/MobileEndBar";
import MobileDrawer from "../components/sideBar/MobileDrawer";

const MobileLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header móvil */}
      <MobileSideBar onMenuClick={() => setSidebarOpen(true)} />

      {/* Drawer Sidebar */}
      <MobileDrawer
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Contenido principal */}
      <main className="mt-16">
        <Home />
      </main>
      <div className="flex justify-center items-end pb-4">
        <MobileSelectionMode />
      </div>

      {/* Barra de navegación inferior */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
        <MobileEndBar />
      </nav>

      <Toast />
    </div>
  );
};

export default MobileLayout;

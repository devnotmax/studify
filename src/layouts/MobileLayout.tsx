import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import ProfilePage from "../pages/profile";
import { Toast } from "../components/ui/Toast";
import MobileSideBar from "../components/sideBar/MobileSideBar";
import MobileEndBar from "../components/sideBar/MobileEndBar";
import MobileDrawer from "../components/sideBar/MobileDrawer";

const MobileLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Header móvil */}
      <MobileSideBar onMenuClick={() => setSidebarOpen(true)} />

      {/* Drawer Sidebar */}
      <MobileDrawer
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Contenido principal scrollable */}
      <main className="flex-1 overflow-y-auto pt-16 pb-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      {/* Barra de navegación inferior */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
        <MobileEndBar />
      </nav>

      <Toast />
    </div>
  );
};

export default MobileLayout;

import { Route, Routes } from "react-router-dom";
import StudifySidebar from "../components/sideBar/SideBar";
import StudifyEndSidebar from "../components/RigthSideBar/RigthSidebar";
import Home from "../pages/home";
import { Toast } from "../components/ui/Toast";
import ProfilePage from "../pages/profile";

const DesktopLayout = () => {
  return (
    <div className="flex flex-row h-screen">
      <StudifySidebar />
      <div className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
      <StudifyEndSidebar />
      <Toast />
    </div>
  );
};

export default DesktopLayout;

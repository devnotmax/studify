import { Route, Routes } from "react-router-dom";
import StudifySidebar from "../components/sideBar/SideBar";
import StudifyEndSidebar from "../components/RigthSideBar/RigthSidebar";
import Home from "../pages/home";
import { Toast } from "../components/ui/Toast";

const DesktopLayout = () => {
  return (
    <div className="flex flex-row min-h-screen">
      <StudifySidebar />
      <div className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <StudifyEndSidebar />
      <Toast />
    </div>
  );
};

export default DesktopLayout; 
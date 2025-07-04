import StudifySidebar from "../components/sideBar/SideBar";
import StudifyEndSidebar from "../components/RigthSideBar/RigthSidebar";
import { Outlet } from "react-router-dom";

const DesktopLayout = () => {
  return (
    <div className="flex flex-row h-screen">
      <StudifySidebar />
      <div className="flex-1 w-full">
        <Outlet />
      </div>
      <StudifyEndSidebar />
    </div>
  );
};

export default DesktopLayout;

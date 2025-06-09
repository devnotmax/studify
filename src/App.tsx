import { Route, Routes } from "react-router-dom";
import StudifySidebar from "./components/sideBar/SideBar";
import { TimerProvider } from "./context/TimerContext";
import Home from "./pages/home";
import "./App.css";
import StudifyEndSidebar from "./components/RigthSideBar/RigthSidebar";
import { Toast } from "./components/ui/Toast";

function App() {
  return (
    <TimerProvider>
      <div className="flex">
        <StudifySidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <StudifyEndSidebar />
        <Toast />
      </div>
    </TimerProvider>
  );
}

export default App;

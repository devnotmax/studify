import { useState } from "react";
import { TimerProvider } from "./context/TimerContext";
import "./App.css";
import Loader from "./components/Loader";
import useWindowSize from "./hooks/useWindowSize";
import MobileLayout from "./layouts/MobileLayout";
import DesktopLayout from "./layouts/DesktopLayout";

function App() {
  const [loading, setLoading] = useState(true);
  const { isMobile } = useWindowSize();

  if (loading) {
    return <Loader onFinish={() => setLoading(false)} />;
  }

  return (
    <TimerProvider>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </TimerProvider>
  );
}

export default App;

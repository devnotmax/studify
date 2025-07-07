import { useState } from "react";
import { TimerProvider } from "./context/TimerContext";
import { AuthProvider } from "./context/AuthContext";
import { SessionProvider } from "./context/SessionContext";
import "./App.css";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import useWindowSize from "./hooks/useWindowSize";
import MobileLayout from "./layouts/MobileLayout";
import DesktopLayout from "./layouts/DesktopLayout";
import AuthLayout from "./layouts/AuthLayout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LunarCyclePage from "./pages/lunar-cycle";

function App() {
  const [loading, setLoading] = useState(true);
  const { isMobile } = useWindowSize();

  if (loading) {
    return <Loader onFinish={() => setLoading(false)} />;
  }

  return (
    <AuthProvider>
      <SessionProvider>
        <TimerProvider>
          <Routes>
            {/* Rutas de autenticación */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>

            {/* Rutas principales protegidas */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  {isMobile ? <MobileLayout /> : <DesktopLayout />}
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="lunar-cycle" element={<LunarCyclePage />} />
            </Route>
          </Routes>
        </TimerProvider>
      </SessionProvider>
    </AuthProvider>
  );
}

export default App;

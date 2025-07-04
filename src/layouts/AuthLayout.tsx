import { Outlet } from "react-router-dom";
import IlustCarrousel from "../components/auth/IlustCarrousel";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <main className="w-full max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <div className="w-full flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center p-12 bg-gray-50">
          <IlustCarrousel />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;

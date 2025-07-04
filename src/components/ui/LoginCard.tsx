import { LoginIcon } from "../../icons/LoginIcon";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginCard() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  // Skeleton loading
  if (isAuthenticated === undefined || isAuthenticated === null) {
    return (
      <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 w-full animate-pulse">
        <div className="w-12 h-12 bg-gray-200 rounded-lg mb-3" />
        <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-24 bg-gray-200 rounded mb-4" />
        <div className="h-8 w-36 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 w-full">
      {!isAuthenticated ? (
        <div className="grid flex-row grid-cols-[auto_1fr_auto] items-center w-full gap-3 cursor-pointer hover:bg-gray-100 rounded-xl p-2">
          <p className="text-sm text-gray-500">No has iniciado sesión</p>
          <button 
            onClick={handleLogin}
            className="bg-primaryDark p-1 text-white w-full mt-2 rounded-md flex items-center justify-center gap-2 hover:bg-primaryDark/80 transition-all duration-300"
          >
            <LoginIcon />
            <p className="text-sm">Iniciar sesión</p>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-[auto_1fr_auto] items-center w-full gap-3 cursor-pointer hover:bg-gray-100 rounded-xl p-2">
          <div className="w-12 h-12 bg-greenPastel rounded-lg flex items-center justify-center">
            <span className="text-text font-semibold text-lg">
              {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex flex-col items-start justify-center min-w-0">
            <p className="font-semibold text-text truncate">
              {user ? `${user.firstName} ${user.lastName}` : 'Usuario'}
            </p>
            <p className="text-xs text-text truncate">
              {user?.email || 'usuario@email.com'}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleLogout}
              className="bg-transparent p-1 text-text w-full mt-2 rounded-md flex items-center justify-center gap-2 hover:bg-secondaryText hover:text-white transition-all duration-300"
              title="Cerrar sesión"
            >
              <LoginIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

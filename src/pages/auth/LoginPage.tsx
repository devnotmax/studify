import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FormInput from "../../components/inputs/FormInput";
import { GithubIcon } from "../../icons/GithubIcon";
import { GoogleIcon } from "../../icons/GoogleIcon";
import SideBarLogo from "../../components/sideBar/SideBarLogo";
import { useAuth } from "../../context/AuthContext";
import { Toast } from "../../components/ui/Toast";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error, isAuthenticated, clearError } = useAuth();

  // Obtener la ruta de destino desde el estado de location
  const from = location.state?.from?.pathname || '/';

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Mostrar toast cuando hay error
  useEffect(() => {
    if (error) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(formData);
    
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white rounded-2xl p-8">
      <div className="flex items-start justify-center">
        <SideBarLogo className="w-32 h-32" />
      </div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-text mb-2">¡Bienvenido de vuelta!</h1>
        <p className="text-secondaryText text-base">
          Simplifica tu flujo de trabajo y aumenta tu productividad con Studify, comienza gratis
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          id="email"
          type="email"
          label="Email o nombre de usuario"
          placeholder="johnDoe@email.com"
          value={formData.email}
          onChange={(value) => handleInputChange("email", value)}
          required
        />

        <FormInput
          id="password"
          type="password"
          label="Contraseña"
          placeholder="••••••••"
          value={formData.password}
          onChange={(value) => handleInputChange("password", value)}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 bg-transparent text-green-600 focus:ring-green-500 border-secondaryText rounded"
            />
            <span className="ml-2 text-sm text-secondaryText">
              Mantener sesión iniciada
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-greenPastel text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-sm font-medium text-text uppercase tracking-widest transition-all duration-200 hover:text-primaryDark">
            {loading ? "Iniciando sesión..." : "Iniciar sesión ahora"}
          </span>
        </button>
        <div className="flex items-center justify-between">
          <Link
            to="/auth/register"
            className="text-sm underline text-primaryDark hover:text-text font-medium"
          >
            ¿No eres miembro? Regístrate ahora
          </Link>
          <Link
            to="/auth/forgot-password"
            className="text-sm underline text-primaryDark hover:text-text font-medium"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>

      {/* Divider */}
      <div className="my-4 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-base text-gray-500">o inicia sesión con</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <div className="flex items-center justify-center gap-4 space-x-4">
        <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg py-2 px-4">
          <GoogleIcon className="w-6 h-6 text-text" />
          <span className="text-base text-text">Google</span>
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg py-2 px-4">
          <GithubIcon className="w-6 h-6 text-text" />
          <span className="text-base text-text">Github</span>
        </button>
      </div>

      {/* Toast para errores */}
      {showToast && error && (
        <Toast
          message={error}
          type="error"
          onClose={() => {
            setShowToast(false);
            clearError();
          }}
        />
      )}
    </div>
  );
};

export default LoginPage;

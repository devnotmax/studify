import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FormInput from "../../components/inputs/FormInput";
import DateInput from "../../components/inputs/DateInput";
import SideBarLogo from "../../components/sideBar/SideBarLogo";
import { GithubIcon } from "../../icons/GithubIcon";
import { GoogleIcon } from "../../icons/GoogleIcon";
import { useAuth } from "../../context/AuthContext";
import { Toast } from "../../components/ui/Toast";

const TOTAL_STEPS = 3;

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const { register, loading, error, isAuthenticated, clearError } = useAuth();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

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

  const handleNextStep = () => {
    if (validateStep()) {
      setStep((prev) => (prev < TOTAL_STEPS ? prev + 1 : prev));
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      const userData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: formData.birthDate,
      };
      
      const result = await register(userData);
      
      if (result.success) {
        navigate('/');
      }
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.email.trim()) {
        newErrors.email = "El email es requerido";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email address";
      }
    } else if (step === 2) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "El nombre es requerido";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "El apellido es requerido";
      }
      if (!formData.birthDate.trim()) {
        newErrors.birthDate = "La fecha de nacimiento es requerida";
      } else {
        const birthDate = new Date(formData.birthDate);
        if (isNaN(birthDate.getTime())) {
          newErrors.birthDate = "Please enter a valid date.";
        } else {
          const today = new Date();
          const sixteenYearsAgo = new Date();
          sixteenYearsAgo.setFullYear(today.getFullYear() - 16);

          if (birthDate > sixteenYearsAgo) {
            newErrors.birthDate = "You must be at least 16 years old.";
          }
        }
      }
    } else if (step === 3) {
      if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const renderStepContent = () => {
    const variants = {
      enter: { opacity: 0, x: 50 },
      center: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-primaryDark text-center mb-1">
                What's your email?
              </h2>
              <p className="text-secondaryText text-center mb-6">
                We'll use this email to create your account.
              </p>
              <FormInput
                id="email"
                type="email"
                label="Email address"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(value) => handleInputChange("email", value)}
                error={errors.email}
              />
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-primaryDark text-center mb-1">
                Tell us about yourself
              </h2>
              <p className="text-secondaryText text-center mb-6">
                This information will appear on your profile.
              </p>
              <div className="space-y-6">
                <FormInput
                  id="firstName"
                  type="text"
                  label="Name"
                  placeholder="Juan"
                  value={formData.firstName}
                  onChange={(value) => handleInputChange("firstName", value)}
                  error={errors.firstName}
                />
                <FormInput
                  id="lastName"
                  type="text"
                  label="Last Name"
                  placeholder="Smith"
                  value={formData.lastName}
                  onChange={(value) => handleInputChange("lastName", value)}
                  error={errors.lastName}
                />
                <DateInput
                  id="birthDate"
                  label="Birth Date"
                  value={formData.birthDate}
                  onChange={(value) => handleInputChange("birthDate", value)}
                  error={errors.birthDate}
                />
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-primaryDark text-center mb-1">
                Set your password
              </h2>
              <p className="text-secondaryText text-center mb-6">
                Make sure to choose a secure password.
              </p>
              <div className="space-y-6">
                <FormInput
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(value) => handleInputChange("password", value)}
                  error={errors.password}
                />
                <FormInput
                  id="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(value) =>
                    handleInputChange("confirmPassword", value)
                  }
                  error={errors.confirmPassword}
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-8 max-w-md w-full">
      <div className="flex items-start justify-center">
        <SideBarLogo className="w-32 h-32" />
      </div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-text mb-2">Create an account</h1>
        <p className="text-secondaryText text-base">
          Join Studify and boost your productivity. Start for free.
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center mb-8">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map(
          (item, index) => (
            <React.Fragment key={item}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step >= item
                    ? "bg-primaryDark text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {item}
              </div>
              {index < TOTAL_STEPS - 1 && (
                <div
                  className={`flex-1 h-0.5 transition-all duration-300 mx-2 ${
                    step > item ? "bg-primaryDark" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          )
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStepContent()}

        <div className="flex gap-4 pt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevStep}
              className="w-full border border-gray-300 text-text py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Back
            </button>
          )}
          <button
            type={step === TOTAL_STEPS ? "submit" : "button"}
            onClick={step === TOTAL_STEPS ? undefined : handleNextStep}
            disabled={loading}
            className="w-full bg-greenPastel text-text py-3 px-4 rounded-lg font-semibold hover:bg-green-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === TOTAL_STEPS 
              ? (loading ? "Creating account..." : "Create account") 
              : "Continue"}
            {step < TOTAL_STEPS && <span>→</span>}
          </button>
        </div>
      </form>

      <p className="text-center text-secondaryText text-sm mt-6">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="font-semibold text-primaryDark hover:text-primary"
        >
          Sign in
        </Link>
      </p>

      {/* Divider */}
      <div className="my-4 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-base text-gray-500">or sign up with</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Social Buttons */}
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

export default RegisterPage;

import React from "react";

interface FormInputProps {
  id?: string;
  type?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-light text-secondaryText uppercase tracking-wider"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent border-0 border-b-2 border-gray-200 py-2 px-1 text-text focus:outline-none focus:ring-0 focus:border-primaryDark placeholder:text-secondaryText placeholder:font-light transition-colors duration-300"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default FormInput;

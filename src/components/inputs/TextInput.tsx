const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  unity = "mins",
  error,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  unity?: string;
  error?: string;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Solo permite números o string vacío
    if (newValue === "" || /^\d+$/.test(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-md font-light text-secondaryText">{label}</label>
      )}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder || "Enter a number"}
          className="flex-1 px-3 py-2 bg-white border font-light border-gray-200 rounded-md text-text focus:font-light focus:outline-none focus:ring-2 focus:ring-peach focus:border-transparent placeholder:text-secondaryText placeholder:font-light"
        />
        <span className="text-md font-light text-secondaryText">{unity}</span>
      </div>
      {error && (
        <span className="text-sm text-red-500 font-light">{error}</span>
      )}
    </div>
  );
};

export default TextInput;

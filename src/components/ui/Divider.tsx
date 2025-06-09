interface DividerProps {
  fullWidth?: boolean;
  width?: string;
  className?: string;
}

export const Divider = ({
  fullWidth = false,
  width = "200px",
  className = "",
}: DividerProps) => {
  return (
    <div className="px-4">
      <hr
        className={`border-[1px] border-gray-200 my-1 ${className}`}
        style={{
          width: fullWidth ? "100%" : width,
        }}
      />
    </div>
  );
};

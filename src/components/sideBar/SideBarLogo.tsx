import logo from "../../assets/logo.svg";

const SideBarLogo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center h-12 ${className}`}>
      <div className="flex items-center mt-6 pl-4">
        <img src={logo} alt="logo" className="w-28 h-28" />
      </div>
    </div>
  );
};

export default SideBarLogo;

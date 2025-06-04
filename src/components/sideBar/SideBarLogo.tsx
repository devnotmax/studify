import logo from "../../assets/logo.svg";

const SideBarLogo = () => {
  return (
    <div className="flex items-center h-16">
      <div className="flex items-center mt-10 pl-6">
        <img src={logo} alt="logo" className="w-36 h-36" />
      </div>
    </div>
  );
};

export default SideBarLogo;

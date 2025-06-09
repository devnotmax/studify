import logo from "../../assets/logo.svg";
import { MenuIcon } from "../../icons/MenuIcon";

type Props = {
  onMenuClick: () => void;
};

const MobileSideBar = ({ onMenuClick }: Props) => {
  return (
    <div className="flex flex-row items-center justify-between w-full px-4 h-16">
      <img src={logo} alt="logo" className="w-24 h-24" />
      <button onClick={onMenuClick}>
        <MenuIcon className="w-10 h-10" />
      </button>
    </div>
  );
};

export default MobileSideBar;

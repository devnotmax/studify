import { SideBarTitle } from "../sideBar/SideBarTitle";
import { Divider } from "../ui/Divider";
import { SessionItem } from "./SessionItem";
import { BrainIcon } from "../../icons/BrainIcon";
import { Avocado } from "../../icons/Avocado";
import { CoffeeIcon } from "../../icons/CoffeeIcon";

export const RecentSessions = () => {
  return (
    <div className="flex flex-col mt-2">
      <SideBarTitle
        title="recent sessions"
        tooltip="take a look at your work"
      />
      <Divider fullWidth />
      <SessionItem
        type="focus session"
        duration="25:00"
        date="2025-06-05"
        decorator={BrainIcon}
      />
      <SessionItem
        type="short break"
        duration="5:00"
        date="2025-06-05"
        decorator={CoffeeIcon}
      />
      <SessionItem
        type="long break"
        duration="10:00"
        date="2025-06-05"
        decorator={Avocado}
      />
    </div>
  );
};

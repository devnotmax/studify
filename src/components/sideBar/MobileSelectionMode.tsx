import { SideBarItem } from "./SideBarItem";
import { BrainIcon } from "../../icons/BrainIcon";
import { CoffeeIcon } from "../../icons/CoffeeIcon";
import { useTimer } from "../../context/TimerContext";
import { Avocado } from "../../icons/Avocado";

const MobileSelectionMode = () => {
  const { mode, setMode } = useTimer();
  return (
    <>
      <main className="mt-6 overflow-y-auto w-[50%]">
        <section>
          <div className="flex flex-col">
            <SideBarItem
              decorator={BrainIcon}
              title="focus"
              selected={mode === "focus"}
              className="justify-center"
              onSelect={() => setMode("focus")}
            />
            <SideBarItem
              decorator={CoffeeIcon}
              title="short break"
              selected={mode === "short-break"}
              className="justify-center"
              onSelect={() => setMode("short-break")}
            />
            <SideBarItem
              decorator={Avocado}
              title="long break"
              selected={mode === "long-break"}
              className="justify-center"
              onSelect={() => setMode("long-break")}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default MobileSelectionMode;

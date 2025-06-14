import { SideBarItem } from "./SideBarItem";
import { BrainIcon } from "../../icons/BrainIcon";
import { CoffeeIcon } from "../../icons/CoffeeIcon";
import { useTimer } from "../../context/TimerContext";
import { Avocado } from "../../icons/Avocado";

const MobileSelectionMode = () => {
  const { mode, setMode } = useTimer();
  return (
    <>
      <main className="mt-6 w-full">
        <section>
          <div className="flex flex-col overflow-y-auto w-full max-h-40 px-2">
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

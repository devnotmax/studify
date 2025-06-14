import { useTimer } from "../../context/TimerContext";

export const HomeTitle = () => {
  const { mode } = useTimer();

  const titles = {
    focus: {
      title: "focus",
      subtitle: "stay focused and productive",
    },
    "short-break": {
      title: "short break",
      subtitle: "take a moment to breathe",
    },
    "long-break": {
      title: "long break",
      subtitle: "time for a proper rest",
    },
  };

  const currentMode = titles[mode];

  return (
    <div className="w-full py-3 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-light">{currentMode.title}</h1>
      <p className="text-lg font-extralight tracking-wider text-gray-500">
        {currentMode.subtitle}
      </p>
    </div>
  );
};

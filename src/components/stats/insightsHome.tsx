import { ChartIcon } from "../../icons/ChartIcon";
import ProgressStats from "./ProgressStats";
import useWindowSize from "../../hooks/useWindowSize";

const InsightsHome = () => {
  const { isMobile } = useWindowSize();

  return (
    <div
      className={`bg-white rounded-2xl shadow-md w-full ${
        isMobile ? "mt-6" : "mt-0"
      } py-6 min-h-[100px]`}
    >
      <div className="flex flex-row items-start justify-start px-6">
        <ChartIcon className="w-6 h-6 text-brown" />
        <h2 className="text-lg font-md text-text ml-3">productivity insight</h2>
      </div>
      <div className="flex flex-row items-center justify-between px-6">
        <div className="flex w-full flex-col items-start justify-start">
          <h3 className="text-md font-light text-text">
            Your productivity increases in the afternoon
          </h3>
          <ProgressStats />
        </div>
      </div>
    </div>
  );
};

export default InsightsHome;

import { SessionTimer } from "../../components/SessionTimer";
import { HomeTitle } from "../../components/home/HomeTitle";
import useWindowSize from "../../hooks/useWindowSize";
import InsightsHome from "../../components/stats/insightsHome";
import MobileSelectionMode from "../../components/sideBar/MobileSelectionMode";
import PomodoroStats from "../../components/home/PomodoroStats";

const Home = () => {
  const { isMobile } = useWindowSize();

  return (
    <div className="flex flex-col h-screen bg-background overflow-y-auto">
      <div className="w-full mx-auto px-2">
        {!isMobile && <HomeTitle />}
        {!isMobile && <InsightsHome />}
        <main className="flex-1 flex flex-col items-center w-full mb-10">
          {/* Timer de Sesiones */}
          <div className="w-full max-w-4xl mx-auto p-4">
            <SessionTimer />
            {/*
            {!isMobile && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <StreakStats />
                <SessionHistory />
              </div>
            )} */}
          </div>
          {isMobile && <MobileSelectionMode />}
        </main>
        <PomodoroStats />
      </div>
    </div>
  );
};

export default Home;

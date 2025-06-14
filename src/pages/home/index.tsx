// pages/Home.tsx
import { Clock } from "../../components/clock/Clock";
import { HomeTitle } from "../../components/home/HomeTitle";
import useWindowSize from "../../hooks/useWindowSize";
import InsightsHome from "../../components/stats/insightsHome";
import MobileSelectionMode from "../../components/sideBar/MobileSelectionMode";

const Home = () => {
  const { isMobile } = useWindowSize();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="w-full mx-auto px-2">
        {!isMobile && <HomeTitle />}
        {!isMobile && <InsightsHome />}
        <main className="flex-1 flex flex-col items-center w-full">
          <Clock />
          {isMobile && <MobileSelectionMode />}
        </main>
      </div>
    </div>
  );
};

export default Home;

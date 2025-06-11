// pages/Home.tsx
import { Clock } from "../../components/clock/Clock";
import { HomeTitle } from "../../components/home/HomeTitle";
import InsightsHome from "../../components/stats/insightsHome";
import useWindowSize from "../../hooks/useWindowSize";

const Home = () => {
  const { isMobile } = useWindowSize();

  return (
    <div className="flex flex-col bg-background">
      <div className="w-full mx-auto px-2">
        {!isMobile && <HomeTitle />}
        <InsightsHome />
        <main className="flex-1 flex flex-col items-center w-full">
          <Clock />
        </main>
      </div>
    </div>
  );
};

export default Home;

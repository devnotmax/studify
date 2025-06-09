// pages/Home.tsx
import { Clock } from "../../components/clock/Clock";
import { HomeTitle } from "../../components/home/HomeTitle";
import useWindowSize from "../../hooks/useWindowSize";

const Home = () => {
  const { isMobile } = useWindowSize();

  return (
    <div className="flex flex-col bg-background">
      {!isMobile && <HomeTitle />}
      <main className="flex-1 flex flex-col items-center mt-12">
        <Clock />
      </main>
    </div>
  );
};

export default Home;

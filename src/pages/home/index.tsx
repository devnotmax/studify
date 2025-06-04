// pages/Home.tsx
import { Clock } from "../../components/clock/Clock";
import { HomeTitle } from "../../components/home/HomeTitle";

const Home = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <HomeTitle />
      <main className="flex-1">
        <div className="flex items-center justify-center">
          <Clock />
        </div>
      </main>
    </div>
  );
};

export default Home;

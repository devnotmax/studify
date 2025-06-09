// pages/Home.tsx
import { Clock } from "../../components/clock/Clock";
import { HomeTitle } from "../../components/home/HomeTitle";

const Home = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <HomeTitle />
      <main className="flex-1 flex flex-col items-center mt-12">
        <Clock />
      </main>
    </div>
  );
};

export default Home;

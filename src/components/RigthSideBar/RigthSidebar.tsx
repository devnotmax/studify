import { PlayingTitle } from "./PlayingTitle";
import { YoutubeVideo } from "./YoutubeVideo";
import { RecentSessions } from "./RecentSessions";

const StudifyEndSidebar = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-md flex flex-col">
        <main className="mt-6">
          <div className="flex flex-col">
            <PlayingTitle />
            <YoutubeVideo />
            <RecentSessions />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudifyEndSidebar;

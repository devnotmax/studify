import { PlayingTitle } from "./PlayingTitle";
import { RecentSessions } from "./RecentSessions";
import { YoutubeVideo } from "./YoutubeVideo";

type Props = {
  onClose?: () => void;
  className?: string;
};

const StudifyEndSidebar = ({ onClose, className = "" }: Props) => {
  return (
    <div
      className={`w-80 max-w-full bg-white shadow-md p-4 overflow-y-auto h-screen ${className}`}
    >
      {/* Botón de cerrar solo en mobile */}
      {onClose && (
        <button
          className="block lg:hidden ml-auto mb-4 text-2xl font-bold text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
      )}
      <PlayingTitle />
      <YoutubeVideo />
      <RecentSessions />
    </div>
  );
};

export default StudifyEndSidebar;

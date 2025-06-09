import { PlayIcon } from "../../icons/PlayIcon";

export const PlayingTitle = () => {
  return (
    <div className="flex items-center px-3 gap-2 py-2">
      <div className="flex items-center justify-center">
        <PlayIcon className="w-4 h-4" />
      </div>
      <p className="text-md font-light">currently playing</p>
    </div>
  );
};

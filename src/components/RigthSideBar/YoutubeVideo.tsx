import { useEffect, useRef, useState } from "react";
import { XIcon } from "../../icons/XIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { useYoutubePlayer } from "../../context/YoutubePlayerContext";

// Cargar el script de la API de YouTube solo una vez
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace YT {
    interface Player {
      destroy: () => void;
      setVolume: (volume: number) => void;
      getVolume: () => number;
    }
  }
  interface Window {
    // Usamos 'any' porque la API de YouTube inyecta dinámicamente este objeto
    // y no podemos tiparlo estrictamente sin el SDK oficial
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const YoutubeVideo = () => {
  const { video, clearVideo } = useYoutubePlayer();
  const [playerReady, setPlayerReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [volume, setVolume] = useState(100);
  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Setup player when video changes
  useEffect(() => {
    if (!video || !video.videoId) return;
    setLoading(true);
    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }
    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      if (window.onYouTubeIframeAPIReady === createPlayer) {
        delete (window as unknown as Record<string, unknown>).onYouTubeIframeAPIReady;
      }
    };
    // eslint-disable-next-line
  }, [video?.videoId]);

  // Create the player
  const createPlayer = () => {
    if (!containerRef.current || !video || !video.videoId) return;
    playerRef.current = new window.YT.Player(containerRef.current, {
      height: "112", // 28 * 4 px
      width: "100%",
      videoId: video.videoId,
      playerVars: {
        controls: 1,
        rel: 0,
        modestbranding: 1,
      },
      events: {
        onReady: (event: { target: YT.Player }) => {
          setPlayerReady(true);
          setLoading(false);
          setVolume(event.target.getVolume());
        },
      },
    });
  };

  // Change volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (playerRef.current && playerReady) {
      playerRef.current.setVolume(newVolume);
    }
  };

  // Remove selected video
  const handleRemove = () => {
    clearVideo();
    setPlayerReady(false);
    setLoading(false);
  };

  // Open video on YouTube
  const handleOpenYoutube = () => {
    if (video && video.videoId) {
      window.open(`https://www.youtube.com/watch?v=${video.videoId}`, "_blank");
    }
  };

  if (!video || !video.videoId) {
    return (
      <div className="flex flex-col items-center justify-center p-3 h-36 bg-white rounded-xl shadow-md border border-lightBorder animate-fade-in w-full">
        <YoutubeIcon className="w-8 h-8 text-gray-300 mb-1" />
        <p className="text-gray-500 text-sm font-medium">No video selected</p>
        <p className="text-gray-400 text-xs">Choose a video to play music or study content here.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-2 gap-2 animate-fade-in w-full">
      <div className="relative w-full bg-white rounded-xl shadow-lg border border-lightBorder overflow-hidden">
        {/* Remove button */}
        <button
          aria-label="Remove video"
          onClick={handleRemove}
          className="absolute top-1 right-1 z-10 p-1 rounded-full bg-gray-100 hover:bg-red-100 transition-colors"
        >
          <XIcon className="w-4 h-4 text-gray-500 hover:text-red-500" />
        </button>
        {/* Open on YouTube button */}
        <button
          aria-label="Open on YouTube"
          onClick={handleOpenYoutube}
          className="absolute top-1 left-1 z-10 p-1 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors"
        >
          <YoutubeIcon className="w-4 h-4 text-red-500" />
        </button>
        {/* Player and loader overlay */}
        <div className="w-full h-28 flex items-center justify-center bg-gray-50 rounded-t-xl overflow-hidden transition-all duration-300 relative">
          {/* Loader overlays the player, but never hides the player div */}
          <div
            ref={containerRef}
            className="w-full h-28"
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-20">
              <div className="animate-pulse w-10 h-10 rounded-full bg-gray-200" />
            </div>
          )}
        </div>
        {/* Video info and controls */}
        <div className="flex flex-col items-start justify-start w-full p-2">
          <p className="text-base font-semibold tracking-wide w-full truncate text-primaryDark mb-0.5" title={video.title}>
            {video.title}
          </p>
          <p className="text-xs font-light tracking-wide w-full text-gray-500 truncate mb-1" title={video.channelTitle}>
            {video.channelTitle}
          </p>
          {playerReady && (
            <div className="w-full flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500 mr-1" aria-label="Volume">🔊</span>
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={handleVolumeChange}
                className="w-full accent-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg transition-all h-1.5"
                aria-valuenow={volume}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Volume slider"
              />
              <span className="text-xs text-gray-500 w-6 text-right tabular-nums">{volume}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

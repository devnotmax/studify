import { useEffect, useRef, useState } from "react";

const LOCALSTORAGE_KEY = "selectedYoutubeVideo";

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
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [channelTitle, setChannelTitle] = useState<string>("");
  const [playerReady, setPlayerReady] = useState(false);
  const [volume, setVolume] = useState(100);
  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cargar datos del video seleccionado
  useEffect(() => {
    const stored = localStorage.getItem(LOCALSTORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setVideoId(parsed.videoId);
        setVideoTitle(parsed.title || "");
        setChannelTitle(parsed.channelTitle || "");
      } catch {
        setVideoId(null);
      }
    }
  }, []);

  // Cargar el script de la API de YouTube
  useEffect(() => {
    if (!videoId) return;
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
    };
    // eslint-disable-next-line
  }, [videoId]);

  // Crear el reproductor
  const createPlayer = () => {
    if (!containerRef.current || !videoId) return;
    playerRef.current = new window.YT.Player(containerRef.current, {
      height: "180",
      width: "100%",
      videoId,
      playerVars: {
        controls: 1,
        rel: 0,
        modestbranding: 1,
      },
      events: {
        onReady: (event: { target: YT.Player }) => {
          setPlayerReady(true);
          setVolume(event.target.getVolume());
        },
      },
    });
  };

  // Cambiar el volumen
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (playerRef.current && playerReady) {
      playerRef.current.setVolume(newVolume);
    }
  };

  if (!videoId) {
    return null;
  }

  return (
    <div className="flex flex-col items-center p-4 gap-3">
      <div className="w-full h-52 bg-gray-50 rounded-xl shadow-md flex flex-col items-center justify-center">
        <div ref={containerRef} className="w-full h-40 rounded-xl overflow-hidden" />
        <div className="flex flex-col items-start justify-start w-full p-3">
          <p className="text-lg font-medium tracking-wide w-full truncate">
            {videoTitle}
          </p>
          <p className="text-base font-light tracking-wide w-full text-gray-600 truncate">
            {channelTitle}
          </p>
          {playerReady && (
            <div className="w-full flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-500">Volume</span>
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={handleVolumeChange}
                className="w-full accent-blue-500"
              />
              <span className="text-xs text-gray-500">{volume}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

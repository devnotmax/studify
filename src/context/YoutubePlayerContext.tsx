import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";

interface YoutubeVideoData {
  videoId: string;
  title: string;
  channelTitle: string;
}

interface YoutubePlayerContextType {
  video: YoutubeVideoData | null;
  setVideo: (video: YoutubeVideoData) => void;
  clearVideo: () => void;
}

const LOCALSTORAGE_KEY = "selectedYoutubeVideo";

const YoutubePlayerContext = createContext<
  YoutubePlayerContextType | undefined
>(undefined);

export const YoutubePlayerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [video, setVideoState] = useState<YoutubeVideoData | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCALSTORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.videoId) {
          setVideoState({
            videoId: parsed.videoId,
            title: parsed.title || "",
            channelTitle: parsed.channelTitle || "",
          });
        }
      } catch {
        setVideoState(null);
      }
    }
  }, []);

  // Sync to localStorage when video changes
  useEffect(() => {
    if (video) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(video));
    } else {
      localStorage.removeItem(LOCALSTORAGE_KEY);
    }
  }, [video]);

  const setVideo = (v: YoutubeVideoData) => setVideoState(v);
  const clearVideo = () => setVideoState(null);

  return (
    <YoutubePlayerContext.Provider value={{ video, setVideo, clearVideo }}>
      {children}
    </YoutubePlayerContext.Provider>
  );
};

export const useYoutubePlayer = () => {
  const ctx = useContext(YoutubePlayerContext);
  if (!ctx)
    throw new Error(
      "useYoutubePlayer must be used within a YoutubePlayerProvider"
    );
  return ctx;
};

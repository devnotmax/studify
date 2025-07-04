import React, { useState, useRef } from "react";
import BaseModal from "../modals/BaseModal/BaseModal";

const LOCALSTORAGE_KEY = "selectedYoutubeVideo";

interface YoutubeSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface YoutubeVideoItem {
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
}

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string;

export default function YoutubeSearchModal({ isOpen, onClose }: YoutubeSearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<YoutubeVideoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setError("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim().length === 0) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(() => {
      searchYoutube(value);
    }, 400);
  };

  const searchYoutube = async (searchTerm: string) => {
    setLoading(true);
    setError("");
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&q=${encodeURIComponent(
        searchTerm
      )}&key=${YOUTUBE_API_KEY}`;
      const res = await fetch(url);
      const data: {
        items: Array<{
          id: { videoId: string };
          snippet: {
            title: string;
            channelTitle: string;
            thumbnails: { medium: { url: string } };
          };
        }>;
        error?: { message: string };
      } = await res.json();
      if (data.error) throw new Error(data.error.message);
      const items: YoutubeVideoItem[] = data.items.map((item) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));
      setResults(items);
    } catch (err) {
      setError((err as Error).message || "Error searching on YouTube");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (video: YoutubeVideoItem) => {
    localStorage.setItem(
      LOCALSTORAGE_KEY,
      JSON.stringify({
        videoId: video.videoId,
        title: video.title,
        channelTitle: video.channelTitle,
      })
    );
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Search on YouTube" width="500px">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search YouTube videos..."
          value={query}
          onChange={handleInputChange}
          autoFocus
        />
        {loading && <div className="text-center text-gray-500">Searching...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
          {results.map((video) => (
            <button
              key={video.videoId}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition"
              onClick={() => handleSelect(video)}
            >
              <img src={video.thumbnail} alt={video.title} className="w-20 h-12 object-cover rounded" />
              <div className="flex flex-col items-start">
                <span className="font-medium text-sm text-left line-clamp-2">{video.title}</span>
                <span className="text-xs text-gray-500">{video.channelTitle}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </BaseModal>
  );
} 
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type SpotifyPlayerContextValue = {
  ready: boolean;
  isPlaying: boolean;
  playFromNeedle: () => void;
  markEmbedReady: () => void;
};

const SpotifyPlayerContext = createContext<SpotifyPlayerContextValue | null>(
  null,
);

export function useSpotifyPlayer() {
  return useContext(SpotifyPlayerContext);
}

export function SpotifyPlayerProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const markEmbedReady = useCallback(() => {
    setReady(true);
  }, []);

  const playFromNeedle = useCallback(() => {
    setIsPlaying(true);
    document.getElementById("player")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <SpotifyPlayerContext.Provider
      value={{ ready, isPlaying, playFromNeedle, markEmbedReady }}
    >
      {children}
    </SpotifyPlayerContext.Provider>
  );
}

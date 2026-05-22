"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  loadSpotifyIframeApi,
  normalizePlaybackUpdate,
  type SpotifyEmbedController,
} from "@/components/spotify/embed-controller";
import {
  spotifyEmbedHeightPx,
  spotifyEmbedTheme,
  spotifyEmbedTrackUri,
} from "@/lib/site-config";

type SpotifyPlayerContextValue = {
  ready: boolean;
  isPlaying: boolean;
  playFromNeedle: () => void;
  setEmbedHost: (node: HTMLDivElement | null) => void;
};

const SpotifyPlayerContext = createContext<SpotifyPlayerContextValue | null>(
  null,
);

export function useSpotifyPlayer() {
  return useContext(SpotifyPlayerContext);
}

export function SpotifyPlayerProvider({ children }: { children: ReactNode }) {
  const [embedHost, setEmbedHost] = useState<HTMLDivElement | null>(null);
  const [controller, setController] = useState<SpotifyEmbedController | null>(
    null,
  );
  const [ready, setReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!embedHost) return;

    let cancelled = false;

    loadSpotifyIframeApi().then((api) => {
      if (cancelled) return;

      api.createController(
        embedHost,
        {
          uri: spotifyEmbedTrackUri,
          width: "100%",
          height: String(spotifyEmbedHeightPx),
          theme: spotifyEmbedTheme,
        },
        (next) => {
          if (cancelled) return;
          setController(next);
          next.addListener("ready", () => {
            if (cancelled) return;
            setReady(true);
            next.addListener("playback_update", (payload) => {
              if (cancelled) return;
              const update = normalizePlaybackUpdate(payload);
              if (typeof update.isPaused === "boolean") {
                setIsPlaying(!update.isPaused);
              }
            });
            next.addListener("playback_started", () => {
              if (!cancelled) setIsPlaying(true);
            });
          });
        },
      );
    });

    return () => {
      cancelled = true;
      setReady(false);
      setIsPlaying(false);
      setController(null);
    };
  }, [embedHost]);

  const playFromNeedle = useCallback(() => {
    if (!controller) return;
    try {
      controller.resume();
    } catch {
      controller.play();
    }
  }, [controller]);

  return (
    <SpotifyPlayerContext.Provider
      value={{ ready, isPlaying, playFromNeedle, setEmbedHost }}
    >
      {children}
    </SpotifyPlayerContext.Provider>
  );
}

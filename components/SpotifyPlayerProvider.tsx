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
import { spotifyArtistUri, spotifyEmbedTheme } from "@/lib/site-config";

const EMBED_HEIGHT_PX = 380;

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
          uri: spotifyArtistUri,
          width: "100%",
          height: String(EMBED_HEIGHT_PX),
          theme: spotifyEmbedTheme,
        },
        (next) => {
          if (cancelled) return;
          setController(next);
          next.addListener("ready", () => {
            if (cancelled) return;
            setReady(true);
            /* Playback listeners must attach after ready (Spotify iFrame API). */
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
      setIsPlaying(false);
    };
  }, [embedHost]);

  const playFromNeedle = useCallback(() => {
    if (!controller) return;
    setIsPlaying(true);
    document.getElementById("player")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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

export function SpotifyEmbedHost() {
  const ctx = useSpotifyPlayer();
  if (!ctx) {
    throw new Error("SpotifyEmbedHost must be used inside SpotifyPlayerProvider");
  }

  return (
    <div
      ref={ctx.setEmbedHost}
      className="player-wrap spotify-embed-host"
      style={{ minHeight: EMBED_HEIGHT_PX }}
    />
  );
}

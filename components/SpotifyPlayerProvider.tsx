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
  type SpotifyEmbedController,
} from "@/components/spotify/embed-controller";
import { spotifyArtistUri } from "@/lib/site-config";

const EMBED_HEIGHT_PX = 380;

type SpotifyPlayerContextValue = {
  ready: boolean;
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
        },
        (next) => {
          if (cancelled) return;
          setController(next);
          next.addListener("ready", () => {
            if (!cancelled) setReady(true);
          });
        },
      );
    });

    return () => {
      cancelled = true;
    };
  }, [embedHost]);

  const playFromNeedle = useCallback(() => {
    if (!controller) return;
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
      value={{ ready, playFromNeedle, setEmbedHost }}
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

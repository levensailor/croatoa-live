"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  createWebPlayer,
  loadWebPlaybackSdk,
  type SpotifyPlayerInstance,
  type WebPlaybackState,
  type WebPlaybackTrack,
} from "@/components/spotify/web-playback-sdk";
import { artistDisplayName } from "@/lib/site-config";
import { SpotifyWebPlayer } from "@/components/spotify/SpotifyWebPlayer";
import type { SpotifyTrackItem } from "@/lib/spotify/types";

type SpotifyPlayerContextValue = {
  ready: boolean;
  authenticated: boolean;
  isPlaying: boolean;
  tracks: SpotifyTrackItem[];
  tracksLoading: boolean;
  tracksError: string | null;
  currentTrack: WebPlaybackTrack | null;
  playerError: string | null;
  premiumRequired: boolean;
  loginHref: string;
  playFromNeedle: () => void;
  togglePlay: () => Promise<void>;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
  playTrack: (uri: string) => Promise<void>;
};

const SpotifyPlayerContext = createContext<SpotifyPlayerContextValue | null>(
  null,
);

export function useSpotifyPlayer() {
  return useContext(SpotifyPlayerContext);
}

async function fetchAccessToken(): Promise<string | null> {
  const res = await fetch("/api/spotify/token", { cache: "no-store" });
  if (res.status === 401) return null;
  if (!res.ok) return null;
  const json = (await res.json()) as { access_token?: string };
  return json.access_token ?? null;
}

async function startPlaybackOnDevice(
  accessToken: string,
  deviceId: string,
  uris: string[],
) {
  const params = new URLSearchParams({ device_id: deviceId });
  const res = await fetch(
    `https://api.spotify.com/v1/me/player/play?${params.toString()}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris }),
    },
  );
  if (res.status !== 204 && !res.ok) {
    throw new Error(`Playback failed (${res.status})`);
  }
}

export function SpotifyPlayerProvider({ children }: { children: ReactNode }) {
  const [tracks, setTracks] = useState<SpotifyTrackItem[]>([]);
  const [tracksLoading, setTracksLoading] = useState(true);
  const [tracksError, setTracksError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<WebPlaybackTrack | null>(
    null,
  );
  const [playerError, setPlayerError] = useState<string | null>(null);
  const [premiumRequired, setPremiumRequired] = useState(false);

  const playerRef = useRef<SpotifyPlayerInstance | null>(null);
  const deviceIdRef = useRef<string | null>(null);
  const accessTokenRef = useRef<string | null>(null);

  const loginHref = "/api/spotify/login";

  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/spotify/tracks", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          const json = (await res.json().catch(() => ({}))) as {
            error?: string;
          };
          throw new Error(json.error ?? "Could not load tracks");
        }
        return res.json() as Promise<{ tracks: SpotifyTrackItem[] }>;
      })
      .then((json) => {
        if (!cancelled) {
          setTracks(json.tracks);
          setTracksError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setTracksError(
            err instanceof Error ? err.message : "Could not load tracks",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setTracksLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchAccessToken().then((token) => {
      if (!cancelled) setAccessToken(token);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const applyState = useCallback((state: WebPlaybackState | null) => {
    if (!state) {
      setIsPlaying(false);
      return;
    }
    setCurrentTrack(state.track_window.current_track);
    setIsPlaying(!state.paused);
  }, []);

  useEffect(() => {
    if (!accessToken) {
      setReady(false);
      playerRef.current?.disconnect();
      playerRef.current = null;
      deviceIdRef.current = null;
      return;
    }

    let cancelled = false;
    setPlayerError(null);
    setPremiumRequired(false);

    loadWebPlaybackSdk()
      .then(() => {
        if (cancelled) return;

        const instance = createWebPlayer(`${artistDisplayName} Web`, (cb) => {
          void fetchAccessToken().then((token) => {
            if (token) {
              setAccessToken(token);
              cb(token);
            }
          });
        });
        playerRef.current = instance;

        instance.addListener("ready", (payload) => {
          if (cancelled) return;
          const { device_id } = payload as { device_id: string };
          deviceIdRef.current = device_id;
          setReady(true);
        });

        instance.addListener("not_ready", (payload) => {
          if (cancelled) return;
          const { device_id } = payload as { device_id: string };
          if (deviceIdRef.current === device_id) {
            setReady(false);
          }
        });

        instance.addListener("player_state_changed", (state) => {
          if (cancelled) return;
          applyState(state as WebPlaybackState | null);
        });

        instance.addListener("initialization_error", (payload) => {
          if (cancelled) return;
          const message = (payload as { message?: string }).message;
          setPlayerError(
            typeof message === "string" ? message : "Player failed to start",
          );
        });

        instance.addListener("authentication_error", () => {
          if (cancelled) return;
          setAccessToken(null);
          setPlayerError("Spotify session expired — log in again.");
        });

        instance.addListener("account_error", () => {
          if (cancelled) return;
          setPremiumRequired(true);
          setPlayerError("Premium account required for playback.");
        });

        instance.addListener("playback_error", () => {
          if (cancelled) return;
          setPlayerError("Playback error — try another track.");
        });

        void instance.connect();
      })
      .catch((err) => {
        if (!cancelled) {
          setPlayerError(
            err instanceof Error ? err.message : "Could not load Spotify SDK",
          );
        }
      });

    return () => {
      cancelled = true;
      setReady(false);
      playerRef.current?.disconnect();
      playerRef.current = null;
      deviceIdRef.current = null;
    };
  }, [accessToken, applyState]);

  const playTrack = useCallback(async (uri: string) => {
    const token = accessTokenRef.current;
    const deviceId = deviceIdRef.current;
    if (!token || !deviceId) return;

    await startPlaybackOnDevice(token, deviceId, [uri]);
    setIsPlaying(true);
  }, []);

  const playFromNeedle = useCallback(() => {
    const token = accessTokenRef.current;
    const deviceId = deviceIdRef.current;
    if (!token || !deviceId) {
      window.location.href = loginHref;
      return;
    }

    document.getElementById("player")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const uris = tracks.map((t) => t.uri).filter(Boolean);
    if (uris.length === 0) return;

    void startPlaybackOnDevice(token, deviceId, uris.slice(0, 8))
      .then(() => setIsPlaying(true))
      .catch(() => setPlayerError("Could not start playback."));
  }, [tracks]);

  const togglePlay = useCallback(async () => {
    const instance = playerRef.current;
    if (!instance) return;
    await instance.activateElement();
    await instance.togglePlay();
  }, []);

  const nextTrack = useCallback(async () => {
    await playerRef.current?.nextTrack();
  }, []);

  const previousTrack = useCallback(async () => {
    await playerRef.current?.previousTrack();
  }, []);

  return (
    <SpotifyPlayerContext.Provider
      value={{
        ready,
        authenticated: Boolean(accessToken),
        isPlaying,
        tracks,
        tracksLoading,
        tracksError,
        currentTrack,
        playerError,
        premiumRequired,
        loginHref,
        playFromNeedle,
        togglePlay,
        nextTrack,
        previousTrack,
        playTrack,
      }}
    >
      {children}
    </SpotifyPlayerContext.Provider>
  );
}

/** @deprecated Name kept for page import — renders Web Playback SDK player. */
export function SpotifyEmbedHost() {
  return <SpotifyWebPlayer />;
}

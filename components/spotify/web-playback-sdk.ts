export type WebPlaybackImage = { url: string; height: number; width: number };

export type WebPlaybackTrack = {
  uri: string;
  name: string;
  duration_ms: number;
  album: { name: string; images: WebPlaybackImage[] };
  artists: { name: string }[];
};

export type WebPlaybackState = {
  paused: boolean;
  position: number;
  duration: number;
  track_window: { current_track: WebPlaybackTrack };
};

export type SpotifyPlayerInstance = {
  connect: () => Promise<boolean>;
  disconnect: () => void;
  addListener: (
    event: string,
    callback: (payload: unknown) => void,
  ) => void;
  removeListener: (event: string) => void;
  getCurrentState: () => Promise<WebPlaybackState | null>;
  togglePlay: () => Promise<void>;
  previousTrack: () => Promise<void>;
  nextTrack: () => Promise<void>;
  activateElement: () => Promise<void>;
};

type SpotifyPlayerConstructor = new (options: {
  name: string;
  getOAuthToken: (cb: (token: string) => void) => void;
  volume: number;
}) => SpotifyPlayerInstance;

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady?: () => void;
    Spotify?: {
      Player: SpotifyPlayerConstructor;
    };
  }
}

let sdkReady = false;
const sdkWaiters: Array<() => void> = [];

export function loadWebPlaybackSdk(): Promise<void> {
  if (sdkReady && window.Spotify?.Player) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    sdkWaiters.push(resolve);

    const previous = window.onSpotifyWebPlaybackSDKReady;
    window.onSpotifyWebPlaybackSDKReady = () => {
      sdkReady = true;
      previous?.();
      sdkWaiters.splice(0).forEach((fn) => fn());
    };

    if (
      document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]')
    ) {
      if (window.Spotify?.Player) {
        sdkReady = true;
        sdkWaiters.splice(0).forEach((fn) => fn());
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
  });
}

export function createWebPlayer(
  name: string,
  getOAuthToken: (cb: (token: string) => void) => void,
): SpotifyPlayerInstance {
  if (!window.Spotify?.Player) {
    throw new Error("Spotify Web Playback SDK is not loaded");
  }

  return new window.Spotify.Player({
    name,
    getOAuthToken,
    volume: 0.85,
  });
}

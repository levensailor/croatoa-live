/** Minimal types for Spotify’s embed iFrame API (no npm package). */

export type SpotifyPlaybackUpdate = {
  isPaused: boolean;
  isBuffering?: boolean;
  position?: number;
  duration?: number;
  playingURI?: string;
};

export type SpotifyEmbedEventMap = {
  ready: void;
  playback_started: { playingURI?: string };
  playback_update: SpotifyPlaybackUpdate;
};

export type SpotifyEmbedController = {
  play: () => void;
  resume: () => void;
  togglePlay: () => void;
  addListener: <E extends keyof SpotifyEmbedEventMap>(
    event: E,
    callback: (payload: SpotifyEmbedEventMap[E]) => void,
  ) => void;
};

export type SpotifyEmbedControllerOptions = {
  uri: string;
  width?: string;
  height?: string;
  /** Undocumented but supported — `"dark"` maps to `theme=0` on the embed URL. */
  theme?: "dark";
};

export type SpotifyIFrameApi = {
  createController: (
    element: HTMLElement,
    options: SpotifyEmbedControllerOptions,
    callback: (controller: SpotifyEmbedController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameApi) => void;
  }
}

let cachedApi: SpotifyIFrameApi | null = null;
const waiters: Array<(api: SpotifyIFrameApi) => void> = [];

export function loadSpotifyIframeApi(): Promise<SpotifyIFrameApi> {
  if (cachedApi) return Promise.resolve(cachedApi);

  return new Promise((resolve) => {
    waiters.push(resolve);

    const previous = window.onSpotifyIframeApiReady;
    window.onSpotifyIframeApiReady = (api) => {
      cachedApi = api;
      previous?.(api);
      waiters.splice(0).forEach((fn) => fn(api));
    };

    if (
      document.querySelector(
        'script[src="https://open.spotify.com/embed/iframe-api/v1"]',
      )
    ) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);
  });
}

/** Spotify wraps playback fields under `data` in playback_update callbacks. */
export function normalizePlaybackUpdate(
  payload: SpotifyPlaybackUpdate | { data?: SpotifyPlaybackUpdate },
): SpotifyPlaybackUpdate {
  if (payload && "data" in payload && payload.data) {
    return payload.data;
  }
  return payload as SpotifyPlaybackUpdate;
}

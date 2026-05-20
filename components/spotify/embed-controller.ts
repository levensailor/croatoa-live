/** Minimal types for Spotify’s embed iFrame API (no npm package). */

export type SpotifyEmbedController = {
  play: () => void;
  resume: () => void;
  togglePlay: () => void;
  addListener: (event: "ready", callback: () => void) => void;
};

export type SpotifyIFrameApi = {
  createController: (
    element: HTMLElement,
    options: { uri: string; width?: string; height?: string },
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

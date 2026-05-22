"use client";

import Image from "next/image";
import { useSpotifyPlayer } from "@/components/SpotifyPlayerProvider";
import { formatMs } from "@/components/spotify/format";

export function SpotifyWebPlayer() {
  const player = useSpotifyPlayer();
  if (!player) {
    throw new Error("SpotifyWebPlayer must be used inside SpotifyPlayerProvider");
  }

  const {
    tracks,
    tracksLoading,
    tracksError,
    authenticated,
    ready,
    isPlaying,
    currentTrack,
    playerError,
    premiumRequired,
    togglePlay,
    nextTrack,
    previousTrack,
    playTrack,
    loginHref,
  } = player;

  const coverUrl = currentTrack?.album.images[0]?.url;
  const activeUri = currentTrack?.uri;

  return (
    <div className="player-wrap web-player">
      {!authenticated ? (
        <div className="web-player__gate">
          <p className="web-player__gate-lede">
            Connect Spotify Premium to play CROATOA in the browser.
          </p>
          <a className="web-player__login btn-comp" href={loginHref}>
            Log in with Spotify
          </a>
          {tracksLoading ? (
            <p className="web-player__hint">Loading tracklist…</p>
          ) : tracksError ? (
            <p className="web-player__hint web-player__hint--error">
              {tracksError}
            </p>
          ) : null}
        </div>
      ) : null}

      {authenticated && playerError ? (
        <p className="web-player__banner web-player__banner--error" role="alert">
          {playerError}
          {premiumRequired ? (
            <span> Spotify Premium is required for in-browser playback.</span>
          ) : null}
        </p>
      ) : null}

      {authenticated && !ready && !playerError ? (
        <p className="web-player__hint">Connecting player…</p>
      ) : null}

      <div className="web-player__now" aria-live="polite">
        <div className="web-player__art">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt=""
              width={64}
              height={64}
              unoptimized
              className="web-player__cover"
            />
          ) : (
            <span className="web-player__cover web-player__cover--empty" />
          )}
        </div>
        <div className="web-player__meta">
          <p className="web-player__title">
            {currentTrack?.name ?? "—"}
          </p>
          <p className="web-player__artist">
            {currentTrack?.artists.map((a) => a.name).join(", ") ?? "CROATOA"}
          </p>
        </div>
        <div className="web-player__transport">
          <button
            type="button"
            className="web-player__btn"
            onClick={() => void previousTrack()}
            disabled={!ready}
            aria-label="Previous track"
          >
            ‹‹
          </button>
          <button
            type="button"
            className="web-player__btn web-player__btn--play"
            onClick={() => void togglePlay()}
            disabled={!ready}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <button
            type="button"
            className="web-player__btn"
            onClick={() => void nextTrack()}
            disabled={!ready}
            aria-label="Next track"
          >
            ››
          </button>
        </div>
      </div>

      <ol className="web-player__queue" aria-label="Top tracks">
        {tracksLoading && tracks.length === 0 ? (
          <li className="web-player__queue-empty">Loading tracks…</li>
        ) : null}
        {tracks.map((track, index) => (
          <li key={track.id}>
            <button
              type="button"
              className={[
                "web-player__track",
                activeUri === track.uri && "web-player__track--active",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => void playTrack(track.uri)}
              disabled={!authenticated || !ready}
            >
              <span className="web-player__track-num">{index + 1}</span>
              <span className="web-player__track-main">
                <span className="web-player__track-name">{track.name}</span>
                <span className="web-player__track-artist">
                  {track.artists.map((a) => a.name).join(", ")}
                </span>
              </span>
              <span className="web-player__track-time">
                {formatMs(track.duration_ms)}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

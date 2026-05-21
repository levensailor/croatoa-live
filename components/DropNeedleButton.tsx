"use client";

import { useState } from "react";
import { useSpotifyPlayer } from "@/components/SpotifyPlayerProvider";

export function DropNeedleButton() {
  const player = useSpotifyPlayer();
  const [dropped, setDropped] = useState(false);

  if (!player?.ready) {
    return (
      <span
        className="drop-needle drop-needle--placeholder"
        aria-hidden="true"
      />
    );
  }

  const handleClick = () => {
    setDropped(true);
    player.playFromNeedle();
  };

  return (
    <button
      type="button"
      className={[
        "drop-needle",
        "drop-needle--ready",
        dropped && "drop-needle--dropped",
        player.isPlaying && "drop-needle--playing",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={handleClick}
      aria-label="Drop needle and play on Spotify"
      aria-pressed={player.isPlaying}
    >
      <span className="drop-needle__platter" aria-hidden="true">
        <span className="drop-needle__disc">
          <span className="drop-needle__label" />
        </span>
      </span>
      <span className="drop-needle__arm" aria-hidden="true">
        <svg
          className="drop-needle__arm-svg"
          viewBox="0 0 48 48"
          width="48"
          height="48"
          focusable="false"
        >
          <circle cx="40" cy="8" r="3.5" fill="var(--s4)" />
          <path
            d="M40 8 L10 28"
            stroke="var(--s1)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect
            x="4"
            y="26"
            width="10"
            height="5"
            rx="1"
            fill="var(--t3)"
            transform="rotate(-24 9 28.5)"
          />
        </svg>
      </span>
    </button>
  );
}

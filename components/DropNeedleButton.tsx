"use client";

import { useSpotifyPlayer } from "@/components/SpotifyPlayerProvider";

export function DropNeedleButton() {
  const player = useSpotifyPlayer();

  if (!player?.ready) {
    return <span className="hero-actions__placeholder" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      className="btn btn-primary hero-actions__btn"
      onClick={player.playFromNeedle}
    >
      ▶ Drop needle
    </button>
  );
}

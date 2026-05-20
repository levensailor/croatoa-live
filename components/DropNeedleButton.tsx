"use client";

import { useSpotifyPlayer } from "@/components/SpotifyPlayerProvider";

export function DropNeedleButton() {
  const player = useSpotifyPlayer();

  if (!player?.ready) return null;

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={player.playFromNeedle}
    >
      ▶ Drop needle
    </button>
  );
}

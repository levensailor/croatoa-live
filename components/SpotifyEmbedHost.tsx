"use client";

import { useSpotifyPlayer } from "@/components/SpotifyPlayerProvider";
import { spotifyEmbedHeightPx } from "@/lib/site-config";

/**
 * Spotify track embed via iFrame API — same Clap Back track as the generator
 * iframe; exposes playback events for the turntable sync.
 */
export function SpotifyEmbedHost() {
  const player = useSpotifyPlayer();
  if (!player) {
    throw new Error("SpotifyEmbedHost must be used inside SpotifyPlayerProvider");
  }

  return (
    <div
      ref={player.setEmbedHost}
      className="player-wrap spotify-embed-host"
      style={{ minHeight: spotifyEmbedHeightPx }}
    />
  );
}

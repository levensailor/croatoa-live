"use client";

import { useSpotifyPlayer } from "@/components/SpotifyPlayerProvider";
import {
  spotifyEmbedHeightPx,
  spotifyEmbedSrc,
} from "@/lib/site-config";

/** Spotify track embed — generator iframe for Clap Back. */
export function SpotifyEmbedHost() {
  const player = useSpotifyPlayer();
  if (!player) {
    throw new Error("SpotifyEmbedHost must be used inside SpotifyPlayerProvider");
  }

  return (
    <div className="player-wrap spotify-embed-host">
      <iframe
        data-testid="embed-iframe"
        title="Spotify track player"
        src={spotifyEmbedSrc}
        width="100%"
        height={spotifyEmbedHeightPx}
        style={{ borderRadius: 12 }}
        frameBorder={0}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="spotify-embed-iframe"
        onLoad={player.markEmbedReady}
      />
    </div>
  );
}

import { productionSiteUrl, spotifyArtistId } from "@/lib/site-config";

export const spotifyScopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-modify-playback-state",
  "user-read-playback-state",
] as const;

export const spotifyCookieNames = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expiresAt: "spotify_token_expires_at",
  oauthState: "spotify_oauth_state",
} as const;

export type SpotifyConfig = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

export function getSpotifyConfig(): SpotifyConfig | null {
  const clientId = process.env.SPOTIFY_CLIENT_ID?.trim();
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret) return null;

  const redirectUri =
    process.env.SPOTIFY_REDIRECT_URI?.trim() ??
    `${productionSiteUrl}/api/spotify/callback`;

  return { clientId, clientSecret, redirectUri };
}

export function spotifyArtistTopTracksUrl(market = "US") {
  return `https://api.spotify.com/v1/artists/${spotifyArtistId}/top-tracks?market=${market}`;
}

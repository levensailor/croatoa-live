import { cookies } from "next/headers";
import {
  getSpotifyConfig,
  spotifyArtistTopTracksUrl,
  spotifyCookieNames,
  spotifyScopes,
} from "@/lib/spotify/config";
import type {
  SpotifyTokenResponse,
  SpotifyTopTracksResponse,
  SpotifyTrackItem,
} from "@/lib/spotify/types";

const TOKEN_URL = "https://accounts.spotify.com/api/token";

function basicAuthHeader(clientId: string, clientSecret: string) {
  return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
}

export async function exchangeAuthorizationCode(
  code: string,
): Promise<SpotifyTokenResponse> {
  const config = getSpotifyConfig();
  if (!config) throw new Error("Spotify is not configured");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: config.redirectUri,
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: basicAuthHeader(config.clientId, config.clientSecret),
    },
    body,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Spotify token exchange failed (${res.status})`);
  }

  return (await res.json()) as SpotifyTokenResponse;
}

export async function refreshAccessToken(
  refreshToken: string,
): Promise<SpotifyTokenResponse> {
  const config = getSpotifyConfig();
  if (!config) throw new Error("Spotify is not configured");

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: basicAuthHeader(config.clientId, config.clientSecret),
    },
    body,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Spotify token refresh failed (${res.status})`);
  }

  return (await res.json()) as SpotifyTokenResponse;
}

export async function getClientCredentialsToken(): Promise<string> {
  const config = getSpotifyConfig();
  if (!config) throw new Error("Spotify is not configured");

  const body = new URLSearchParams({ grant_type: "client_credentials" });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: basicAuthHeader(config.clientId, config.clientSecret),
    },
    body,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Spotify client credentials failed (${res.status})`);
  }

  const json = (await res.json()) as SpotifyTokenResponse;
  return json.access_token;
}

export async function persistTokenResponse(tokens: SpotifyTokenResponse) {
  const jar = await cookies();
  const expiresAt = Date.now() + tokens.expires_in * 1000 - 60_000;

  jar.set(spotifyCookieNames.accessToken, tokens.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: tokens.expires_in,
  });

  jar.set(spotifyCookieNames.expiresAt, String(expiresAt), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: tokens.expires_in,
  });

  if (tokens.refresh_token) {
    jar.set(spotifyCookieNames.refreshToken, tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 60,
    });
  }
}

export async function clearSpotifySession() {
  const jar = await cookies();
  for (const name of Object.values(spotifyCookieNames)) {
    jar.delete(name);
  }
}

export async function getValidAccessToken(): Promise<string | null> {
  const jar = await cookies();
  const access = jar.get(spotifyCookieNames.accessToken)?.value;
  const refresh = jar.get(spotifyCookieNames.refreshToken)?.value;
  const expiresRaw = jar.get(spotifyCookieNames.expiresAt)?.value;
  const expiresAt = expiresRaw ? Number(expiresRaw) : 0;

  if (access && expiresAt > Date.now()) {
    return access;
  }

  if (!refresh) return null;

  try {
    const tokens = await refreshAccessToken(refresh);
    await persistTokenResponse({
      ...tokens,
      refresh_token: tokens.refresh_token ?? refresh,
    });
    return tokens.access_token;
  } catch {
    await clearSpotifySession();
    return null;
  }
}

export function buildAuthorizeUrl(state: string): string {
  const config = getSpotifyConfig();
  if (!config) throw new Error("Spotify is not configured");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: config.clientId,
    scope: spotifyScopes.join(" "),
    redirect_uri: config.redirectUri,
    state,
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function fetchArtistTopTracks(
  limit = 8,
): Promise<SpotifyTrackItem[]> {
  const token = await getClientCredentialsToken();
  const res = await fetch(spotifyArtistTopTracksUrl(), {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Spotify top tracks failed (${res.status})`);
  }

  const json = (await res.json()) as SpotifyTopTracksResponse;
  return json.tracks.slice(0, limit);
}

export async function startPlayback(
  accessToken: string,
  deviceId: string,
  uris: string[],
) {
  const params = new URLSearchParams({ device_id: deviceId });
  const res = await fetch(
    `https://api.spotify.com/v1/me/player/play?${params.toString()}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris }),
    },
  );

  if (res.status === 204 || res.ok) return;

  const text = await res.text().catch(() => "");
  throw new Error(`Spotify play failed (${res.status}) ${text}`);
}

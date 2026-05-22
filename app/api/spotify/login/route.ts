import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSpotifyConfig, spotifyCookieNames } from "@/lib/spotify/config";
import { buildAuthorizeUrl } from "@/lib/spotify/server";

export async function GET() {
  if (!getSpotifyConfig()) {
    return NextResponse.json(
      { error: "Spotify is not configured on the server." },
      { status: 503 },
    );
  }

  const state = randomBytes(16).toString("hex");
  const jar = await cookies();
  jar.set(spotifyCookieNames.oauthState, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  return NextResponse.redirect(buildAuthorizeUrl(state));
}

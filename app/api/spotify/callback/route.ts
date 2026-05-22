import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { productionSiteUrl } from "@/lib/site-config";
import { spotifyCookieNames } from "@/lib/spotify/config";
import {
  exchangeAuthorizationCode,
  persistTokenResponse,
} from "@/lib/spotify/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  const redirectBase = `${productionSiteUrl}/#player`;

  if (error) {
    return NextResponse.redirect(`${redirectBase}?spotify_error=${error}`);
  }

  if (!code || !state) {
    return NextResponse.redirect(`${redirectBase}?spotify_error=missing_code`);
  }

  const jar = await cookies();
  const savedState = jar.get(spotifyCookieNames.oauthState)?.value;
  jar.delete(spotifyCookieNames.oauthState);

  if (!savedState || savedState !== state) {
    return NextResponse.redirect(`${redirectBase}?spotify_error=invalid_state`);
  }

  try {
    const tokens = await exchangeAuthorizationCode(code);
    await persistTokenResponse(tokens);
    return NextResponse.redirect(`${redirectBase}?spotify_connected=1`);
  } catch {
    return NextResponse.redirect(`${redirectBase}?spotify_error=token_exchange`);
  }
}

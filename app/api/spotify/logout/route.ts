import { NextResponse } from "next/server";
import { clearSpotifySession } from "@/lib/spotify/server";

export async function POST() {
  await clearSpotifySession();
  return NextResponse.json({ ok: true });
}

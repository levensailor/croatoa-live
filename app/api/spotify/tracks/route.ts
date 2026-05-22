import { NextResponse } from "next/server";
import { fetchArtistTopTracks } from "@/lib/spotify/server";

export async function GET() {
  try {
    const tracks = await fetchArtistTopTracks(8);
    return NextResponse.json({ tracks });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load tracks";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

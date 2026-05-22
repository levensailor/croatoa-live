import { NextResponse } from "next/server";
import { getValidAccessToken } from "@/lib/spotify/server";

export async function GET() {
  const accessToken = await getValidAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  return NextResponse.json({ access_token: accessToken });
}

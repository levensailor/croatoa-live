import fs from "node:fs";
import path from "node:path";

const fallbackBio = `CROATOA formed in 2023 when Jeff Levensailor and Jay Bryant moved back home to Wilmington after stints in Los Angeles and Chicago and started playing together. It wasn't until finding Colin Kern (bass) and a cheap rehearsal space in a dicey part of town was the trio locked in.

Wilmington rock — bass driven, slap back echo on the vocals, verse chorus verse and lots of staccato.`;

const fallbackTracks = [
  "Start a Fire",
  "Pete Davidson",
  "Clap Back",
  "Always Have to Win",
  "Roanoke",
  "All Alone and Tired",
  "Dreamcatcher",
  "Humdrum #1",
];

function readDataFile(name: "bio.txt" | "tracklist.txt"): string | null {
  const full = path.join(process.cwd(), "data", name);
  try {
    if (fs.existsSync(full)) {
      return fs.readFileSync(full, "utf8").trim();
    }
  } catch {
    /* ignore */
  }
  return null;
}

function getBioRaw(): string {
  return readDataFile("bio.txt") ?? fallbackBio;
}

function splitBioParagraphs(raw: string): string[] {
  return raw
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean);
}

export function getBioParagraphs(): string[] {
  return splitBioParagraphs(getBioRaw());
}

/** Visible bio ends at this phrase; remainder toggles via expand control. */
export const bioTeaserEndMarker = "mumbling.";

export function getBioTeaserAndRest(): { teaser: string[]; rest: string[] } {
  const raw = getBioRaw();
  const idx = raw.indexOf(bioTeaserEndMarker);
  if (idx === -1) {
    const paragraphs = splitBioParagraphs(raw);
    return { teaser: paragraphs, rest: [] };
  }
  const teaserRaw = raw.slice(0, idx + bioTeaserEndMarker.length).trim();
  const restRaw = raw.slice(idx + bioTeaserEndMarker.length).trim();
  return {
    teaser: splitBioParagraphs(teaserRaw),
    rest: restRaw ? splitBioParagraphs(restRaw) : [],
  };
}

export function getTrackTitles(): string[] {
  const raw = readDataFile("tracklist.txt");
  if (!raw) return fallbackTracks;
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

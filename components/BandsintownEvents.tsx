"use client";

import { useEffect, useId, type RefObject } from "react";
import {
  artistDisplayName,
  bandsintownArtistUrl,
} from "@/lib/site-config";

type BandsintownEventsProps = {
  shellRef?: RefObject<HTMLDivElement | null>;
};

/**
 * Official Bandsintown widget loader. Styling uses BIT data attributes;
 * replace with manager-provided embed from Bandsintown artist tools if needed..
 */
export function BandsintownEvents({ shellRef }: BandsintownEventsProps) {
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://widget.bandsintown.com/main.min.js"]',
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://widget.bandsintown.com/main.min.js";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="bit-shell" ref={shellRef}>
      <a
        id={`bit-events-${uid}`}
        className="bit-widget-initializer"
        data-artist-name={artistDisplayName}
        data-display-local-dates="false"
        data-auto-style="false"
        data-text-color="#FFBB78"
        data-link-text-color="#64D682"
        data-background-color="#A81300"
        data-separator-color="#D11F73"
        data-font="Helvetica, Arial, sans-serif"
        data-display-past-dates="false"
        data-display-track="true"
        data-language="en"
        href={bandsintownArtistUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        View upcoming shows
      </a>
    </div>
  );
}

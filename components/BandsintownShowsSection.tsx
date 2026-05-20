"use client";

import { useEffect, useRef, useState } from "react";
import { BandsintownEvents } from "@/components/BandsintownEvents";

const SHOWS_STATUS_EVENT = "croatoa-shows-status";
const DETECT_TIMEOUT_MS = 12_000;

type ShowsStatus = "loading" | "has-events" | "no-events";

function detectShowsInWidget(root: HTMLElement): ShowsStatus | null {
  if (root.querySelector(".bit-event")) return "has-events";
  if (root.querySelector(".bit-no-dates-container")) return "no-events";
  return null;
}

function publishShowsStatus(hasEvents: boolean) {
  window.dispatchEvent(
    new CustomEvent(SHOWS_STATUS_EVENT, { detail: { hasEvents } }),
  );
}

export function BandsintownShowsSection() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<ShowsStatus>("loading");

  useEffect(() => {
    const root = shellRef.current;
    if (!root) return;

    const resolve = (next: ShowsStatus) => {
      setStatus(next);
      publishShowsStatus(next === "has-events");
    };

    const check = () => {
      const detected = detectShowsInWidget(root);
      if (detected) {
        resolve(detected);
        return true;
      }
      return false;
    };

    if (check()) return;

    const observer = new MutationObserver(() => {
      if (check()) observer.disconnect();
    });
    observer.observe(root, { childList: true, subtree: true });

    const timeout = window.setTimeout(() => {
      observer.disconnect();
      setStatus((current) => {
        if (current !== "loading") return current;
        publishShowsStatus(false);
        return "no-events";
      });
    }, DETECT_TIMEOUT_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, []);

  if (status === "no-events") return null;

  return (
    <section
      className={`panel shows-panel${status === "loading" ? " shows-panel--loading" : ""}`}
      id="shows"
      aria-labelledby="shows-heading"
      aria-hidden={status === "loading"}
    >
      <h2 id="shows-heading">Upcoming — Bandsintown</h2>
      <BandsintownEvents shellRef={shellRef} />
    </section>
  );
}

export { SHOWS_STATUS_EVENT };

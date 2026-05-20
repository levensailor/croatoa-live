"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { SHOWS_STATUS_EVENT } from "@/components/BandsintownShowsSection";

function useHasUpcomingShows() {
  const [hasShows, setHasShows] = useState(false);

  useEffect(() => {
    const onStatus = (event: Event) => {
      const detail = (event as CustomEvent<{ hasEvents: boolean }>).detail;
      if (detail && typeof detail.hasEvents === "boolean") {
        setHasShows(detail.hasEvents);
      }
    };
    window.addEventListener(SHOWS_STATUS_EVENT, onStatus);
    return () => window.removeEventListener(SHOWS_STATUS_EVENT, onStatus);
  }, []);

  return hasShows;
}

export function ShowsNavLink() {
  const hasShows = useHasUpcomingShows();
  if (!hasShows) return null;
  return <a href="#shows">Shows</a>;
}

export function ShowsHeroLink({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const hasShows = useHasUpcomingShows();
  if (!hasShows) return null;
  return (
    <a className={className} href="#shows">
      {children}
    </a>
  );
}

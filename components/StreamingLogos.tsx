import type { ReactNode } from "react";
import {
  amazonMusicArtistUrl,
  appleMusicArtistUrl,
  bandcampAlbumUrl,
  bandsintownArtistUrl,
  instagramUrl,
  spotifyArtistUrl,
  tidalArtistUrl,
  youtubeChannelUrl,
  youtubeMusicArtistUrl,
} from "@/lib/site-config";

type ServiceLink = {
  name: string;
  href: string;
  icon: ReactNode;
};

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <path
        fill="currentColor"
        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.28c-.194.32-.61.42-.93.226-2.55-1.56-5.76-1.91-9.55-1.05-.364.083-.728-.145-.81-.51-.083-.364.145-.728.51-.81 4.12-.94 7.68-.55 10.57 1.24.32.194.42.61.226.93zm1.47-3.27c-.245.398-.766.523-1.164.278-2.92-1.79-7.36-2.31-10.81-1.26-.453.137-.93-.118-1.067-.57-.137-.453.118-.93.57-1.067 3.96-1.2 8.88-.63 12.16 1.37.398.245.523.766.278 1.164zm.13-3.41C15.24 8.4 8.82 8.16 5.16 9.28c-.54.163-1.11-.14-1.273-.68-.163-.54.14-1.11.68-1.273 4.24-1.28 11.28-1.04 15.76 1.62.486.297.64.934.343 1.42-.297.486-.934.64-1.42.343z"
      />
    </svg>
  );
}

function AppleMusicIcon() {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <path
        fill="currentColor"
        d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
      />
    </svg>
  );
}

function TidalIcon() {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <path fill="currentColor" d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996 4.004 12l4.004-4.004L12.012 12l-4.004 4.004L12.012 20.012l4.004-4.004L20.02 20.012 24.024 16.008l-4.004-4.004 4.004-4.004-4.004-4.004-4.004 4.004-4.004-4.004z" />
    </svg>
  );
}

function AmazonMusicIcon() {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-5l4.5 2.5-4.5 2.5zm1-9.5c3.31 0 6 2.24 6 5 0 .55-.45 1-1 1s-1-.45-1-1c0-1.93-2.24-3-4-3s-4 1.07-4 3c0 .55-.45 1-1 1s-1-.45-1-1c0-2.76 2.69-5 6-5z"
      />
    </svg>
  );
}

function BandcampIcon() {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <path
        fill="currentColor"
        d="M0 18.75h7.5V5.25H0v13.5zm10.5 0h7.5V0h-7.5v18.75z"
      />
    </svg>
  );
}

function YoutubeMusicIcon() {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <path
        fill="currentColor"
        d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.568 12.18l-6.3 3.64c-.504.292-1.14-.073-1.14-.648V8.828c0-.575.636-.94 1.14-.648l6.3 3.64c.504.292.504 1.004 0 1.296z"
      />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <path
        fill="currentColor"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
      />
    </svg>
  );
}

function BandsintownIcon() {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <path
        fill="currentColor"
        d="M18.775 0H5.225C2.338 0 0 2.338 0 5.225v13.55C0 21.662 2.338 24 5.225 24h13.55C21.662 24 24 21.662 24 18.775V5.225C24 2.338 21.662 0 18.775 0zM12 20.065c-4.436 0-8.065-3.629-8.065-8.065S7.564 3.935 12 3.935s8.065 3.629 8.065 8.065-3.629 8.065-8.065 8.065z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      />
    </svg>
  );
}

const services: ServiceLink[] = [
  { name: "Spotify", href: spotifyArtistUrl, icon: <SpotifyIcon /> },
  { name: "Apple Music", href: appleMusicArtistUrl, icon: <AppleMusicIcon /> },
  { name: "Tidal", href: tidalArtistUrl, icon: <TidalIcon /> },
  { name: "Amazon Music", href: amazonMusicArtistUrl, icon: <AmazonMusicIcon /> },
  { name: "Bandcamp", href: bandcampAlbumUrl, icon: <BandcampIcon /> },
  { name: "YouTube Music", href: youtubeMusicArtistUrl, icon: <YoutubeMusicIcon /> },
  { name: "YouTube", href: youtubeChannelUrl, icon: <YoutubeIcon /> },
  { name: "Bandsintown", href: bandsintownArtistUrl, icon: <BandsintownIcon /> },
  { name: "Instagram", href: instagramUrl, icon: <InstagramIcon /> },
];

const brandClass: Record<string, string> = {
  Spotify: "stream-logo--spotify",
  "Apple Music": "stream-logo--apple",
  Tidal: "stream-logo--tidal",
  "Amazon Music": "stream-logo--amazon",
  Bandcamp: "stream-logo--bandcamp",
  "YouTube Music": "stream-logo--youtube-music",
  YouTube: "stream-logo--youtube",
  Bandsintown: "stream-logo--bandsintown",
  Instagram: "stream-logo--instagram",
};

export function StreamingLogos() {
  return (
    <nav className="stream-logos" aria-label="Stream everywhere">
      <ul className="stream-logos-list">
        {services.map((service) => (
          <li key={service.name}>
            <a
              href={service.href}
              target="_blank"
              rel="noreferrer"
              className={`stream-logo ${brandClass[service.name] ?? ""}`}
              aria-label={service.name}
            >
              {service.icon}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

import Image from "next/image";
import { BandsintownEvents } from "@/components/BandsintownEvents";
import { FanEmailSignup } from "@/components/FanEmailSignup";
import { getBioParagraphs } from "@/lib/content";
import {
  amazonMusicArtistUrl,
  appleMusicArtistUrl,
  artistDisplayName,
  artistTagline,
  bookingEmail,
  cityRegion,
  heroImageFilename,
  instagramHandle,
  instagramUrl,
  spotifyArtistUrl,
  spotifyEmbedSrc,
  tidalArtistUrl,
  youtubeMusicArtistUrl,
} from "@/lib/site-config";

export default function HomePage() {
  const bioParagraphs = getBioParagraphs();

  return (
    <div className="shell">
      <div className="top-rgb" aria-hidden="true" />
      <header className="site-header">
        <div className="logo-lockup">
          <strong>{artistDisplayName}</strong>
          <span>
            {cityRegion} · channel 00 · stereo crush
          </span>
        </div>
        <nav className="nav-chips" aria-label="Page sections">
          <a href="#listen">Listen</a>
          <a href="#player">Play</a>
          <a href="#shows">Shows</a>
          <a href="#fan-list">Join</a>
          <a href="#bio">Bio</a>
          <a href="#book">Book</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="tv-frame">
            <span className="tv-bezel-label" aria-hidden="true">
              VIDEO / 1
            </span>
            <div className="tv-screen">
              <Image
                src={`/${heroImageFilename}`}
                alt={`${artistDisplayName} — main band photo, Wilmington NC rock`}
                fill
                sizes="(max-width: 880px) 100vw, 55vw"
                priority
                fetchPriority="high"
              />
              <div className="tv-glare" aria-hidden="true" />
            </div>
          </div>
          <div className="hero-side">
            <div className="hero-card">
              <h1 id="hero-heading">{artistDisplayName}</h1>
              <p className="lede">{artistTagline}</p>
              <FanEmailSignup />
              <div className="hero-actions">
                <a className="btn btn-primary" href="#player">
                  ▶ Drop needle
                </a>
                <a className="btn btn-secondary" href="#shows">
                  Live feed
                </a>
                <a className="btn btn-comp" href={spotifyArtistUrl} target="_blank" rel="noreferrer">
                  Spotify app
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="panel" id="listen" aria-labelledby="listen-heading">
          <h2 id="listen-heading">Stream everywhere</h2>
          <div className="grid-links">
            <a
              className="stream-tile"
              href={spotifyArtistUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="label">Spotify</span>
              <span className="sub">Artist profile</span>
            </a>
            <a
              className="stream-tile"
              href={appleMusicArtistUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="label">Apple</span>
              <span className="sub">Music</span>
            </a>
            <a className="stream-tile" href={tidalArtistUrl} target="_blank" rel="noreferrer">
              <span className="label">Tidal</span>
              <span className="sub">Hi-res</span>
            </a>
            <a
              className="stream-tile"
              href={amazonMusicArtistUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="label">Amazon</span>
              <span className="sub">Music</span>
            </a>
            <a
              className="stream-tile"
              href={youtubeMusicArtistUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="label">YouTube</span>
              <span className="sub">Music</span>
            </a>
            <a className="stream-tile" href={instagramUrl} target="_blank" rel="noreferrer">
              <span className="label">IG</span>
              <span className="sub">@{instagramHandle}</span>
            </a>
          </div>
        </section>

        <section
          className="panel player-panel"
          id="player"
          aria-labelledby="player-heading"
        >
          <h2 id="player-heading">Now playing — Spotify embed</h2>
          <div className="player-wrap">
            <iframe
              title={`Spotify player — ${artistDisplayName}`}
              src={spotifyEmbedSrc}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <p className="player-note">
            Playback runs on Spotify&apos;s embed player — streams count toward
            Spotify when listeners are signed in and playback meets
            Spotify&apos;s normal streaming rules (same as playing in the
            Spotify app or web player). If audio is blocked, open the{" "}
            <a href={spotifyArtistUrl} target="_blank" rel="noreferrer">
              artist profile
            </a>{" "}
            directly.
          </p>
        </section>

        <section className="panel" id="shows" aria-labelledby="shows-heading">
          <h2 id="shows-heading">Upcoming — Bandsintown</h2>
          <BandsintownEvents />
        </section>

        <section className="panel" id="bio" aria-labelledby="bio-heading">
          <h2 id="bio-heading">Bio</h2>
          <div className="bio-text">
            {bioParagraphs.map((paragraph, index) => (
              <p key={`bio-${index}`}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="panel" id="book" aria-labelledby="book-heading">
          <h2 id="book-heading">Booking</h2>
          <div className="booking-box">
            <p>
              For all booking and live inquiries — festivals, rooms, collabs,
              film, weird ideas — email the desk:
            </p>
            <p>
              <a href={`mailto:${bookingEmail}`}>{bookingEmail}</a>
            </p>
            <p style={{ marginBottom: 0, fontSize: "0.9rem", color: "var(--s2)" }}>
              Include dates, city, venue type, lineup, and a link to your
              favorite {artistDisplayName} track so we know you mean it.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} {artistDisplayName} · {cityRegion} ·{" "}
          <a href="#main">Top</a>
        </p>
      </footer>
    </div>
  );
}

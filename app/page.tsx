import Image from "next/image";
import { BandsintownShowsSection } from "@/components/BandsintownShowsSection";
import { ShowsHeroLink, ShowsNavLink } from "@/components/ShowsNavLink";
import { FanEmailSignup } from "@/components/FanEmailSignup";
import { DropNeedleButton } from "@/components/DropNeedleButton";
import { StreamingLogos } from "@/components/StreamingLogos";
import {
  SpotifyEmbedHost,
  SpotifyPlayerProvider,
} from "@/components/SpotifyPlayerProvider";
import { getBioParagraphs } from "@/lib/content";
import {
  artistDisplayName,
  artistTagline,
  bookingEmail,
  cityRegion,
  heroImageFilename,
  spotifyArtistUrl,
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
          <ShowsNavLink />
          <a href="#fan-list">Join</a>
          <a href="#bio">Bio</a>
          <a href="#book">Book</a>
        </nav>
      </header>

      <SpotifyPlayerProvider>
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
                <DropNeedleButton />
                <ShowsHeroLink className="btn btn-secondary">Live feed</ShowsHeroLink>
                <a className="btn btn-comp" href={spotifyArtistUrl} target="_blank" rel="noreferrer">
                  Spotify app
                </a>
              </div>
              <StreamingLogos />
            </div>
          </div>
        </section>

        <section
          className="panel player-panel"
          id="player"
          aria-labelledby="player-heading"
        >
          <h2 id="player-heading">Now playing — Spotify embed</h2>
          <SpotifyEmbedHost />
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

        <BandsintownShowsSection />

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
      </SpotifyPlayerProvider>

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} {artistDisplayName} · {cityRegion} ·{" "}
          <a href="#main">Top</a>
        </p>
      </footer>
    </div>
  );
}

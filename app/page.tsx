import { BandsintownShowsSection } from "@/components/BandsintownShowsSection";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { ShowsNavLink } from "@/components/ShowsNavLink";
import { DropNeedleButton } from "@/components/DropNeedleButton";
import { BioPeekGif } from "@/components/BioPeekGif";
import { StreamingLogos } from "@/components/StreamingLogos";
import { SpotifyEmbedHost } from "@/components/SpotifyEmbedHost";
import { SpotifyPlayerProvider } from "@/components/SpotifyPlayerProvider";
import { BioExpandable } from "@/components/BioExpandable";
import { getBioTeaserAndRest } from "@/lib/content";
import {
  artistDisplayName,
  artistTagline,
  bookingEmail,
  cityRegion,
  heroSlideshowSlides,
} from "@/lib/site-config";

export default function HomePage() {
  const { teaser: bioTeaser, rest: bioRest } = getBioTeaserAndRest();

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
          <a href="#bio">Bio</a>
          <a href="#book">Book</a>
        </nav>
      </header>

      <SpotifyPlayerProvider>
      <main id="main">
        <section className="hero-listen" aria-labelledby="hero-heading">
          <div className="tv-frame">
            <span className="tv-bezel-label" aria-hidden="true">
              VIDEO / 1
            </span>
            <div className="tv-screen">
              <HeroSlideshow
                slides={heroSlideshowSlides}
                sizes="(max-width: 880px) 100vw, 55vw"
              />
              <div className="tv-glare" aria-hidden="true" />
            </div>
          </div>

          <div className="hero-side">
            <div className="hero-card">
              <h1 id="hero-heading">{artistDisplayName}</h1>
              <p className="lede">{artistTagline}</p>
              <div className="hero-cta-stack" id="listen">
                <div className="hero-cta-top">
                  <div className="hero-actions__cell">
                    <DropNeedleButton />
                  </div>
                  <StreamingLogos />
                </div>
              </div>
            </div>
          </div>

          <div className="listen-bio-column">
            <BioPeekGif />
            <section
              className="panel bio-panel"
              id="bio"
              aria-labelledby="bio-heading"
            >
              <h2 id="bio-heading">Bio</h2>
              <BioExpandable teaser={bioTeaser} rest={bioRest} />
            </section>
          </div>

          <div
            className="hero-player-slot hero-player"
            id="player"
            aria-label="Spotify player"
          >
            <SpotifyEmbedHost />
          </div>
        </section>

        <BandsintownShowsSection />

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

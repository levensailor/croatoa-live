/**
 * Central site configuration — streaming URLs, IDs, and copy tokens.
 * Update here only; UI components import from this module.
 */

export const productionSiteUrl = "https://croatoa.live";

/** Clooney peek GIF — rises along the top edge of the bio panel. */
export const clooneyPeekGifPath = "/george-clooney-snooping.gif";

/** Yin-yang — dangles from the hero CTA card over the hound. */
export const yinYangHangGifPath = "/yin-yang-hang.gif";

/** Dreamcatcher — same CTA hang row, right of the yin-yang. */
export const dreamcatcherHangGifPath = "/dreamcatcher-hang.gif";

export const artistDisplayName = "CROATOA";

/** Site header wordmark */
export const siteLogoPath = "/croatoa.png";

export const artistTagline =
  "Rock band from Wilmington, NC — bass-driven, loud, and lyric-forward.";

export const cityRegion = "Wilmington, North Carolina";

export const bookingEmail = "booking@croatoa.live";

export const spotifyArtistId = "1dzdmLN2CPvHGvl9vu4EpX";

export const spotifyArtistUri = `spotify:artist:${spotifyArtistId}`;

export const spotifyArtistUrl =
  "https://open.spotify.com/artist/1dzdmLN2CPvHGvl9vu4EpX?si=eQCxva2ESH607_ceLqXa0g";

/** Featured track embed (Clap Back) — generator iframe URL and iFrame API URI. */
export const spotifyEmbedTrackId = "7jdM8H1Rx0LgHlqF5ezmCx";

export const spotifyEmbedTrackUri = `spotify:track:${spotifyEmbedTrackId}`;

export const spotifyEmbedSrc = `https://open.spotify.com/embed/track/${spotifyEmbedTrackId}?utm_source=generator`;

/** Compact track embed height (Spotify generator compact player). */
export const spotifyEmbedHeightPx = 152;

/** Spotify iFrame API theme — only `dark` is supported (maps to `theme=0` on the embed URL). */
export const spotifyEmbedTheme = "dark" as const;

export const appleMusicArtistUrl =
  "https://music.apple.com/us/artist/croatoa/1752338632";

export const tidalArtistUrl = "https://tidal.com/artist/50839989/u";

export const amazonMusicArtistUrl =
  "https://music.amazon.com/artists/B0D77N24V6/croatoa?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_uzPlHhOGG7O4iycUe4wWeZt5G";

export const youtubeMusicArtistUrl =
  "https://music.youtube.com/channel/UCNAtQBgoQ2g35kEFf44mAgA?si=mQl4HivC1sL7wcOP";

export const youtubeChannelUrl =
  "https://www.youtube.com/channel/UCCr09RLQlXEIneiFU9m13hA";

export const bandcampAlbumUrl =
  "https://croatoa.bandcamp.com/album/start-a-fire";

export const instagramUrl = "https://instagram.com/croatoanc";

export const instagramHandle = "croatoanc";

/** Public Bandsintown artist page (widget fallback + social link). */
export const bandsintownArtistUrl =
  "https://www.bandsintown.com/a/2609891-croatoa";

/** @deprecated Use {@link bandsintownArtistUrl}. */
export const bandsintownPublicFallbackUrl = bandsintownArtistUrl;

/** Bandsintown artist dashboard numeric id (for docs / manager tools). */
export const bandsintownArtistDashboardId = "2609891";

export const bandsintownArtistToolsUrl =
  "https://artists.bandsintown.com/artists/2609891/tools";

export const bandsintownArtistHomeUrl =
  "https://artists.bandsintown.com/artists/2609891";

/** Hero TV slideshow — add `{ filename, alt }` entries to include more photos. */
export type HeroSlide = { filename: string; alt: string };

export const heroSlideshowSlides: readonly HeroSlide[] = [
  {
    filename: "croatoa-bill-notext.jpg",
    alt: "CROATOA — Jeff, Jay, and Colin performing live, Wilmington NC rock",
  },
  {
    filename: "croatoa-dramtree.jpg",
    alt: "CROATOA live at Dram Tree Tavern",
  },
  {
    filename: "20260522_121917961.jpg",
    alt: "CROATOA live — Wilmington, North Carolina",
  },
  {
    filename: "20260522_122556955.jpg",
    alt: "CROATOA performing live",
  },
  {
    filename: "20260522_122853260.jpg",
    alt: "CROATOA on stage",
  },
  {
    filename: "20260522_130624974.jpg",
    alt: "CROATOA live show",
  },
  {
    filename: "croatoa-20260522-131456917-2.jpg",
    alt: "CROATOA band live",
  },
  {
    filename: "wilmington-07052.jpg",
    alt: "CROATOA in Wilmington, NC",
  },
  {
    filename: "20260521_215534839.jpg",
    alt: "CROATOA live — Wilmington, North Carolina",
  },
  {
    filename: "20260521_215835636.jpg",
    alt: "CROATOA performing live",
  },
  {
    filename: "20260521_220701632.jpg",
    alt: "CROATOA on stage",
  },
  {
    filename: "20260521_220752082.jpg",
    alt: "CROATOA live show",
  },
  {
    filename: "20260521_221220491.jpg",
    alt: "CROATOA band live",
  },
  {
    filename: "20260521_221940551.jpg",
    alt: "CROATOA in Wilmington, NC",
  },
  {
    filename: "20260522_121752237.jpg",
    alt: "CROATOA live performance",
  },
] as const;

/** First slide — Open Graph / metadata. */
export const heroImageFilename = heroSlideshowSlides[0].filename;

/**
 * Central site configuration — streaming URLs, IDs, and copy tokens.
 * Update here only; UI components import from this module.
 */

export const productionSiteUrl = "https://croatoa.live";

export const artistDisplayName = "CROATOA";

export const artistTagline =
  "Rock band from Wilmington, NC — bass-driven, loud, and lyric-forward.";

export const cityRegion = "Wilmington, North Carolina";

export const bookingEmail = "booking@croatoa.live";

export const spotifyArtistId = "1dzdmLN2CPvHGvl9vu4EpX";

export const spotifyArtistUri = `spotify:artist:${spotifyArtistId}`;

export const spotifyArtistUrl =
  "https://open.spotify.com/artist/1dzdmLN2CPvHGvl9vu4EpX?si=eQCxva2ESH607_ceLqXa0g";

export const appleMusicArtistUrl =
  "https://music.apple.com/us/artist/croatoa/1752338632";

export const tidalArtistUrl = "https://tidal.com/artist/50839989/u";

export const amazonMusicArtistUrl =
  "https://music.amazon.com/artists/B0D77N24V6/croatoa?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_uzPlHhOGG7O4iycUe4wWeZt5G";

export const youtubeMusicArtistUrl =
  "https://music.youtube.com/channel/UCNAtQBgoQ2g35kEFf44mAgA?si=mQl4HivC1sL7wcOP";

export const instagramUrl = "https://instagram.com/croatoanc";

export const instagramHandle = "croatoanc";

/** Public Bandsintown destination for widget fallback links (not artist dashboard). */
export const bandsintownPublicFallbackUrl = "https://www.bandsintown.com/";

/** Bandsintown artist dashboard numeric id (for docs / manager tools). */
export const bandsintownArtistDashboardId = "2609891";

export const bandsintownArtistToolsUrl =
  "https://artists.bandsintown.com/artists/2609891/tools";

export const bandsintownArtistHomeUrl =
  "https://artists.bandsintown.com/artists/2609891";

/** Bandsintown email signup iframe (hero actions row) — Signup Form → Copy Code. */
export const bandsintownEmailSignupIframeSrc =
  "https://bandsintown.com/artist/2609891/email_signup_form?headerTextColor=rgba(246,217,158,1)&backgroundColor=rgba(168,19,0,0)&ctaBackgroundColor=rgba(218,67,138,1)&title=&headerTextStyle=normal&headerText=&font=Helvetica&ctaIcon=show&ctaBorderRadius=4px&ctaBorderWidth=4px&ctaBorderColor=rgba(251,143,37,1)&ctaFontColor=rgba(255,255,255,1)&alignment=left&emailInputField=show&ctaLabel=fanboy&layout=wide&locale=en";

/** Scales Bandsintown signup iframe to fit the hero actions row. */
export const bandsintownEmailSignupDisplayScale = 0.6;

/** Unscaled iframe height; CSS scale fits the hero row (see `.hero-actions__fan-scale`). */
export const bandsintownEmailSignupIframeHeightPx = Math.ceil(
  80 / bandsintownEmailSignupDisplayScale
);

export const heroImageFilename = "croatoa-bill-notext.jpg";

export const spotifyEmbedSrc = `https://open.spotify.com/embed/artist/${spotifyArtistId}?utm_source=generator&theme=0`;

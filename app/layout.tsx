import type { Metadata, Viewport } from "next";
import { Geist_Mono, Press_Start_2P, Space_Grotesk } from "next/font/google";
import "./globals.css";
import {
  artistDisplayName,
  artistTagline,
  cityRegion,
  productionSiteUrl,
  spotifyArtistUrl,
  appleMusicArtistUrl,
  tidalArtistUrl,
  amazonMusicArtistUrl,
  youtubeMusicArtistUrl,
  instagramUrl,
} from "@/lib/site-config";
import { JsonLd } from "./json-ld";

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const arcade = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-arcade",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

function metadataBaseUrl(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) {
    try {
      return new URL(fromEnv);
    } catch {
      /* fall through */
    }
  }
  const vercel = process.env.VERCEL_URL;
  if (vercel) {
    return new URL(`https://${vercel}`);
  }
  return new URL(productionSiteUrl);
}

const base = metadataBaseUrl();

export const metadata: Metadata = {
  metadataBase: base,
  title: {
    default: `${artistDisplayName} | Rock band ${cityRegion}`,
    template: `%s | ${artistDisplayName}`,
  },
  description: `${artistTagline} Official site: music, shows, bio, and booking for ${artistDisplayName} in ${cityRegion}.`,
  applicationName: artistDisplayName,
  keywords: [
    artistDisplayName,
    "Croatoa band",
    "rock band Wilmington NC",
    "Wilmington North Carolina rock",
    "indie rock Wilmington",
    "Start a Fire album",
  ],
  authors: [{ name: artistDisplayName, url: productionSiteUrl }],
  creator: artistDisplayName,
  publisher: artistDisplayName,
  category: "music",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: base.href,
    siteName: artistDisplayName,
    title: `${artistDisplayName} — Rock band from Wilmington, NC`,
    description: artistTagline,
    images: [
      {
        url: "/croatoa-bill-notext.jpg",
        alt: `${artistDisplayName} — band photo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${artistDisplayName} | Wilmington NC rock`,
    description: artistTagline,
    images: ["/croatoa-bill-notext.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#A81300" },
    { media: "(prefers-color-scheme: dark)", color: "#8C0042" },
  ],
  width: "device-width",
  initialScale: 1,
};

const sameAs = [
  spotifyArtistUrl,
  appleMusicArtistUrl,
  tidalArtistUrl,
  amazonMusicArtistUrl,
  youtubeMusicArtistUrl,
  instagramUrl,
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mono.variable} ${arcade.variable} ${grotesk.variable}`}>
      <body>
        <JsonLd sameAs={sameAs} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

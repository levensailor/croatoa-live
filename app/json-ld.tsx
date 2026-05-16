import {
  artistDisplayName,
  artistTagline,
  bookingEmail,
  productionSiteUrl,
} from "@/lib/site-config";

type JsonLdProps = {
  sameAs: string[];
};

export function JsonLd({ sameAs }: JsonLdProps) {
  const url = productionSiteUrl;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicGroup",
        "@id": `${url}/#musicgroup`,
        name: artistDisplayName,
        description: artistTagline,
        url,
        genre: ["Rock", "Indie rock", "Alternative rock"],
        sameAs,
        areaServed: {
          "@type": "City",
          name: "Wilmington",
          containedInPlace: {
            "@type": "State",
            name: "North Carolina",
            containedInPlace: { "@type": "Country", name: "United States" },
          },
        },
      },
      {
        "@type": "MusicAlbum",
        "@id": `${url}/#album-start-a-fire`,
        name: "Start a Fire",
        byArtist: { "@id": `${url}/#musicgroup` },
        genre: ["Rock", "Indie rock"],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: `${artistDisplayName} official website`,
        description: `${artistDisplayName} — ${artistTagline}`,
        publisher: { "@id": `${url}/#musicgroup` },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${url}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${url}/#org`,
        name: artistDisplayName,
        url,
        sameAs,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "booking",
            email: bookingEmail,
            areaServed: "US",
            availableLanguage: ["English"],
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

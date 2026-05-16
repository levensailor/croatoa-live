import {
  artistDisplayName,
  bandsintownArtistHomeUrl,
  bandsintownArtistToolsUrl,
} from "@/lib/site-config";

/**
 * Bandsintown fan email / list tools are configured in the artist dashboard.
 * Paste the official embed snippet into `FanListEmbed` once you have it from
 * {bandsintownArtistToolsUrl}, or replace this block with an iframe/script from BIT.
 */
export function FanListPlaceholder() {
  return (
    <section className="fan-tv panel-stack" id="fan-list" aria-labelledby="fan-list-heading">
      <div className="panel-header fan-panel-header">
        <span className="crt-blink" aria-hidden="true">
          ●
        </span>
        <h2 id="fan-list-heading">Fan signal</h2>
        <span className="channel-badge ch-fan">MAILING LIST</span>
      </div>
      <div className="fan-body">
        <p>
          Join the {artistDisplayName} list — tour dates, drops, and Wilmington
          show news. List management runs through{" "}
          <strong>Bandsintown artist tools</strong> so plays and RSVPs stay in
          one place.
        </p>
        <ol className="fan-steps">
          <li>
            Open{" "}
            <a href={bandsintownArtistToolsUrl} target="_blank" rel="noreferrer">
              Bandsintown tools
            </a>{" "}
            while signed in as the artist/manager.
          </li>
          <li>
            Copy the <strong>fan mailing list / email capture</strong> embed
            snippet.
          </li>
          <li>
            Add it to this repo: replace the contents of{" "}
            <code className="inline-code">components/FanListEmbed.tsx</code>{" "}
            (see file header), or paste into Vercel as{" "}
            <code className="inline-code">NEXT_PUBLIC_BIT_FAN_HTML</code> if you
            wire that env through a small client loader.
          </li>
        </ol>
        <p className="fan-alt">
          Dashboard:{" "}
          <a href={bandsintownArtistHomeUrl} target="_blank" rel="noreferrer">
            {bandsintownArtistHomeUrl}
          </a>
        </p>
        <div
          className="fan-embed-slot"
          data-placeholder="bandsintown-fan-embed"
          aria-label="Bandsintown fan signup embed slot"
        />
      </div>
    </section>
  );
}

import {
  artistDisplayName,
  bandsintownEmailSignupIframeHeightPx,
  bandsintownEmailSignupIframeSrc,
} from "@/lib/site-config";

export function FanEmailSignup() {
  return (
    <section
      className="fan-tv panel-stack"
      id="fan-list"
      aria-labelledby="fan-list-heading"
    >
      <div className="panel-header fan-panel-header">
        <span className="crt-blink" aria-hidden="true">
          ●
        </span>
        <h2 id="fan-list-heading">Fan signal</h2>
        <span className="channel-badge ch-fan">MAILING LIST</span>
      </div>
      <div className="fan-body fan-body-embed">
        <p>
          Get show alerts and {artistDisplayName} news — signups sync to your
          Bandsintown fan list.
        </p>
        <div className="fan-iframe-wrap">
          <iframe
            src={bandsintownEmailSignupIframeSrc}
            width="100%"
            height={bandsintownEmailSignupIframeHeightPx}
            title={`${artistDisplayName} email signup`}
            className="fan-iframe"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

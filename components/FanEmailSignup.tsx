import {
  artistDisplayName,
  bandsintownEmailSignupIframeHeightPx,
  bandsintownEmailSignupIframeSrc,
} from "@/lib/site-config";

export function FanEmailSignup() {
  return (
    <div className="hero-actions__fan" id="fan-list" aria-label="Email signup">
      <iframe
        src={bandsintownEmailSignupIframeSrc}
        width="100%"
        height={bandsintownEmailSignupIframeHeightPx}
        title={`${artistDisplayName} email signup`}
        className="fan-iframe"
        loading="lazy"
      />
    </div>
  );
}

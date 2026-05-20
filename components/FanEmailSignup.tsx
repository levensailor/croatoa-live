import type { CSSProperties } from "react";
import {
  artistDisplayName,
  bandsintownEmailSignupDisplayScale,
  bandsintownEmailSignupIframeHeightPx,
  bandsintownEmailSignupIframeSrc,
  bandsintownEmailSignupLayoutWidthPx,
} from "@/lib/site-config";

const fanHostStyle = {
  "--hero-fan-iframe-scale": bandsintownEmailSignupDisplayScale,
  "--hero-fan-layout-width": `${bandsintownEmailSignupLayoutWidthPx}px`,
} as CSSProperties;

export function FanEmailSignup() {
  return (
    <>
      <div
        className="hero-actions__signup-slot hero-actions__signup-slot--email"
        aria-hidden="true"
      />
      <div
        className="hero-actions__signup-slot hero-actions__signup-slot--cta"
        aria-hidden="true"
      />
      <div
        className="hero-actions__fan-host"
        id="fan-list"
        aria-label="Email signup"
        style={fanHostStyle}
      >
        <div className="hero-actions__fan-scale">
          <iframe
            src={bandsintownEmailSignupIframeSrc}
            width={bandsintownEmailSignupLayoutWidthPx}
            height={bandsintownEmailSignupIframeHeightPx}
            title={`${artistDisplayName} email signup`}
            className="fan-iframe"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}

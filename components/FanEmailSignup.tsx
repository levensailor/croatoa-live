import type { CSSProperties } from "react";
import {
  artistDisplayName,
  bandsintownEmailSignupDisplayScale,
  bandsintownEmailSignupIframeHeightPx,
  bandsintownEmailSignupIframeSrc,
} from "@/lib/site-config";

const fanIframeScaleStyle = {
  "--hero-fan-iframe-scale": bandsintownEmailSignupDisplayScale,
} as CSSProperties;

export function FanEmailSignup() {
  return (
    <>
      <div
        className="hero-actions__fan-col hero-actions__fan-col--email"
        aria-hidden="true"
      />
      <div
        className="hero-actions__fan-col hero-actions__fan-col--cta"
        aria-hidden="true"
      />
      <div
        className="hero-actions__fan-host"
        id="fan-list"
        aria-label="Email signup"
        style={fanIframeScaleStyle}
      >
        <div className="hero-actions__fan-scale">
          <iframe
            src={bandsintownEmailSignupIframeSrc}
            width="100%"
            height={bandsintownEmailSignupIframeHeightPx}
            title={`${artistDisplayName} email signup`}
            className="fan-iframe"
            loading="lazy"
            scrolling="no"
          />
        </div>
      </div>
    </>
  );
}

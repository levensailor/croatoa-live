import type { CSSProperties } from "react";
import {
  artistDisplayName,
  bandsintownEmailSignupDisplayScale,
  bandsintownEmailSignupIframeHeightPx,
  bandsintownEmailSignupIframeSrc,
} from "@/lib/site-config";

export function FanEmailSignup() {
  const fullHeight = bandsintownEmailSignupIframeHeightPx;
  const scale = bandsintownEmailSignupDisplayScale;
  const displayHeight = Math.round(fullHeight * scale);

  const scaleStyle = {
    "--fan-iframe-full-height": `${fullHeight}px`,
    "--fan-iframe-scale": String(scale),
    "--fan-iframe-display-height": `${displayHeight}px`,
  } as CSSProperties;

  return (
    <div
      className="fan-inline fan-inline--actions"
      id="fan-list"
      aria-label="Email signup"
      style={scaleStyle}
    >
      <div className="fan-scale">
        <iframe
          src={bandsintownEmailSignupIframeSrc}
          width="100%"
          height={fullHeight}
          title={`${artistDisplayName} email signup`}
          className="fan-iframe"
          loading="lazy"
        />
      </div>
    </div>
  );
}

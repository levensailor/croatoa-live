import type { CSSProperties } from "react";
import {
  artistDisplayName,
  bandsintownEmailSignupIframeHeightPx,
  bandsintownEmailSignupIframeSrc,
  bandsintownEmailSignupVisibleRatio,
} from "@/lib/site-config";

export function FanEmailSignup() {
  const fullHeight = bandsintownEmailSignupIframeHeightPx;
  const visibleHeight = Math.round(fullHeight * bandsintownEmailSignupVisibleRatio);

  const cropStyle = {
    "--fan-iframe-full-height": `${fullHeight}px`,
    "--fan-iframe-visible-height": `${visibleHeight}px`,
  } as CSSProperties;

  return (
    <div
      className="fan-inline"
      id="fan-list"
      aria-label="Email signup"
      style={cropStyle}
    >
      <iframe
        src={bandsintownEmailSignupIframeSrc}
        width="100%"
        height={fullHeight}
        title={`${artistDisplayName} email signup`}
        className="fan-iframe"
        loading="lazy"
      />
    </div>
  );
}

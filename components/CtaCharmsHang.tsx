import { dreamcatcherHangGifPath, yinYangHangGifPath } from "@/lib/site-config";

/** Yin-yang + dreamcatcher — dangle from the hero CTA card over the hound patrol. */
export function CtaCharmsHang() {
  return (
    <div className="cta-charms-hang" aria-hidden="true">
      <div className="cta-charm cta-charm--yin-yang">
        <img
          src={yinYangHangGifPath}
          alt=""
          className="cta-charm__gif"
          width={500}
          height={500}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="cta-charm cta-charm--dreamcatcher">
        <img
          src={dreamcatcherHangGifPath}
          alt=""
          className="cta-charm__gif"
          width={360}
          height={480}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

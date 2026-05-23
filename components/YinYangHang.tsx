import { yinYangHangGifPath } from "@/lib/site-config";

/** Yin-yang GIF — dangles from the hero CTA card over the hound patrol. */
export function YinYangHang() {
  return (
    <div className="yin-yang-hang" aria-hidden="true">
      <img
        src={yinYangHangGifPath}
        alt=""
        className="yin-yang-hang__gif"
        width={500}
        height={500}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

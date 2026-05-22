import { dreamcatcherGifPath } from "@/lib/site-config";

/** Dreamcatcher GIF — hangs from the site banner, overlays the hero TV. */
export function DreamcatcherHang() {
  return (
    <div className="dreamcatcher-hang" aria-hidden="true">
      <img
        src={dreamcatcherGifPath}
        alt=""
        className="dreamcatcher-hang__gif"
        width={360}
        height={640}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

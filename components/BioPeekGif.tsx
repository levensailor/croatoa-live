import { clooneyPeekGifPath } from "@/lib/site-config";

/** Clooney peeks over the bio panel top border — slides up, lingers, slides back down. */
export function BioPeekGif() {
  return (
    <div className="bio-peek" aria-hidden="true">
      <div className="bio-peek__inner">
        <img
          src={clooneyPeekGifPath}
          alt=""
          className="bio-peek__gif"
          width={480}
          height={207}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

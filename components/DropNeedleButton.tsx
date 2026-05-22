"use client";

import { useEffect, useState } from "react";
import { useSpotifyPlayer } from "@/components/SpotifyPlayerProvider";

const TURNTABLE_ANIM = "/turntable-pizza.gif";
const TURNTABLE_STILL = "/turntable-pizza-static.webp";

export function DropNeedleButton() {
  const player = useSpotifyPlayer();
  const [dropped, setDropped] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const showAnimation = Boolean(dropped && player?.isPlaying && !reduceMotion);
  const src = showAnimation ? TURNTABLE_ANIM : TURNTABLE_STILL;

  if (!player?.ready) {
    return (
      <span
        className="drop-needle drop-needle--placeholder"
        aria-hidden="true"
      >
        <img
          src={TURNTABLE_STILL}
          alt=""
          className="drop-needle__visual drop-needle__visual--muted"
          width={400}
          height={330}
          decoding="async"
        />
      </span>
    );
  }

  const handleClick = () => {
    setDropped(true);
    player.playFromNeedle();
  };

  return (
    <button
      type="button"
      className={[
        "drop-needle",
        "drop-needle--ready",
        dropped && "drop-needle--dropped",
        showAnimation && "drop-needle--playing",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={handleClick}
      aria-label="Drop needle and play on Spotify"
      aria-pressed={player.isPlaying}
    >
      <img
        src={src}
        alt=""
        className="drop-needle__visual"
        width={400}
        height={330}
        decoding="async"
      />
    </button>
  );
}

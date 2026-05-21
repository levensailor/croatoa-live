import Image from "next/image";

const PATROL_GIF = "/duck-hound-patrol.gif";
const SPRITE_W = 96;
const SPRITE_H = 76;

/** Duck Hunt hound patrol: walk, sniff, turn — GIF synced to hero-card travel. */
export function SleepingDog() {
  return (
    <div className="hero-dog">
      <div className="hero-dog__track" aria-hidden="true">
        <div
          className="duck-hound"
          role="img"
          aria-label="Hound walking and sniffing across the hero card; hover to scratch its ear"
        >
          <Image
            src={PATROL_GIF}
            alt=""
            width={SPRITE_W}
            height={SPRITE_H}
            className="duck-hound__gif"
            unoptimized
            draggable={false}
          />
          <svg
            className="duck-hound__scratch"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            shapeRendering="crispEdges"
          >
            <g className="duck-hound__scratch-paw">
              <rect x="4" y="10" width="4" height="4" fill="#6b4423" />
              <rect x="5" y="6" width="3" height="5" fill="#8b5a2b" />
              <rect x="6" y="4" width="2" height="2" fill="#141010" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

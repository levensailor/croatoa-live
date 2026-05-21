import Image from "next/image";

const WALK_FRAME_0 = "/duck-hound-walk-0.png";
const WALK_FRAME_1 = "/duck-hound-walk-1.png";
const SPRITE_W = 46;
const SPRITE_H = 45;

/** Duck Hunt hound (cropped NES-style sprites) walks inside the hero card CTA strip. */
export function SleepingDog() {
  return (
    <div className="hero-dog">
      <div className="hero-dog__track" aria-hidden="true">
        <div
          className="duck-hound"
          role="img"
          aria-label="Hound dog walking across the hero card; hover to scratch its ear"
        >
          <div className="duck-hound__sprites">
            <Image
              src={WALK_FRAME_0}
              alt=""
              width={SPRITE_W}
              height={SPRITE_H}
              className="duck-hound__frame duck-hound__frame--a"
              unoptimized
              draggable={false}
            />
            <Image
              src={WALK_FRAME_1}
              alt=""
              width={SPRITE_W}
              height={SPRITE_H}
              className="duck-hound__frame duck-hound__frame--b"
              unoptimized
              draggable={false}
            />
          </div>
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

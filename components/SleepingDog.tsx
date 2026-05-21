/** Duck Hunt–style hound that walks inside the hero card CTA strip. */
export function SleepingDog() {
  return (
    <div className="hero-dog">
      <div className="hero-dog__track" aria-hidden="true">
        <div
          className="duck-hound"
          role="img"
          aria-label="Hound dog walking across the hero card; hover to scratch its ear"
        >
          <svg
            className="duck-hound__svg"
            viewBox="0 0 80 56"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            shapeRendering="crispEdges"
          >
            <ellipse
              className="duck-hound__shadow"
              cx="40"
              cy="52"
              rx="24"
              ry="3"
              fill="#120c08"
              opacity="0.4"
            />
            <g className="duck-hound__walk-legs">
              <rect
                className="duck-hound__leg duck-hound__leg--back"
                x="22"
                y="38"
                width="4"
                height="14"
                fill="#2a1810"
              />
              <rect
                className="duck-hound__leg duck-hound__leg--front"
                x="48"
                y="38"
                width="4"
                height="14"
                fill="#2a1810"
              />
            </g>
            <rect
              className="duck-hound__tail"
              x="54"
              y="24"
              width="6"
              height="4"
              fill="#2a1810"
            />
            <g className="duck-hound__body">
              <rect x="24" y="24" width="28" height="15" fill="#9a5c2e" />
              <rect x="28" y="26" width="16" height="9" fill="#2a1810" />
              <rect x="44" y="28" width="6" height="5" fill="#7a4a24" />
            </g>
            <g className="duck-hound__head">
              <rect x="10" y="20" width="16" height="13" fill="#b06a34" />
              <rect
                className="duck-hound__ear"
                x="6"
                y="12"
                width="7"
                height="24"
                fill="#1a120c"
              />
              <rect x="8" y="28" width="12" height="7" fill="#efe2c8" />
              <rect x="6" y="32" width="7" height="4" fill="#1a120c" />
              <rect x="22" y="24" width="4" height="4" fill="#f8f2e8" />
              <rect x="23" y="25" width="2" height="2" fill="#1a120c" />
            </g>
            <g className="duck-hound__scratch-paw">
              <rect
                className="duck-hound__paw"
                x="12"
                y="6"
                width="7"
                height="6"
                fill="#2a1810"
              />
              <rect x="11" y="5" width="4" height="2" fill="#efe2c8" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

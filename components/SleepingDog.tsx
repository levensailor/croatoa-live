/** Decorative sleeping dog below hero CTA / streaming row. */
export function SleepingDog() {
  return (
    <div className="hero-dog">
      <div
        className="sleeping-dog"
        role="img"
        aria-label="Sleeping dog resting near the player controls"
      >
        <svg
          className="sleeping-dog__svg"
          viewBox="0 0 240 112"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
        >
          <ellipse
            className="sleeping-dog__shadow"
            cx="118"
            cy="98"
            rx="72"
            ry="10"
          />
          <g className="sleeping-dog__body">
            <ellipse cx="118" cy="72" rx="58" ry="26" fill="#c48a4a" />
            <ellipse cx="148" cy="66" rx="22" ry="18" fill="#b67d42" />
            <path
              d="M62 70 Q48 58 54 48 Q62 42 70 52"
              fill="#a86f38"
              stroke="#7a4f24"
              strokeWidth="2"
            />
            <path
              d="M168 58 Q188 44 196 52 Q200 62 182 68"
              fill="#a86f38"
              stroke="#7a4f24"
              strokeWidth="2"
            />
            <ellipse cx="78" cy="78" rx="10" ry="7" fill="#8f5f32" />
            <ellipse cx="102" cy="82" rx="9" ry="6" fill="#8f5f32" />
            <ellipse cx="128" cy="82" rx="9" ry="6" fill="#8f5f32" />
            <ellipse cx="154" cy="78" rx="10" ry="7" fill="#8f5f32" />
          </g>
          <g className="sleeping-dog__head">
            <ellipse cx="52" cy="64" rx="34" ry="26" fill="#d49a55" />
            <ellipse cx="34" cy="58" rx="14" ry="20" fill="#b67d42" />
            <ellipse cx="68" cy="54" rx="12" ry="18" fill="#b67d42" />
            <ellipse cx="58" cy="70" rx="20" ry="14" fill="#f0d2a8" />
            <circle cx="44" cy="58" r="4" fill="#2a1810" />
            <circle cx="45" cy="57" r="1.2" fill="#fff8ef" />
            <ellipse cx="66" cy="74" rx="7" ry="5" fill="#2a1810" />
            <path
              d="M38 78 Q48 84 58 78"
              fill="none"
              stroke="#7a4f24"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
          <g className="sleeping-dog__zzz">
            <text x="176" y="36" className="sleeping-dog__zzz-text">
              z
            </text>
            <text x="194" y="24" className="sleeping-dog__zzz-text">
              z
            </text>
            <text x="212" y="14" className="sleeping-dog__zzz-text">
              z
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

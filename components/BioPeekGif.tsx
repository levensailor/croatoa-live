/** Decorative peek GIF above the bio — scales with the listen/bio column. */
export function BioPeekGif() {
  return (
    <div className="bio-peek" aria-hidden="true">
      <img
        src="/george-clooney-snooping.gif"
        alt=""
        className="bio-peek__gif"
        width={480}
        height={207}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

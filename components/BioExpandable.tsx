"use client";

import { useId, useState } from "react";

type BioExpandableProps = {
  teaser: string[];
  rest: string[];
};

export function BioExpandable({ teaser, rest }: BioExpandableProps) {
  const [open, setOpen] = useState(false);
  const restId = useId();
  const hasMore = rest.length > 0;

  return (
    <div className="bio-text">
      {teaser.map((paragraph, index) => (
        <p key={`bio-teaser-${index}`}>{paragraph}</p>
      ))}

      {hasMore ? (
        <>
          <div
            id={restId}
            className="bio-text__more"
            hidden={!open}
          >
            {rest.map((paragraph, index) => (
              <p key={`bio-rest-${index}`}>{paragraph}</p>
            ))}
          </div>

          <button
            type="button"
            className="bio-expand"
            aria-expanded={open}
            aria-controls={restId}
            aria-label={open ? "Collapse full bio" : "Read full bio"}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="bio-expand__arrow" aria-hidden="true" />
          </button>
        </>
      ) : null}
    </div>
  );
}

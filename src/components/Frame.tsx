import type { ReactNode, Ref } from 'react';

interface FrameProps {
  /** Rendered outside `.site`, like the reference's phone menu sheet. */
  overlay?: ReactNode;
  /** Makes the page behind an open overlay unreachable. */
  inert?: boolean;
  rootRef?: Ref<HTMLDivElement>;
  children: ReactNode;
}

/** The black outer frame and the `.site` container all breakpoints query. */
export function Frame({ overlay, inert = false, rootRef, children }: FrameProps) {
  return (
    <div className="pl" ref={rootRef}>
      {overlay}
      <div className="site" inert={inert}>{children}</div>
    </div>
  );
}

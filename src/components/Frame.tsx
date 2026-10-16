import type { ReactNode, Ref } from 'react';

interface FrameProps {
  /** The compact bar; sits inside the frame, outside `.site`. */
  bar?: ReactNode;
  /** Rendered outside `.site`, like the reference's phone menu sheet. */
  overlay?: ReactNode;
  /** Makes the page behind an open overlay unreachable. */
  inert?: boolean;
  rootRef?: Ref<HTMLDivElement>;
  children: ReactNode;
}

/** The black outer frame, the skip link, and the `.site` container all breakpoints query. */
export function Frame({ bar, overlay, inert = false, rootRef, children }: FrameProps) {
  return (
    <div className="pl" ref={rootRef}>
      <a className="skip" href="#main" inert={inert}>Skip to content</a>
      {bar}
      {overlay}
      <div className="site" inert={inert}>{children}</div>
    </div>
  );
}

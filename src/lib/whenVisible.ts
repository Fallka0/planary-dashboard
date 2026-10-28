/**
 * Calls start once the hero can be seen. On the first page of a visit the
 * intro covers the page for about 1.2 s (transitions.ts / transitions.css), so
 * the opening waits for the intro's lift to begin (or for a skip). Returns a cancel function.
 */
export function whenVisible(start: () => void) {
  const html = document.documentElement;
  const intro = document.querySelector<HTMLElement>('.pt-intro');
  if (!intro || !html.classList.contains('pt-first')) {
    start();
    return () => {};
  }
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    cleanup();
    start();
  };
  const onStart = (e: AnimationEvent) => e.target === intro && go();
  const fallback = window.setTimeout(go, 2000);
  const cleanup = () => {
    window.clearTimeout(fallback);
    intro.removeEventListener('animationstart', onStart);
  };
  // The lift is the intro's own animation (1150 ms delay, 0 when skipped).
  intro.addEventListener('animationstart', onStart);
  return () => {
    done = true;
    cleanup();
  };
}

// Page transitions for this multi-page site, ported from the update's pt.js:
// the intro on the first page of a visit, and the curtain between internal pages.
// The inline script in each page's <head> sets pt-first / pt-arrive before first paint.

const html = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const intro = document.querySelector<HTMLElement>('.pt-intro');

// Arrived from an internal link: lift the curtain
if (html.classList.contains('pt-arrive')) {
  html.classList.remove('pt-arrive');
  html.classList.add('pt-reveal');
  window.setTimeout(() => html.classList.remove('pt-reveal'), reduce ? 200 : 700);
}

// First page of the visit: play the intro; any input skips it
if (intro && html.classList.contains('pt-first')) {
  intro.classList.add('is-run');
  const done = () => {
    html.classList.remove('pt-first');
    intro.classList.remove('is-run', 'is-skip');
  };
  intro.addEventListener('animationend', (e) => {
    if (e.target === intro) done();
  });
  const skip = () => intro.classList.add('is-skip');
  (['pointerdown', 'keydown', 'wheel', 'touchstart'] as const).forEach((type) =>
    window.addEventListener(type, skip, { once: true, passive: true }),
  );
}

// Leaving through an internal link: cover, then navigate
document.addEventListener('click', (e) => {
  const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if ((a.target && a.target !== '_self') || a.hasAttribute('download') || a.hasAttribute('data-no-transition')) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return; // external, mailto:, tel:
  if (url.pathname === location.pathname && url.search === location.search) return; // same page or #anchor
  e.preventDefault();
  try {
    sessionStorage.setItem('planary:nav', '1');
  } catch {
    // Storage blocked: the next page simply loads without the reveal.
  }
  html.classList.add('pt-cover');
  window.setTimeout(() => {
    location.href = url.href;
  }, reduce ? 150 : 400);
});

// Back/forward cache: never come back to a covered page
window.addEventListener('pageshow', (e) => {
  if (e.persisted) html.classList.remove('pt-cover');
});

export {};

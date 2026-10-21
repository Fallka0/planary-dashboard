# Planary

The planary.ch homepage: the front door to the Planary apps (Planary Casino, Tournament, Planary Wishlist and Planary Account). Vite + React + TypeScript, deployed on Vercel.

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Layout

The site is a multi-page Vite build: `index.html` (homepage), `404.html`, and `team/`, `casino/`, `tournament/`, `wishlist/` and `account/`, each with its own `index.html`, entry in `src/entries/` and stylesheet, so a page loads only its own CSS. `vite.config.ts` serves `/team` etc. without a trailing slash and answers unknown paths with the 404 page in dev and preview; `vercel.json` does the same in production.

`/tournament` (German), `/impressum` and `/datenschutz` share `src/styles/tour.css` and the chrome in `src/components/tour/`. The homepage, those three pages and their dark mode follow `prefers-color-scheme`; the other subpages stay light. Copy for the new pages lives in `src/content/`, tokens and icons from the handoff in `src/design/`.

Drafted legal sections (marked "Entwurf") are compiled in only when `__LEGAL_DRAFTS__` is true: in `npm run dev` and on Vercel preview deployments (`VERCEL_ENV=preview`). Production builds leave them out entirely.

- `src/App.tsx` assembles the homepage from `src/components/`, one component per block of the design (`Hero`, `SectionIndex`, `ProductCasino`, …).
- `src/pages/` holds the subpages and the 404. Each lays out its own header and sections; `SubpageShell` adds the frame, compact bar, phone menu, reveals and footer.
- `src/components/art/` holds the drawn objects: `HeroLogo` (the animated Planary logo in the hero and on the 404), `Starfield`, `ChipStack`, `BracketSculpture`, `GiftStack` and `KeyObject`. The stand-ins take a `src` prop, so a final render replaces them without touching layout.
- Styles in `src/styles/`:
  - `homepage.css` is the homepage, ported verbatim from the signed-off reference. Breakpoints are container queries on `.site`.
  - `subpage.css` is the subpages' shared base and `<page>.css` each page's own rules.
  - `hero.css` is the logo and starfield, and `animations.css` the chips-fall, bracket-build and gift-drop animations, triggered by `useAnimOnView` on `[data-anim]` wrappers.
  - `ux.css` is the skip link, headline rise, compact bar and copy button, and `transitions.css` the page transitions.
- `src/lib/links.ts` lists every URL on the site. Team members are listed in `src/pages/TeamPage.tsx`; a role or bio shows once it is filled in.
- Fonts (Unbounded, Manrope) are self-hosted in `public/fonts/`.

## Page transitions

The first page of a visit plays a short intro, and internal links close a black curtain before the next page loads. A small inline script at the top of each page's `<head>` decides which one applies before first paint (`sessionStorage` keys `planary:intro` and `planary:nav`); the overlays are static markup in each HTML file, and `src/lib/transitions.ts` runs them. External links, `mailto:`, same-page anchors and modifier or new-tab clicks skip the curtain, and `data-no-transition` opts a link out. With reduced motion there is no intro and the curtain only fades.

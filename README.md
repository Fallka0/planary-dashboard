# Planary

The planary.ch homepage: the front door to the Planary apps (Planary Casino, Tournament, Planary Wishlist and Planary Account). Vite + React + TypeScript, deployed on Vercel.

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Layout

The site is a multi-page Vite build: `index.html` (homepage) plus `team/`, `casino/`, `tournament/`, `wishlist/` and `account/`, each with its own `index.html`, entry in `src/entries/` and stylesheet, so a page loads only its own CSS. `vite.config.ts` lists the pages and serves `/team` etc. without a trailing slash in dev and preview; `vercel.json` does the same in production.

- `src/App.tsx` assembles the homepage from `src/components/`, one component per block of the design (`Hero`, `SectionIndex`, `ProductCasino`, …).
- `src/pages/` holds the subpages. Each lays out its own header and sections; `SubpageShell` adds the frame, phone menu, reveals and footer.
- `src/styles/subpage.css` is the subpages' shared base and `src/styles/<page>.css` each page's own rules, ported from the update references. `src/styles/animations.css` holds the chips-fall and bracket-build animations, triggered by `useAnimOnView` on `[data-anim]` wrappers.
- `src/components/art/` holds the SVG stand-ins (`HeroPoster`, `ChipStack`, `BracketSculpture`, `RibbonScene`, `KeyObject`). Each takes a `src` prop, so a final render replaces the stand-in without touching layout.
- `src/styles/homepage.css` is the design's stylesheet, ported verbatim from the signed-off reference. Breakpoints are container queries on `.site`.
- `src/lib/links.ts` lists every URL on the page, including the placeholders that still need real values (Tournament and Wishlist live URLs and addresses, team member links, the Spline scene URL). Team names, roles and bios are placeholders in `src/pages/TeamPage.tsx`.
- Fonts (Unbounded, Manrope) are self-hosted in `public/fonts/`.

## Hero 3D

The hero object uses `@splinetool/react-spline`. Set `HERO_SCENE_URL` in `src/lib/links.ts` to the scene's code-export URL (Spline → Export → Code → `…/scene.splinecode`). Until it's set, and always with reduced motion, the hero shows the SVG poster and the Spline runtime is never downloaded. When it's set, the runtime loads after the page has finished loading, and the poster stays until the scene is ready.

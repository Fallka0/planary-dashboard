# Planary

The planary.ch homepage: the front door to the Planary apps (Planary Casino, Tournament, Planary Wishlist and Planary Account). Vite + React + TypeScript, deployed on Vercel.

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Layout

- `src/pages/routes.tsx` maps paths to pages: the homepage, plus stub detail pages at `/casino`, `/tournament`, `/wishlist`, `/account` and `/team` that reuse the homepage's blocks. Any other path shows the homepage.
- `src/pages/HomePage.tsx` assembles the homepage from `src/components/`, one component per block of the design (`Hero`, `SectionIndex`, `ProductCasino`, …).
- `src/components/art/` holds the SVG stand-ins (`HeroPoster`, `ChipStack`, `BracketSculpture`, `RibbonScene`, `KeyObject`). Each takes a `src` prop, so a final render replaces the stand-in without touching layout.
- `src/styles/homepage.css` is the design's stylesheet, ported verbatim from the signed-off reference. Breakpoints are container queries on `.site`.
- `src/lib/links.ts` lists every URL on the site, and the Spline scene settings.
- `src/assets/crops/` holds the two hero crops, taken from the real Blackjack table and casino lobby UIs.
- Fonts (Unbounded, Manrope) are self-hosted in `public/fonts/`.

## Hero 3D

The hero object is a Spline scene (`HERO_SCENE_URL` in `src/lib/links.ts`), rendered with `@splinetool/react-spline`. The runtime loads after the page has finished loading; the SVG poster shows until the scene is ready and then crossfades out. With reduced motion, only the poster renders and the runtime is never downloaded. If the scene fails to load, the poster stays.

The scene spins its "Group 2" object itself on start. If that spin stops, the page keeps the object turning at one turn per 12 s (`HERO_SCENE_SPIN_OBJECT`). The pointer tilt is applied to the wrapper.

# Planary

The planary.ch homepage: the front door to the Planary apps (Planary Casino, Tournament, Planary Wishlist and Planary Account). Vite + React + TypeScript, deployed on Vercel.

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Layout

- `src/App.tsx` assembles the page from `src/components/`, one component per block of the design (`Hero`, `SectionIndex`, `ProductCasino`, …).
- `src/components/art/` holds the SVG stand-ins (`HeroPoster`, `ChipStack`, `BracketSculpture`, `RibbonScene`, `KeyObject`). Each takes a `src` prop, so a final render replaces the stand-in without touching layout.
- `src/styles/homepage.css` is the design's stylesheet, ported verbatim from the signed-off reference. Breakpoints are container queries on `.site`.
- `src/lib/links.ts` lists every URL on the page, including the placeholders that still need real values (Tournament and Wishlist live URLs, the Spline scene URL).
- Fonts (Unbounded, Manrope) are self-hosted in `public/fonts/`.

## Hero 3D

The hero object uses `@splinetool/react-spline`. Set `HERO_SCENE_URL` in `src/lib/links.ts` to the scene's code-export URL (Spline → Export → Code → `…/scene.splinecode`). Until it's set, and always with reduced motion, the hero shows the SVG poster and the Spline runtime is never downloaded. When it's set, the runtime loads after the page has finished loading, and the poster stays until the scene is ready.

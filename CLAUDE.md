# Portfolio — Nguyễn Phúc Tần (Frontend Developer)

Personal portfolio site. **Read `HANDOFF.md` (history, decisions, open items) and `DESIGN.md` (design system) before changing anything.**

## Stack & commands
- Vite 8 + React 19 (JavaScript, no TypeScript), Tailwind CSS v4 (CSS-first config in `src/index.css`), React Router 7 (data router, lazy routes), Motion (`motion/react`), GSAP (via React Bits `SplitText`).
- shadcn CLI is set up with the **React Bits registry**: `npx shadcn@latest add @react-bits/<Name>-JS-TW` (files land in `src/components/<Name>.jsx`).
- `npm run dev` (port 5173 — the owner usually already has it running) · `npm run build` · `npm run lint` (oxlint)
- Path alias `@/` → `src/`. `cn()` comes from the `cn` package (clsx + tailwind-merge).
- Not a git repository.

## Layout
- `src/data/site.js`, `src/data/projects.js` — **all content** (from the owner's CV). Edit copy here, not in components.
- `src/components/sections/*` — home sections; `src/pages/*` — routes (`/`, `/work`, `/work/:slug`, `/about`, 404).
- `src/components/common/*` — shared UI (PillButton, SectionHeading, ProjectCard, ProjectCover, ContactForm…).
- `src/components/{TechText,GridScan,SplitText,LogoLoop,Magnet,ClickSpark,ScrollVelocity}.jsx` — React Bits components. **TechText and GridScan are locally modified** (see HANDOFF.md) — don't blindly re-add them from the registry.
- `scripts/photo/build-hero-cutout.swift` — rebuilds the hero photo.

## Owner preferences (hard rules)
- **Monochrome only** — black & white, no accent colours. Theme is **inverted**: black canvas, white ink. No dark/light toggle.
- Use **semantic tokens** (`ink`, `paper`, `night`, …) — never raw `black/…`/`white/…` utilities in components.
- Follow the reference layout (owner-supplied screenshots: hero with giant name + cut-out portrait, `/SECTION` headings with giant ghost words, Service accordion, dark Experience list, "Have a project in mind?" CTA).
- Motion level: **expressive**, but **scrolling must stay native** (Lenis was removed because it felt delayed — don't add smooth-scroll libraries).
- Hero photo: **keep the owner's own background removal** (`public/no_background.png`). Do not re-segment it with Vision/rembg/AI — a previous attempt was rejected. Only upgrade quality.
- Don't invent CV facts. Missing info stays as visible `TODO` placeholders.
- Do numeric calculations (sizes, crops, ratios) with a script (Python), not by hand.

## Verifying UI
- Use the in-app browser at `http://localhost:5173`. The pane is often **hidden**, which throttles `requestAnimationFrame` (~460 ms/frame): screenshots lag several frames and canvas intros (TechText, GridScan) run slowly. Prefer measuring with `javascript_exec` (bounding rects, canvas pixel reads) and take multiple screenshots.
- Check 1440×900 and 375×812, and that `document.documentElement.scrollWidth === innerWidth` (no horizontal scroll).

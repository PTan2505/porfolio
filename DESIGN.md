# Design system

Inspired by owner-supplied reference screenshots (a UI/UX designer portfolio), recoloured to the owner's palette: **pure monochrome, inverted** (black canvas, white ink).

## Colour tokens (`src/index.css`, `:root`)
| Token | Value | Use |
|---|---|---|
| `--ink` | `#f5f5f5` | primary text, solid buttons (`bg-ink text-paper`) |
| `--ink-soft` | `#a3a3a3` | secondary text |
| `--paper` | `#0a0a0a` | page background, text on solid buttons |
| `--paper-dim` | `#141414` | alternate section surface (Tech stack, Service, Contact) |
| `--night` | `#ededed` | **contrast surface** — Experience section, footer, open Service card (light on a dark page) |
| `--night-line` | `rgb(0 0 0 / .12)` | dividers on `night` |
| `--night-muted` | `#5c5c5c` | secondary text on `night` |

Tailwind names: `text-ink`, `bg-paper`, `bg-night`, `border-ink/10`, `text-paper/80`, etc. Alpha variants of tokens (`ink/10`) are how hairlines/rings are drawn. `color-scheme: dark`; `theme-color` `#0a0a0a`.
To re-theme, change only these variables (the swap from light→dark was done this way).

## Typography
- **Manrope Variable** for everything (`--font-sans`, `--font-heading`); Geist Variable as `--font-mono` (counts like `[05]`, list numbers).
- Hero name: Manrope 800, uppercase, `letterSpacing 0.04`, rendered by TechText canvas.
- Section headings: `/TITLE`, `clamp(2.25rem,6vw,4.5rem)`, semibold, uppercase, tracking −0.03em, animated by SplitText (chars, mask).
- Ghost words behind headings: extrabold uppercase, tracking 0.08em, gradient-filled (`ghost-title` on paper, `ghost-title-dark` on night). Auto-fit to the heading width via `useFitWidth` in `SectionHeading.jsx`: never larger than the original `clamp(4.5rem,15vw,13rem)`, and shrinks below it when the word would overflow (e.g. "TESTIMONIALS" ≈ 41px at 375px wide).
- Body 15–18px, `leading-relaxed`.

## Utilities (`@utility` in index.css)
`text-outline` (stroke-only text, uses `-webkit-text-fill-color: transparent`), `ghost-title`, `ghost-title-dark`, `grain` (SVG noise overlay).

## Components & patterns
- **PillButton** — rounded-full pill with ↗ arrow that rotates on hover. Variants: `dark` (solid ink), `light` (outline), `invert`, `ghost`.
- **SocialPill(s)** — outline pills with icons (GitHub, Email, Download CV, phone).
- **SectionHeading** — `/TITLE` + ghost word + optional `aside` (e.g. "2+ years of experience").
- **ProjectCard** — rounded card, cover (16:11), category chip, hover ↗ circle, title, 2-line summary, tag chips.
- **ProjectCover** — generated monochrome cover art per project (`cover: { tone, motif, logo?, label }` in projects.js; motifs `devices | pulse | editor | cards | dashboard`). Tones were flipped for the dark theme so covers contrast with black cards. Add `image` to a project to use a real screenshot instead.
- **Service accordion** — big uppercase rows; open row becomes a `night` card with description, tags and a tilted project-cover preview (≥lg).
- **Experience list** — rows on `night`, hover dims others and shows a cursor-following project preview (pointer devices only).
- **Contact** — "HAVE A PROJECT IN MIND?" + form (visible labels, inline errors on blur, focus first invalid field, loading/success/error states) + social pills.

## Hero specifics
- Background: React Bits **GridScan** (dark mode), `linesColor #3a3a3a`, `scanColor #f5f5f5`, `dpr 1.25` (perf cap).
- Name: React Bits **TechText**, solid "PHUC TAN", `intro="metrics"` (2.4 s: type guides draw, then letters trace in), `reveal="letter"` (hover outlines one letter with a measurement frame), letters draggable anywhere in the section (canvas covers the section; word laid out inside an invisible band via `layoutRef`).
- Portrait: `public/images/me-cutout.avif` (PNG fallback) 1638×1618, CSS `grayscale contrast-[1.05]`, soft white radial halo behind it. Oversized and pushed below the fold so it reads large while the head stays below most of the name:
  - mobile `h-[68svh] -bottom-[8svh]`, sm `h-[80svh] -bottom-[14svh]`, lg `h-[90svh] -bottom-[22svh]` (≈ head top at y≈306 on 1440×900).
- Left: role (h1, with sr-only full name), tagline, "Let's collaborate" (Magnet). Right: social pills (md+). On mobile the left block becomes a blurred card at the bottom.

## Motion
- Easing `[0.22, 1, 0.36, 1]` for reveals; `Reveal` = fade + rise 32px, once, on view.
- Expressive extras: Magnet buttons, ClickSpark (white sparks) on every click, ScrollVelocity marquee, LogoLoop tech logos, filter pill `layoutId` slide.
- `MotionConfig reducedMotion="user"`; CSS kills animations under `prefers-reduced-motion`; anchor scrolling becomes instant.
- Scrolling is **native**. Anchor links use `scrollToTarget()` (`src/lib/scroll.js`) with an 80 px offset for the fixed navbar.

## Layout & accessibility
- Container `max-w-7xl px-4 sm:px-6`; sections `py-28 sm:py-36`.
- `main` has `overflow-x-clip` (ghost words/marquee must not create horizontal scroll — body-level clip did not work on mobile).
- Skip link, focus-visible outlines (2px ink), focus moves to `main` on route change, `aria-*` on menus/accordions/tabs, page titles via `usePageTitle`.

# Handoff — state as of 2026-10-25

Built in one Claude Code session (desktop app). This file carries the context a new session needs. See `CLAUDE.md` for rules and `DESIGN.md` for the design system.

## What was asked
"Build me a portfolio website, my role is frontend developer", using the owner's reference screenshots as inspiration but in the owner's colours, with React Bits components. Content comes from the CV: `/Users/phuctan/Documents/CV-Frontend-Nguyễn Phúc Tần.pdf` (copied to `public/cv/Nguyen-Phuc-Tan-CV.pdf` for download).

## Owner answers that shaped the build
- Hero name "Phuc Tan" animated with React Bits **Tech Text**; background React Bits **Grid Scan**.
- Black & white only, no colourful accents; no dark-mode toggle. Later: **invert** (black background, white text) — done.
- "Available for new project" badge: removed.
- Show: all CV projects (+ The Pulse API, not in CV), About/summary, tech stack, education, English level. Contact details public: **email, GitHub, phone, city only** (no street address). Socials: GitHub + Email + Download CV only.
- Hero name font changed to **Apexor** (owner-supplied zip from ifonts.xyz; licence file says "Demo for Personal Use", commercial licence via Envato Elements). Font + licence note in `src/assets/fonts/`.
- Section titles + hero role use **Astravolt** (owner-supplied `src/assets/fonts/astravolt.otf`; `iFonts-License.txt` is its licence: "Demo for Personal Use"). Replaced Brace (`brace.otf`, now unused).
- Contact: a form, API wired later. Multi-page. Deployment: later. Fonts: match reference (Manrope).
- Motion: expressive. Scroll: native (Lenis removed — "seems delayed").
- Hero name intro: chose **metrics** out of 5 previewed (assemble, typewriter, metrics, curtain rise, focus pull). Reveal: **letter** (not area). "PHUC" made **solid** (was outlined).
- Photo: cropped chest-up and enlarged twice ("more bigger"); then quality upgrade. A full re-cut with Apple Vision was **rejected** ("still mistakes") → reverted to the owner's own `no_background.png` mask, upgraded in resolution only.

## Changes to vendored React Bits components
- `TechText.jsx`
  - `outlineChars` / `outlineWidth` props: first N chars drawn as outlines (no longer used in the hero, kept for the option).
  - `layoutRef` prop: canvas covers its container, but the word is laid out inside the referenced element's rect → letters can be dragged anywhere in the hero without clipping. Band rect is part of the layout key and observed by ResizeObserver.
- `GridScan.jsx`: creates a **fresh canvas per mount**. Its cleanup calls `loseContext()`, and React StrictMode re-runs effects on the same DOM node, which previously handed back a dead WebGL context (blank background in dev).
- `SpecularButton.jsx`: added an `as` prop (render as `Link`/`a`; `type`/`disabled` only on real buttons) and the same fresh-canvas-per-mount fix as GridScan.
- Others (SplitText, LogoLoop, ClickSpark, ScrollVelocity) are unmodified registry copies. Magnet was removed (owner didn't want buttons following the cursor).

## Hero photo pipeline
- Owner's cut-out: `public/no_background.png` (1896×2400) — verified to be an exact scale of the original photo (0 px offset, 0.56/255 mean RGB error).
- Best original: `~/Library/Application Support/ZaloData/media/278784449969956132/ZaloDownloads/resource/2167207341574125033/Cache/1790927605843_278784449969956132_2167207341574125033_o` (JPEG 2022×2560, 391 KB, least compressed). Same image at `~/Pictures/1790927605843_…jpg` (333 KB) and `public/1790927605843_…jpg`.
- `scripts/photo/build-hero-cutout.swift` scales the owner's alpha to 2022×2560, applies it to the original's pixels, light unsharp mask (r 1.4, 0.3), crops to x=192 y=387 w=1638 h=1618 (original px), writes `me-cutout.png` + `me-cutout.avif` (q 0.8, ~120 KB). Re-running it reproduces the installed PNG byte-for-byte.
  ```
  swiftc -O scripts/photo/build-hero-cutout.swift -o /tmp/build-hero-cutout
  /tmp/build-hero-cutout "<original.jpg>" public/no_background.png public/images
  ```
- Mask fidelity check done: new alpha vs owner's alpha mean diff 0.11/255, 0 pixels off by >25%.
- `public/images/me.jpg` (1105×1400) is the uncut photo used for avatars and the About page.

## Open items / TODO (visible as placeholders on the site)
- **The Pulse API** (`src/data/projects.js` slug `pulse-api`, `src/data/site.js` experience[0]): role, dates, stack, description, responsibilities. Owner works there (thepulseapi.com); details unknown.
- **Testimonials**, **Certifications & awards**, **Writing** (`src/data/site.js`).
- **Contact form transport**: `src/lib/contact.js` is a stub that resolves after 900 ms. Wire EmailJS / Web3Forms / Formspree / own API (owner said "later"); keep the resolve/throw contract.
- **Deployment**: not decided.
- **Real project screenshots**: none in the repos; covers are generated (`ProjectCover`). Add `image` per project when available.

## Pending questions (asked, not answered)
- Footer still shows "PHUC" outlined (hero is now solid) — make it solid to match?
- On phones long ghost words shrink a lot (~41 px for "TESTIMONIALS") — keep, or set a minimum and allow slight overflow?
- Dragged hero letters pass **behind** the portrait (same depth as the name) — offered to raise them above while dragging.

## Known caveats
- **Apexor licence is a personal-use demo.** Fine for a personal portfolio; buy the commercial licence if the site is used commercially. The original zip is still at `public/apexor-futuristic-geometric-display.zip`, which Vite would publish — move it out of `public/` before deploying.
- `public/cv/Nguyen-Phuc-Tan-CV.pdf` contains the owner's **street address**, while the site intentionally shows city only. Flagged; owner may want a redacted CV.
- `me-cutout.png` fallback is ~1.8 MB (AVIF is served to modern browsers). `src/assets/{hero.png,react.svg,vite.svg}` and `src/components/ui/button.jsx` are unused template leftovers.
- Remaining lint warnings are only in vendored files (React Bits ClickSpark, GridScan, LogoLoop, Magnet, and the unused shadcn `ui/button.jsx`).
- An early mistake deleted the original full-res JPG from `public/`; it was restored from `~/Pictures` (2022×2560).
- Repo is private on GitHub (`PTan2505/porfolio`). It started with only a GitHub-generated `README.md`; the site was committed on top (no force-push). If it is ever made public, the CV PDF with the street address becomes public too.

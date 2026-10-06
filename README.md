# Portfolio: 2D Artist & Illustrator

A one-page, bilingual (EN / FR) portfolio website for a 2D artist and illustrator, built from the design spec **Portfolio Website, Cahier des charges v2**.

Dark theme, smooth GSAP animations, accessible Radix primitives, fully responsive (mobile-first).

## Features

- **One-page scroll** with anchor navigation, animated smooth scroll and active-section highlight
- **Bilingual**: English by default, French via the EN | FR toggle (choice is remembered)
- **Sticky navbar** that blurs on scroll, with a full-screen drawer on mobile
- **Contact modal** with platform links and click-to-copy email
- **Projects carousel**: autoplay (paused on hover/focus), arrows, dots, swipe, lightbox
- **Process modals**: three clickable cards, each opening a stepper (Sketch, Lineart, Color, Final)
- **Gallery**: tag filters, lazy-loaded images, "See more" (2 rows, then +4 rows per click), lightbox over the filtered images
- **Reviews**: animated score, review slider, link to each platform profile
- **Reduced-motion support** across all animations

## Tech stack

| Area          | Choice                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------- |
| Framework     | React + Vite                                                                                |
| UI primitives | [Radix Primitives](https://www.radix-ui.com/primitives) (`radix-ui`), unstyled              |
| Animation     | [GSAP](https://gsap.com/) (`gsap`, `@gsap/react`, ScrollTrigger, ScrollToPlugin, SplitText) |
| Styling       | CSS Modules + CSS custom properties (no CSS framework)                                      |
| Icons         | `lucide-react` (placeholders for the custom process icons)                                  |
| Fonts         | Montserrat (headings) + Plus Jakarta Sans (body) via `@fontsource-variable`                 |
| i18n          | Small in-house context provider, no library                                                 |

## Getting started

**Prerequisites:** Node.js 20 or newer.

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build in dist/
npm run preview   # serve the production build locally
npm run lint      # lint the code (included in Vite's React template)
```

## Project structure

```
public/
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── images/                 # avatar, About background, project/gallery artwork
src/
├── components/
│   ├── layout/             # Navbar, MobileMenu, LanguageToggle, ContactModal,
│   │                       # ContactProvider, Footer
│   └── ui/                 # Button, Tag, IconButton, Container, Section,
│                           # Modal, Lightbox, Carousel
├── data/                   # site, projects, processes, gallery, reviews
├── hooks/                  # useReducedMotion, useScrolled, useActiveSection,
│                           # useColumns, useContact
├── i18n/                   # provider, hook, en.json, fr.json
├── lib/                    # gsap.js (plugin registration), scrollToSection.js
├── sections/               # Hero, About, FinalCta, projects/, process/,
│                           # gallery/, reviews/
├── App.jsx
├── main.jsx
└── index.css               # design tokens + global styles
```

## Editing content

Almost everything is data-driven. You rarely need to touch components.

| To change                                | Edit                                               |
| ---------------------------------------- | -------------------------------------------------- |
| Name, brand, email, contact/social links | `src/data/site.js`                                 |
| Projects (max 4 per the spec)            | `src/data/projects.js`                             |
| Process cards and steps                  | `src/data/processes.js`                            |
| Gallery images and tags                  | `src/data/gallery.js`                              |
| Reviews and global score                 | `src/data/reviews.js`                              |
| Any static text                          | `src/i18n/en.json` and `src/i18n/fr.json`          |
| Page title, description, social preview  | `index.html` and the `meta` keys in the i18n files |

Project names stay untranslated, as the spec requires. Text that differs per language uses `{ en, fr }` objects in the data files.

### Adding a translation key

1. Add the key to **both** `en.json` and `fr.json`.
2. Use it in a component with `const { t } = useI18n(); t("section.key")`.

A missing key renders the key itself, which makes gaps easy to spot.

## Design tokens

Defined in `src/index.css`.

| Token                 | Value     | Use                           |
| --------------------- | --------- | ----------------------------- |
| `--color-bg-1`        | `#0F081F` | Main background               |
| `--color-bg-2`        | `#1A0936` | Secondary background, cards   |
| `--color-accent-red`  | `#A11111` | Fills, buttons, active states |
| `--color-accent-gold` | `#EDAA24` | Accents, links, CTA           |
| `--color-cream`       | `#FFF9E1` | Text                          |

**Contrast note:** the red accent is used only as a fill with cream text on top. It does not meet WCAG AA as text on the dark backgrounds.

Breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop navbar and 4-column gallery), 1280px (desktop).

## Animation notes

- All GSAP plugins are registered once in `src/lib/gsap.js`. Import `gsap`, `useGSAP`, `ScrollTrigger` and `SplitText` from there.
- Text reveals (`SplitText`) re-split automatically on resize and font load. Elements that change text with the language use `key={lang}` so React and SplitText don't conflict.
- Every animation is skipped when `prefers-reduced-motion: reduce` is set (`useReducedMotion`).
- The gallery column count in `useColumns.js` must stay in sync with the grid breakpoints in `Gallery.module.css`.

## Assets

Place files in `public/images/`:

| File                        | Notes                                                          |
| --------------------------- | -------------------------------------------------------------- |
| `avatar.webp`               | Illustrated avatar. A fallback initial shows if missing.       |
| `about-bg.webp`             | Background illustration for About only, shown at ~18% opacity. |
| Project and gallery artwork | WebP, around 200 KB max per image.                             |

## Deployment

The site is fully static: `npm run build` outputs `dist/`, which can be hosted anywhere (Netlify, Vercel, Cloudflare Pages, GitHub Pages...). There is no client-side routing, so no rewrite rules are needed.

If deploying under a sub-path (for example GitHub Pages project sites), set `base` in `vite.config.js`.

## Before going live

- [ ] Replace placeholder content: `SITE` (name, email), contact links, all `data/*.js` files
- [ ] Add real artwork and alt text; replace the `picsum.photos` dummy images
- [ ] Replace the process icons with the custom ones
- [ ] Set the real domain in `index.html` (canonical, Open Graph), `robots.txt` and `sitemap.xml`
- [ ] Add `public/og-image.png` (1200 x 630) and `public/apple-touch-icon.png` (180 x 180)
- [ ] Check text contrast (WCAG AA) against the final design
- [ ] Run Lighthouse and axe on the production build (`npm run build && npm run preview`)

## Credits and license

Design spec: Miarotiana Rakotoarisinina (v2, 2025).

All artwork and written content are the property of the artist and may not be reused without permission. License for the code: _to be decided_.

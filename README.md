# Murtala Imran Dauda — Portfolio

Full-stack developer portfolio. React · TypeScript · Vite · Tailwind CSS 4.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Where things live

| File | What it holds |
| --- | --- |
| `src/index.css` | **Every design token.** Colours, grid settings, animation speeds |
| `src/components/Hero.tsx` | The hero's content and layout |
| `src/components/HeroBackground.tsx` | The four decorative background layers |
| `src/components/icons.tsx` | Two hand-written SVG icons (no icon dependency) |

## Tuning the look

All four knobs are in the `@theme` block at the top of `src/index.css`:

| Want to change | Token | Now |
| --- | --- | --- |
| Background colour | `--color-canvas` | `#100817` |
| How visible the grid is | `--grid-opacity` | `0.055` (brief says 0.03–0.07) |
| How fast it drifts | `--grid-drift` | `28s` — higher is calmer |
| Grid density | `--grid-size` | `54px` — smaller is denser |
| Grid tilt | `--grid-angle` | `34deg` |

Headline size is a `clamp()` in `Hero.tsx`: `clamp(2.5rem, 7.2vw, 4.75rem)` —
minimum on a phone, preferred that scales with the viewport, maximum on a wide
monitor.

## Still to do

- [ ] Put the CV PDF at `public/cv.pdf` (or change `CV_HREF` in `Hero.tsx`)
- [ ] Build the Projects section — the primary button already points at `#projects`

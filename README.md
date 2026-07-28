# Josh Bennett — Portfolio

Premium single-page portfolio: React + Vite + TypeScript + Tailwind CSS + Framer Motion + Lucide.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to /dist
```

## Where to put your real content

**All copy lives in [`src/content.ts`](src/content.ts)** — headings, tagline, skills,
project blurbs, email, LinkedIn. Edit that one file; no layout code involved.
Search the codebase for `TODO(Josh)` to find every placeholder.

**Media goes in `public/media/`:**

| Path | What to drop there |
| --- | --- |
| `public/media/hero-reel.mp4` | Silent 10–20s showreel loop (WWE2K / Baller League / Six Nations cut works well). Keep under ~8MB. |
| `public/media/marquee/01.jpg … 14.jpg` | 14 campaign stills/GIFs, 420×270 or larger. |
| `public/media/projects/*.jpg` | Per project: two landscape stills + one tall portrait still (paths listed in `content.ts`). |

Until real files exist, the site shows hosted placeholder media (picsum + a
placeholder video) so the preview still looks finished. Those fallbacks are
marked with comments and can be deleted once your assets are in.

## Accessibility / motion

All scroll choreography (word pull-ups, character reveal, marquee drift,
sticky-stacking cards) respects `prefers-reduced-motion`, and the character
reveal downgrades to per-word animation below 768px for low-powered devices.

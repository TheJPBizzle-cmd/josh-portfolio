# Josh Bennett — Portfolio

Static site. No build step, no dependencies.

## Structure
- `index.html` — the entire site (HTML, CSS, JS in one file)
- `media/` — all video and images

## Deploying
Any static host works. Cloudflare Pages recommended (free, unlimited bandwidth):
1. Push this folder to a GitHub repo
2. Cloudflare Pages → Create project → connect the repo
3. Build command: *(leave empty)* · Output directory: `/`

## Editing content
Everything editable lives in the `<script>` block near the bottom of `index.html`:

- `WALL` — the 16 hero tiles. Independent of projects; swap freely.
- `CHAPTERS` — section order and which projects sit in each.
  Reordering this array re-targets the whole site.
- `WORK` — every project. Fields:
  - `src` — short looping clip used on cards/tiles
  - `full` — full-length film used in the case-study modal
  - `poster` — still shown before playback
  - `idea` / `made` / `note` — case-study copy (`made` hides if empty)
- Featured blocks are set by the three `$("#fA"/"#fB"/"#fC")` lines.

## Media conventions
- Card clips: 6–16s cutdowns, 720p
- Full films: complete edit, 540–720p
- Every entry needs a `poster` or the tile loads black

## Contact
Footer "LET'S TALK" and the mobile menu link to bennett.josh90@gmail.com

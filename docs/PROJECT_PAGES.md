# Academic project pages (`/projects/<paper-slug>/`)

This site publishes a standalone "project page" for individual papers,
separate from the starter's generic `_projects/` portfolio placeholders
(`_projects/1_project.md` … `9_project.md` — unrelated demo content shipped
by the al-folio starter, not paper pages). Project pages live under
`_pages/projects/` as plain Jekyll pages with a `permalink` override, so they
get clean URLs (`/projects/<slug>/`) without touching the portfolio grid or
any gem-owned file.

The first one is [`_pages/projects/seg2grasp.md`](../_pages/projects/seg2grasp.md)
— copy it as the starting point for a new paper.

## Adding a new paper page

1. Copy `_pages/projects/seg2grasp.md` to `_pages/projects/<slug>.md`
   (lowercase, hyphenated, e.g. `ego-exo-con.md`).
2. Update the front matter: `title`, `description` (venue), `permalink: /projects/<slug>/`.
   Keep the `_styles: | @import url("/assets/css/project-page.css");` line —
   this is how the page pulls in the shared stylesheet without duplicating it.
3. Rewrite the body sections (title/authors/affiliations/venue → resource
   buttons → teaser → TL;DR → abstract → method → demo → results → BibTeX →
   acknowledgements) using that paper's actual repo/paper content. **Don't
   invent numbers, links, or images that aren't confirmed in the paper's own
   repo or the published paper** — if something isn't available yet, say so
   explicitly (see "Placeholders" below) rather than guessing.
4. Put paper-specific images under `assets/img/projects/<slug>/` and
   reference them with `{% include figure.liquid path="assets/img/projects/<slug>/xyz.png" ... %}`
   (no leading slash) — this is what makes the site's responsive webp
   pipeline (`imagemagick:` in `_config.yml`) generate 480/800/1400 variants
   automatically, same as every other image on the site.
5. In `_bibliography/papers.bib`, add `website = {/projects/<slug>/}` and
   `selected = {true}` to that paper's entry — `selected = {true}` is what
   makes it show up on the home page (`_pages/about.md` already has
   `selected_papers: true` wired up), rendered through the same `bib.liquid`
   template (and its Website/arXiv/Code/Bib button-order override — see
   `.al-folio-overrides.yml`).
6. Rebuild (`docker compose up -d`, or `bundle exec jekyll serve`), then
   `curl http://localhost:8080/projects/<slug>/` and check the page in a
   browser at both desktop and mobile widths.

## Shared CSS/JS

- `assets/css/project-page.css` — container width, typography, resource
  buttons, tab UI, responsive image grid, results-table scroll wrapper.
- `assets/js/project-page.js` — one generic accessible tabs component
  (keyboard nav, ARIA state) shared by every project page's demo section.
  It also knows how to lazily activate/pause `<video data-src>` elements
  (see below) — don't copy this logic per-page, just reuse the file.

Edit these two files once and every project page picks up the change; don't
copy CSS/JS into individual paper pages.

## Demo section: images vs. video

Seg2Grasp's page currently uses a real-photo grid (grouped by scene) because
**no video assets exist in that repo yet** — only stills. When a paper does
have real demo clips, replace the image grid inside a tab panel with:

```html
<video
  controls
  muted
  loop
  playsinline
  preload="none"
  poster="/assets/img/projects/<slug>/posters/<name>.jpg"
  data-src="/assets/video/projects/<slug>/<name>.mp4"
>
  <source data-src="/assets/video/projects/<slug>/<name>.mp4" type="video/mp4" />
</video>
```

`project-page.js` assigns `src` from `data-src` and calls `.load()` only when
its tab is activated, and pauses the video when the tab is deactivated — so
inactive tabs never download video. Never fabricate a `<video>` pointing at a
file that doesn't exist; if clips aren't ready yet, keep the image-grid
fallback (or a clearly-labeled placeholder) instead.

### Video asset convention

```
assets/video/projects/<slug>/<name>.mp4
assets/img/projects/<slug>/posters/<name>.jpg   (poster frame, shown before play)
```

### Compressing video before committing

Keep clips web-sized (roughly 3–15 MB each):

```bash
ffmpeg \
  -i input.mov \
  -vf "scale=-2:720,fps=30" \
  -c:v libx264 \
  -preset slow \
  -crf 25 \
  -an \
  -movflags +faststart \
  output.mp4
```

Never overwrite or delete the original source clip — write compressed output
to a new file/folder.

## Placeholders

If a value isn't available yet (arXiv ID, DOI, a not-yet-built project page,
video assets), use an explicit placeholder and say so in the page/bib file
rather than guessing:

- `papers.bib`: `arxiv = {0000.00000}` / omit `doi` — matches how Seg2Grasp's
  entry is set up until the real IDs are announced.
- Project page: a one-line `<p class="pp-note">` explaining what's missing
  and where the real asset should go once available (see Seg2Grasp's demo
  section for the pattern).

## Deploying

This is a normal Jekyll/GitHub Pages site — no separate deploy step for
project pages. Whatever's on the deployed branch (see the root `README.md`
/ `docs/INSTALL.md` for the site's GitHub Pages / CI setup) is built as one
site; new files under `_pages/projects/` and `assets/` just need to be
committed and pushed like any other content change.

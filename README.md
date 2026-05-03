# carlosrondonmoreno.com

Personal site for Carlos Rondón-Moreno — single-page React app served as static files via GitHub Pages at [carlosrondonmoreno.com](https://carlosrondonmoreno.com/).

## Stack

No build step. The site is plain static files:

- `index.html` — entry point. Loads React, ReactDOM, and Babel-standalone from the unpkg CDN, then loads the `.jsx` source files. JSX is compiled in the browser at page load.
- `data.js` — all content (papers, courses, service, command palette items, palette swatches, font pairings) lives here as plain JS objects. **This is the file you'll edit most often.**
- `app.jsx` — top-level React app: state, routing (hash-based), keyboard shortcuts, tweaks panel wiring.
- `variation-a.jsx` — homepage layout (the terminal/shell aesthetic).
- `subpages.jsx` — Research, Teaching, Service pages.
- `command-palette.jsx` — `/`-triggered command palette.
- `tweaks-panel.jsx` — live theming controls (color, font, density, pattern, nav palette).
- `styles.css` — all styling.
- `404.html` — styled fallback for unknown paths.
- `assets/`, `content/` — images and PDFs (CV lives in `content/`).
- `CNAME` — custom domain config (`carlosrondonmoreno.com`).
- `sitemap.xml`, `robots.txt` — for search engines.
- `contact.html`, `research.html`, `teaching.html`, `service.html` — legacy URL stubs that redirect to the relevant section of the SPA.

## Local preview

The site uses runtime JSX compilation via Babel, which needs to **fetch** the `.jsx` files. Browsers block these fetches when you open `index.html` directly via `file://`, so the page will appear blank. Always serve over HTTP:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

VS Code's built-in HTML preview pane will **not** work — its webview blocks the unpkg CDN scripts and the JSX fetches. Use a real browser.

## Updating content

Almost every content edit happens in `data.js`. After editing, just refresh the browser — no build step.

### Add a new paper

Edit the `PAPERS` array in [`data.js`](data.js). Each entry has the shape:

```js
{
  yr: "2025",                        // year, or "WIP" for work-in-progress
  tag: "PUBLISHED",                  // PUBLISHED | PLOS ONE | WP №xxx | DRAFT
  venue: "Journal of ..., Vol X",    // shown after author list
  title: "Paper title",
  authors: "with Coauthor One, Two", // shown only if coauthors[] is empty
  coauthors: [                       // preferred — renders linked names
    { name: "Coauthor Name", url: "https://..." }
  ],
  pdf: "https://doi.org/...",        // optional
  github: "https://github.com/...",  // optional
  appendix: "https://...",           // optional
  short: "short.slug"                // shown on the homepage card
}
```

The homepage shows the first 3 entries (`PAPERS.slice(0, 3)`), so order matters — put newest first. The Research subpage filters by `tag` (`PUBLISHED`/`PLOS ONE` → "published", `WP №...` → "working papers", `DRAFT` → "work in progress").

**When adding a paper, also update the static fallback in [`index.html`](index.html)** — the `<ul>` inside `<div id="root">` lists the top 3 papers for SEO/link-preview bots that don't run JavaScript. Keep the two roughly in sync.

### Add a course

Edit the `COURSES` array in [`data.js`](data.js):

```js
{
  code: "Fall\n2026*",          // semester label; trailing "*" renders as a footnote marker
  name: "Course Name",
  sub: "Department · University, Location",
  where: "Instructor"           // or "Teaching Assistant"
}
```

The `*` suffix flags southern-hemisphere academic-calendar courses (footnote rendered automatically at the bottom of the Teaching page).

### Add a service entry

Edit the `SERVICE` array in [`data.js`](data.js):

```js
{
  when: "January\n2026",
  org: "Organization name",
  orgUrl: "https://...",                // optional — makes the org name a link
  body: "Specific committee or event",
  role: "Your role",
  where: "Location or context",
  cat: "society"                        // "society" → Elected positions; anything else → Conferences & workshops
}
```

### Update the CV

Replace `content/Rondon_CV.pdf` with the new file (keep the same filename so existing links don't break). Update `lastmod` for the CV entry in [`sitemap.xml`](sitemap.xml).

### Update bio / homepage copy

Headline name, bio paragraphs, and the news card on the right side of the homepage are in [`variation-a.jsx`](variation-a.jsx). The static SEO fallback bio is in [`index.html`](index.html) — keep them roughly aligned.

### Add a command-palette shortcut

Edit `CMD_ITEMS` in [`data.js`](data.js). New `action` strings need to be handled in the `onAction` switch in [`app.jsx`](app.jsx).

## Deployment

GitHub Pages is configured to serve the `main` branch. Just commit and push:

```sh
git add -A
git commit -m "Update papers"
git push
```

Pages picks up the change within a minute or two. No build pipeline, no Actions to wait on.

DNS for `carlosrondonmoreno.com` points at GitHub Pages, with HTTPS enforced in repo Settings → Pages.

## SEO notes

- The `<div id="root">` in `index.html` contains a static fallback (name, bio, top papers, section links) that crawlers and social-card bots see before React hydrates. Keep it lightly maintained when papers change.
- JSON-LD `Person` schema is in the `<head>` for richer search results.
- `sitemap.xml` lists the canonical URLs (homepage hash anchors plus the CV).
- The legacy `*.html` files (`research.html`, `teaching.html`, etc.) redirect to the relevant SPA hash — preserves any external links pointing at the old multi-page version of the site.

## License

MIT — see [LICENSE](LICENSE).

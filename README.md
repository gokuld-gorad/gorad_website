# gorad.in

The website of Gorad Pvt Ltd and the Gorad Factory Platform. The design and the rules for what it may claim are in [docs/website-design-brief.md](docs/website-design-brief.md).

## Stack

- React 18 + Vite, plain CSS (`src/index.css`, light and dark tokens)
- Every page is pre-rendered to static HTML at build time, so search engines and AI crawlers read the full text without running JavaScript
- lucide-react icons; animations are SVG + CSS, no animation library
- Self-hosted Inter and JetBrains Mono (`public/fonts/`, SIL OFL)

## Develop

```bash
npm ci
npm run dev        # http://localhost:5173
npm run build      # client build + pre-render into dist/
npm run preview    # serve dist/ on http://localhost:4173
```

## Structure

```text
src/
├── routes.js            # every page: path, title, description
├── seo.js               # <head> tags and JSON-LD per page
├── site.js              # address, emails, form endpoint
├── content/             # FAQ and app catalogue (keep claims honest)
├── components/          # layout, shared blocks, animated diagrams, contact form
├── pages/               # one file per page
├── entry-client.jsx     # hydrates the pre-rendered HTML
└── entry-server.jsx     # used by scripts/prerender.mjs
public/                  # CNAME, robots.txt, llms.txt, favicon, preview image, fonts
scripts/prerender.mjs    # writes dist/<path>/index.html, 404.html and sitemap.xml
```

To add a page: add it to `src/routes.js`, create the component in `src/pages/`, register it in `src/App.jsx`, and link to it from `public/llms.txt`.

## Deploy

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which builds and publishes `dist/` to GitHub Pages at www.gorad.in. Work on a branch and merge to `main` to go live.

## Contact form

The form posts to a Google Apps Script web app that saves leads to a Google Sheet and emails sales@gorad.in. The script is in [docs/google-apps-script.js](docs/google-apps-script.js); its URL is `GOOGLE_SCRIPT_URL` in `src/site.js`. After changing the script, deploy a new version in Apps Script.

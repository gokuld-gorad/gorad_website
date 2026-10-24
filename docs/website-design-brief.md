# gorad.in — Website design brief

Agreed 2026-10-24. Source of truth for product claims: `GORAD/Products/GORAD_FACTORY_PLATFORM/docs/sales/PLATFORM_OVERVIEW.md`.

## Goal

Get a qualified plant into a conversation: a **demo** (anyone) or the **pilot programme** (selected plants). Every section builds trust or moves the visitor toward one of those two.

## Audience and market

- **India first, Europe second.** English only for now. Avoid India-only phrasing; contact form asks for country.
- Buyer: plant / quality head. Evaluator: automation engineer / integrator. Gatekeeper: plant IT.

## Brand architecture

```
Gorad                       company brand (gorad.in)
└── Gorad Factory Platform  first platform
    ├── Core · Connect · Vision
    └── Apps: SPC, NCR/CAPA, Line Performance, Traceability, Maintenance,
              Tool Life, Label & Dispatch, Skills, Calibration/MSA
(future platforms slot in beside the Factory Platform)
```

The nav uses a "Platforms" menu with one entry for now, so future platforms need no redesign.

## Positioning

- Core idea: **"Never pass a part because the system was broken."** Fail-closed, signed, auditable.
- Platform story: start with inspection or machine data, then add quality and production apps on the same platform.
- AI is a tool inside the product, not the headline.

## Honesty rules (D-052)

- No "proven", "guaranteed", "zero defect", or customer counts until gates pass.
- Status labels per app: *Pilot-ready*, *In pilot*, *Coming next*.
- "Where we fit / where we don't" section (PLATFORM_OVERVIEW §9).
- Only list protocols that exist: Modbus TCP, Siemens S7, OPC UA (clients). No Profinet, Profibus, EtherNet/IP, SCADA/ERP, cobot orchestration, line-scan.

## Sitemap

| Path | Page |
|---|---|
| `/` | Home |
| `/factory-platform` | Platform overview: layers, app catalogue, built for plants |
| `/factory-platform/vision` | Vision: fail-closed cycle, tools, station types, PLC handshake |
| `/factory-platform/connect` | Connect: protocols, tags → events, store-and-forward |
| `/pilot` | Pilot programme: who it's for, how engagement works |
| `/contact` | Demo / pilot form with qualifying questions, address |
| `/privacy` | Privacy policy (form collects personal data: GDPR, India DPDP Act) |

Home is broad and shallow; the other pages are narrow and deep, so sales emails can link to the page that answers a prospect's question.

## Persuasion principles

- Clear in 5 seconds: say what Gorad does in plain words.
- Lead with the buyer's fear (escapes reaching the customer), then features.
- Specific beats vague: name protocols, tools and limits.
- No fake social proof; use transparency instead (status labels, fit / no-fit, pilot).
- Commitment ladder: read → 30-min demo → pilot. Pilot page explains low risk for the plant.
- Show, don't tell: animated product visuals over adjectives.
- A short founder note instead of Vision & Mission.
- Short form; qualifying questions are optional dropdowns.
- Never: fake urgency, invented numbers, stock photos, pop-ups.

## Homepage flow

1. Hero: headline, one line, **Book a demo** + **Join the pilot programme**, animated LIVE verdict visual
2. The pain: three short pains
3. The platform: layered diagram (Core → Connect + Vision → Apps)
4. Start here: two doors — Inspection or Machine data
5. Fail-closed: animated cycle (trigger → views → journal → PLC)
6. Apps: grouped Quality / Production / Compliance with status labels
7. Built for plants: air-gap, offline licence, USB release, roles, audit, on-prem
8. Where we fit / where we don't
9. Pilot programme teaser → `/pilot`
10. Contact CTA

Removed from the current site: Vision & Mission, Philosophy, Advantages, generic Industries grid, 7-step roadmap.

## Visual direction — "Calm Precision"

- Same language as the product (`frontend/src/styles.css`): graphite neutrals, one Signal blue accent, Inter + JetBrains Mono.
- **Light and dark themes.** Default follows the OS (`prefers-color-scheme`); a navbar toggle overrides it and is remembered in `localStorage`.
- Green/red only inside product visuals (OK/NG), never as decoration.
- Real product screenshots (staged demo data) and SVG diagrams; no stock imagery. SETUP screenshots swap per theme; the LIVE kiosk is dark in both.

## Motion rules

Motion explains a mechanism or gives feedback; it never decorates.

| Where | Animation |
|---|---|
| Hero | Looping LIVE screen: parts cycle OK, OK, then NG with its reason. Pauses when off-screen |
| Fail-closed (signature) | Step-through: trigger → views light up → one view faults → journal written → NG to PLC. Replay button |
| Platform layers | Layers assemble once on scroll; hover/tap highlights a layer and its description |
| Connect | Tags flow into events; broker drops, buffer fills, then flushes |
| UI | Theme switch, menus, hovers: 150–250 ms |

Rules:

- Content is visible without animation. No section waits for a scroll trigger to appear.
- `prefers-reduced-motion`: all loops stop and diagrams show their final state.
- No glow, parallax, counters or fade-in on every section.
- Built with SVG + CSS + framer-motion (already a dependency); no heavy libraries.

## SEO

- Every page pre-rendered to static HTML with its full text.
- Unique `<title>` and meta description per page; one `<h1>`; semantic HTML.
- JSON-LD: `Organization`, `SoftwareApplication`, `FAQPage`.
- `sitemap.xml`, `robots.txt`, canonical URLs, Open Graph + Twitter preview image per page.
- Core Web Vitals: static pages, WebP images, self-hosted fonts, under ~200 KB JS per page, lazy-loaded images.
- Target long-tail searches, not broad terms owned by Cognex / Keyence.
- At launch: Google Search Console, Bing Webmaster Tools, Google Business Profile (Bengaluru).

## AI agent readability

- **AI crawlers are allowed** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) in `robots.txt`. Decided 2026-10-25.
- Facts live in text, never only in images or animations; every animation has a text equivalent.
- Short factual sentences that are easy to quote accurately.
- FAQ section phrased the way people ask assistants.
- `llms.txt` at the site root: company summary and links to key pages.

## Other

- Analytics: cookie-free (Cloudflare Web Analytics), so no cookie banner.
- Accessibility: WCAG 2.1 AA in both themes; keyboard and screen-reader support.
- Form spam: honeypot field + server-side check in Apps Script; no captcha.

## Tech

- Stay on Vite + React, GitHub Pages, `www.gorad.in`.
- Multi-page with real URLs; pages pre-rendered to static HTML for SEO (each page gets its own title and description).
- Contact form keeps the existing Google Apps Script backend; the frontend must check the response `result`.

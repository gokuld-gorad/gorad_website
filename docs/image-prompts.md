# Images for gorad.in — prompt pack and how to add them

## The rule

| Kind of visual | Source |
|---|---|
| Product, screens, results, defects found | **Real only**: screenshots and recordings from the Factory Platform sim demo, or real photos of your own rig |
| Atmosphere: industry headers, backgrounds | **AI-generated is fine**, shown with a small "Illustration" caption |
| People | **Real only** (the founder, later the team) |

Never upload customer images or real product screenshots to an AI service. Never generate images with real brand names, logos, readable text or faces.

---

## Shared style (paste at the start of every prompt)

> Photorealistic, cinematic industrial photograph. Dark, low-key lighting with a subtle electric cyan (#00E5FF) rim light and accents. Clean, modern factory. Shallow depth of field, high detail, calm and precise mood. Wide 16:9 composition with empty dark space on one side. No text, no letters, no numbers, no logos, no brand names, no people, no faces, no hands, no computer screens.

If the tool supports a negative prompt, add:

> text, letters, watermark, logo, brand, people, face, hands, screen, monitor, cartoon, illustration style, oversaturated, neon overload, cluttered, distorted machinery

---

## Industry headers (these have slots on the site)

Save each file with **exactly** this name in `images-src/industries/` (PNG or JPG, at least 1600 × 900 px).

| File name | Subject (add after the shared style) |
|---|---|
| `automotive.png` | Close-up of freshly machined steel connecting rods resting on a precision fixture in a modern machining cell, metal surfaces catching cyan light, a machine vision camera on a bracket softly out of focus in the background. |
| `electronics.png` | Green printed circuit board assemblies moving along a conveyor under a bright ring-light inspection station, small components sharp in the foreground, the rest of the line fading into darkness. |
| `aerospace-heavy-engineering.png` | A large precision-machined aluminium aerospace component on the bed of a CNC machine in a spacious hall, smooth curved surfaces and pockets, cyan reflections along the edges. |
| `building-materials.png` | Rows of red clay bricks on a conveyor leaving a kiln, warm orange glow from the kiln on one side and cool cyan light on the other, faint dust in the air. |
| `packaging-logistics.png` | Sealed cardboard boxes with plain blank labels moving on a roller conveyor at a packing station, a camera on an arm above the line, dark warehouse background. |

### Checklist before you use an image
- No text, letters or fake logos anywhere (zoom in on labels, machines and walls).
- The machinery makes mechanical sense: no floating parts, melted shapes or impossible cameras.
- No people or hands slipped in.
- The cyan is an accent, not a neon flood.
- Generate 4 options and pick the calmest; consistency across all five matters more than drama.

---

## Optional extras (no slot on the site yet)

| Use | Size | Subject |
|---|---|---|
| LinkedIn company banner | 1584 × 396 | Very wide, dark factory line with a single inspection camera lit in cyan on the right third, lots of empty dark space on the left for the logo. |
| LinkedIn post background | 1200 × 1200 | A single machined metal part on a dark surface, lit from one side with a cyan rim light, top-down. |
| Presentation title background | 1920 × 1080 | Out-of-focus factory line at night, cyan and soft indigo light, very dark overall. |

---

## Adding images to the site

1. Put the generated files in `images-src/industries/` with the names above (this folder is not committed).
2. Run:
   ```bash
   python3 scripts/add-images.py
   ```
   It resizes and compresses each image to WebP in `public/images/industries/` and updates `src/content/imageManifest.json`.
3. Run `npm run build` (or `npm run dev`). An industry with an image shows it on its page and its card, with an "Illustration" caption; one without simply shows no image.
4. Commit `public/images/industries/` and `src/content/imageManifest.json`.

To remove an image, delete it from `public/images/industries/` and run the script again.

---

## Real product screenshots (from the Factory Platform sim demo)

The Factory Platform can run a simulated station (simulated cameras, a virtual PLC, a cycle every 2 seconds), so every screen can be shown with demo data and no customer data. From the platform repo (see its README):

```bash
uv sync --all-packages --group dev
export GORAD_DEV=1
export GORAD_DATA_DIR=./data
uv run uvicorn deploy.server.main:app --reload --host 0.0.0.0 --port 8000
uv run gorad-station --api-base http://127.0.0.1:8000 --station-id station-1 --data-dir ./data/station --demo-interval 2
cd frontend && npm install && npm run dev
```

Capture at 1600 × 1000, dark theme, with demo plant names only:
- LIVE operator screen: one OK, one NG with its reason
- SETUP: a program, the NG review
- SPC chart with a violation, OEE drill-down, an NCR record

### Done once already (2026-10-25)

SPC, NCR / CAPA, Calibration & MSA and Maintenance have real screenshots on their app pages and in the Factory Platform "Real screens" gallery, captioned "Real screen · demo data". Connect, Line, Vision and the other apps had no live data in the demo (no gateway or inspection station running), so they have none yet.

To redo or add screens:

1. Start a scratch server and seed it with `tools/demo/seed_demo_plant.py` (platform repo), then start the web UI on port 5180 pointing at it.
2. Add demo data: `GORAD_DEMO_ADMIN_PASSWORD=… GORAD_DEMO_USER_PASSWORD=… python scripts/screens/extend_demo.py` (run with the platform's Python; the passwords are the ones the seed script prints).
3. Capture: `GORAD_DEMO_ADMIN_PASSWORD=… PLAYWRIGHT_PATH=<platform>/node_modules/playwright/index.mjs node scripts/screens/capture.mjs <outDir> <spcCharacteristicId> <ncrId>`.
4. Crop off the top bar, save the chosen shots as `images-src/screens/<app-slug>.png`, and run `python3 scripts/add-images.py`. A screen named after an app slug appears on that app's page automatically.

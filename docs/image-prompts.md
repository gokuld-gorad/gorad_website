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
- Gemini adds a small sparkle watermark near the bottom-right corner: crop it off before adding (the use-case images were cropped to the top-left 2560 × 1440; originals are kept in `images-src/usecases/originals/`).
- No text, letters or fake logos anywhere (zoom in on labels, machines and walls).
- The machinery makes mechanical sense: no floating parts, melted shapes or impossible cameras.
- No people or hands slipped in.
- The cyan is an accent, not a neon flood.
- Generate 4 options and pick the calmest; consistency across all five matters more than drama.

---

## Use-case images (these have slots on the site)

One per worked example on the Use cases page. They appear above the "What is checked" panel, with an "Illustration" caption. Save each file with **exactly** this name in `images-src/usecases/` (PNG or JPG, at least 1600 × 900 px). Generic parts only: nothing that looks like a specific customer's product.

| File name | Subject (add after the shared style) |
|---|---|
| `connecting-rod.png` | A single machined steel connecting rod on a dark precision fixture, three small industrial cameras on brackets around it pointing at different faces, cyan rim light along the rod's edges. |
| `catalyst-blockage.png` | Close-up of the honeycomb face of a cylindrical ceramic catalyst or filter substrate, thousands of tiny square cells, a ring light reflected faintly, cyan light from one side. |
| `pcb-assembly.png` | Top-down view of a populated green circuit board (generic components, no markings) under a square inspection light, sharp in the centre, edges falling into darkness. |
| `igbt-variant.png` | A rectangular power-electronics module with screw terminals on a dark anti-static mat, a camera angled above it, metal terminals catching cyan light. Plain housing, no printed text. |
| `bearing-pin-count.png` | A needle-roller bearing cage lying flat on a dark surface, rollers arranged in a ring, lit from above by a ring light so each roller shows a bright highlight. |
| `brick-damage.png` | A single red clay brick on a moving conveyor, one corner slightly chipped, a camera above the line, warm kiln glow far behind and cyan light in front. |

---

## Optional: one short video loop

Only if the result looks truly realistic; AI video artefacts are easier to spot than in stills.

| Use | Length | Subject |
|---|---|---|
| Section background (behind the "See. Connect. Improve." or industries section) | 8–10 s, seamless loop, 1920 × 1080, no audio | Slow dolly along a dark modern production line; generic machined metal parts pass under an industrial camera with a ring light; a faint cyan glow; very calm motion. No text, people, screens or logos. |

Export as MP4 (H.264). It will be compressed to WebM/MP4 under 3 MB, shown muted and looping with an "Illustration" caption, and never played for visitors who prefer reduced motion. Added 2026-10-26 as `public/video/inspection-loop.mp4` (watermark cropped, sound removed, faded in and out so the loop is seamless), behind the homepage statement "If a camera, a check or the software fails…".

---

## Optional extras (no slot on the site yet)

| Use | Size | Subject |
|---|---|---|
| LinkedIn company banner | 1584 × 396 | Very wide, dark factory line with a single inspection camera lit in cyan on the right third, lots of empty dark space on the left for the logo. |
| LinkedIn post background | 1200 × 1200 | A single machined metal part on a dark surface, lit from one side with a cyan rim light, top-down. |
| Presentation title background | 1920 × 1080 | Out-of-focus factory line at night, cyan and soft indigo light, very dark overall. |

---

## Adding images to the site

1. Put the generated files in `images-src/industries/` or `images-src/usecases/` with the names above (this folder is not committed).
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

### Platform tour video (homepage, recorded 2026-10-26)

`public/video/platform-tour.mp4` is a 32-second screen recording of the real Factory Platform on demo data: Connect live values ticking, an SPC chart with its tooltip, the violations list, an NCR record, the NCR board and maintenance work orders. It plays muted and looping on the homepage ("Real software, demo data"), with `platform-tour-poster.webp` as its still frame.

To re-record (e.g. once a station runs a signed program, so the LIVE screen can show real OK/NG verdicts):

1. Start the scratch server, seed it, add the demo data and start the web UI, as in steps 1–2 above.
2. In one terminal, post changing press readings (they are what a running press would send): `GORAD_GW_KEY=<Connect gateway key from the seed> python scripts/screens/demo-press.py <connection id> 120` (run with the platform's Python).
3. In another, record: `GORAD_DEMO_ADMIN_PASSWORD=… PLAYWRIGHT_PATH=<platform>/node_modules/playwright/index.mjs node scripts/screens/record-tour.mjs <outDir> <spcCharacteristicId> <ncrId>`. It prints the video file and the second at which the tour starts.
4. Encode (crop off the side menu, trim the start):
   ```bash
   ffmpeg -ss <startAt> -i <file>.webm -vf "crop=1200:900:240:0,fps=25" -an -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart public/video/platform-tour.mp4
   ```
   and save a still frame as `public/video/platform-tour-poster.webp`. Keep the MP4 under about 2 MB.


# Print documents

| File | What it is | Rendered by |
|---|---|---|
| `brochure.html` | Public 2-page brochure | `scripts/make-pdfs.sh` → `public/downloads/` |
| `datasheet.html` | Public 2-page technical datasheet | `scripts/make-pdfs.sh` → `public/downloads/` |
| `confidential-template.html` | Template for proposals, quotations, pilot plans and reports | `scripts/make-confidential.sh` → `confidential-out/` |
| `print.css` | Shared styles and fonts | — |

## Public PDFs

Each page ends with the copyright, version and date, "indicative, not an offer or a contract", and the third-party trademark line. When you change a public PDF, raise the version and month in that line (in both files), then run `bash scripts/make-pdfs.sh` and check that nothing touches the footer.

## Confidential documents

**This repository is public.** Filled-in documents and their PDFs must never be committed.

1. Copy the template with a name ending in `.confidential.html` (git ignores that pattern):
   ```bash
   cp print/confidential-template.html print/acme-pilot.confidential.html
   ```
2. Edit the `DOC` block at the top (customer, title, date, reference, NDA date, version) and replace every yellow `[placeholder]` in the body.
3. Render:
   ```bash
   scripts/make-confidential.sh print/acme-pilot.confidential.html
   ```
   The PDF lands in `confidential-out/` (also ignored by git). Every page carries "Confidential · Prepared for <customer>", a faint diagonal watermark with the customer's name, the NDA notice and page numbers.
4. Before sending, check that no yellow placeholder is left.

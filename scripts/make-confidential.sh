#!/usr/bin/env bash
# Renders a filled-in confidential document to PDF with headless Chrome.
# Usage: scripts/make-confidential.sh print/<name>.confidential.html [out.pdf]
# Copies of print/confidential-template.html are named *.confidential.html and the PDFs go
# to confidential-out/: git ignores both. This repository is public; never commit either.
set -euo pipefail
in="$(realpath "$1")"
out="${2:-$(dirname "$0")/../confidential-out/$(basename "${in%.confidential.html}").pdf}"
mkdir -p "$(dirname "$out")"
CHROME="${CHROME:-$(command -v google-chrome || command -v chromium || command -v chromium-browser)}"
case "$in" in *.confidential.html) ;; *) echo "Name the file <something>.confidential.html so git ignores it." >&2; exit 1 ;; esac
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --allow-file-access-from-files \
    --virtual-time-budget=3000 --print-to-pdf="$out" "file://$in" 2>/dev/null
echo "wrote $out"

#!/usr/bin/env bash
# Renders print/*.html to public/downloads/*.pdf with headless Chrome.
# Run after changing a print page; the PDFs are committed so the site build stays simple.
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="${CHROME:-$(command -v google-chrome || command -v chromium || command -v chromium-browser)}"
mkdir -p public/downloads

render() {
    "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --allow-file-access-from-files \
        --print-to-pdf="public/downloads/$2" "file://$PWD/print/$1" 2>/dev/null
    echo "wrote public/downloads/$2"
}

render brochure.html gorad-factory-platform-brochure.pdf
render datasheet.html gorad-factory-platform-datasheet.pdf

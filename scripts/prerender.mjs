// Renders every route to static HTML in dist/ so search engines and AI crawlers
// get the full text without running JavaScript. Also writes sitemap.xml.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
// Cookie-free visitor statistics (Cloudflare Web Analytics), only when a token is set,
// e.g. from a GitHub Actions secret. Without it the site ships no analytics at all.
const beacon = process.env.CF_BEACON_TOKEN
    ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${JSON.stringify({ token: process.env.CF_BEACON_TOKEN })}'></script>\n  </body>`
    : '</body>'
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8').replace('</body>', beacon)
const { render, routes, notFound } = await import(
    pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
)
const { SITE_URL } = await import(pathToFileURL(path.join(root, 'src', 'site.js')).href)

function write(file, route) {
    const { html, head } = render(route)
    const page = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
    const out = path.join(dist, file)
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.writeFileSync(out, page)
    console.log('prerendered', file)
    return html
}

// Plain text of a page's main content for llms-full.txt: headings as Markdown, list
// items as bullets, no drawings, scripts or tooltip duplicates.
function pageText(html) {
    const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/) || [, html])[1]
    const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }
    return main
        .replace(/<(svg|script|style|nav)[\s\S]*?<\/\1>/g, '')
        .replace(/<span class="term-tip"[\s\S]*?<\/span><\/span>/g, '</span>')
        .replace(/<h([1-4])[^>]*>/g, (_, n) => `\n\n${'#'.repeat(Number(n) + 1)} `)
        .replace(/<\/h[1-4]>/g, '\n')
        .replace(/<li[^>]*>/g, '\n- ')
        .replace(/<(br|\/p|\/div|\/section|\/li|\/dd|\/dt|\/summary|\/tr)[^>]*>/g, '\n')
        .replace(/<\/t[dh]>/g, ' | ')
        .replace(/<\/a>\s*(?=<a[\s>])/g, '</a>\n')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) =>
            e[0] === '#' ? String.fromCodePoint(e[1] === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : entities[e] ?? m)
        .split('\n').map((l) => l.replace(/[ \t]+/g, ' ').replace(/ ([,.;:!?)’])/g, '$1').trim()).filter((l) => l !== '-').join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
}

const fullText = []
for (const route of routes) {
    const html = write(route.path === '/' ? 'index.html' : path.join(route.path, 'index.html'), route)
    fullText.push(`# ${route.title}\n\nURL: ${SITE_URL}${route.path}\n\n${pageText(html)}`)
}
fs.writeFileSync(
    path.join(dist, 'llms-full.txt'),
    `# Gorad: full text of www.gorad.in\n\n> Every page of the site as plain text, generated at build time. A short summary is in ${SITE_URL}/llms.txt.\n\n${fullText.join('\n\n---\n\n')}\n`,
)
console.log('wrote llms-full.txt')
// GitHub Pages serves 404.html for any unknown path.
write('404.html', notFound)

const today = new Date().toISOString().slice(0, 10)
const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((r) => `  <url><loc>${SITE_URL}${r.path}</loc><lastmod>${today}</lastmod></url>`),
    '</urlset>',
    '',
].join('\n')
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log('wrote sitemap.xml')

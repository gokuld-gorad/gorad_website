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
}

for (const route of routes) {
    write(route.path === '/' ? 'index.html' : path.join(route.path, 'index.html'), route)
}
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

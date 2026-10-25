// Captures screenshots of the local demo platform with Playwright.
// Usage: node capture.mjs <outDir> <spcCharacteristicId> <ncrId>
// Run with Playwright resolvable, e.g. NODE_PATH or from the platform repo's node_modules.
const { chromium } = await import(process.env.PLAYWRIGHT_PATH || 'playwright')
import fs from 'node:fs'

const [outDir, spcId, ncrId] = process.argv.slice(2)
const BASE = process.env.GORAD_UI || 'http://127.0.0.1:5180'
fs.mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: 'dark' })
await ctx.addInitScript(() => {
    try {
        localStorage.setItem('gorad_setup_theme', 'setup-dark')
        localStorage.setItem('gorad_rail_pinned', '1') // dock the menu instead of an overlay
    } catch {}
})
const page = await ctx.newPage()

await page.goto(`${BASE}/login`)
await page.getByLabel('Username').fill('admin')
await page.getByLabel('Password', { exact: true }).fill(process.env.GORAD_DEMO_ADMIN_PASSWORD)
await page.keyboard.press('Enter')
await page.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 15000 })

const shots = [
    ['overview', '/'],
    ['spc-chart', `/spc/charts/${spcId}`],
    ['spc-violations', '/spc/violations'],
    ['ncr-detail', `/ncr/${ncrId}`],
    ['ncr-board', '/ncr/board'],
    ['calibration', '/calibration'],
    ['maintenance', '/maintenance/work-orders'],
    ['connect-overview', '/connect'],
    ['connect-live', '/connect/live'],
    ['vision', '/vision'],
    ['line', '/line'],
]
for (const [name, path] of shots) {
    try {
        await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 20000 })
    } catch { /* streaming pages never go idle */ }
    await page.mouse.move(1300, 850) // keep the pointer off menus and tooltips
    await page.waitForTimeout(2000)
    await page.screenshot({ path: `${outDir}/${name}.png` })
    console.log('shot', name, page.url())
}
await browser.close()

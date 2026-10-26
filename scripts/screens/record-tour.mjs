// Records a guided tour of the demo platform (real screens, demo data) with Playwright.
// Usage: PLAYWRIGHT_PATH=<platform>/node_modules/playwright/index.mjs GORAD_DEMO_ADMIN_PASSWORD=… node record-tour.mjs <outDir> <spcCharacteristicId> <ncrId>
const { chromium } = await import(process.env.PLAYWRIGHT_PATH)
const [outDir, spcId, ncrId] = process.argv.slice(2)
const BASE = 'http://127.0.0.1:5180'
const browser = await chromium.launch()
const init = () => {
    try { localStorage.setItem('gorad_setup_theme', 'setup-dark'); localStorage.setItem('gorad_rail_pinned', '1') } catch {}
}
// 1. Sign in once, off camera.
const login = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' })
await login.addInitScript(init)
const lp = await login.newPage()
await lp.goto(`${BASE}/login`)
await lp.getByLabel('Username').fill('admin')
await lp.getByLabel('Password', { exact: true }).fill(process.env.GORAD_DEMO_ADMIN_PASSWORD)
await lp.keyboard.press('Enter')
await lp.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 15000 })
await lp.waitForTimeout(1500)
const state = await login.storageState()
await login.close()

// 2. Record the tour.
const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 }, colorScheme: 'dark', storageState: state,
    recordVideo: { dir: outDir, size: { width: 1440, height: 900 } },
})
await ctx.addInitScript(init)
const page = await ctx.newPage()
const t0 = Date.now()
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' }).catch(() => {})
await page.mouse.move(1200, 820)
await page.waitForTimeout(1500)
const startAt = (Date.now() - t0) / 1000
const nav = async (path, ms) => {
    await page.evaluate((p) => { history.pushState({}, '', p); dispatchEvent(new PopStateEvent('popstate')) }, path)
    await page.waitForTimeout(ms)
}
const glide = async (x1, y1, x2, y2, ms, steps = 40) => {
    for (let i = 0; i <= steps; i++) {
        await page.mouse.move(x1 + ((x2 - x1) * i) / steps, y1 + ((y2 - y1) * i) / steps)
        await page.waitForTimeout(ms / steps)
    }
}
await page.waitForTimeout(2500)                       // platform overview
await nav('/connect/live', 600); await glide(1200, 820, 760, 300, 900); await page.waitForTimeout(4500)
await nav(`/spc/charts/${spcId}`, 1200)
await glide(360, 470, 1060, 470, 4200, 70); await page.waitForTimeout(800)
await nav('/spc/violations', 600); await glide(1060, 470, 300, 330, 800); await page.waitForTimeout(2600)
await nav(`/ncr/${ncrId}`, 1200); await glide(300, 330, 700, 420, 900); await page.mouse.wheel(0, 260); await page.waitForTimeout(2600)
await nav('/ncr/board', 2600)
await nav('/maintenance/work-orders', 2400)
await nav('/calibration', 2600)
const endAt = (Date.now() - t0) / 1000
const video = page.video()
await ctx.close()
console.log(JSON.stringify({ file: await video.path(), startAt, endAt }))
await browser.close()

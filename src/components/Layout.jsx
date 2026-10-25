import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react'
import { ADDRESS_LINES, CIN, COMPANY, EMAIL_INFO, EMAIL_SALES } from '../site.js'
import { appIndex as appPages } from '../content/appIndex.js'

const APP_GROUPS = ['Quality', 'Production', 'Compliance & logistics']

export function Logo({ size = 28 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="20.5" stroke="currentColor" strokeWidth="2.6" />
            <path d="M24 11.5A12.5 12.5 0 1 0 36.5 24H30" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="24" cy="24" r="3.8" fill="currentColor" />
        </svg>
    )
}

const platformLinks = [
    { href: '/factory-platform/', label: 'Gorad Factory Platform', note: 'Inspection, machine data and quality apps' },
    { href: '/factory-platform/vision/', label: 'Gorad Vision', note: 'AI visual inspection' },
    { href: '/factory-platform/connect/', label: 'Gorad Connect', note: 'Machine and PLC data' },
    { href: '/factory-platform/use-cases/', label: 'Use cases', note: 'What it is built to inspect' },
]

const companyLinks = [
    { href: '/about/', label: 'About Gorad', note: 'Vision, mission, founder' },
    { href: '/how-we-work/', label: 'How we work', note: 'From first call to production' },
    { href: '/pilot/', label: 'Pilot programme', note: 'Prove it on your own line' },
    { href: '/partners/', label: 'Integrators & machine builders', note: 'Build cells on Gorad' },
    { href: '/security/', label: 'Security & trust', note: 'For plant IT' },
]

const INDUSTRIES_HREF = '/industries/'

function ThemeToggle() {
    // null until mounted: the server cannot know the visitor's saved choice.
    const [dark, setDark] = useState(null)
    useEffect(() => {
        setDark(document.documentElement.getAttribute('data-theme') !== 'light')
    }, [])
    const toggle = () => {
        const next = !dark
        setDark(next)
        document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
        try { localStorage.setItem('gorad-theme', next ? 'dark' : 'light') } catch { /* private mode */ }
    }
    return (
        <button className="icon-btn" onClick={toggle} aria-label={dark === false ? 'Switch to dark theme' : 'Switch to light theme'} title="Toggle theme">
            {dark === false ? <Moon size={18} /> : <Sun size={18} />}
        </button>
    )
}

// A nav item that opens a panel; closes on outside click and Escape.
function Dropdown({ id, label, active, className, children }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    useEffect(() => {
        if (!open) return
        const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
        const esc = (e) => { if (e.key === 'Escape') setOpen(false) }
        document.addEventListener('pointerdown', close)
        document.addEventListener('keydown', esc)
        return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', esc) }
    }, [open])
    return (
        <li className="nav-dropdown" ref={ref}>
            <button className={`nav-trigger${active ? ' is-active' : ''}`} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
                {label} <ChevronDown size={15} className="nav-chevron" />
            </button>
            {open && <div className={`nav-menu ${className || ''}`} id={id}>{children}</div>}
        </li>
    )
}

function MenuLinks({ links, path }) {
    return links.map((l) => (
        <li key={l.href}>
            <a href={l.href} aria-current={path === l.href ? 'page' : undefined}>
                {l.label}
                <span>{l.note}</span>
            </a>
        </li>
    ))
}

function Navbar({ path }) {
    const [mobileOpen, setMobileOpen] = useState(false)
    // The bar is transparent over a full-height hero and turns solid once the page scrolls.
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        // Re-check after load and when a (smooth) scroll settles: a jump to an anchor can
        // finish before this listener is attached.
        const events = ['scroll', 'scrollend', 'load']
        events.forEach((e) => window.addEventListener(e, onScroll, { passive: true }))
        return () => events.forEach((e) => window.removeEventListener(e, onScroll))
    }, [])
    const current = (href) => (path === href ? 'page' : undefined)
    const inCompany = companyLinks.some((l) => l.href === path)
    return (
        <header className={`navbar${scrolled || mobileOpen ? ' scrolled' : ''}`}>
            <div className="container navbar-inner">
                <a href="/" className="logo" aria-label="Gorad home">
                    <Logo /> <span>GORAD<span className="logo-dot">.</span></span>
                </a>
                <nav aria-label="Main">
                    <ul className="nav-links">
                        <Dropdown id="platforms-menu" label="Platforms" active={path.startsWith('/factory-platform')} className="nav-mega">
                            <ul>
                                <li className="nav-menu-label">Platforms</li>
                                <MenuLinks links={platformLinks} path={path} />
                            </ul>
                            {APP_GROUPS.map((g) => (
                                <ul key={g}>
                                    <li className="nav-menu-label">{g} apps</li>
                                    {appPages.filter((a) => a.group === g).map((a) => (
                                        <li key={a.slug}>
                                            <a href={`/factory-platform/${a.slug}/`} aria-current={path === `/factory-platform/${a.slug}/` ? 'page' : undefined}>{a.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </Dropdown>
                        <li><a href={INDUSTRIES_HREF} aria-current={path.startsWith('/industries/') ? 'page' : undefined}>Industries</a></li>
                        <Dropdown id="company-menu" label="Company" active={inCompany}>
                            <ul><MenuLinks links={companyLinks} path={path} /></ul>
                        </Dropdown>
                        <li><a href="/contact/" aria-current={current('/contact/')}>Contact</a></li>
                    </ul>
                </nav>
                <div className="nav-actions">
                    <ThemeToggle />
                    <a href="/contact/" className="btn btn-primary">Book a demo</a>
                    <button
                        className="icon-btn menu-toggle"
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>
            <div className="mobile-menu" id="mobile-menu" hidden={!mobileOpen}>
                <div className="container">
                    <p className="mobile-label">Platforms</p>
                    {platformLinks.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
                    <p className="mobile-label">Apps</p>
                    {appPages.map((a) => (
                        <a key={a.slug} className="sub" href={`/factory-platform/${a.slug}/`}>{a.name}</a>
                    ))}
                    <p className="mobile-label">Company</p>
                    <a href={INDUSTRIES_HREF}>Industries</a>
                    {companyLinks.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
                    <a href="/contact/">Contact</a>
                    <a href="/contact/" className="btn btn-primary">Book a demo</a>
                </div>
            </div>
        </header>
    )
}

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <a href="/" className="logo" aria-label="Gorad home"><Logo size={24} /> <span>GORAD<span className="logo-dot">.</span></span></a>
                        <address>
                            {COMPANY}<br />
                            {ADDRESS_LINES.map((l) => <span key={l}>{l}<br /></span>)}
                        </address>
                    </div>
                    <nav aria-label="Platform">
                        <h2>Factory Platform</h2>
                        <ul>
                            <li><a href="/factory-platform/">Overview</a></li>
                            <li><a href="/factory-platform/vision/">Gorad Vision</a></li>
                            <li><a href="/factory-platform/connect/">Gorad Connect</a></li>
                            <li><a href="/factory-platform/use-cases/">Use cases</a></li>
                            <li><a href="/industries/">Industries</a></li>
                            <li><a href="/factory-platform/#apps">All apps</a></li>
                            <li><a href="/downloads/gorad-factory-platform-brochure.pdf" download>Brochure (PDF)</a></li>
                            <li><a href="/downloads/gorad-factory-platform-datasheet.pdf" download>Datasheet (PDF)</a></li>
                        </ul>
                    </nav>
                    <nav aria-label="Company">
                        <h2>Company</h2>
                        <ul>
                            <li><a href="/about/">About</a></li>
                            <li><a href="/security/">Security & trust</a></li>
                            <li><a href="/partners/">Integrators & machine builders</a></li>
                            <li><a href="/pilot/">Pilot programme</a></li>
                            <li><a href="/contact/">Contact</a></li>
                            <li><a href="/how-we-work/">How we work</a></li>
                            <li><a href="/glossary/">Glossary</a></li>
                            <li><a href="/privacy/">Privacy</a></li>
                        </ul>
                    </nav>
                    <div>
                        <h2>Email</h2>
                        <ul>
                            <li><a href={`mailto:${EMAIL_SALES}`}>{EMAIL_SALES}</a></li>
                            <li><a href={`mailto:${EMAIL_INFO}`}>{EMAIL_INFO}</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© {COMPANY}. All rights reserved. CIN {CIN}</span>
                    <span>Based in Bengaluru, India · Serving plants worldwide</span>
                </div>
            </div>
        </footer>
    )
}

// Sections fade in as they scroll into view, once. The class that hides them is added
// here, after load, so the pre-rendered HTML (crawlers, no-JS visitors) always shows
// everything; visitors who prefer reduced motion get no fade at all.
function useReveal() {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
        const sections = [...document.querySelectorAll('main > section')]
        const root = document.documentElement
        root.classList.add('reveal-on')
        const io = new IntersectionObserver((entries) => {
            for (const e of entries) {
                if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
            }
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
        sections.forEach((el) => io.observe(el))
        return () => { io.disconnect(); root.classList.remove('reveal-on') }
    }, [])
}

export default function Layout({ path, children }) {
    useReveal()
    return (
        <>
            <a className="skip-link" href="#main">Skip to content</a>
            <Navbar path={path} />
            <main id="main">{children}</main>
            <Footer />
        </>
    )
}

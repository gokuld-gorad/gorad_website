import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react'
import { ADDRESS_LINES, COMPANY, EMAIL_INFO, EMAIL_SALES } from '../site.js'

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
    { href: '/factory-platform/', label: 'Factory Platform overview', note: 'Core, Connect, Vision and the apps' },
    { href: '/factory-platform/vision/', label: 'Gorad Vision', note: 'Fail-closed visual inspection' },
    { href: '/factory-platform/connect/', label: 'Gorad Connect', note: 'PLC and meter data gateway' },
    { href: '/factory-platform/use-cases/', label: 'Use cases', note: 'Example applications' },
]

function ThemeToggle() {
    // null until mounted: the server cannot know the visitor's theme.
    const [dark, setDark] = useState(null)
    useEffect(() => {
        const attr = document.documentElement.getAttribute('data-theme')
        setDark(attr ? attr === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches)
    }, [])
    const toggle = () => {
        const next = !dark
        setDark(next)
        document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
        try { localStorage.setItem('gorad-theme', next ? 'dark' : 'light') } catch { /* private mode */ }
    }
    return (
        <button className="icon-btn" onClick={toggle} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} title="Toggle theme">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    )
}

function PlatformsMenu({ path }) {
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
            <button
                className="nav-trigger"
                aria-expanded={open}
                aria-controls="platforms-menu"
                onClick={() => setOpen(!open)}
                style={path.startsWith('/factory-platform') ? { color: 'var(--text)' } : undefined}
            >
                Platforms <ChevronDown size={15} />
            </button>
            {open && (
                <ul className="nav-menu" id="platforms-menu">
                    <li className="nav-menu-label">Gorad Factory Platform</li>
                    {platformLinks.map((l) => (
                        <li key={l.href}>
                            <a href={l.href} aria-current={path === l.href ? 'page' : undefined}>
                                {l.label}
                                <span>{l.note}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )
}

function Navbar({ path }) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const current = (href) => (path === href ? 'page' : undefined)
    return (
        <header className="navbar">
            <div className="container navbar-inner">
                <a href="/" className="logo" aria-label="Gorad home">
                    <Logo /> GORAD
                </a>
                <nav aria-label="Main">
                    <ul className="nav-links">
                        <PlatformsMenu path={path} />
                        <li><a href="/pilot/" aria-current={current('/pilot/')}>Pilot programme</a></li>
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
                    <a href="/factory-platform/">Gorad Factory Platform</a>
                    <a className="sub" href="/factory-platform/vision/">Gorad Vision</a>
                    <a className="sub" href="/factory-platform/connect/">Gorad Connect</a>
                    <a className="sub" href="/factory-platform/use-cases/">Use cases</a>
                    <a href="/pilot/">Pilot programme</a>
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
                        <a href="/" className="logo" aria-label="Gorad home"><Logo size={24} /> GORAD</a>
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
                        </ul>
                    </nav>
                    <nav aria-label="Company">
                        <h2>Company</h2>
                        <ul>
                            <li><a href="/pilot/">Pilot programme</a></li>
                            <li><a href="/contact/">Contact</a></li>
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
                    <span>© {COMPANY}. All rights reserved.</span>
                    <span>Bengaluru, India · Serving plants in India and Europe</span>
                </div>
            </div>
        </footer>
    )
}

export default function Layout({ path, children }) {
    return (
        <>
            <a className="skip-link" href="#main">Skip to content</a>
            <Navbar path={path} />
            <main id="main">{children}</main>
            <Footer />
        </>
    )
}

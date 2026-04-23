import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleClick = (e, href) => {
        e.preventDefault()
        setMenuOpen(false)
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="navbar-inner">
                    <div className="navbar-logo">
                        GORAD<span>.</span>
                    </div>
                    <ul className="navbar-links">
                        {navLinks.map(({ label, href }) => (
                            <li key={href}>
                                <a href={href} onClick={(e) => handleClick(e, href)}>{label}</a>
                            </li>
                        ))}
                    </ul>
                    <button
                        className={`hamburger ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </nav>
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-menu open"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {navLinks.map(({ label, href }) => (
                            <a key={href} href={href} onClick={(e) => handleClick(e, href)}>{label}</a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

import { useEffect, useRef, useState } from 'react'
import { Lightbulb } from 'lucide-react'
import { glossary } from '../content/glossary.js'

// <Term> marks a technical word: dotted underline, definition on hover or keyboard focus.
// CSS-only, so it works in the pre-rendered HTML; the definition is also real text for
// screen readers and crawlers.
export function Term({ t, children }) {
    const def = glossary[t]
    if (!def) return children || t
    return (
        <span className="term" tabIndex={0}>
            {children || t}
            <span className="term-tip" role="tooltip"><strong>{t}</strong> {def}</span>
        </span>
    )
}

// A short, everyday explanation of a technical idea.
export function PlainWords({ children, title = 'In plain words' }) {
    return (
        <aside className="plain-words">
            <span className="plain-words-icon"><Lightbulb size={20} aria-hidden="true" /></span>
            <div>
                <h2>{title}</h2>
                <p>{children}</p>
            </div>
        </aside>
    )
}

// Sticky in-page navigation for long product pages. Marks the section being read,
// keeps that link scrolled into view, and fades an edge when more links are hidden.
export function SubNav({ items, label }) {
    const listRef = useRef(null)
    const [active, setActive] = useState(null)
    const [edges, setEdges] = useState({ start: false, end: false })
    const ids = items.map(([id]) => id).join(' ')

    useEffect(() => {
        const sections = ids.split(' ').map((id) => document.getElementById(id)).filter(Boolean)
        const onScroll = () => {
            const line = 140
            let current = null
            for (const s of sections) if (s.getBoundingClientRect().top <= line) current = s.id
            setActive(current)
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [ids])

    useEffect(() => {
        const ul = listRef.current
        if (!ul) return
        const onScroll = () => setEdges({
            start: ul.scrollLeft > 4,
            end: ul.scrollLeft + ul.clientWidth < ul.scrollWidth - 4,
        })
        onScroll()
        ul.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        return () => { ul.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
    }, [])

    useEffect(() => {
        const ul = listRef.current
        const link = active && ul?.querySelector(`a[href="#${active}"]`)
        if (link) ul.scrollTo({ left: link.offsetLeft - ul.clientWidth / 2 + link.offsetWidth / 2, behavior: 'smooth' })
    }, [active])

    const cls = `subnav${edges.start ? ' fade-start' : ''}${edges.end ? ' fade-end' : ''}`
    return (
        <nav className={cls} aria-label={label}>
            <div className="container">
                <ul ref={listRef}>
                    {items.map(([id, text]) => (
                        <li key={id}>
                            <a href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{text}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

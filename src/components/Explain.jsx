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

// Sticky in-page navigation for long product pages.
export function SubNav({ items, label }) {
    return (
        <nav className="subnav" aria-label={label}>
            <div className="container">
                <ul>
                    {items.map(([id, text]) => <li key={id}><a href={`#${id}`}>{text}</a></li>)}
                </ul>
            </div>
        </nav>
    )
}

// Small shared building blocks used across pages.
import { ArrowRight, Check, FileDown } from 'lucide-react'
import { DOWNLOADS } from '../site.js'
import { faqs } from '../content/faqs.js'
import { STATUS } from '../content/apps.js'

export function SectionHead({ eyebrow, title, children, center, as: H = 'h2' }) {
    return (
        <div className={`section-head${center ? ' center' : ''}`}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <H>{title}</H>
            {children && <p>{children}</p>}
        </div>
    )
}

export function PageHero({ crumbs, eyebrow, title, children, actions }) {
    return (
        <section className="page-hero">
            <div className="container">
                {crumbs && (
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        {crumbs.map((c, i) => (
                            <span key={c.label}>
                                {i > 0 && ' / '}
                                {c.href ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}
                            </span>
                        ))}
                    </nav>
                )}
                {eyebrow && <span className="eyebrow">{eyebrow}</span>}
                <h1>{title}</h1>
                <p className="lead">{children}</p>
                {actions && <div className="btn-row" style={{ marginTop: 28 }}>{actions}</div>}
            </div>
        </section>
    )
}

export function CheckList({ items }) {
    return (
        <ul className="check-list">
            {items.map((t) => (
                <li key={t}><Check size={16} aria-hidden="true" /><span>{t}</span></li>
            ))}
        </ul>
    )
}

export function StatusBadge({ status }) {
    const s = STATUS[status]
    return <span className={`badge ${s.tone}`}>{s.label}</span>
}

export function TextLink({ href, children }) {
    return <a className="text-link" href={href}>{children} <ArrowRight size={16} aria-hidden="true" /></a>
}

export function Downloads({ items = ['brochure', 'datasheet'] }) {
    return (
        <div className="downloads">
            {items.map((k) => (
                <a key={k} className="download" href={DOWNLOADS[k].href} download>
                    <FileDown size={18} aria-hidden="true" />
                    <span><strong>{DOWNLOADS[k].label}</strong><span>{DOWNLOADS[k].note}</span></span>
                </a>
            ))}
        </div>
    )
}

export function Faq({ items = faqs }) {
    return (
        <div className="faq">
            {items.map((f) => (
                <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                </details>
            ))}
        </div>
    )
}

export function CtaBand({ title = 'See it on your parts', text }) {
    return (
        <section className="section tight">
            <div className="container">
                <div className="cta-band">
                    <div>
                        <h2>{title}</h2>
                        <p>
                            {text ||
                                'Book a 30-minute demo, or tell us about the station that causes you the most trouble.'}
                        </p>
                    </div>
                    <div className="btn-row cta-actions">
                        <a href="/contact/" className="btn btn-primary btn-lg">Book a demo</a>
                        <TextLink href="/pilot/">Join the pilot programme</TextLink>
                    </div>
                </div>
            </div>
        </section>
    )
}

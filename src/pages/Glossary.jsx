import { useState } from 'react'
import { CtaBand, PageHero } from '../components/Blocks.jsx'
import { glossary, glossaryGroups } from '../content/glossary.js'

// Every term is in the pre-rendered HTML; the search box only hides what does not match.
export default function Glossary() {
    const [query, setQuery] = useState('')
    const q = query.trim().toLowerCase()
    const matches = (t) => !q || t.toLowerCase().includes(q) || glossary[t].toLowerCase().includes(q)
    const groups = glossaryGroups
        .map((g) => ({ ...g, terms: [...g.terms].sort((a, b) => a.localeCompare(b)).filter(matches) }))
        .filter((g) => g.terms.length)

    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Glossary' }]}
                eyebrow="Glossary"
                title="Factory terms, in plain language"
            >
                The technical words used on this site, explained simply. Useful whether you run the line, manage
                quality or sign off the budget.
            </PageHero>

            <section className="section">
                <div className="container">
                    <label className="sr-only" htmlFor="glossary-search">Search the glossary</label>
                    <input
                        id="glossary-search"
                        className="glossary-search"
                        type="search"
                        placeholder={`Search ${Object.keys(glossary).length} terms, e.g. OEE or PLC`}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {groups.map((g) => (
                        <div className="glossary-group" key={g.name}>
                            <h2>{g.name}</h2>
                            <dl className="glossary-list">
                                {g.terms.map((t) => (
                                    <div key={t} id={`term-${t.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                                        <dt>{t}</dt>
                                        <dd>{glossary[t]}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    ))}
                    {groups.length === 0 && (
                        <p className="glossary-empty">No term matches “{query}”. <a href="/contact/">Ask us</a> and we will explain it.</p>
                    )}
                </div>
            </section>

            <CtaBand title="Still have a question?" text="Ask us anything about inspection, machine data or quality. We answer in plain language." />
        </>
    )
}

import { CtaBand } from '../components/Blocks.jsx'
import { GUIDES_REVIEWED, findGuide, guides } from '../content/guides.js'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const [ry, rm, rd] = GUIDES_REVIEWED.split('-').map(Number)
const reviewed = `${rd} ${MONTHS[rm - 1]} ${ry}`

function Block({ b }) {
    if (b.h2) return <h2>{b.h2}</h2>
    if (b.p) return <p>{b.p}</p>
    if (b.note) return <p className="guide-note">{b.note}</p>
    if (b.ul) return <ul>{b.ul.map((t) => <li key={t}>{t}</li>)}</ul>
    if (b.ol) return <ol>{b.ol.map((t) => <li key={t}>{t}</li>)}</ol>
    if (b.table) {
        return (
            <div className="compare-wrap guide-table">
                <table className="compare">
                    <thead><tr>{b.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
                    <tbody>{b.table.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c}</td>))}</tr>)}</tbody>
                </table>
            </div>
        )
    }
    return null
}

export default function Guide({ slug }) {
    const g = findGuide(slug)
    const others = guides.filter((o) => o.slug !== slug)
    return (
        <>
            <article>
                <header className="page-hero">
                    <div className="container guide-container">
                        <nav className="breadcrumb" aria-label="Breadcrumb">
                            <a href="/">Home</a> / <a href="/guides/">Guides</a> / <span aria-current="page">{g.title}</span>
                        </nav>
                        <span className="eyebrow">Guide</span>
                        <h1>{g.title}</h1>
                        <p className="lead">{g.summary}</p>
                        <p className="guide-meta">{g.minutes} min read · Last reviewed {reviewed} · By the Gorad team</p>
                    </div>
                </header>

                <section className="section guide-body-section">
                    <div className="container guide-container">
                        <div className="guide-body">
                            {g.body.map((b, i) => <Block key={i} b={b} />)}
                        </div>
                        <aside className="guide-related" aria-label="Related">
                            <h2>Related</h2>
                            <ul>{g.related.map((r) => <li key={r.href}><a href={r.href}>{r.label}</a></li>)}</ul>
                        </aside>
                    </div>
                </section>
            </article>

            <section className="section tight">
                <div className="container guide-container">
                    <h2 className="other-industries-title">More guides</h2>
                    <ul className="other-industries">
                        {others.map((o) => <li key={o.slug}><a href={`/guides/${o.slug}/`}>{o.title}</a></li>)}
                    </ul>
                </div>
            </section>

            <CtaBand title="Want this applied to your line?" text="Tell us about the station or machine. We reply with an honest view of what would work." />
        </>
    )
}

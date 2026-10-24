import UseCaseIcon from '../components/UseCaseIcon.jsx'
import { CheckList, CtaBand, PageHero } from '../components/Blocks.jsx'
import { useCases } from '../content/useCases.js'

export default function UseCases() {
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Factory Platform', href: '/factory-platform/' }, { label: 'Use cases' }]}
                eyebrow="Example applications"
                title="What the Factory Platform is built to do"
                actions={<><a href="/contact/" className="btn btn-primary">Book a demo</a><a href="/pilot/" className="btn btn-secondary">Join the pilot programme</a></>}
            >
                Six typical applications, from a single inspection station to a closed quality loop. These are
                examples of what the platform is designed for, not customer stories. Real results will follow from
                the pilot programme.
            </PageHero>

            <section className="section tight">
                <div className="container">
                    <nav aria-label="Use cases on this page" className="uc-index">
                        {useCases.map((u) => (
                            <a key={u.id} href={`#${u.id}`} className="chip">{u.title}</a>
                        ))}
                    </nav>
                </div>
            </section>

            {useCases.map((u, i) => (
                <section key={u.id} id={u.id} className={`section uc${i % 2 === 0 ? ' alt' : ''}`} aria-labelledby={`${u.id}-title`}>
                    <div className="container uc-grid">
                        <div>
                            <div className="card-icon"><UseCaseIcon name={u.icon} /></div>
                            <span className="eyebrow">{u.industry}</span>
                            <h2 id={`${u.id}-title`}>{u.title}</h2>
                            <p className="lead" style={{ marginTop: 14 }}>{u.problem}</p>
                            <dl className="uc-facts">
                                <div><dt>Station</dt><dd>{u.station}</dd></div>
                                <div><dt>Apps</dt><dd>{u.apps.join(' · ')}</dd></div>
                            </dl>
                        </div>
                        <div className="card">
                            <h3 style={{ marginBottom: 12 }}>What is checked</h3>
                            <CheckList items={u.checks} />
                            <h3 style={{ margin: '20px 0 8px' }}>{u.onNgLabel || 'When a part fails'}</h3>
                            <p>{u.onNg}</p>
                            {u.note && <p className="uc-note">{u.note}</p>}
                        </div>
                    </div>
                </section>
            ))}

            <CtaBand title="Your station is not on this list?" text="Most stations are a mix of these. Tell us about the part and the problem, and we will tell you honestly whether Gorad fits." />
        </>
    )
}

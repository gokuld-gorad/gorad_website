import UseCaseIcon from '../components/UseCaseIcon.jsx'
import UseCaseArt from '../components/UseCaseArt.jsx'
import { CheckList, CtaBand, PageHero, SectionHead } from '../components/Blocks.jsx'
import { inspectionUseCases, platformUseCases } from '../content/useCases.js'

function UseCase({ u, alt }) {
    return (
        <section id={u.id} className={`section uc${alt ? ' alt' : ''}`} aria-labelledby={`${u.id}-title`}>
            <div className="container uc-grid">
                <div>
                    {u.group === 'inspection'
                        ? <div className="uc-art-frame"><UseCaseArt id={u.id} /></div>
                        : <div className="card-icon"><UseCaseIcon name={u.icon} /></div>}
                    <span className="eyebrow">{u.industry}</span>
                    <h3 className="uc-title" id={`${u.id}-title`}>{u.title}</h3>
                    <p className="lead" style={{ marginTop: 14 }}>{u.problem}</p>
                    <dl className="uc-facts">
                        <div><dt>Station</dt><dd>{u.station}</dd></div>
                        <div><dt>Apps</dt><dd>{u.apps.join(' · ')}</dd></div>
                    </dl>
                </div>
                <div className="card">
                    <h4 style={{ marginBottom: 12 }}>{u.checksLabel || 'What is checked'}</h4>
                    <CheckList items={u.checks} />
                    <h4 style={{ margin: '20px 0 8px' }}>{u.onNgLabel || 'When a part fails'}</h4>
                    <p>{u.onNg}</p>
                    {u.note && <p className="uc-note">{u.note}</p>}
                </div>
            </div>
        </section>
    )
}

function Group({ id, eyebrow, title, intro, items }) {
    return (
        <>
            <section className="section tight uc-group" id={id}>
                <div className="container">
                    <SectionHead eyebrow={eyebrow} title={title}>{intro}</SectionHead>
                    <nav aria-label={`${title}: jump to`} className="uc-index">
                        {items.map((u) => (
                            <a key={u.id} href={`#${u.id}`} className="chip">{u.title}</a>
                        ))}
                    </nav>
                </div>
            </section>
            {items.map((u, i) => <UseCase key={u.id} u={u} alt={i % 2 === 0} />)}
        </>
    )
}

export default function UseCases() {
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Factory Platform', href: '/factory-platform/' }, { label: 'Use cases' }]}
                eyebrow="Example applications"
                title="What the Factory Platform is built to do"
                actions={<><a href="/contact/" className="btn btn-primary">Book a demo</a><a href="/pilot/" className="btn btn-secondary">Join the pilot programme</a></>}
            >
                Typical applications, from a single inspection station to a closed quality loop. These are
                examples of what the platform is designed for, not customer stories. Real results will follow from
                the pilot programme.
            </PageHero>

            <Group
                id="inspection"
                eyebrow="Visual inspection"
                title="Inspection with Gorad Vision"
                intro="Defects, measurements, counts and variants, with one verdict per part sent to your PLC."
                items={inspectionUseCases}
            />
            <Group
                id="beyond-inspection"
                eyebrow="Across the platform"
                title="Beyond inspection"
                intro="Where inspection results and machine data meet the quality and production apps."
                items={platformUseCases}
            />

            <CtaBand title="Your part is not on this list?" text="Most stations are a variation of these. Tell us about the part and the defects, and we will tell you honestly whether Gorad fits." />
        </>
    )
}

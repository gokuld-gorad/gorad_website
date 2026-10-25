import { Linkedin, MapPin } from 'lucide-react'
import { CtaBand, PageHero, SectionHead, TextLink } from '../components/Blocks.jsx'
import { ADDRESS_LINES, COMPANY, FOUNDER } from '../site.js'
import { MISSION, VISION, engineeringPrinciples, principles } from '../content/company.js'

export default function About() {
    const first = FOUNDER.name.split(' ')[0]
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Company' }, { label: 'About Gorad' }]}
                eyebrow="About Gorad"
                title="Factory software you can trust on the line"
            >
                Gorad Pvt Ltd is an engineering company based in Bengaluru, India. We build AI and automation software
                for manufacturers around the world, starting with the Gorad Factory Platform.
            </PageHero>

            <section className="section">
                <div className="container vm-grid">
                    <div className="vm">
                        <span className="eyebrow">Our vision</span>
                        <p className="vm-statement">{VISION}</p>
                    </div>
                    <div className="vm">
                        <span className="eyebrow">Our mission</span>
                        <p className="vm-statement">{MISSION}</p>
                    </div>
                </div>
            </section>

            <section className="section alt">
                <div className="container split" style={{ alignItems: 'start' }}>
                    <SectionHead eyebrow="Why we exist" title="Inspection is only useful if you can trust it" />
                    <div className="stack">
                        <p className="lead" style={{ color: 'var(--text)' }}>
                            Gorad’s founder built and deployed more than 30 production vision inspection systems in
                            aerospace, automotive and heavy engineering. The lesson: the hard part is not the AI. It is the
                            software around it. Most vision systems are built as one-off projects for one machine, are hard
                            to change, keep no record of their decisions, and can fail silently and pass bad parts.
                        </p>
                        <p>
                            So we built the Factory Platform around that. Every fault leads to a rejected part, never a
                            silent pass. Every program is signed. Every change is recorded. And because inspection is only
                            one part of quality, the same platform carries machine data, process control, non-conformances,
                            OEE and traceability, so a plant does not have to stitch five tools together.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="Who is behind Gorad" title="Founded by a vision engineer" />
                    <div className="card founder">
                        <img className="founder-photo" src={FOUNDER.photo} alt={`Portrait of ${FOUNDER.name}`} width="144" height="144" loading="lazy" />
                        <div>
                            <h3>{FOUNDER.name}</h3>
                            <p className="founder-title">{FOUNDER.title}, {COMPANY}</p>
                            <p>
                                {first} has built and deployed more than 30 production vision inspection systems across
                                aerospace, automotive and heavy engineering. Gorad turns that experience into one platform:
                                fail-safe inspection, clean machine data and the quality apps around them, so plants no longer
                                need a vendor engineer for every change.
                            </p>
                            <a className="text-link" href={FOUNDER.linkedin} rel="noopener" target="_blank">
                                <Linkedin size={16} aria-hidden="true" /> {first} on LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHead eyebrow="Our philosophy" title="Five principles we work by" center />
                    <div className="principles">
                        {principles.map((p) => (
                            <div className="principle" key={p.name}>
                                <h3>{p.name}</h3>
                                <p>{p.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="How we build" title="What that means for the product">
                        The principles above are how we work with you. These are how we build the software.
                    </SectionHead>
                    <div className="mini-cards">
                        {engineeringPrinciples.map((p) => (
                            <div className="mini-card" key={p.title}>
                                <h3 style={{ marginTop: 0 }}>{p.title}</h3>
                                <p>{p.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="section-foot"><TextLink href="/how-we-work/">How a project with Gorad works</TextLink></div>
                </div>
            </section>

            <section className="section alt">
                <div className="container grid grid-2" style={{ gap: 40 }}>
                    <SectionHead eyebrow="Where we are" title="Built in Bengaluru, for plants everywhere">
                        Plants anywhere can work with us directly. The software runs inside your plant and fully offline, so
                        it fits wherever you are. For robot cells and larger lines, we work alongside your integrator.
                    </SectionHead>
                    <div className="card" style={{ display: 'flex', gap: 14, alignSelf: 'start' }}>
                        <div className="card-icon" style={{ flex: 'none' }}><MapPin size={18} aria-hidden="true" /></div>
                        <address style={{ fontStyle: 'normal', color: 'var(--text-muted)' }}>
                            <strong style={{ color: 'var(--text)' }}>{COMPANY}</strong><br />
                            {ADDRESS_LINES.map((l) => <span key={l}>{l}<br /></span>)}
                        </address>
                    </div>
                </div>
            </section>

            <CtaBand title="Talk to the people who built it" text="Book a demo, or tell us about the station that causes you the most trouble." />
        </>
    )
}

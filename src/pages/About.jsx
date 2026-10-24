import { MapPin } from 'lucide-react'
import { CtaBand, PageHero, SectionHead } from '../components/Blocks.jsx'
import { ADDRESS_LINES, COMPANY } from '../site.js'

const principles = [
    { title: 'Proof before claims', text: 'We say something works when it has been shown to work on real hardware, not before. Until then we say "early access", and we mean it.' },
    { title: 'Fail safe, always', text: 'When something goes wrong, the platform rejects the part or says it does not know. It never guesses in your favour.' },
    { title: 'One product for every plant', text: 'No customer-specific code paths. Differences between plants are configuration, so every customer gets the same tested product.' },
    { title: 'Your plant, your data', text: 'On-premise and air-gap ready by default. Nothing leaves your plant unless you decide it should.' },
    { title: 'Honest scope', text: 'We tell you where Gorad does not fit before you spend time on a pilot.' },
    { title: 'Build in order', text: 'Platform core first, then machine data and inspection, then the apps on top, so each layer stands on a proven one.' },
]

export default function About() {
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
                eyebrow="About Gorad"
                title="Factory software you can trust on the line"
            >
                Gorad Pvt Ltd is an engineering company in Bengaluru, India. We build the Gorad Factory Platform
                for discrete manufacturers in India and Europe.
            </PageHero>

            <section className="section">
                <div className="container split" style={{ alignItems: 'start' }}>
                    <div>
                        <SectionHead eyebrow="Why we exist" title="Inspection is only useful if you can trust it" />
                    </div>
                    <div className="stack">
                        <p className="lead" style={{ color: 'var(--text)' }}>
                            Gorad started by building visual inspection systems for production lines. The hard lesson was
                            that features are easy to ship. What plants actually need is proof that the system behaves
                            safely when things go wrong: a camera fails, a model is missing, the network drops.
                        </p>
                        <p>
                            So we built the Factory Platform around that. Every fault leads to a rejected part, never a
                            silent pass. Every program is signed. Every change is recorded. And because inspection is only
                            one part of quality, the same platform carries machine data, SPC, NCR/CAPA, OEE and
                            traceability, so a plant does not have to stitch five tools together.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHead eyebrow="How we work" title="Our principles" />
                    <div className="grid grid-3">
                        {principles.map((p) => (
                            <div className="card" key={p.title}>
                                <h3>{p.title}</h3>
                                <p>{p.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container grid grid-2" style={{ gap: 40 }}>
                    <div>
                        <SectionHead eyebrow="Where we are" title="Built in Bengaluru, for India and Europe">
                            Plants in India and Europe can work with us directly. For robot cells and larger lines, we work alongside your integrator.
                        </SectionHead>
                    </div>
                    <div className="card" style={{ display: 'flex', gap: 14 }}>
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

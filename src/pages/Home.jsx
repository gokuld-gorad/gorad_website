import { ArrowRight, Camera, Cpu, FileLock2, HardDrive, Unplug, Users } from 'lucide-react'
import LiveVerdictDemo from '../components/LiveVerdictDemo.jsx'
import CycleDiagram from '../components/CycleDiagram.jsx'
import PlatformLayers from '../components/PlatformLayers.jsx'
import Comparison from '../components/Comparison.jsx'
import UseCaseArt from '../components/UseCaseArt.jsx'
import { CheckList, CtaBand, Faq, SectionHead, TextLink } from '../components/Blocks.jsx'
import { inspectionUseCases } from '../content/useCases.js'
import { homeFaqs } from '../content/faqs.js'
import { pilotSteps } from '../content/pilot.js'
import { FOUNDER } from '../site.js'

const facts = ['Modbus TCP', 'Siemens S7', 'OPC UA', 'GenICam / GigE Vision', 'On-premise', 'Air-gap ready']

const plantFeatures = [
    { icon: HardDrive, title: 'On-premise', text: 'Ubuntu appliance, VM or your RHEL server. No cloud account.' },
    { icon: Unplug, title: 'Air-gap ready', text: 'Offline licence; programs, updates and backups by USB.' },
    { icon: FileLock2, title: 'Signed programs', text: 'Only signed, verified programs go live. Every change is audited.' },
    { icon: Users, title: 'Roles for every job', text: 'Operator to admin, enforced on the server.' },
    { icon: Cpu, title: 'Your PLCs', text: 'Modbus TCP, Siemens S7, OPC UA, handshake on the station.' },
    { icon: Camera, title: 'Industrial cameras', text: 'GenICam / GigE Vision and USB, one verdict per part.' },
]

export default function Home() {
    return (
        <>
            <section className="hero">
                <div className="container split hero-grid">
                    <div>
                        <span className="eyebrow">Gorad Factory Platform · Early access</span>
                        <h1>Factory software that fails safe.</h1>
                        <p className="lead">
                            Visual inspection, machine data and quality apps on one on-premise platform.
                            If a camera, a check or the software fails, the part is rejected, never quietly passed.
                        </p>
                        <div className="btn-row hero-actions">
                            <a href="/contact/" className="btn btn-primary btn-lg">Book a demo <ArrowRight size={18} aria-hidden="true" /></a>
                            <TextLink href="/pilot/">Join the pilot programme</TextLink>
                        </div>
                    </div>
                    <LiveVerdictDemo />
                </div>
            </section>

            <section className="trust-strip" aria-label="Who builds Gorad">
                <div className="container trust-inner">
                    <a className="trust-founder" href="/about/">
                        <img src={FOUNDER.photo} alt="" width="44" height="44" />
                        <span>
                            <strong>Built by an engineer behind 30+ production vision systems</strong>
                            <span>{FOUNDER.name} · aerospace, automotive and heavy engineering</span>
                        </span>
                    </a>
                    <ul className="trust-facts">
                        {facts.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                </div>
            </section>

            <section className="section" id="fail-closed">
                <div className="container">
                    <SectionHead eyebrow="Fail-closed by design" title="Never pass a part because the system was broken">
                        Most escapes do not come from a bad decision. They come from a camera that timed out, a check that
                        was skipped, a fault nobody noticed. In Gorad, a part is OK only when every expected view reports OK.
                        Errors, timeouts and missing views all mean NG (rejected), and the result is written down before the
                        PLC hears it.
                    </SectionHead>
                    <CycleDiagram />
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHead eyebrow="Use cases" title="What it is built to inspect">
                        Typical stations the platform is designed for. Examples, not customer stories.
                    </SectionHead>
                    <div className="grid grid-3 uc-cards">
                        {inspectionUseCases.map((u) => (
                            <a className="card uc-card" key={u.id} href={`/factory-platform/use-cases/#${u.id}`}>
                                <UseCaseArt id={u.id} />
                                <h3>{u.title}</h3>
                                <p>{u.short}</p>
                            </a>
                        ))}
                    </div>
                    <div className="section-foot"><TextLink href="/factory-platform/use-cases/">See every use case in detail</TextLink></div>
                </div>
            </section>

            <section className="section" id="why-gorad">
                <div className="container">
                    <SectionHead eyebrow="Why Gorad" title="How Gorad compares">
                        Plants usually choose between a smart camera, a custom vision project from an integrator, or separate tools for inspection and quality. Here is where Gorad differs.
                    </SectionHead>
                    <Comparison />
                </div>
            </section>

            <section className="section alt">
                <div className="container split" style={{ alignItems: 'start' }}>
                    <div>
                        <SectionHead eyebrow="One platform" title="Start with one app. Grow without replacing anything.">
                            A shared core handles users, licences, audit and plant structure. Gorad Vision and Gorad Connect
                            bring data in; quality and production apps plug in when you need them.
                        </SectionHead>
                        <CheckList items={[
                            'One login and one audit trail for every app',
                            'Apps share plant data through standard events',
                            'Add SPC, NCR/CAPA or OEE later on the same platform',
                        ]} />
                        <p className="fine-print">All apps are in early access: built and tested in software, and being proven with pilot plants.</p>
                        <div className="section-foot"><TextLink href="/factory-platform/">Explore the Factory Platform</TextLink></div>
                    </div>
                    <PlatformLayers />
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="Built for plants" title="Made for the shop floor and for plant IT" />
                    <div className="feature-strip">
                        {plantFeatures.map(({ icon: Icon, title, text }) => (
                            <div className="feature" key={title}>
                                <span className="icon-ring"><Icon size={18} aria-hidden="true" /></span>
                                <div>
                                    <h3>{title}</h3>
                                    <p>{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="section-foot"><TextLink href="/security/">Security & trust in detail</TextLink></div>
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHead eyebrow="Pilot programme" title="Prove it on your own line before you commit">
                        We are selecting a small number of plants worldwide. You see results on your own parts before you decide anything.
                    </SectionHead>
                    <ol className="steps">
                        {pilotSteps.map((s) => (
                            <li className="card" key={s.title}>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </li>
                        ))}
                    </ol>
                    <div className="btn-row section-foot">
                        <a href="/contact/?type=pilot" className="btn btn-primary">Apply for the pilot</a>
                        <TextLink href="/pilot/#fit">Is Gorad a fit for your station?</TextLink>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="Questions" title="Frequently asked questions" center />
                    <Faq items={homeFaqs} />
                </div>
            </section>

            <CtaBand />
        </>
    )
}

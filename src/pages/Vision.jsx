import { ArrowRight, ClipboardList, Eye, FileCheck2, HeartPulse, Layers, MonitorCheck, ScanSearch, Settings2, ShieldCheck, Workflow } from 'lucide-react'
import CycleDiagram from '../components/CycleDiagram.jsx'
import LiveVerdictDemo from '../components/LiveVerdictDemo.jsx'
import Roadmap from '../components/Roadmap.jsx'
import UseCaseArt from '../components/UseCaseArt.jsx'
import { CtaBand, Faq, PageHero, SectionHead, TextLink } from '../components/Blocks.jsx'
import { PlainWords, SubNav, Term } from '../components/Explain.jsx'
import { inspectionUseCases } from '../content/useCases.js'

const advantages = [
    { icon: Eye, title: 'Every part, every shift', text: 'The same standard at 3 a.m. as at 10 a.m. No fatigue, no shortcuts.' },
    { icon: ShieldCheck, title: 'A fault never passes a part', text: 'If a camera, a check or the software fails, the part is rejected.' },
    { icon: FileCheck2, title: 'Proof for every decision', text: 'Images, the result and the reason are kept for every part.' },
    { icon: Settings2, title: 'Change it without a vendor visit', text: 'Your engineers adjust inspections in the browser, with every version kept.' },
    { icon: Layers, title: 'Rules first, AI where it helps', text: 'Simple checks stay simple. AI is used where parts vary too much for rules.' },
    { icon: Workflow, title: 'Feeds the rest of the platform', text: 'Results flow into process control, non-conformances, OEE and traceability.' },
]

const rules = [
    { title: 'Every view must pass', text: 'A part is OK only if every expected camera view reports OK. Errors, timeouts and missing images all count as NG.' },
    { title: 'Written down before acting', text: 'The result is saved to the journal before the PLC hears it, so every decision has a record.' },
    { title: 'Line safety at every trigger', text: 'The station checks that it is safe to inspect on every single part, not only at start-up.' },
    { title: 'Only approved programs run', text: 'Programs are signed and checked, and must pass a golden-sample test before going live.' },
    { title: 'No silent defaults', text: 'A check that is not set up, or is missing its model, reports a fault. It never pretends the part is fine.' },
    { title: 'Licences never stop the line', text: 'Licence status never affects inspection or the signal to the PLC.' },
]

const screens = [
    { icon: MonitorCheck, title: 'Operator screen', text: 'A large OK or NG, the reason in plain words, and each camera view with the checked areas marked.' },
    { icon: ScanSearch, title: 'NG review', text: 'Engineers look through rejected images and false rejects, and improve the program from them.' },
    { icon: ClipboardList, title: 'Results and history', text: 'Find any part by its result and see what each camera saw at the time.' },
    { icon: HeartPulse, title: 'Station health', text: 'Safety and health banners on every screen, so a problem is never hidden.' },
]

const levels = [
    { n: 1, title: 'Manual', text: 'An operator loads the part and starts the inspection. Simple and quick to set up.' },
    { n: 2, title: 'Semi-automated', text: 'An operator loads the part; a sensor or the PLC starts the inspection automatically.' },
    { n: 3, title: 'Fully automated', text: 'Conveyors, stop-and-go lines or robots present the part, and the PLC runs everything.' },
]

const tools = [
    ['Presence and count', 'Classical', 'Is every component there, and how many are there?'],
    ['Measurement', 'Classical', 'Sizes, gaps and positions, checked against limits.'],
    ['Colour', 'Classical', 'Is it the right colour or shade?'],
    ['Barcodes and data matrix codes', 'Classical', 'Read the code and check it matches what is expected.'],
    ['Polarity and position', 'Classical', 'Is the part the right way round and in the right place?'],
    ['Anomaly detection', 'AI', 'Learns what a good part looks like and flags anything unusual.'],
    ['Object detection', 'AI', 'Finds and locates specific features or defects.'],
    ['OCR', 'AI', 'Reads printed or engraved text.'],
    ['Classification', 'AI', 'Sorts a part or defect into the right category.'],
    ['Segmentation', 'AI', 'Outlines the exact area of a defect, for example to measure how much is affected.'],
]

const visionFaqs = [
    { q: 'How many cameras can one station use?', a: 'From a single camera to multi-camera cells. In robot cells, the robot presents the part to the cameras at several positions. Whatever the number of views, there is one verdict per part.' },
    { q: 'Do we need lots of defect images to use AI?', a: 'Not always. Classical tools need none. Anomaly detection learns mostly from good parts, so you start with good samples and use defect examples to fine-tune.' },
    { q: 'What happens when we change to another product variant?', a: 'The PLC or a barcode selects the right inspection program, and a changeover screen guides the operator. Every program version is kept, so you can go back.' },
    { q: 'Can an operator change the inspection?', a: 'No. Operators run the station. Engineers change programs in the engineering screens, after confirming their password, and every change is recorded.' },
    { q: 'Which PLCs and cameras does it work with?', a: 'PLCs over Modbus TCP, Siemens S7 or OPC UA. GenICam / GigE Vision industrial cameras and USB cameras.' },
]

export default function Vision() {
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Gorad Factory Platform', href: '/factory-platform/' }, { label: 'Gorad Vision' }]}
                eyebrow="Gorad Vision · Early access"
                title="AI visual inspection that never passes a part by default"
                actions={<><a href="/contact/" className="btn btn-primary btn-lg">Book a demo</a><a href="/pilot/" className="btn btn-secondary">Join the pilot programme</a></>}
            >
                Cameras and AI check every part on your line. Good parts go on; anything doubtful is rejected, with the
                image and the reason saved, so you always know why.
            </PageHero>

            <SubNav label="On this page" items={[
                ['overview', 'Overview'], ['how-it-works', 'How it works'], ['use-cases', 'Use cases'], ['dashboards', 'Inspection dashboards'],
                ['deployment', 'Deployment models'], ['technology', 'Technology'], ['roadmap', 'Implementation roadmap'], ['faq', 'FAQ'],
            ]} />

            <section className="section" id="overview">
                <div className="container">
                    <PlainWords>
                        Imagine an inspector who looks at every part from every side, never gets tired, writes down every
                        decision, and puts a part aside the moment anything is unclear: a blurry photo, a broken camera, a
                        check that did not run. That is Gorad Vision.
                    </PlainWords>
                    <div style={{ marginTop: 64 }}>
                        <SectionHead eyebrow="Why Gorad Vision" title="What it does for you" />
                        <div className="advantages">
                            {advantages.map(({ icon: Icon, title, text }) => (
                                <div className="advantage" key={title}>
                                    <Icon size={22} aria-hidden="true" />
                                    <h3>{title}</h3>
                                    <p>{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section alt" id="how-it-works">
                <div className="container">
                    <SectionHead eyebrow="How it works" title="What happens when a camera fails">
                        What an inspection system does when it cannot see matters as much as how well it sees. Gorad Vision is <Term t="Fail-closed">fail-closed</Term>: when in doubt, the part is <Term t="NG">NG</Term>.
                    </SectionHead>
                    <CycleDiagram />
                    <div style={{ marginTop: 72 }}>
                        <SectionHead eyebrow="Rules it keeps" title="Safety written into the product">
                            Built in and covered by automated tests. Not settings anyone can switch off.
                        </SectionHead>
                        <div className="mini-cards">
                            {rules.map((r) => (
                                <div className="mini-card" key={r.title}>
                                    <h3 style={{ marginTop: 0 }}>{r.title}</h3>
                                    <p>{r.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" id="use-cases">
                <div className="container">
                    <SectionHead eyebrow="Use cases" title="What it is built to inspect">
                        A few examples. Defects, counts, sizes, text or codes: Gorad Vision can most likely check it.
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

            <section className="section alt" id="dashboards">
                <div className="container split" style={{ alignItems: 'center' }}>
                    <div>
                        <SectionHead eyebrow="Inspection dashboards" title="What your team sees">
                            Simple screens for operators, detailed ones for engineers, kept apart.
                        </SectionHead>
                        <div className="screen-list">
                            {screens.map(({ icon: Icon, title, text }) => (
                                <div className="screen-item" key={title}>
                                    <span className="icon-ring"><Icon size={18} aria-hidden="true" /></span>
                                    <div><h3>{title}</h3><p>{text}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <LiveVerdictDemo />
                </div>
            </section>

            <section className="section" id="deployment">
                <div className="container">
                    <SectionHead eyebrow="Deployment models" title="As automated as your line">
                        Start at today’s level of automation. The inspection works the same at every level.
                    </SectionHead>
                    <div className="levels">
                        {levels.map((l) => (
                            <div className="level" key={l.title}>
                                <div className="level-meter" aria-hidden="true">
                                    {[1, 2, 3].map((i) => <span key={i} className={i <= l.n ? 'on' : ''} />)}
                                </div>
                                <h3>{l.title}</h3>
                                <p>{l.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-2" style={{ marginTop: 20 }}>
                        <div className="mini-card">
                            <span className="tag">Architecture</span>
                            <h3>Standalone station</h3>
                            <p>One station on the machine network. Everything it needs runs on site, with no other connections.</p>
                        </div>
                        <div className="mini-card">
                            <span className="tag">Architecture</span>
                            <h3>Several stations, one server</h3>
                            <p>A site server manages programs, users and results for many stations in one place.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section alt" id="technology">
                <div className="container">
                    <SectionHead eyebrow="Technology" title="Rules first, AI where it helps">
                        One inspection program can combine <Term t="Classical tools">classical tools</Term> and AI. Classical
                        tools are fast and easy to explain; AI handles parts that vary too much for fixed rules.
                    </SectionHead>
                    <div className="compare-wrap" role="region" aria-label="Inspection tools" tabIndex={0}>
                        <table className="compare tool-table">
                            <thead><tr><th scope="col">Tool</th><th scope="col">Type</th><th scope="col">What it answers</th></tr></thead>
                            <tbody>
                                {tools.map(([name, kind, q]) => (
                                    <tr key={name}><td>{name}</td><td><span className="kind">{kind}</span></td><td>{q}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mini-cards" style={{ marginTop: 20 }}>
                        <div className="mini-card">
                            <span className="tag">PLC</span>
                            <h3>Talks to your machine</h3>
                            <p>A <Term t="Handshake">handshake</Term> over <Term t="Modbus TCP" />, <Term t="Siemens S7" /> or <Term t="OPC UA" />, run on the station itself, with a <Term t="Heartbeat">heartbeat</Term> so the PLC always knows the station is healthy.</p>
                        </div>
                        <div className="mini-card">
                            <span className="tag">Cameras</span>
                            <h3>Industrial or USB</h3>
                            <p><Term t="GenICam" /> / <Term t="GigE Vision" /> industrial cameras, and USB cameras for simpler stations.</p>
                        </div>
                        <div className="mini-card">
                            <span className="tag">Hardware</span>
                            <h3>An industrial PC</h3>
                            <p>On Ubuntu, with an NVIDIA GPU for stations that run heavier AI. The screens run in any modern browser.</p>
                        </div>
                    </div>
                    <div className="section-foot"><TextLink href="/partners/">The full PLC signal map, for integrators</TextLink></div>
                </div>
            </section>

            <section className="section" id="roadmap">
                <div className="container">
                    <SectionHead eyebrow="Implementation roadmap" title="From your part to a running station">
                        Seven steps, so you always know where your project stands.
                    </SectionHead>
                    <Roadmap />
                </div>
            </section>

            <section className="section alt" id="faq">
                <div className="container">
                    <SectionHead eyebrow="Questions" title="About Gorad Vision" center />
                    <Faq items={visionFaqs} />
                    <div className="section-foot" style={{ textAlign: 'center' }}>
                        <a className="text-link" href="/factory-platform/">Back to the Gorad Factory Platform <ArrowRight size={16} aria-hidden="true" /></a>
                    </div>
                </div>
            </section>

            <CtaBand title="Bring a part. We will show you the verdict." text="Tell us about the part and the defects you need to catch. We will show you how Gorad Vision would inspect it." />
        </>
    )
}

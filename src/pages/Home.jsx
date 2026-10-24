import { Camera, CircleSlash, Cpu, FileLock2, HardDrive, ShieldCheck, Unplug, Users, Check, Minus, Database } from 'lucide-react'
import LiveVerdictDemo from '../components/LiveVerdictDemo.jsx'
import CycleDiagram from '../components/CycleDiagram.jsx'
import PlatformLayers from '../components/PlatformLayers.jsx'
import Comparison from '../components/Comparison.jsx'
import UseCaseIcon from '../components/UseCaseIcon.jsx'
import { inspectionUseCases } from '../content/useCases.js'
import { CheckList, CtaBand, Faq, SectionHead, StatusBadge, TextLink } from '../components/Blocks.jsx'
import { appGroups } from '../content/apps.js'

const pains = [
    { icon: Users, title: 'Manual inspection drifts', text: 'People get tired, standards vary between shifts, and nothing records why a part was passed.' },
    { icon: CircleSlash, title: 'Vision projects are fragile', text: 'Every change needs the original integrator, and a fault can quietly pass parts that should have been rejected.' },
    { icon: Unplug, title: 'Machine data is stuck in the PLC', text: 'Counts, states and alarms stay on the machine, so OEE and quality reports are built by hand.' },
]

const plantFeatures = [
    { icon: HardDrive, title: 'On-premise', text: 'Runs on an Ubuntu appliance, a VM or your RHEL server. No cloud account needed.' },
    { icon: Unplug, title: 'Air-gap ready', text: 'Offline licence, and programs, updates and backups by USB from the web interface.' },
    { icon: FileLock2, title: 'Signed programs', text: 'Only signed, verified inspection programs can go live, and every change is audited.' },
    { icon: Users, title: 'Roles for every job', text: 'Operator, supervisor, engineer, quality, maintenance and admin, enforced on the server.' },
    { icon: Cpu, title: 'Your PLCs', text: 'Modbus TCP, Siemens S7 and OPC UA. The PLC handshake runs on the station itself.' },
    { icon: Camera, title: 'Industrial cameras', text: 'GenICam / GigE Vision and USB cameras, with one verdict per part across all views.' },
]

export default function Home() {
    return (
        <>
            <section className="hero">
                <div className="container split">
                    <div>
                        <span className="eyebrow">Gorad Factory Platform · Early access</span>
                        <h1>Factory software that fails safe.</h1>
                        <p className="lead">
                            Visual inspection, machine data and quality apps on one on-premise platform.
                            If a camera, a check or the software fails, the part is rejected, never quietly passed.
                        </p>
                        <div className="btn-row">
                            <a href="/contact/" className="btn btn-primary">Book a demo</a>
                            <a href="/pilot/" className="btn btn-secondary">Join the pilot programme</a>
                        </div>
                        <p className="hero-note"><ShieldCheck size={16} aria-hidden="true" /> Built in Bengaluru for plants around the world</p>
                    </div>
                    <LiveVerdictDemo />
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHead eyebrow="The problem" title="Quality depends on things you cannot see">
                        Most escapes do not come from a bad decision. They come from a step that was skipped, a fault nobody noticed, or data that never left the machine.
                    </SectionHead>
                    <div className="grid grid-3">
                        {pains.map(({ icon: Icon, title, text }) => (
                            <div className="card" key={title}>
                                <div className="card-icon"><Icon size={20} aria-hidden="true" /></div>
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container split" style={{ alignItems: 'start' }}>
                    <div>
                        <SectionHead eyebrow="The platform" title="One platform. Start with one app.">
                            A shared core handles users, licences, audit and plant structure. Gorad Vision and Gorad Connect sit on top, and quality and production apps plug in when you need them.
                        </SectionHead>
                        <CheckList items={[
                            'One login and one audit trail for every app',
                            'Apps share plant data through standard events, not each other’s databases',
                            'Add SPC, NCR/CAPA or OEE later without replacing anything',
                        ]} />
                        <div style={{ marginTop: 24 }}><TextLink href="/factory-platform/">Explore the Factory Platform</TextLink></div>
                    </div>
                    <PlatformLayers />
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHead eyebrow="Where to start" title="Two ways in" center />
                    <div className="grid grid-2">
                        <a className="card door" href="/factory-platform/vision/">
                            <div className="card-icon"><Camera size={20} aria-hidden="true" /></div>
                            <h3>Start with inspection</h3>
                            <p>Gorad Vision inspects every part across one or many cameras, combines rule-based and AI checks, and sends OK or NG to your PLC.</p>
                            <span className="text-link">Gorad Vision →</span>
                        </a>
                        <a className="card door" href="/factory-platform/connect/">
                            <div className="card-icon"><Database size={20} aria-hidden="true" /></div>
                            <h3>Start with machine data</h3>
                            <p>Gorad Connect reads your PLCs and meters and publishes clean events for OEE, SPC and your own systems, even through network drops.</p>
                            <span className="text-link">Gorad Connect →</span>
                        </a>
                    </div>

                    <div style={{ marginTop: 64 }}>
                        <SectionHead eyebrow="Example applications" title="What it is built for">
                            Typical stations and problems the platform is designed for. Examples, not customer stories.
                        </SectionHead>
                        <div className="grid grid-3 uc-cards">
                            {inspectionUseCases.map((u) => (
                                <a className="card" key={u.id} href={`/factory-platform/use-cases/#${u.id}`}>
                                    <div className="card-icon" style={{ marginBottom: 4 }}><UseCaseIcon name={u.icon} /></div>
                                    <h3>{u.title}</h3>
                                    <p>{u.short}</p>
                                </a>
                            ))}
                        </div>
                        <div style={{ marginTop: 24 }}><TextLink href="/factory-platform/use-cases/">See all use cases in detail</TextLink></div>
                    </div>
                </div>
            </section>

            <section className="section" id="fail-closed">
                <div className="container">
                    <SectionHead eyebrow="Fail-closed by design" title="Never pass a part because the system was broken">
                        A part is OK only when every expected view reports OK. Errors, timeouts and missing views all mean NG, and the result is written down before the PLC hears it.
                    </SectionHead>
                    <CycleDiagram />
                </div>
            </section>

            <section className="section alt" id="why-gorad">
                <div className="container">
                    <SectionHead eyebrow="Why Gorad" title="How Gorad compares">
                        Plants usually choose between a smart camera, a custom vision project from an integrator, or separate tools for inspection and quality. Here is where Gorad differs.
                    </SectionHead>
                    <Comparison />
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="Apps" title="Grow into quality and production">
                        Each app works on its own and shares the platform core. All apps are in early access while we run pilots.
                    </SectionHead>
                    <div className="grid grid-3">
                        {appGroups.map((g) => (
                            <div className="card" key={g.name}>
                                <h3>{g.name}</h3>
                                <ul className="check-list" style={{ marginTop: 12 }}>
                                    {g.apps.map((a) => (
                                        <li key={a.name} style={{ justifyContent: 'space-between' }}>
                                            {a.slug
                                                ? <a href={`/factory-platform/${a.slug}/`} style={{ color: 'var(--text)' }}>{a.name}</a>
                                                : <span style={{ color: 'var(--text)' }}>{a.name}</span>}
                                            <StatusBadge status={a.status} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 24 }}><TextLink href="/factory-platform/#apps">What each app does</TextLink></div>
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHead eyebrow="Built for plants" title="Made for the shop floor and for plant IT">
                        Plant IT has to approve new software. <a href="/security/">See how the platform handles security</a>.
                    </SectionHead>
                    <div className="grid grid-3">
                        {plantFeatures.map(({ icon: Icon, title, text }) => (
                            <div className="card" key={title}>
                                <div className="card-icon"><Icon size={20} aria-hidden="true" /></div>
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="Honest fit" title="Where Gorad fits, and where it does not">
                        We would rather tell you now than after a pilot.
                    </SectionHead>
                    <div className="grid grid-2">
                        <div className="card fit yes">
                            <h3><Check size={20} aria-hidden="true" /> A good fit</h3>
                            <CheckList items={[
                                'Discrete parts inspected at a station, one or many cameras',
                                'Stations that mix rule-based checks with AI (anomaly, OCR, detection)',
                                'Plants that need signed programs, audit trails or air-gapped updates',
                                'Plants that want inspection and machine data to feed SPC, NCR or OEE',
                            ]} />
                        </div>
                        <div className="card fit no">
                            <h3><Minus size={20} aria-hidden="true" /> Not a fit today</h3>
                            <ul>
                                <li>A simple single-camera rule check that a smart camera already does well</li>
                                <li>Full solder-joint AOI, 3D inspection or very high-speed line-scan web inspection</li>
                                <li>Replacing your MES, ERP or WMS</li>
                                <li>A native Windows server install (the web interface works on Windows PCs)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHead eyebrow="Questions" title="Frequently asked questions" center />
                    <Faq />
                </div>
            </section>

            <CtaBand />
        </>
    )
}

import { ArrowRight, Cable, ScanEye } from 'lucide-react'
import PlatformLayers from '../components/PlatformLayers.jsx'
import Comparison from '../components/Comparison.jsx'
import { CheckList, CtaBand, Faq, PageHero, SectionHead, StatusBadge } from '../components/Blocks.jsx'
import { PlainWords, SubNav } from '../components/Explain.jsx'
import { appGroups } from '../content/apps.js'
import { homeFaqs } from '../content/faqs.js'
import { appIndex } from '../content/appIndex.js'
import SiteImage, { imageNames } from '../components/SiteImage.jsx'

const coreFeatures = [
    { title: 'One login, many roles', text: 'Operator, supervisor, engineer, quality, maintenance and admin, checked on the server for every request.' },
    { title: 'Offline licensing', text: 'Licences activate without the internet. An expired licence never stops inspection or the machine signal.' },
    { title: 'Your plant, mapped once', text: 'Site, area, line and station are set up once and shared by every app.' },
    { title: 'Audit trail', text: 'A permanent record of every configuration change: who changed what, and when.' },
    { title: 'Shared events', text: 'Apps exchange standard events, so adding an app never means re-wiring the others.' },
    { title: 'Updates and backup', text: 'Updates, backups and restores from the browser. No command line needed.' },
]

const bundles = [
    { name: 'Quality', apps: 'Vision + SPC + NCR/CAPA' },
    { name: 'Production', apps: 'Line Performance + Tool Life + Maintenance' },
    { name: 'Compliance', apps: 'Traceability + NCR/CAPA + SPC + Calibration + Skills' },
    { name: 'Machine builder', apps: 'Connect + Line Performance + Maintenance' },
]

export default function FactoryPlatform() {
    // Strongest screens first; any others follow in name order.
    const order = ['spc', 'ncr-capa', 'calibration-msa', 'maintenance']
    const rank = (s) => (order.includes(s) ? order.indexOf(s) : order.length)
    const screens = imageNames('screens').sort((a, b) => rank(a) - rank(b) || a.localeCompare(b))
    const appName = (slug) => appIndex.find((a) => a.slug === slug)?.name || slug
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Platforms' }, { label: 'Gorad Factory Platform' }]}
                eyebrow="Platform · Early access"
                title="Gorad Factory Platform"
                actions={<><a href="/contact/" className="btn btn-primary btn-lg">Book a demo</a><a href="/pilot/" className="btn btn-secondary">Join the pilot programme</a></>}
            >
                Inspection, machine data and quality apps on one platform that runs inside your plant. Start with the
                app you need most, and add others later without replacing anything.
            </PageHero>

            <SubNav label="On this page" items={[['overview', 'Overview'], ['ways-in', 'Vision & Connect'], ['apps', 'Apps'], ['core', 'Platform Core'], ['why-gorad', 'Why Gorad'], ['faq', 'FAQ']]} />

            <section className="section" id="overview">
                <div className="container">
                    <PlainWords>
                        Think of it like a smartphone for your factory. The platform is the phone: one login, one set of
                        settings, one place where everything is recorded. The apps are what you install on it: inspection,
                        machine data, quality control, maintenance. You only install what you need.
                    </PlainWords>
                    <div className="split" style={{ alignItems: 'start', marginTop: 56 }}>
                        <div>
                            <SectionHead eyebrow="How it fits together" title="Three layers, one system">
                                The core is shared. Vision and Connect bring data in from cameras and machines. Apps turn that data into decisions.
                            </SectionHead>
                            <CheckList items={[
                                'One web application: simple screens for operators, detailed screens for engineers',
                                'Each app keeps its own data and shares results as standard events',
                                'Runs on its own on the machine network, or on a site server for several lines',
                            ]} />
                        </div>
                        <PlatformLayers />
                    </div>
                </div>
            </section>

            <section className="section alt" id="ways-in">
                <div className="container">
                    <SectionHead eyebrow="Where data comes from" title="Two ways in">
                        Most plants start with one of these. Both feed the apps.
                    </SectionHead>
                    <div className="pillars pillars-2">
                        <a className="pillar" href="/factory-platform/vision/">
                            <span className="icon-ring"><ScanEye size={20} aria-hidden="true" /></span>
                            <span className="pillar-word">Gorad Vision</span>
                            <h3>AI visual inspection</h3>
                            <p>Cameras check every part, and anything doubtful is rejected. The result goes to your machine’s controller (PLC) with a record of why.</p>
                            <span className="text-link">How Vision works <ArrowRight size={16} aria-hidden="true" /></span>
                        </a>
                        <a className="pillar" href="/factory-platform/connect/">
                            <span className="icon-ring"><Cable size={20} aria-hidden="true" /></span>
                            <span className="pillar-word">Gorad Connect</span>
                            <h3>Machine data</h3>
                            <p>Reads counts, states and alarms from your PLCs and meters, and keeps every reading safe when the network drops.</p>
                            <span className="text-link">How Connect works <ArrowRight size={16} aria-hidden="true" /></span>
                        </a>
                    </div>
                </div>
            </section>

            <section className="section" id="apps">
                <div className="container">
                    <SectionHead eyebrow="Apps" title="Apps on the platform">
                        Each app solves one job and works on its own. All are in early access: built and tested in software, and being proven with pilot plants.
                    </SectionHead>
                    {appGroups.map((g) => (
                        <div key={g.name} className="app-group">
                            <h3 className="app-group-title">{g.name}</h3>
                            <div className="grid grid-3">
                                {g.apps.map((a) => {
                                    const body = (
                                        <>
                                            <div className="app-card-head">
                                                <h4>{a.name}</h4>
                                                {a.status !== 'early' && <StatusBadge status={a.status} />}
                                            </div>
                                            <p>{a.text}</p>
                                            {a.slug && <span className="text-link">Learn more <ArrowRight size={16} aria-hidden="true" /></span>}
                                        </>
                                    )
                                    return a.slug
                                        ? <a className="card app-card" key={a.name} href={`/factory-platform/${a.slug}/`}>{body}</a>
                                        : <div className="card app-card" key={a.name}>{body}</div>
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {screens.length > 0 && (
                <section className="section tight" id="screens">
                    <div className="container">
                        <SectionHead eyebrow="Real screens" title="What the apps look like">
                            Screenshots from the running platform, filled with demo data. No mock-ups.
                        </SectionHead>
                        <div className="grid grid-2">
                            {screens.map((s) => (
                                <a key={s} className="screen-card" href={`/factory-platform/${s}/`}>
                                    <SiteImage group="screens" name={s} variant="card" caption={null} alt={`${appName(s)} screen with demo data`} />
                                    <span>{appName(s)}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="section alt" id="core">
                <div className="container">
                    <SectionHead eyebrow="Platform Core" title="What every app shares">
                        One login, one record of changes, one way of doing things. Adding an app never adds another system to learn.
                    </SectionHead>
                    <div className="mini-cards">
                        {coreFeatures.map((f) => (
                            <div className="mini-card" key={f.title}>
                                <h3 style={{ marginTop: 0 }}>{f.title}</h3>
                                <p>{f.text}</p>
                            </div>
                        ))}
                    </div>
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
                <div className="container">
                    <SectionHead eyebrow="Typical combinations" title="Apps that work well together">
                        Each app stands alone. These are common starting combinations, not fixed packages.
                    </SectionHead>
                    <div className="grid grid-4">
                        {bundles.map((b) => (
                            <div className="card" key={b.name}>
                                <h3>{b.name}</h3>
                                <p>{b.apps}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" id="faq">
                <div className="container">
                    <SectionHead eyebrow="Questions" title="Frequently asked questions" center />
                    <Faq items={homeFaqs} />
                </div>
            </section>

            <CtaBand title="Start with the app that hurts most" />
        </>
    )
}

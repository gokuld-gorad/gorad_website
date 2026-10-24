import PlatformLayers from '../components/PlatformLayers.jsx'
import { CheckList, CtaBand, PageHero, SectionHead, StatusBadge, TextLink } from '../components/Blocks.jsx'
import { appGroups } from '../content/apps.js'

const coreFeatures = [
    { title: 'Identity and roles', text: 'Users, roles, sessions and API keys. Operator, supervisor, engineer, quality, maintenance and admin roles are enforced on the server.' },
    { title: 'Offline licensing', text: 'Licences activate without the internet and list the apps a site is entitled to. An expired licence never stops inspection or the PLC output.' },
    { title: 'Plant structure', text: 'Site, area, line and station master data shared by every app.' },
    { title: 'Audit trail', text: 'An append-only record of configuration changes: who changed what, and when.' },
    { title: 'Event bus', text: 'Apps publish and consume standard events instead of reading each other’s databases.' },
    { title: 'Updates and backup', text: 'Updates, backups, restores and support bundles from the web interface, with no shell access needed.' },
]

const bundles = [
    { name: 'Quality', apps: 'Vision + SPC + NCR/CAPA' },
    { name: 'Production', apps: 'Line Performance + Tool Life + Maintenance' },
    { name: 'Compliance', apps: 'Traceability + NCR/CAPA + SPC + Calibration + Skills' },
    { name: 'Machine builder', apps: 'Connect + Line Performance + Maintenance' },
]

export default function FactoryPlatform() {
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Factory Platform' }]}
                eyebrow="Early access"
                title="Gorad Factory Platform"
                actions={<><a href="/contact/" className="btn btn-primary">Book a demo</a><a href="/pilot/" className="btn btn-secondary">Join the pilot programme</a></>}
            >
                Composable manufacturing software. Buy one app or several: they all share one login, one licence,
                one web application and one event backbone. Start with inspection or machine data and grow into
                quality and production without replacing the stack.
            </PageHero>

            <section className="section">
                <div className="container split" style={{ alignItems: 'start' }}>
                    <div>
                        <SectionHead eyebrow="How it fits together" title="Three layers">
                            The core is shared. Vision and Connect bring data in from cameras and machines. Apps turn that data into decisions.
                        </SectionHead>
                        <CheckList items={[
                            'One web application: LIVE screens for operators, SETUP screens for engineers',
                            'Each app owns its data; apps talk through events and public APIs',
                            'Runs standalone on the machine network or on a connected site server',
                        ]} />
                    </div>
                    <PlatformLayers />
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHead eyebrow="Platform Core" title="The part every app shares">
                        One plant identity and one audit story, so adding an app does not add another login or another vocabulary.
                    </SectionHead>
                    <div className="grid grid-3">
                        {coreFeatures.map((f) => (
                            <div className="card" key={f.title}>
                                <h3>{f.title}</h3>
                                <p>{f.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="Bring data in" title="Vision and Connect" />
                    <div className="grid grid-2">
                        <div className="card door">
                            <h3>Gorad Vision</h3>
                            <p>Fail-closed visual inspection. Multi-camera stations, classical and AI tools in one signed program, a journal before every PLC output.</p>
                            <TextLink href="/factory-platform/vision/">How Vision works</TextLink>
                        </div>
                        <div className="card door">
                            <h3>Gorad Connect</h3>
                            <p>A PLC and meter gateway. Modbus TCP, Siemens S7 and OPC UA tags become standard events, kept safe through network drops.</p>
                            <TextLink href="/factory-platform/connect/">How Connect works</TextLink>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section alt" id="apps">
                <div className="container">
                    <SectionHead eyebrow="Apps" title="Apps on the platform">
                        Every app below is built and tested in software. They are in early access: we are proving them on real stations with pilot plants before general release.
                    </SectionHead>
                    {appGroups.map((g) => (
                        <div key={g.name} style={{ marginBottom: 32 }}>
                            <h3 style={{ marginBottom: 14 }}>{g.name}</h3>
                            <div className="grid grid-3">
                                {g.apps.map((a) => {
                                    const body = (
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'start', marginBottom: 8 }}>
                                                <h4>{a.name}</h4>
                                                <StatusBadge status={a.status} />
                                            </div>
                                            <p>{a.text}</p>
                                            {a.slug && <span className="text-link" style={{ marginTop: 10 }}>Learn more →</span>}
                                        </>
                                    )
                                    return a.slug
                                        ? <a className="card" key={a.name} href={`/factory-platform/${a.slug}/`}>{body}</a>
                                        : <div className="card" key={a.name}>{body}</div>
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section">
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

            <CtaBand title="Start with the app that hurts most" />
        </>
    )
}

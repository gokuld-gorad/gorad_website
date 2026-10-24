import CycleDiagram from '../components/CycleDiagram.jsx'
import LiveVerdictDemo from '../components/LiveVerdictDemo.jsx'
import { CheckList, CtaBand, PageHero, SectionHead, TextLink } from '../components/Blocks.jsx'

const different = [
    { title: 'Fail-closed by design', text: 'Any error, timeout or missing view is NG. Never a silent pass.' },
    { title: 'Signed programs', text: 'Only signed, verified programs go live, after a golden-sample check.' },
    { title: 'Classical + AI together', text: 'Rule-based tools and AI models in one program, one verdict.' },
    { title: 'Part of a platform', text: 'NG results feed SPC, NCR/CAPA and OEE on the same platform.' },
]

const rules = [
    { title: 'Every view must pass', text: 'A cycle is OK only if every expected view reports OK. Error, timeout, missing, empty or unknown results are NG.' },
    { title: 'Journal before output', text: 'The verdict is written to a durable journal before the PLC output, so every decision has a record.' },
    { title: 'Line safety at every trigger', text: 'The station checks that the line is safe on every trigger, not only when a batch starts.' },
    { title: 'Only signed programs', text: 'Programs are signed and verified before they can go live, and a golden-sample check must pass first.' },
    { title: 'No silent fallbacks', text: 'A tool that is unconfigured or missing its model returns a fault, never a default OK.' },
    { title: 'Licences never stop the line', text: 'Licence state does not affect inspection or the PLC output, only configuration after a grace period.' },
]

const stations = [
    { title: 'Static station', text: 'A few cameras, one position, one verdict per part.' },
    { title: 'Stop-and-go', text: 'Conveyors or boards with multiple cameras, variants and barcode-driven program selection.' },
    { title: 'Robot cell', text: 'Many cameras and multiple positions, combined into one verdict for the part.' },
]

export default function Vision() {
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Factory Platform', href: '/factory-platform/' }, { label: 'Vision' }]}
                eyebrow="Gorad Vision · Early access"
                title="Visual inspection that never passes a part by default"
                actions={<><a href="/contact/" className="btn btn-primary">Book a demo</a><a href="/pilot/" className="btn btn-secondary">Join the pilot programme</a></>}
            >
                Multi-camera inspection with a PLC handshake, signed programs and a journal you can trust.
                Classical and AI tools in one program, a clear verdict for the operator, and a reason for every NG.
            </PageHero>

            <section className="section tight alt">
                <div className="container">
                    <h2 className="sr-only">What makes Gorad Vision different</h2>
                    <div className="grid grid-4">
                        {different.map((d) => (
                            <div className="card" key={d.title}>
                                <h3>{d.title}</h3>
                                <p>{d.text}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 20 }}><TextLink href="/#why-gorad">Compare Gorad with smart cameras and custom projects</TextLink></div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="The cycle" title="What happens when a camera fails">
                        This is the moment most inspection systems are never tested on. Gorad Vision is built around it.
                    </SectionHead>
                    <CycleDiagram />
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHead eyebrow="Safety rules" title="Fail-closed, written into the product">
                        These rules are part of the product and covered by automated tests, not settings someone can switch off.
                    </SectionHead>
                    <div className="grid grid-3">
                        {rules.map((r) => (
                            <div className="card" key={r.title}>
                                <h3>{r.title}</h3>
                                <p>{r.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container split">
                    <div>
                        <SectionHead eyebrow="Tools" title="Classical first, AI where it helps">
                            One program can combine rule-based tools and AI models. Use classical tools wherever they are enough, and AI where variation makes rules brittle.
                        </SectionHead>
                        <div className="grid grid-2">
                            <div>
                                <h3 style={{ marginBottom: 10 }}>Classical</h3>
                                <CheckList items={['Presence and count', 'Measurement', 'Colour', 'Barcodes and data matrix codes', 'Polarity and position']} />
                            </div>
                            <div>
                                <h3 style={{ marginBottom: 10 }}>AI</h3>
                                <CheckList items={['Anomaly detection', 'Object detection', 'OCR', 'Classification', 'Segmentation']} />
                            </div>
                        </div>
                    </div>
                    <LiveVerdictDemo />
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHead eyebrow="Station types" title="From one camera to a robot cell">
                        Built for multi-camera stations. One verdict per part, however many views it takes.
                    </SectionHead>
                    <div className="grid grid-3">
                        {stations.map((s) => (
                            <div className="card" key={s.title}>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="grid grid-2">
                        <div>
                            <SectionHead eyebrow="For the operator" title="LIVE: the verdict and the reason" />
                            <CheckList items={[
                                'A large OK / NG verdict with the reason in plain language',
                                'Camera views with the judged regions marked',
                                'Safety and health banners on every screen',
                                'Batch start and end, and a changeover wizard',
                                'Engineering screens never appear on the operator kiosk',
                            ]} />
                        </div>
                        <div>
                            <SectionHead eyebrow="For the engineer" title="SETUP: commission, change, review" />
                            <CheckList items={[
                                'Commission cameras, views and the PLC signal map',
                                'Build programs, test them on golden samples, and release them signed',
                                'Collect images, label them and train models',
                                'Review NG images and false rejects',
                                'Release programs over the network or by USB',
                            ]} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHead eyebrow="Integration" title="Cameras and PLCs" />
                    <div className="grid grid-3">
                        <div className="card">
                            <h3>PLC handshake</h3>
                            <p>Modbus TCP, Siemens S7 or OPC UA. The handshake runs on the station itself and never through a gateway on the safety path.</p>
                        </div>
                        <div className="card">
                            <h3>Cameras</h3>
                            <p>GenICam / GigE Vision industrial cameras and USB cameras.</p>
                        </div>
                        <div className="card">
                            <h3>Hardware</h3>
                            <p>An industrial PC on Ubuntu, with an NVIDIA GPU for stations that run heavier AI tools. The web interface runs in any modern browser.</p>
                        </div>
                    </div>
                </div>
            </section>

            <CtaBand title="Bring a part. We will show you the verdict." text="Tell us about the part and the defects you need to catch. We will show you how Gorad Vision would inspect it." />
        </>
    )
}

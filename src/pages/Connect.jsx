import { ArrowRight, Cable, ClipboardX, Database, Lock, MousePointerClick, Shuffle } from 'lucide-react'
import StoreForwardDiagram from '../components/StoreForwardDiagram.jsx'
import { CheckList, CtaBand, Faq, PageHero, SectionHead } from '../components/Blocks.jsx'
import { PlainWords, SubNav, Term } from '../components/Explain.jsx'
import { appIndex } from '../content/appIndex.js'

const advantages = [
    { icon: ClipboardX, title: 'No more manual logging', text: 'Counts, stops and alarms are read straight from the machine, as they happen.' },
    { icon: Database, title: 'Nothing lost when the network drops', text: 'Readings are kept on the gateway and sent once the network is back.' },
    { icon: Lock, title: 'Safe to connect', text: 'Read-only by default, and never part of the inspection safety path.' },
    { icon: Shuffle, title: 'Map once, use everywhere', text: 'Raw PLC values become standard events that every app and your own systems understand.' },
    { icon: Cable, title: 'Works with machines you have', text: 'Modbus TCP, Siemens S7 and OPC UA, so no new controllers are needed.' },
    { icon: MousePointerClick, title: 'Set up in the browser', text: 'Find tags, map them and check live values on screen. No programming.' },
]

const steps = [
    { title: 'Read', text: 'The gateway reads tags from your PLCs and meters on a schedule you set.' },
    { title: 'Translate', text: 'Raw values become standard events: a machine state, a part count, a measurement, an alarm.' },
    { title: 'Keep', text: 'Every reading goes into a local buffer first, so a network drop loses nothing.' },
    { title: 'Deliver', text: 'Events go to the apps and to your own systems, in the same clean format.' },
]

const events = [
    { name: 'machine.state', text: 'Running, idle, stopped or faulted, with the time it changed.' },
    { name: 'production.count', text: 'Good and total part counts for OEE and shift reports.' },
    { name: 'measurement', text: 'Process values for SPC and trend charts.' },
    { name: 'alarm', text: 'Machine alarms with their state, for Andon and maintenance.' },
]

const rules = [
    { title: 'Read-only by default', text: 'Writing a value back to a machine must be configured on purpose, and every write is audited.' },
    { title: 'Never on the safety path', text: 'Connect is never part of the inspection result sent to the PLC. That runs on the Vision station itself.' },
    { title: 'Buffer first', text: 'Every reading is stored locally before it is sent, so a network drop cannot lose it.' },
    { title: 'Nothing silently dropped', text: 'Events that still cannot be delivered are kept as dead letters for review.' },
    { title: 'Bad readings say so', text: 'A bad or stale reading is sent with its quality marked, never as a good value.' },
]

const worksWith = [
    ['line-performance', 'States and counts become OEE, downtime and Andon.'],
    ['spc', 'Process values become control charts.'],
    ['maintenance', 'A fault signal can open a work order.'],
    ['tool-life', 'Stroke counts follow each tool and die.'],
    ['traceability', 'Process values are linked to each part.'],
]

const connectFaqs = [
    { q: 'Will Connect change anything on our PLC?', a: 'No. It only reads by default. Writing a value back has to be set up on purpose for a specific tag, and every write is recorded.' },
    { q: 'What happens when the network goes down?', a: 'Readings are kept on the gateway and sent when the network returns. Anything that still cannot be delivered is kept for review, not thrown away.' },
    { q: 'Do we need an MQTT broker?', a: 'No. With a broker, events go through it to every app and to your own systems. Without one, the gateway sends events straight to the Gorad server.' },
    { q: 'Can our own systems use the data?', a: 'Yes. Events use a standard format on the broker, so your MES, dashboards or scripts can read them too.' },
    { q: 'Which PLCs does it support?', a: 'PLCs and meters that speak Modbus TCP, Siemens S7 or OPC UA. EtherNet/IP is not available today, and Connect does not act as an OPC UA server.' },
]

export default function Connect() {
    const appName = (slug) => appIndex.find((a) => a.slug === slug).name
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Gorad Factory Platform', href: '/factory-platform/' }, { label: 'Gorad Connect' }]}
                eyebrow="Gorad Connect · Early access"
                title="Get clean machine data out of the PLC"
                actions={<><a href="/contact/" className="btn btn-primary btn-lg">Book a demo</a><a href="/pilot/" className="btn btn-secondary">Join the pilot programme</a></>}
            >
                Your machines already know how many parts they made, when they stopped and why. Gorad Connect reads that
                from your PLCs and meters and passes it on, so OEE, quality and maintenance run on real data.
            </PageHero>

            <SubNav label="On this page" items={[['overview', 'Overview'], ['how-it-works', 'How it works'], ['what-it-does', 'What it does'], ['rules', 'Rules it keeps'], ['works-with', 'Works with'], ['faq', 'FAQ']]} />

            <section className="section" id="overview">
                <div className="container">
                    <PlainWords>
                        The information is already in your machines, locked inside the <Term t="PLC">PLC</Term>. Gorad Connect is
                        a translator: it reads that information and passes it on in a language every system understands. And
                        when the network is down, it keeps a notebook, so nothing gets lost.
                    </PlainWords>
                    <div style={{ marginTop: 64 }}>
                        <SectionHead eyebrow="Why Gorad Connect" title="Machine data without the manual work" />
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
                <div className="container split">
                    <div>
                        <SectionHead eyebrow="How it works" title="Read, translate, keep, deliver">
                            When the link to the <Term t="Broker">broker</Term> goes down, Connect keeps every reading on the
                            gateway and sends it when the link returns. That is <Term t="Store and forward">store and forward</Term>.
                        </SectionHead>
                        <ol className="steps-list">
                            {steps.map((s) => <li key={s.title}><strong>{s.title}</strong><span>{s.text}</span></li>)}
                        </ol>
                    </div>
                    <StoreForwardDiagram />
                </div>
            </section>

            <section className="section" id="what-it-does">
                <div className="container">
                    <SectionHead eyebrow="What it does" title="Talks to the machines you already have" />
                    <div className="mini-cards">
                        <div className="mini-card"><span className="tag">Protocol</span><h3><Term t="Modbus TCP" /></h3><p>Holding and input registers, coils and discrete inputs.</p></div>
                        <div className="mini-card"><span className="tag">Protocol</span><h3><Term t="Siemens S7" /></h3><p>Read data block addresses, and import tags from a TIA Portal export.</p></div>
                        <div className="mini-card"><span className="tag">Protocol</span><h3><Term t="OPC UA" /></h3><p>Connects as a client to PLCs and servers on your network.</p></div>
                    </div>
                    <p className="fine-print">Not available today: EtherNet/IP, and Connect acting as an OPC UA server.</p>

                    <div style={{ marginTop: 56 }}>
                        <SectionHead eyebrow="Standard events" title="Tags in, meaningful events out">
                            You map raw <Term t="Tag">tags</Term> once. Every app, and any system that reads from the broker, gets the same clean <Term t="Event">events</Term>.
                        </SectionHead>
                        <div className="grid grid-4">
                            {events.map((e) => (
                                <div className="card" key={e.name}>
                                    <h3 className="mono" style={{ fontSize: '0.95rem' }}>{e.name}</h3>
                                    <p>{e.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: 56 }}>
                        <SectionHead eyebrow="Set up" title="Configured from the browser" />
                        <CheckList items={[
                            'Connections and a catalogue of tags',
                            'Look inside the PLC from the browser to find the right tags',
                            'Map tags to events, and check live values on the spot',
                            'Dead letters: events that could not be delivered, ready for review',
                        ]} />
                    </div>
                </div>
            </section>

            <section className="section alt" id="rules">
                <div className="container">
                    <SectionHead eyebrow="Rules it keeps" title="Built to be safe on a running line" />
                    <div className="mini-cards">
                        {rules.map((r) => (
                            <div className="mini-card" key={r.title}>
                                <h3 style={{ marginTop: 0 }}>{r.title}</h3>
                                <p>{r.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" id="works-with">
                <div className="container">
                    <SectionHead eyebrow="On the platform" title="Works with">
                        Connect is the data source for these apps. Use it on its own, or as the first step towards them.
                    </SectionHead>
                    <div className="grid grid-3">
                        {worksWith.map(([slug, text]) => (
                            <a key={slug} className="card works-with" href={`/factory-platform/${slug}/`}>
                                <strong>{appName(slug)}</strong>
                                <span>{text}</span>
                            </a>
                        ))}
                    </div>
                    <div className="callout" style={{ marginTop: 32 }}>
                        <p>Machine builder or integrator? Connect can ship on its own as the data gateway for your machines. <a href="/partners/">See how partnering works</a>.</p>
                    </div>
                </div>
            </section>

            <section className="section alt" id="faq">
                <div className="container">
                    <SectionHead eyebrow="Questions" title="About Gorad Connect" center />
                    <Faq items={connectFaqs} />
                    <div className="section-foot" style={{ textAlign: 'center' }}>
                        <a className="text-link" href="/factory-platform/">Back to the Gorad Factory Platform <ArrowRight size={16} aria-hidden="true" /></a>
                    </div>
                </div>
            </section>

            <CtaBand title="Get your machine data out of the PLC" text="Tell us which machines and PLCs you have, and we will show you what Connect would read." />
        </>
    )
}

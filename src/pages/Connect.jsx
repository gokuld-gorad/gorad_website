import StoreForwardDiagram from '../components/StoreForwardDiagram.jsx'
import { CheckList, CtaBand, PageHero, SectionHead } from '../components/Blocks.jsx'

const events = [
    { name: 'machine.state', text: 'Running, idle, stopped or faulted, with the time it changed.' },
    { name: 'production.count', text: 'Good and total part counts for OEE and shift reports.' },
    { name: 'measurement', text: 'Process values for SPC and trend charts.' },
    { name: 'alarm', text: 'Machine alarms with their state, for Andon and maintenance.' },
]

export default function Connect() {
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Factory Platform', href: '/factory-platform/' }, { label: 'Connect' }]}
                eyebrow="Gorad Connect · Early access"
                title="Get clean machine data out of the PLC"
                actions={<><a href="/contact/" className="btn btn-primary">Book a demo</a><a href="/pilot/" className="btn btn-secondary">Join the pilot programme</a></>}
            >
                A gateway for PLCs and meters. Read tags over Modbus TCP, Siemens S7 and OPC UA, map them to
                standard events, and keep every event when the network drops. Useful on its own, and the data
                source for OEE, SPC and your own systems.
            </PageHero>

            <section className="section">
                <div className="container split">
                    <div>
                        <SectionHead eyebrow="Store and forward" title="A network drop does not lose data">
                            When the link to the broker goes down, Connect keeps tag-derived events on the gateway and sends them when the link returns.
                        </SectionHead>
                        <CheckList items={[
                            'Every reading goes into a local buffer first',
                            'Queued events are delivered once the link is back',
                            'Events that still cannot be delivered are kept as dead letters for review, not dropped',
                        ]} />
                    </div>
                    <StoreForwardDiagram />
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHead eyebrow="Protocols" title="Talks to the machines you already have" />
                    <div className="grid grid-3">
                        <div className="card"><h3>Modbus TCP</h3><p>Holding and input registers, coils and discrete inputs.</p></div>
                        <div className="card"><h3>Siemens S7</h3><p>Read data block addresses from S7 PLCs, and import tags from a TIA Portal export.</p></div>
                        <div className="card"><h3>OPC UA</h3><p>Connect as an OPC UA client to PLCs and servers on your network.</p></div>
                    </div>
                    <p style={{ marginTop: 20, fontSize: '0.9rem' }}>
                        Not available today: EtherNet/IP, and Connect acting as an OPC UA server.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="Standard events" title="Tags in, meaningful events out">
                        You map raw tags once. Every app, and any system that reads from the broker, gets the same clean events.
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
            </section>

            <section className="section alt">
                <div className="container grid grid-2">
                    <div>
                        <SectionHead eyebrow="Safe by default" title="Read-only unless you say otherwise">
                            Connect only reads from your machines by default. Writing a value back has to be configured, is audited, and is never on the inspection safety path.
                        </SectionHead>
                    </div>
                    <div>
                        <SectionHead eyebrow="SETUP" title="Configured from the browser" />
                        <CheckList items={[
                            'Connections and tag catalogue',
                            'Tag-to-event mappings',
                            'Live values to check a mapping on the spot',
                            'Dead letters: events that could not be delivered',
                        ]} />
                    </div>
                </div>
            </section>

            <CtaBand title="Machine builder or integrator?" text="Connect can ship on its own as the data gateway for your machines. Tell us what you build and we will show you how it fits." />
        </>
    )
}

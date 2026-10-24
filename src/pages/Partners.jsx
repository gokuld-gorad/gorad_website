import { Bot, Cable, Factory } from 'lucide-react'
import { CheckList, CtaBand, Downloads, PageHero, SectionHead } from '../components/Blocks.jsx'

// Signal map from the platform's docs/vision/PLC_FUNCTION_BLOCKS.md.
const signals = [
    ['Ready', 'Station → PLC', 'The station is ready for a trigger'],
    ['Trigger', 'PLC → Station', 'Start the inspection cycle'],
    ['ResultOK / ResultNG', 'Station → PLC', 'Written after the journal, then read back to confirm; a mismatch raises Line unsafe'],
    ['Heartbeat', 'Station → PLC', 'Toggles every 0.5 s while the station is healthy. Your PLC watchdog stops or diverts when it stops toggling'],
    ['LineUnsafe', 'Station → PLC', 'A safety, journal or PLC fault'],
    ['PartToken', 'PLC → Station', 'Optional part ID'],
    ['ProgramSelect', 'PLC → Station', 'Optional program index for changeover'],
    ['Ack', 'PLC → Station', 'Acknowledges the result'],
    ['InPosition / CaptureDone', 'Robot ↔ Station', 'Per position, for multi-position robot cells'],
]

const who = [
    { icon: Bot, title: 'System integrators', text: 'You build inspection cells and robot cells. Gorad supplies the vision system and its software; you keep the mechanics, robot, electrics and PLC program.' },
    { icon: Factory, title: 'Machine builders', text: 'You build machines and want inspection or clean machine data as an option, without writing and supporting your own vision software.' },
    { icon: Cable, title: 'Automation partners', text: 'You commission lines for plants and want one supportable product instead of a custom project every time.' },
]

export default function Partners() {
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Integrators & machine builders' }]}
                eyebrow="Partners"
                title="Build cells on a vision platform you do not have to maintain"
                actions={<a href="/contact/" className="btn btn-primary btn-lg">Talk to us about partnering</a>}
            >
                One product for every customer, a documented PLC handshake, and programs you can hand over to the
                plant. You deliver the cell; Gorad supplies and maintains the vision software.
            </PageHero>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="Who it is for" title="Integrators, machine builders and automation partners" />
                    <div className="grid grid-3">
                        {who.map(({ icon: Icon, title, text }) => (
                            <div className="card" key={title}>
                                <div className="card-icon"><Icon size={20} aria-hidden="true" /></div>
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section alt">
                <div className="container grid grid-2" style={{ gap: 40 }}>
                    <div>
                        <SectionHead eyebrow="Why it is easier" title="Less custom code, less support after handover" />
                        <CheckList items={[
                            'The same tested product at every customer. Differences are configuration, never a code fork',
                            'Programs are signed and versioned, released over the network or by USB, and changed from the browser',
                            'Fail-closed by design: a fault rejects the part, so a cell never passes parts because something broke',
                            'Classical and AI tools in one program, trained and changed without a data scientist on site',
                            'Gorad Connect turns your machine’s PLC tags into standard events for OEE, SPC and the plant',
                        ]} />
                    </div>
                    <div>
                        <SectionHead eyebrow="Clear scope" title="Who does what" />
                        <div className="card">
                            <h3 style={{ marginBottom: 10 }}>Gorad</h3>
                            <CheckList items={['Vision software, programs and AI models', 'Station hardware specification', 'Commissioning support and documentation']} />
                            <h3 style={{ margin: '18px 0 10px' }}>Integrator or machine builder</h3>
                            <CheckList items={['Mechanics, robot and fixtures', 'Cell electrics and lighting mounts', 'The PLC program, using the signal map below']} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="PLC handshake" title="A standard signal map">
                        The same signals at every station, over Modbus TCP, Siemens S7 or OPC UA. Addresses are configured per
                        cell: coils and registers, DB offsets, or node IDs.
                    </SectionHead>
                    <div className="compare-wrap" role="region" aria-label="PLC signal map" tabIndex={0}>
                        <table className="compare signals">
                            <thead>
                                <tr><th scope="col">Signal</th><th scope="col">Direction</th><th scope="col">Meaning</th></tr>
                            </thead>
                            <tbody>
                                {signals.map(([s, d, m]) => (
                                    <tr key={s}><th scope="row" className="mono">{s}</th><td>{d}</td><td>{m}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="fine-print">Commissioning, PLC and camera guides are shared with partners.</p>
                    <div className="section-foot"><Downloads /></div>
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHead eyebrow="How it works" title="How partnering starts" />
                    <ol className="steps">
                        <li className="card"><h3>Talk</h3><p>Tell us what you build and for whom, and which cells could use vision or machine data.</p></li>
                        <li className="card"><h3>First cell together</h3><p>We work on one real cell with you, from samples to commissioning.</p></li>
                        <li className="card"><h3>Hand over</h3><p>Your team learns to commission and change programs, with our engineers behind you.</p></li>
                        <li className="card"><h3>Agree terms</h3><p>Partner terms are agreed once the first cell has shown what the work involves.</p></li>
                    </ol>
                </div>
            </section>

            <CtaBand title="Building a cell that needs vision?" text="Tell us about the machine or the cell. We will tell you honestly whether Gorad fits, and how we would work together." />
        </>
    )
}

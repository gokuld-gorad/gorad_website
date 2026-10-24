import { CheckList, CtaBand, Faq, PageHero, SectionHead } from '../components/Blocks.jsx'

const steps = [
    { title: 'Qualify', text: 'A call about the station, the parts, the defects and your PLC, to check that Gorad is the right fit.' },
    { title: 'Prove on samples', text: 'You send sample parts, good and bad. We show you how the inspection would work on them.' },
    { title: 'Pilot on one station', text: 'We install on one real station with you, commission it and train your team.' },
    { title: 'Decide together', text: 'We review the results on your line together. You decide whether to roll out, with the evidence in front of you.' },
]

const pilotFaqs = [
    { q: 'Why a pilot programme?', a: 'The Factory Platform is built and tested in software. The last step before general release is proving it on real stations, with real parts, cameras and PLCs. Pilot plants get early access and direct work with the people who built it.' },
    { q: 'How many plants are you taking?', a: 'A small number, so that each pilot gets proper engineering attention. We select plants where the station is a good fit.' },
    { q: 'Do you take pilots outside India?', a: 'Yes. We welcome applications from plants anywhere in the world.' },
    { q: 'What if it is not a fit?', a: 'We will tell you at the qualify step, before you spend time on samples or installation.' },
]

export default function Pilot() {
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Pilot programme' }]}
                eyebrow="Pilot programme"
                title="Prove it on your own line before you commit"
                actions={<><a href="/contact/?type=pilot" className="btn btn-primary">Apply for the pilot</a><a href="/contact/" className="btn btn-secondary">Book a demo first</a></>}
            >
                Gorad is selecting a small number of plants worldwide to pilot the Factory Platform on a
                real station. You see results on your own parts before you decide anything.
            </PageHero>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="How it works" title="Four steps, and you can stop after any of them" />
                    <ol className="steps">
                        {steps.map((s) => (
                            <li className="card" key={s.title}>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="section alt">
                <div className="container grid grid-2">
                    <div className="card">
                        <h3 style={{ marginBottom: 14 }}>A good pilot plant has</h3>
                        <CheckList items={[
                            'A discrete inspection or machine-data problem it wants solved',
                            'A PLC that speaks Modbus TCP, Siemens S7 or OPC UA',
                            'Sample parts, good and defective, it can share',
                            'An engineer who can work with us during commissioning',
                        ]} />
                    </div>
                    <div className="card">
                        <h3 style={{ marginBottom: 14 }}>Gorad provides</h3>
                        <CheckList items={[
                            'Feasibility work on your samples',
                            'Installation and commissioning on one station, with your team',
                            'Training for operators and engineers',
                            'Direct access to the engineers who built the platform',
                        ]} />
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="Questions" title="About the pilot" center />
                    <Faq items={pilotFaqs} />
                </div>
            </section>

            <CtaBand title="Have a station in mind?" text="Tell us about the part and the problem. If it is a good fit, we will propose a pilot." />
        </>
    )
}

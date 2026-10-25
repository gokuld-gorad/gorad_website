import { Handshake, LifeBuoy, Rocket } from 'lucide-react'
import { CtaBand, PageHero, SectionHead, TextLink } from '../components/Blocks.jsx'
import { PlainWords } from '../components/Explain.jsx'
import { roadmapDetail } from '../content/company.js'

const ways = [
    { icon: Rocket, title: 'Start with a pilot', text: 'Steps 1 and 2 on your own sample parts, then one station. You see results before you commit.', href: '/pilot/', link: 'How the pilot works' },
    { icon: LifeBuoy, title: 'Run a full project', text: 'All seven steps for one or more stations, with a clear proposal and price at step 2.', href: '/contact/', link: 'Talk to us' },
    { icon: Handshake, title: 'Work through your integrator', text: 'Your integrator builds the cell; Gorad supplies the vision software and supports both of you.', href: '/partners/', link: 'For integrators' },
]

export default function HowWeWork() {
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Company' }, { label: 'How we work' }]}
                eyebrow="How we work"
                title="From your first call to a running line"
                actions={<a href="/contact/" className="btn btn-primary btn-lg">Start with a call</a>}
            >
                Seven clear steps. At each one you know what we do, what we need from you, and what you get, so
                there are no surprises.
            </PageHero>

            <section className="section">
                <div className="container">
                    <PlainWords>
                        Think of it like building an extension to your house: first we look at the site and listen, then we
                        show you a plan and a price, then we build, test and hand over the keys. You can stop after any step.
                    </PlainWords>
                    <div style={{ marginTop: 56 }}>
                        <ol className="howto">
                            {roadmapDetail.map((s) => (
                                <li key={s.title}>
                                    <div>
                                        <h3>{s.title}</h3>
                                        <dl className="howto-cols">
                                            <div><dt>What we do</dt><dd>{s.we}</dd></div>
                                            <div><dt>What we need from you</dt><dd>{s.you}</dd></div>
                                            <div><dt>What you get</dt><dd>{s.result}</dd></div>
                                        </dl>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHead eyebrow="Ways to work with us" title="Choose the starting point that suits you" />
                    <div className="pillars">
                        {ways.map(({ icon: Icon, title, text, href, link }) => (
                            <a className="pillar" key={title} href={href}>
                                <span className="icon-ring"><Icon size={20} aria-hidden="true" /></span>
                                <h3 style={{ fontSize: '1.15rem', letterSpacing: '-0.01em', textTransform: 'none', fontFamily: 'var(--font-sans)', fontWeight: 650, color: 'var(--text)' }}>{title}</h3>
                                <p>{text}</p>
                                <span className="text-link">{link}</span>
                            </a>
                        ))}
                    </div>
                    <div className="section-foot"><TextLink href="/about/">About Gorad and our principles</TextLink></div>
                </div>
            </section>

            <CtaBand title="Let’s look at your line" text="Tell us what you make and what goes wrong. Step 1 starts with that conversation." />
        </>
    )
}

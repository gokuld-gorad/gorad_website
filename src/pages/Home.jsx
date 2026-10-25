import { ArrowRight, BarChart3, Cable, CircleCheck, CloudOff, FileCheck2, Layers, Plus, ScanEye, Settings2, ShieldCheck, Users } from 'lucide-react'
import HeroScan from '../components/HeroScan.jsx'
import Roadmap from '../components/Roadmap.jsx'
import { CtaBand, SectionHead, TextLink } from '../components/Blocks.jsx'
import { FOUNDER } from '../site.js'

// The homepage speaks for Gorad as a company, in plain words. Product detail lives on
// the platform and app pages; this page tells the story and points the way.

const pillars = [
    {
        icon: ScanEye, word: 'See', title: 'AI visual inspection',
        text: 'Cameras and AI check every part. Anything doubtful is rejected, never passed.',
        href: '/factory-platform/vision/', link: 'Gorad Vision',
    },
    {
        icon: Cable, word: 'Connect', title: 'Machine data',
        text: 'Counts, stops and alarms are read straight from your machines. No manual logging.',
        href: '/factory-platform/connect/', link: 'Gorad Connect',
    },
    {
        icon: BarChart3, word: 'Improve', title: 'Quality and production apps',
        text: 'Turn that data into action: process control, non-conformances, OEE, maintenance and traceability.',
        href: '/factory-platform/', link: 'Gorad Factory Platform',
    },
]

const industries = [
    { name: 'Automotive & components', examples: ['Connecting rods', 'Catalysts & filters', 'Bearings'], href: '/industries/automotive/' },
    { name: 'Electronics & power electronics', examples: ['PCB assemblies', 'IGBT modules'], href: '/industries/electronics/' },
    { name: 'Aerospace & heavy engineering', examples: ['Machined parts', 'Fabricated assemblies'], href: '/industries/aerospace-heavy-engineering/' },
    { name: 'Building materials', examples: ['Bricks and blocks', 'Surface damage'], href: '/industries/building-materials/' },
    { name: 'Packaging & logistics', examples: ['Labels', 'Codes and text', 'Counts'], href: '/industries/packaging-logistics/' },
    { name: 'Any discrete part', examples: ['Defects', 'Presence', 'Measurement', 'Sorting'], href: '/industries/#capabilities', open: true },
]

// Each advantage must be backed by something the product actually does.
const advantages = [
    { icon: ShieldCheck, title: 'Bad parts don’t slip through when something breaks', text: 'If a camera or a check fails, the part is rejected. Never quietly passed.' },
    { icon: FileCheck2, title: 'Every decision has proof', text: 'The image and the reason are recorded for every part, before the machine acts on it.' },
    { icon: Settings2, title: 'Change it yourself', text: 'Adjust inspections from a browser. No waiting for a vendor engineer to visit.' },
    { icon: CloudOff, title: 'Works without the internet', text: 'Everything runs inside your plant. Your images and data stay with you.' },
    { icon: Layers, title: 'Start small, grow later', text: 'Begin with one station or one app. Add more on the same platform, without replacing anything.' },
    { icon: Users, title: 'Built by people who have done it', text: 'Our founder has built and deployed more than 30 production vision inspection systems.' },
]


const principles = [
    { name: 'Innovate', text: 'AI where it helps, simple rules where they are enough.' },
    { name: 'Cost efficient', text: 'Start with one station or one app. Grow when it pays.' },
    { name: 'Committed', text: 'With you from the first sample to production.' },
    { name: 'Transparent', text: 'We tell you what we cannot do, before you spend money.' },
    { name: 'Trust', text: 'Your data stays in your plant, and every decision is on record.' },
]

export default function Home() {
    return (
        <>
            <section className="hero hero-home">
                <div className="container hero-center">
                    <span className="hero-pill"><CircleCheck size={14} aria-hidden="true" /> AI for manufacturing</span>
                    <h1>See every part.<br /><span className="accent">Trust every result.</span></h1>
                    <p className="lead">
                        Gorad builds AI software for factories. It inspects every part with cameras, connects your
                        machines and keeps your quality on record, all inside your own plant.
                    </p>
                    <div className="btn-row hero-actions">
                        <a href="/contact/" className="btn btn-primary btn-lg">Book a demo <ArrowRight size={18} aria-hidden="true" /></a>
                        <TextLink href="/factory-platform/">Explore our platforms</TextLink>
                    </div>
                    <HeroScan />
                </div>
            </section>

            <section className="trust-strip" aria-label="Who builds Gorad">
                <div className="container trust-inner">
                    <a className="trust-founder" href="/about/">
                        <img src={FOUNDER.photo} alt="" width="44" height="44" />
                        <span>
                            <strong>Built by an engineer behind 30+ production vision systems</strong>
                            <span>{FOUNDER.name} · aerospace, automotive and heavy engineering</span>
                        </span>
                    </a>
                    <ul className="trust-facts">
                        <li>Runs inside your plant</li>
                        <li>Works offline</li>
                        <li>Your data stays with you</li>
                    </ul>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="What we do" title="See. Connect. Improve." center>
                        One family of software for the factory floor. Use one part, or all of them together.
                    </SectionHead>
                    <div className="pillars">
                        {pillars.map(({ icon: Icon, word, title, text, href, link }) => (
                            <a className="pillar" key={word} href={href}>
                                <span className="icon-ring"><Icon size={20} aria-hidden="true" /></span>
                                <span className="pillar-word">{word}</span>
                                <h3>{title}</h3>
                                <p>{text}</p>
                                <span className="text-link">{link} <ArrowRight size={16} aria-hidden="true" /></span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section alt" id="industries">
                <div className="container">
                    <SectionHead eyebrow="Industries" title="Built for the parts you make">
                        From engine components to circuit boards and building materials. If you make discrete parts, we can probably inspect them.
                    </SectionHead>
                    <div className="industries">
                        {industries.map((ind) => (
                            <a className={`industry${ind.open ? ' industry-open' : ''}`} key={ind.name} href={ind.href}>
                                <h3>{ind.open && <Plus size={16} aria-hidden="true" />}{ind.name}</h3>
                                <ul>{ind.examples.map((e) => <li key={e}>{e}</li>)}</ul>
                                <ArrowRight className="industry-arrow" size={18} aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="Why Gorad" title="What you can count on" center>
                        No inflated promises. Six things the software actually does for you.
                    </SectionHead>
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
            </section>

            <section className="section alt" id="how-we-work">
                <div className="container">
                    <SectionHead eyebrow="How we work" title="From first call to a running line">
                        A clear, seven-step path, so you always know where your project stands.
                    </SectionHead>
                    <Roadmap />
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="Our philosophy" title="Five principles we work by" center />
                    <div className="principles">
                        {principles.map((p) => (
                            <div className="principle" key={p.name}>
                                <h3>{p.name}</h3>
                                <p>{p.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CtaBand title="Let’s look at your line" text="Tell us what you make and what goes wrong. We will tell you honestly what Gorad can do." />
        </>
    )
}

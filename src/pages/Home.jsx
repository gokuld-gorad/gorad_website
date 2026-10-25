import { ArrowRight, BarChart3, Cable, CircleCheck, ScanEye } from 'lucide-react'
import HeroScan from '../components/HeroScan.jsx'
import Roadmap from '../components/Roadmap.jsx'
import { CtaBand, SectionHead, TextLink } from '../components/Blocks.jsx'
import { hasImage } from '../components/SiteImage.jsx'
import manifest from '../content/imageManifest.json'
import { FOUNDER } from '../site.js'
import { principles } from '../content/company.js'
import { industries } from '../content/industries.js'

// The homepage speaks for Gorad as a company, in plain words, one idea per screen.
// Product detail lives on the platform, app and industry pages; this page tells the
// story and points the way.

const pillars = [
    {
        icon: ScanEye, word: 'See', product: 'Gorad Vision',
        text: 'Cameras and AI check every part. Anything doubtful is rejected, never passed.',
        href: '/factory-platform/vision/',
    },
    {
        icon: Cable, word: 'Connect', product: 'Gorad Connect',
        text: 'Counts, stops and alarms are read straight from your machines. No manual logging.',
        href: '/factory-platform/connect/',
    },
    {
        icon: BarChart3, word: 'Improve', product: 'Quality and production apps',
        text: 'Process control, non-conformances, OEE, maintenance and traceability on the same data.',
        href: '/factory-platform/',
    },
]

// Each advantage must be backed by something the product actually does.
const advantages = [
    { title: 'Bad parts don’t slip through when something breaks', text: 'If a camera or a check fails, the part is rejected. Never quietly passed.' },
    { title: 'Every decision has proof', text: 'The image and the reason are recorded for every part, before the machine acts on it.' },
    { title: 'Change it yourself', text: 'Adjust inspections from a browser. No waiting for a vendor engineer to visit.' },
    { title: 'Works without the internet', text: 'Everything runs inside your plant. Your images and data stay with you.' },
    { title: 'Start small, grow later', text: 'Begin with one station or one app, and add more on the same platform.' },
]

function IndustryTile({ ind }) {
    const image = hasImage('industries', ind.slug)
    const [w, h] = image ? manifest.industries[ind.slug] : [0, 0]
    return (
        <a className="ind-tile" href={`/industries/${ind.slug}/`}>
            {image && <img src={`/images/industries/${ind.slug}-card.webp`} alt="" width={w / 2} height={h / 2} loading="lazy" decoding="async" />}
            <span className="ind-tile-name">{ind.name}</span>
        </a>
    )
}

export default function Home() {
    return (
        <>
            <section className="hero hero-home hero-full">
                <div className="container hero-center">
                    <span className="hero-pill"><CircleCheck size={14} aria-hidden="true" /> AI for manufacturing</span>
                    <h1>See every part.<br /><span className="accent">Trust every result.</span></h1>
                    <p className="lead">AI software that inspects every part and keeps every result on record, inside your plant.</p>
                    <div className="btn-row hero-actions">
                        <a href="/contact/" className="btn btn-primary btn-lg">Book a demo <ArrowRight size={18} aria-hidden="true" /></a>
                        <TextLink href="/factory-platform/">Explore our platforms</TextLink>
                    </div>
                </div>
            </section>

            <section className="section proof" aria-label="How Gorad inspects, in one picture">
                <div className="container">
                    <HeroScan />
                    <p className="proof-caption">A camera checks every part. Good parts go on; anything doubtful is rejected, with the image and the reason saved.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="What we do" title="See. Connect. Improve." center>
                        One family of software for the factory floor. Use one part, or all of them.
                    </SectionHead>
                    <div className="pillars">
                        {pillars.map(({ icon: Icon, word, product, text, href }) => (
                            <a className="pillar" key={word} href={href}>
                                <span className="icon-ring"><Icon size={20} aria-hidden="true" /></span>
                                <span className="pillar-word">{word}</span>
                                <h3>{product}</h3>
                                <p>{text}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section statement">
                <div className="container">
                    <p className="statement-text">
                        If a camera, a check or the software fails, the part is rejected. <span className="accent">Never quietly passed.</span>
                    </p>
                </div>
            </section>

            <section className="section" id="industries">
                <div className="container">
                    <SectionHead eyebrow="Industries" title="Built for the parts you make" center>
                        From engine parts to circuit boards, vials and bricks.
                    </SectionHead>
                    <div className="ind-tiles">
                        {industries.map((ind) => <IndustryTile key={ind.slug} ind={ind} />)}
                        <a className="ind-tile ind-tile-open" href="/industries/#capabilities">
                            <span className="ind-tile-name">Any discrete part</span>
                            <span className="ind-tile-text">Defects, presence, measurement, codes, variants and sorting.</span>
                        </a>
                    </div>
                    <div className="section-foot center-foot">
                        <TextLink href="/industries/">See all industries</TextLink>
                        <p className="tile-note">Images are illustrations.</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container split reasons-split">
                    <SectionHead eyebrow="Why Gorad" title="Five things you can count on">
                        Each one is something the software does today.
                    </SectionHead>
                    <ol className="reasons">
                        {advantages.map((a) => (
                            <li key={a.title}>
                                <h3>{a.title}</h3>
                                <p>{a.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="section" id="how-we-work">
                <div className="container">
                    <SectionHead eyebrow="How we work" title="From first call to a running line" center>
                        Seven clear steps. Not sure yet? Start with a <a href="/pilot/">pilot</a> on your own parts.
                    </SectionHead>
                    <Roadmap compact />
                    <div className="section-foot center-foot">
                        <TextLink href="/how-we-work/">Every step in detail</TextLink>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="Who we are" title="Founded by an engineer. Run on five principles." center />
                    <div className="who">
                        <a className="who-founder" href="/about/">
                            <img src={FOUNDER.photo} alt={`Portrait of ${FOUNDER.name}`} width="96" height="96" loading="lazy" />
                            <strong>{FOUNDER.name}</strong>
                            <span>Founder. Has built and deployed more than 30 production vision systems in aerospace, automotive and heavy engineering.</span>
                        </a>
                        <ul className="principle-list">
                            {principles.map((p) => (
                                <li key={p.name}>
                                    <strong>{p.name}</strong>
                                    <span>{p.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <CtaBand title="Let’s look at your line" text="Tell us what you make and what goes wrong. We will tell you honestly what Gorad can do." />
        </>
    )
}

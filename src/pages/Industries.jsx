import { ArrowRight, Plus } from 'lucide-react'
import IndustryIcon from '../components/IndustryIcon.jsx'
import SiteImage, { hasImage } from '../components/SiteImage.jsx'
import { CtaBand, PageHero, SectionHead } from '../components/Blocks.jsx'
import { PlainWords } from '../components/Explain.jsx'
import { capabilities, industries } from '../content/industries.js'
import { useCases } from '../content/useCases.js'

const caseTitle = (id) => useCases.find((u) => u.id === id).title

export default function Industries() {
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Industries' }]}
                eyebrow="Industries"
                title="Built for the parts you make"
                actions={<a href="/contact/" className="btn btn-primary btn-lg">Tell us about your part</a>}
            >
                From engine components to circuit boards, bricks and parcels. Pick your industry to see what Gorad
                inspects there, with examples.
            </PageHero>

            <section className="section">
                <div className="container">
                    <div className="sector-grid">
                        {industries.map((ind) => (
                            <a className={`sector-card${hasImage('industries', ind.slug) ? ' has-image' : ''}`} key={ind.slug} href={`/industries/${ind.slug}/`}>
                                <SiteImage group="industries" name={ind.slug} variant="card" caption={null} />
                                {!hasImage('industries', ind.slug) && <span className="icon-ring"><IndustryIcon name={ind.icon} /></span>}
                                <h2>{ind.name}</h2>
                                <p>{ind.short}</p>
                                {ind.examples.length > 0 && (
                                    <ul className="sector-examples">
                                        {ind.examples.map((id) => <li key={id}>{caseTitle(id)}</li>)}
                                    </ul>
                                )}
                            </a>
                        ))}
                        <a className="sector-card sector-card-open" href="#capabilities">
                            <span className="icon-ring"><Plus size={22} aria-hidden="true" /></span>
                            <h2>Any discrete part</h2>
                            <p>Not listed here? Gorad inspects by capability: defects, presence, measurement, codes and text, variants and sorting.</p>
                            <span className="text-link">See the capabilities <ArrowRight size={16} aria-hidden="true" /></span>
                        </a>
                    </div>
                    <p className="tile-note">Images are illustrations.</p>
                </div>
            </section>

            <section className="section alt" id="capabilities">
                <div className="container">
                    <SectionHead eyebrow="Any discrete part" title="Don’t see your industry? We inspect by capability.">
                        If your part needs one of these checks, Gorad can most likely do it.
                    </SectionHead>
                    <div className="mini-cards">
                        {capabilities.map((c) => (
                            <div className="mini-card" key={c.title}>
                                <h3 style={{ marginTop: 0 }}>{c.title}</h3>
                                <p>{c.text}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 40 }}>
                        <PlainWords title="The quickest way to find out">
                            Send us a few photos of good parts and of the defects you need to catch. We will tell you honestly
                            whether Gorad can inspect them, and how.
                        </PlainWords>
                    </div>
                </div>
            </section>

            <CtaBand title="Tell us about your part" text="What you make, what goes wrong, and how you check it today. We reply with an honest view of what Gorad can do." />
        </>
    )
}

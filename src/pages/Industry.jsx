import { ArrowRight, Camera, CircleAlert, Info } from 'lucide-react'
import IndustryIcon from '../components/IndustryIcon.jsx'
import UseCaseArt from '../components/UseCaseArt.jsx'
import ApplicationArt, { hasApplicationArt } from '../components/ApplicationArt.jsx'
import SiteImage, { hasImage } from '../components/SiteImage.jsx'
import { CtaBand, PageHero, SectionHead, TextLink } from '../components/Blocks.jsx'
import { findIndustry, industries } from '../content/industries.js'
import { useCases } from '../content/useCases.js'
import { appIndex } from '../content/appIndex.js'

export default function Industry({ slug }) {
    const ind = findIndustry(slug)
    const examples = ind.examples.map((id) => useCases.find((u) => u.id === id))
    const apps = ind.apps.map((s) => appIndex.find((a) => a.slug === s))
    const others = industries.filter((i) => i.slug !== slug)
    const apps2d = ind.applications || []

    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Industries', href: '/industries/' }, { label: ind.name }]}
                eyebrow="Industries"
                title={ind.name}
                actions={<><a href="/contact/" className="btn btn-primary btn-lg">Tell us about your part</a><a href="/factory-platform/vision/" className="btn btn-secondary">How Gorad Vision works</a></>}
            >
                {ind.lead}
            </PageHero>

            {hasImage('industries', slug) && (
                <div className="container sector-banner">
                    <SiteImage group="industries" name={slug} />
                </div>
            )}

            <section className="section">
                <div className="container split" style={{ alignItems: 'start' }}>
                    <div>
                        <span className="icon-ring industry-hero-icon"><IndustryIcon name={ind.icon} size={26} /></span>
                        <SectionHead eyebrow="The challenge" title="What makes inspection hard here" />
                        <ul className="challenge-list">
                            {ind.challenges.map((c) => <li key={c}><CircleAlert size={18} aria-hidden="true" /><span>{c}</span></li>)}
                        </ul>
                    </div>
                    <div>
                        <SectionHead eyebrow="What we inspect" title="Typical checks" />
                        <div className="screen-list">
                            {ind.inspect.map((c) => (
                                <div className="screen-item" key={c.title}>
                                    <span className="icon-ring"><ArrowRight size={16} aria-hidden="true" /></span>
                                    <div><h3>{c.title}</h3><p>{c.text}</p></div>
                                </div>
                            ))}
                        </div>
                        {ind.note && <p className="fine-print"><Info size={14} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-2px' }} /> {ind.note}</p>}
                    </div>
                </div>
            </section>

            {apps2d.length > 0 && (
                <section className="section alt" id="applications">
                    <div className="container">
                        <SectionHead eyebrow="Applications" title="What Gorad can check here">
                            Typical inspection tasks in this industry, with the camera and lighting setup they usually need.
                            They are examples of what the platform does, not customer stories.
                        </SectionHead>
                        {examples.length > 0 && (
                            <div className="app-group" id="examples">
                                <h3 className="app-group-title">Worked examples</h3>
                                <ExampleCards examples={examples} />
                            </div>
                        )}
                        {apps2d.map((g) => (
                            <div className="app-group" key={g.title || 'all'}>
                                {(g.title || examples.length > 0) && <h3 className="app-group-title">{g.title || 'More applications'}</h3>}
                                <div className="grid grid-3">
                                    {g.items.map((a) => (
                                        <div className={`card application${hasApplicationArt(a.art) ? ' has-art' : ''}`} key={a.name} tabIndex={hasApplicationArt(a.art) ? 0 : undefined}>
                                            {hasApplicationArt(a.art) && <ApplicationArt id={a.art} />}
                                            <h4>{a.name}</h4>
                                            <p>{a.checks}</p>
                                            <p className="application-setup"><Camera size={14} aria-hidden="true" /> {a.setup}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {ind.scope && <p className="fine-print"><Info size={14} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-2px' }} /> {ind.scope}</p>}
                        <div className="section-foot"><TextLink href="/contact/">Part not on the list? Tell us about it</TextLink></div>
                    </div>
                </section>
            )}

            {apps2d.length === 0 && (
            <section className="section alt" id="examples">
                <div className="container">
                    <SectionHead eyebrow="Examples" title={examples.length ? 'Parts we are built to inspect' : 'Your parts, your examples'}>
                        {examples.length
                            ? 'A few typical examples. They are examples, not customer stories, and not the limit of what Gorad can do.'
                            : 'We do not publish examples for this industry yet. Tell us about your part and we will show you how Gorad would inspect it.'}
                    </SectionHead>
                    {examples.length > 0 ? (
                        <ExampleCards examples={examples} />
                    ) : (
                        <a href="/contact/" className="btn btn-primary">Send us details of your part</a>
                    )}
                </div>
            </section>
            )}

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="Beyond inspection" title="Useful on the same platform">
                        Inspection results feed these apps, so quality and production run on the same data.
                    </SectionHead>
                    <div className="grid grid-2">
                        {apps.map((a) => (
                            <a key={a.slug} className="card works-with" href={`/factory-platform/${a.slug}/`}>
                                <strong>{a.name}</strong>
                                <span>{a.tagline}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section alt tight">
                <div className="container">
                    <h2 className="other-industries-title">Other industries</h2>
                    <ul className="other-industries">
                        {others.map((o) => <li key={o.slug}><a href={`/industries/${o.slug}/`}>{o.name}</a></li>)}
                        <li><a href="/industries/#capabilities">Any discrete part</a></li>
                    </ul>
                    <div className="section-foot"><TextLink href="/industries/">All industries</TextLink></div>
                </div>
            </section>

            <CtaBand title="Tell us about your part" text="What you make, what goes wrong, and how you check it today. We reply with an honest view of what Gorad can do." />
        </>
    )
}

function ExampleCards({ examples }) {
    return (
        <div className="grid grid-3 uc-cards">
            {examples.map((u) => (
                <a className="card uc-card" key={u.id} href={`/factory-platform/use-cases/#${u.id}`}>
                    {u.group === 'inspection' && <UseCaseArt id={u.id} />}
                    <h3>{u.title}</h3>
                    <p>{u.short}</p>
                </a>
            ))}
        </div>
    )
}

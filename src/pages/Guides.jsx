import { ArrowRight } from 'lucide-react'
import { CtaBand, PageHero } from '../components/Blocks.jsx'
import { guides } from '../content/guides.js'

export default function Guides() {
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Guides' }]}
                eyebrow="Guides"
                title="Practical guides to inspection and machine data"
            >
                Plain answers to the questions that come up in every inspection and OEE project, from engineers
                who build these systems.
            </PageHero>

            <section className="section">
                <div className="container">
                    <div className="guide-list">
                        {guides.map((g) => (
                            <a className="card guide-card" key={g.slug} href={`/guides/${g.slug}/`}>
                                <span className="guide-meta">{g.minutes} min read</span>
                                <h2>{g.title}</h2>
                                <p>{g.summary}</p>
                                <span className="text-link">Read the guide <ArrowRight size={16} aria-hidden="true" /></span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <CtaBand title="Have a question we have not answered?" text="Tell us about your station. We reply with an honest view, even if the answer is that Gorad is not the right fit." />
        </>
    )
}

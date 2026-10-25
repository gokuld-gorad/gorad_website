import { ArrowRight, CircleCheck, FileText, ShieldCheck } from 'lucide-react'
import { CheckList, CtaBand, Faq, PageHero, SectionHead, StatusBadge } from '../components/Blocks.jsx'
import { PlainWords, SubNav } from '../components/Explain.jsx'
import { APP_STATUS_NOTE, appPages, findAppPage } from '../content/appPages.js'
import { appExtras } from '../content/appExtras.js'
import { glossary } from '../content/glossary.js'
import SpcExplainer from '../components/explainers/SpcExplainer.jsx'
import NcrExplainer from '../components/explainers/NcrExplainer.jsx'
import CalibrationExplainer from '../components/explainers/CalibrationExplainer.jsx'
import OeeExplainer from '../components/explainers/OeeExplainer.jsx'
import MaintenanceExplainer from '../components/explainers/MaintenanceExplainer.jsx'
import ToolLifeExplainer from '../components/explainers/ToolLifeExplainer.jsx'
import TraceExplainer from '../components/explainers/TraceExplainer.jsx'
import LabelExplainer from '../components/explainers/LabelExplainer.jsx'
import SkillsExplainer from '../components/explainers/SkillsExplainer.jsx'

// Names and links for apps and the two "ways in", used by "Works with".
const linkTargets = {
    vision: { name: 'Gorad Vision', href: '/factory-platform/vision/', note: 'AI visual inspection' },
    connect: { name: 'Gorad Connect', href: '/factory-platform/connect/', note: 'Machine and PLC data' },
    ...Object.fromEntries(appPages.map((a) => [a.slug, { name: a.name, href: `/factory-platform/${a.slug}/`, note: a.tagline }])),
}

const explainers = {
    spc: SpcExplainer,
    'ncr-capa': NcrExplainer,
    'calibration-msa': CalibrationExplainer,
    'line-performance': OeeExplainer,
    maintenance: MaintenanceExplainer,
    'tool-life': ToolLifeExplainer,
    traceability: TraceExplainer,
    'label-dispatch': LabelExplainer,
    skills: SkillsExplainer,
}

// Every app page follows the same order: problem and an everyday example, how it works,
// what it does, advantages, rules and connections, then terms and questions.
export default function AppPage({ slug }) {
    const app = findAppPage(slug)
    const extra = appExtras[slug]
    const Explainer = explainers[slug]
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Gorad Factory Platform', href: '/factory-platform/' }, { label: app.name }]}
                eyebrow={`${app.fullName} · ${app.group}`}
                title={app.tagline}
                actions={<><a href="/contact/" className="btn btn-primary btn-lg">Book a demo</a><a href="/pilot/" className="btn btn-secondary">Join the pilot programme</a></>}
            >
                {app.lead}
            </PageHero>

            <SubNav label="On this page" items={[
                ['problem', 'The problem'], ['how-it-works', 'How it works'], ['what-it-does', 'What it does'],
                ['advantages', 'Advantages'], ['rules', 'Rules it keeps'], ['faq', 'Terms & FAQ'],
            ]} />

            <section className="section" id="problem">
                <div className="container app-intro">
                    <div>
                        <span className="eyebrow">The problem</span>
                        <p className="lead" style={{ color: 'var(--text)' }}>{app.problem}</p>
                        <div className="app-status">
                            <StatusBadge status="early" />
                            <p>{APP_STATUS_NOTE}</p>
                        </div>
                    </div>
                    <PlainWords>{extra.plain}</PlainWords>
                </div>
            </section>

            <section className="section alt" id="how-it-works">
                <div className="container">
                    <SectionHead eyebrow="How it works" title={`${app.name}, step by step`} />
                    <Explainer />
                </div>
            </section>

            <section className="section" id="what-it-does">
                <div className="container">
                    <SectionHead eyebrow="What it does" title={`What ${app.name} does`} />
                    <div className="mini-cards">
                        {app.features.map((f) => (
                            <div className="mini-card" key={f.title}>
                                <h3 style={{ marginTop: 0 }}>{f.title}</h3>
                                <p>{f.text}</p>
                            </div>
                        ))}
                        <div className="mini-card">
                            <span className="tag"><FileText size={14} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-2px' }} /> Reports</span>
                            <h3>Ready to share</h3>
                            <p>{app.reports}.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section alt" id="advantages">
                <div className="container">
                    <SectionHead eyebrow="Advantages" title="What it does for you" />
                    <div className="advantages">
                        {extra.advantages.map((a) => (
                            <div className="advantage" key={a.title}>
                                <CircleCheck size={22} aria-hidden="true" />
                                <h3>{a.title}</h3>
                                <p>{a.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" id="rules">
                <div className="container grid grid-2" style={{ gap: 48 }}>
                    <div>
                        <SectionHead eyebrow="Rules it keeps" title="Built to stay honest">
                            These rules are part of the app, not settings.
                        </SectionHead>
                        <ul className="check-list">
                            {app.rules.map((r) => (
                                <li key={r}><ShieldCheck size={16} aria-hidden="true" /><span>{r}</span></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <SectionHead eyebrow="On the platform" title="Works with" />
                        <div className="grid" style={{ gap: 10 }}>
                            {app.worksWith.map((s) => (
                                <a key={s} className="card works-with" href={linkTargets[s].href}>
                                    <strong>{linkTargets[s].name}</strong>
                                    <span>{linkTargets[s].note}</span>
                                </a>
                            ))}
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <CheckList items={['Same login, roles and audit trail as every Gorad app', 'Runs inside your plant, with offline licensing']} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section alt" id="faq">
                <div className="container">
                    <SectionHead eyebrow="Terms used on this page" title="In plain language">
                        More terms in the <a href="/glossary/">glossary</a>.
                    </SectionHead>
                    <dl className="terms">
                        {extra.terms.map((t) => (
                            <div key={t}>
                                <dt>{t}</dt>
                                <dd>{glossary[t]}</dd>
                            </div>
                        ))}
                    </dl>
                    <div style={{ marginTop: 72 }}>
                        <SectionHead eyebrow="Questions" title={`About ${app.name}`} center />
                        <Faq items={extra.faqs} />
                    </div>
                    <div className="section-foot" style={{ textAlign: 'center' }}>
                        <a className="text-link" href="/factory-platform/#apps">See all apps on the platform <ArrowRight size={16} aria-hidden="true" /></a>
                    </div>
                </div>
            </section>

            <CtaBand title={`See ${app.name} with your data`} text={`Tell us how you handle this today, and we will show you how ${app.fullName} would fit.`} />
        </>
    )
}

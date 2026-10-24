import { FileText, ShieldCheck } from 'lucide-react'
import { CheckList, CtaBand, PageHero, SectionHead, StatusBadge } from '../components/Blocks.jsx'
import { APP_STATUS_NOTE, appPages, findAppPage } from '../content/appPages.js'
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
    vision: { name: 'Gorad Vision', href: '/factory-platform/vision/', note: 'Visual inspection' },
    connect: { name: 'Gorad Connect', href: '/factory-platform/connect/', note: 'PLC and meter data' },
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

export default function AppPage({ slug }) {
    const app = findAppPage(slug)
    const Explainer = explainers[slug]
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Factory Platform', href: '/factory-platform/' }, { label: app.name }]}
                eyebrow={`${app.fullName} · ${app.group}`}
                title={app.tagline}
                actions={<><a href="/contact/" className="btn btn-primary">Book a demo</a><a href="/pilot/" className="btn btn-secondary">Join the pilot programme</a></>}
            >
                {app.lead}
            </PageHero>

            <section className="section tight alt">
                <div className="container app-intro">
                    <div>
                        <span className="eyebrow">The problem</span>
                        <p className="lead" style={{ color: 'var(--text)' }}>{app.problem}</p>
                    </div>
                    <div className="callout app-status">
                        <StatusBadge status="early" />
                        <p>{APP_STATUS_NOTE}</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHead eyebrow="How it works" title={`${app.name}, step by step`} />
                    <Explainer />
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHead eyebrow="What it does" title={`What ${app.name} does`} />
                    <div className="grid grid-3">
                        {app.features.map((f) => (
                            <div className="card" key={f.title}>
                                <h3>{f.title}</h3>
                                <p>{f.text}</p>
                            </div>
                        ))}
                        <div className="card">
                            <div className="card-icon"><FileText size={20} aria-hidden="true" /></div>
                            <h3>Reports</h3>
                            <p>{app.reports}.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container grid grid-2" style={{ gap: 40 }}>
                    <div>
                        <SectionHead eyebrow="Rules it keeps" title="Built to stay honest">
                            The rules below are part of the app, not settings.
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
                            <CheckList items={['Same login, roles and audit trail as every Gorad app', 'Runs on-premise, with offline licensing']} />
                        </div>
                    </div>
                </div>
            </section>

            <CtaBand title={`See ${app.name} with your data`} text={`Tell us how you handle this today, and we will show you how ${app.fullName} would fit.`} />
        </>
    )
}

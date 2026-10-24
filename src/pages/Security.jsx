import { FileLock2, KeyRound, Network, PackageCheck, ScrollText, Users } from 'lucide-react'
import { CheckList, CtaBand, Downloads, PageHero, SectionHead } from '../components/Blocks.jsx'
import { EMAIL_INFO } from '../site.js'

// Every claim here comes from the platform's docs/07_SECURITY.md and
// docs/09_OSS_LICENCE_COMPLIANCE.md. No certification is claimed (decision D-025).
const areas = [
    {
        icon: Network,
        title: 'On-premise, nothing outbound',
        items: [
            'Runs on your appliance, VM or RHEL server',
            'No outbound internet connection required',
            'No telemetry by default',
            'Only HTTPS (port 443) exposed; TLS between browser, station and server',
            'Import your own certificates',
        ],
    },
    {
        icon: Users,
        title: 'People and access',
        items: [
            'Roles checked on the server for every request',
            'Re-authentication for actions that change production',
            'Passwords hashed with Argon2; sign-in throttling against guessing',
            'Session cookies a script cannot read, with CSRF protection',
            'Personal 6-digit PIN for operators on shared kiosks, with lockout',
        ],
    },
    {
        icon: FileLock2,
        title: 'Signed, end to end',
        items: [
            'Inspection programs, software updates and licences are signed (Ed25519)',
            'Signatures are checked before anything is stored or applied',
            'Separate keys for programs, updates and licences',
            'Signing keys stay offline at Gorad; stations hold only public keys',
        ],
    },
    {
        icon: ScrollText,
        title: 'Audit and data',
        items: [
            'Append-only audit log of configuration changes',
            'Your images and results are your data',
            'No transfer to Gorad without your explicit consent; exports are audited',
            'Remote access is off by default; when used, it is approved by you, time-limited and audited',
        ],
    },
    {
        icon: PackageCheck,
        title: 'Supply chain',
        items: [
            'Software bill of materials (SBOM, CycloneDX) per release',
            'Dependency vulnerability scans fail the build on high or critical findings',
            'Secrets scanning on every change',
            'Locked dependency versions and pinned base images',
        ],
    },
    {
        icon: KeyRound,
        title: 'Licence-clean',
        items: [
            'Every dependency, model and weight file is checked and registered',
            'No AGPL, SSPL or GPL code shipped',
            'No non-commercial or research-only model weights',
            'Not used: MongoDB, Redis, MinIO',
        ],
    },
]

export default function Security() {
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', href: '/' }, { label: 'Security & trust' }]}
                eyebrow="Security & trust"
                title="Built to pass your plant IT review"
                actions={<a href="/contact/" className="btn btn-primary">Ask for the security details</a>}
            >
                The Factory Platform runs inside your plant, signs what matters, records who changed what, and ships
                without licence surprises. It is designed with IEC 62443 principles in mind.
            </PageHero>

            <section className="section">
                <div className="container">
                    <div className="grid grid-3">
                        {areas.map(({ icon: Icon, title, items }) => (
                            <div className="card" key={title}>
                                <div className="card-icon"><Icon size={20} aria-hidden="true" /></div>
                                <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>{title}</h2>
                                <CheckList items={items} />
                            </div>
                        ))}
                    </div>
                    <div className="section-foot"><Downloads items={['datasheet']} /></div>
                </div>
            </section>

            <section className="section alt">
                <div className="container grid grid-2" style={{ gap: 40 }}>
                    <div>
                        <SectionHead eyebrow="Safety first" title="Security never weakens the line">
                            Security and licensing are designed so that they cannot cause a bad part to pass, or stop a running line.
                        </SectionHead>
                        <CheckList items={[
                            'The inspection and PLC path runs on the station, independent of the server and the user interface',
                            'An expired licence never stops inspection or the PLC output',
                            'A tampered program fails its signature check and cannot go live',
                        ]} />
                    </div>
                    <div>
                        <SectionHead eyebrow="Plainly" title="What we do not claim yet" />
                        <ul>
                            <li>No IEC 62443 certification or compliance claim. The design follows its principles; it has not been formally assessed.</li>
                            <li>No third-party penetration test yet. One will be done before broad rollout, or earlier when a customer requires it.</li>
                            <li>Data protection laws such as the GDPR or India’s DPDP Act may apply to user data in your plant. We will work through the ones that apply to you.</li>
                        </ul>
                        <div className="callout" style={{ marginTop: 20 }}>
                            <p>To report a security issue, email <a href={`mailto:${EMAIL_INFO}`}>{EMAIL_INFO}</a> with “Security” in the subject.</p>
                        </div>
                    </div>
                </div>
            </section>

            <CtaBand title="Need answers for a security questionnaire?" text="Send it to us. We will answer it point by point, including what is not built yet." />
        </>
    )
}

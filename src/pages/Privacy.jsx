import { COMPANY, EMAIL_INFO } from '../site.js'

// Draft for Gorad to review. Not legal advice.
export default function Privacy() {
    return (
        <section className="section">
            <div className="container prose">
                <span className="eyebrow">Legal</span>
                <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', marginBottom: 12 }}>Privacy policy</h1>
                <p>Last updated: 25 October 2026</p>

                <h2>Who we are</h2>
                <p>
                    {COMPANY} (“Gorad”, “we”) runs gorad.in. We are based in Bengaluru, India. For any question about your data,
                    email <a href={`mailto:${EMAIL_INFO}`}>{EMAIL_INFO}</a>.
                </p>

                <h2>What we collect</h2>
                <p>When you use the contact form, we collect what you enter: your name, work email, company, and, if you choose to give them, your phone number, country and details about your station. We do not use advertising or tracking cookies.</p>
                <p>Our hosting provider keeps standard server logs (such as IP address and pages requested) for security and operation. If we add visitor statistics, we will use a cookie-free service that does not identify you.</p>

                <h2>Why we use it</h2>
                <ul>
                    <li>To reply to your demo request, pilot application or question.</li>
                    <li>To keep a record of our conversations with you.</li>
                </ul>
                <p>We do not sell your data, and we do not add you to a mailing list without asking.</p>

                <h2>Where it is stored</h2>
                <p>Form submissions are stored in Google Workspace (Google Sheets and Gmail), which Gorad uses to run its business. The website itself is hosted on GitHub Pages. These providers may process data outside your country.</p>

                <h2>How long we keep it</h2>
                <p>We keep enquiries for as long as we are in contact with you, and delete them when they are no longer needed for that purpose.</p>

                <h2>Your rights</h2>
                <p>
                    You can ask us to show, correct or delete the data we hold about you, or to stop using it, wherever you are.
                    Depending on where you live, data protection laws such as the GDPR (European Union and United Kingdom) or
                    India’s Digital Personal Data Protection Act, 2023 may give you further rights. Email{' '}
                    <a href={`mailto:${EMAIL_INFO}`}>{EMAIL_INFO}</a> and we will respond.
                </p>

                <h2>Changes</h2>
                <p>If we change this policy, we will update the date at the top of this page.</p>
            </div>
        </section>
    )
}

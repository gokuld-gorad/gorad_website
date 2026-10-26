import { Mail, MapPin, MessageCircle } from 'lucide-react'
import ContactForm from '../components/ContactForm.jsx'
import { Downloads } from '../components/Blocks.jsx'
import { ADDRESS_LINES, COMPANY, EMAIL_INFO, EMAIL_SALES } from '../site.js'

// WhatsApp is shown on this page only: not in the footer, the structured data or
// llms.txt. data-llms="skip" also keeps it out of the generated llms-full.txt.
const WHATSAPP = { display: '+91 90804 95505', link: 'https://wa.me/919080495505' }

export default function Contact() {
    return (
        <section className="section">
            <div className="container split" style={{ alignItems: 'start' }}>
                <div className="stack">
                    <span className="eyebrow">Contact</span>
                    <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3rem)' }}>Book a demo or apply for the pilot</h1>
                    <p className="lead">
                        Tell us about your station: the part, the defects you need to catch, or the machine data you need.
                        A demo takes about 30 minutes, online.
                    </p>
                    <div style={{ marginTop: 28 }}>
                        <h2 style={{ fontSize: '1rem', marginBottom: 10 }}>Share it with your team</h2>
                        <Downloads />
                    </div>
                    <div className="card" style={{ marginTop: 24 }}>
                        <div style={{ display: 'flex', gap: 14 }}>
                            <div className="card-icon" style={{ flex: 'none' }}><Mail size={18} aria-hidden="true" /></div>
                            <div>
                                <h2 style={{ fontSize: '1rem' }}>Email</h2>
                                <p><a href={`mailto:${EMAIL_SALES}`}>{EMAIL_SALES}</a> for demos and pilots</p>
                                <p><a href={`mailto:${EMAIL_INFO}`}>{EMAIL_INFO}</a> for everything else</p>
                            </div>
                        </div>
                        <aside data-llms="skip" style={{ display: 'flex', gap: 14, marginTop: 20 }}>
                            <div className="card-icon" style={{ flex: 'none' }}><MessageCircle size={18} aria-hidden="true" /></div>
                            <div>
                                <h2 style={{ fontSize: '1rem' }}>WhatsApp</h2>
                                <p><a href={WHATSAPP.link} target="_blank" rel="noopener">Chat on WhatsApp: {WHATSAPP.display}</a></p>
                                <p>Monday to Saturday, 9:00 to 18:00 India time (UTC+5:30)</p>
                            </div>
                        </aside>
                        <div style={{ display: 'flex', gap: 14, marginTop: 20 }}>
                            <div className="card-icon" style={{ flex: 'none' }}><MapPin size={18} aria-hidden="true" /></div>
                            <div>
                                <h2 style={{ fontSize: '1rem' }}>Office</h2>
                                <address style={{ fontStyle: 'normal', color: 'var(--text-muted)' }}>
                                    {COMPANY}<br />
                                    {ADDRESS_LINES.map((l) => <span key={l}>{l}<br /></span>)}
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
                <ContactForm />
            </div>
        </section>
    )
}

import { Mail, MapPin } from 'lucide-react'
import ContactForm from '../components/ContactForm.jsx'
import { ADDRESS_LINES, COMPANY, EMAIL_INFO, EMAIL_SALES } from '../site.js'

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
                    <div className="card" style={{ marginTop: 32 }}>
                        <div style={{ display: 'flex', gap: 14 }}>
                            <div className="card-icon" style={{ flex: 'none' }}><Mail size={18} aria-hidden="true" /></div>
                            <div>
                                <h2 style={{ fontSize: '1rem' }}>Email</h2>
                                <p><a href={`mailto:${EMAIL_SALES}`}>{EMAIL_SALES}</a> for demos and pilots</p>
                                <p><a href={`mailto:${EMAIL_INFO}`}>{EMAIL_INFO}</a> for everything else</p>
                            </div>
                        </div>
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

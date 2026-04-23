import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, Loader } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Paste your deployed Google Apps Script Web App URL below.
// See docs/google-apps-script.js for full setup instructions.
// ─────────────────────────────────────────────────────────────────────────────
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxi9YNhvQoa2DrSnp1ujVxt-NWw-cBRs9LoC8tGKFqQT0QXXUI5-Eu7lWLyM9wrP8Ku/exec'

export default function Contact() {
    const [activeTab, setActiveTab] = useState('enquiry')
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const form = e.target
        const payload = {
            formType: activeTab,
            name: form.name.value,
            email: form.email.value,
            message: form.message.value,
            ...(activeTab === 'demo' && {
                company: form.company?.value || '',
                phone: form.phone?.value || '',
            }),
        }

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                // Google Apps Script requires text/plain to avoid CORS preflight on free tier
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(payload),
            })
            setSubmitted(true)
            form.reset()
            setTimeout(() => setSubmitted(false), 5000)
        } catch {
            alert('Something went wrong. Please check your connection and try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="section" id="contact">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Get In Touch</span>
                    <h2>Contact Us</h2>
                    <p>Ready to transform your operations? We'd love to hear from you.</p>
                </motion.div>

                <div className="contact-layout">
                    {/* Left: Contact Info */}
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3>Contact Information</h3>

                        <div className="contact-detail">
                            <div className="icon-box"><Mail size={18} /></div>
                            <div className="contact-detail-text">
                                <h4>Email</h4>
                                <p><a href="mailto:info@gorad.in">info@gorad.in</a></p>
                                <p><a href="mailto:sales@gorad.in">sales@gorad.in</a></p>
                            </div>
                        </div>

                        <div className="contact-detail">
                            <div className="icon-box"><MapPin size={18} /></div>
                            <div className="contact-detail-text">
                                <h4>Office Address</h4>
                                <p>Booth No. 100, 38, 2nd Main,<br />Ashwini Layout, Viveka Nagar,<br />Bengaluru - 560047 India</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="glass-card" style={{ padding: '32px' }}>
                            <div className="form-tabs">
                                <button
                                    className={`form-tab ${activeTab === 'enquiry' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('enquiry')}
                                >
                                    General Enquiry
                                </button>
                                <button
                                    className={`form-tab ${activeTab === 'demo' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('demo')}
                                >
                                    Demo / POC Request
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="contact-name">Name</label>
                                    <input type="text" id="contact-name" name="name" placeholder="Your name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-email">Email</label>
                                    <input type="email" id="contact-email" name="email" placeholder="your@email.com" required />
                                </div>
                                {activeTab === 'demo' && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="contact-company">Company</label>
                                            <input type="text" id="contact-company" name="company" placeholder="Company name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="contact-phone">Phone</label>
                                            <input type="tel" id="contact-phone" name="phone" placeholder="+91 ..." />
                                        </div>
                                    </>
                                )}
                                <div className="form-group">
                                    <label htmlFor="contact-message">Message</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        placeholder={activeTab === 'demo'
                                            ? "Tell us about your inspection needs and we'll arrange a demonstration..."
                                            : 'How can we help you?'}
                                        required
                                    />
                                </div>

                                {submitted ? (
                                    <div style={{ color: 'var(--accent)', fontWeight: 600, textAlign: 'center', padding: '14px 0' }}>
                                        ✓ Message sent successfully! We'll be in touch soon.
                                    </div>
                                ) : (
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{ width: '100%', justifyContent: 'center' }}
                                        disabled={loading}
                                    >
                                        {loading
                                            ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> Sending...</>
                                            : <><Send size={16} /> {activeTab === 'demo' ? 'Request Demo' : 'Send Message'}</>
                                        }
                                    </button>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

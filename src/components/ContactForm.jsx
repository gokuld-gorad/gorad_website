import { useEffect, useState } from 'react'
import { Loader, Send } from 'lucide-react'
import { GOOGLE_SCRIPT_URL, EMAIL_SALES } from '../site.js'

const INTERESTS = ['Gorad Vision (inspection)', 'Gorad Connect (machine data)', 'Quality apps (SPC, NCR/CAPA)', 'Production apps (OEE, maintenance)', 'Partnership (integrator / machine builder)', 'Not sure yet']
const CAMERAS = ['1', '2–4', '5–10', 'More than 10', 'Not sure']
const PLCS = ['Siemens (S7)', 'Modbus TCP', 'OPC UA', 'Other', 'Not sure']

function Select({ name, label, options }) {
    return (
        <div className="field">
            <label htmlFor={`f-${name}`}>{label} <span className="opt">(optional)</span></label>
            <select id={`f-${name}`} name={name} defaultValue="">
                <option value="">Select…</option>
                {options.map((o) => <option key={o}>{o}</option>)}
            </select>
        </div>
    )
}

export default function ContactForm() {
    const [type, setType] = useState('demo')
    const [state, setState] = useState({ status: 'idle', message: '' })

    // /contact/?type=pilot opens the pilot tab (read after hydration).
    useEffect(() => {
        if (new URLSearchParams(window.location.search).get('type') === 'pilot') setType('pilot')
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const f = e.target
        // Bots fill the hidden field; pretend success and send nothing.
        if (f.website.value) {
            setState({ status: 'ok', message: 'Thank you. We will be in touch.' })
            return
        }
        setState({ status: 'sending', message: '' })

        const details = [
            type === 'pilot' ? '[Pilot programme application]' : '[Demo request]',
            `Country: ${f.country.value || '—'}`,
            `Interested in: ${f.interest.value || '—'}`,
            `Cameras per part: ${f.cameras.value || '—'}`,
            `PLC: ${f.plc.value || '—'}`,
            `Cycle time: ${f.cycle.value || '—'}`,
            '',
            f.message.value,
        ].join('\n')

        try {
            const res = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                // text/plain avoids a CORS preflight, which Apps Script does not answer.
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify({
                    formType: 'demo',
                    name: f.name.value,
                    email: f.email.value,
                    company: f.company.value,
                    phone: f.phone.value,
                    message: details,
                }),
            })
            const data = await res.json()
            if (data.result !== 'success') throw new Error(data.message || 'Submission failed')
            f.reset()
            setState({
                status: 'ok',
                message: type === 'pilot'
                    ? 'Thank you. We have your pilot application and will reply by email.'
                    : 'Thank you. We have your request and will reply by email to arrange the demo.',
            })
        } catch {
            setState({
                status: 'err',
                message: `Your message could not be sent. Please try again, or email us at ${EMAIL_SALES}.`,
            })
        }
    }

    return (
        <div className="card" style={{ padding: 28 }}>
            <div className="form-tabs" role="group" aria-label="Request type">
                <button type="button" className="form-tab" aria-pressed={type === 'demo'} onClick={() => setType('demo')}>Book a demo</button>
                <button type="button" className="form-tab" aria-pressed={type === 'pilot'} onClick={() => setType('pilot')}>Join the pilot</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="field-row">
                    <div className="field">
                        <label htmlFor="f-name">Name</label>
                        <input id="f-name" name="name" autoComplete="name" required />
                    </div>
                    <div className="field">
                        <label htmlFor="f-email">Work email</label>
                        <input id="f-email" name="email" type="email" autoComplete="email" required />
                    </div>
                </div>
                <div className="field-row">
                    <div className="field">
                        <label htmlFor="f-company">Company</label>
                        <input id="f-company" name="company" autoComplete="organization" required />
                    </div>
                    <div className="field">
                        <label htmlFor="f-phone">Phone <span className="opt">(optional)</span></label>
                        <input id="f-phone" name="phone" type="tel" autoComplete="tel" />
                    </div>
                </div>
                <div className="field-row">
                    <div className="field">
                        <label htmlFor="f-country">Country <span className="opt">(optional)</span></label>
                        <input id="f-country" name="country" autoComplete="country-name" />
                    </div>
                    <Select name="interest" label="Interested in" options={INTERESTS} />
                </div>

                <fieldset className="form-fieldset">
                    <legend>About your station</legend>
                    <p>Optional, but it helps us prepare a useful {type === 'pilot' ? 'first call' : 'demo'}.</p>
                    <div className="field-row">
                        <Select name="cameras" label="Cameras per part" options={CAMERAS} />
                        <Select name="plc" label="PLC" options={PLCS} />
                    </div>
                    <div className="field">
                        <label htmlFor="f-cycle">Cycle time <span className="opt">(optional)</span></label>
                        <input id="f-cycle" name="cycle" placeholder="e.g. 8 seconds per part" />
                    </div>
                </fieldset>

                <div className="field">
                    <label htmlFor="f-message">{type === 'pilot' ? 'What would you like to pilot?' : 'What would you like to see?'}</label>
                    <textarea
                        id="f-message"
                        name="message"
                        required
                        placeholder={type === 'pilot'
                            ? 'The part, the defects you need to catch, and how it is inspected today.'
                            : 'The problem you want to solve, or the station you have in mind.'}
                    />
                </div>
                <div className="honeypot" aria-hidden="true">
                    <label htmlFor="f-website">Leave this field empty</label>
                    <input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={state.status === 'sending'}>
                    {state.status === 'sending'
                        ? <><Loader size={16} className="spin" /> Sending…</>
                        : <><Send size={16} /> {type === 'pilot' ? 'Apply for the pilot' : 'Request a demo'}</>}
                </button>
                <div role="status" aria-live="polite">
                    {(state.status === 'ok' || state.status === 'err') && (
                        <p className={`form-status ${state.status}`}>{state.message}</p>
                    )}
                </div>
                <p className="form-small">
                    We use your details only to reply to you. See the <a href="/privacy/">privacy policy</a>.
                </p>
            </form>
        </div>
    )
}

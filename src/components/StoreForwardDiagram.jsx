import { useRef } from 'react'
import { useInView, useReducedMotion, useStepper } from './hooks.js'

// Store-and-forward: events flow while the network is up, queue on the station
// while it is down, then flush in order when it returns.
// Phases (one tick = 700 ms): 0-5 flowing, 6-13 network down (buffer grows), 14-19 flushing.
const TICKS = 20

function phaseOf(t) {
    if (t < 6) return { name: 'flowing', label: 'Network up · events delivered', buffered: 0 }
    if (t < 14) return { name: 'down', label: 'Network down · events kept on the gateway', buffered: t - 5 }
    return { name: 'flush', label: 'Network back · queued events delivered', buffered: Math.max(0, 8 - (t - 13) * 2) }
}

export default function StoreForwardDiagram() {
    const ref = useRef(null)
    const inView = useInView(ref, 0.35)
    const reduced = useReducedMotion()
    const [t] = useStepper(TICKS, 700, inView && !reduced)
    const p = reduced ? { name: 'down', label: 'Network down · events kept on the gateway', buffered: 5 } : phaseOf(t)
    const down = p.name === 'down'
    const moving = !down && !reduced
    const line = (on) => (on ? 'var(--signal)' : 'var(--border-strong)')

    return (
        <figure className="card" ref={ref} style={{ padding: 16 }}>
            <svg viewBox="0 0 560 200" role="img" aria-label="Diagram: PLCs and meters feed Gorad Connect, which buffers events while the network to the broker is down and sends them when it returns.">
                <style>{`
                    .sf-dot { animation: sf-move 1.4s linear infinite; }
                    @keyframes sf-move { from { transform: translateX(0); opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } to { transform: translateX(110px); opacity: 0 } }
                `}</style>
                {/* Sources */}
                {['PLC', 'Meter', 'PLC'].map((s, n) => (
                    <g key={n}>
                        <rect x="8" y={20 + n * 58} width="84" height="42" rx="8" fill="var(--surface)" stroke="var(--border-strong)" />
                        <text x="50" y={46 + n * 58} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text)">{s}</text>
                        <path d={`M92 ${41 + n * 58} C 120 ${41 + n * 58}, 120 99, 150 99`} fill="none" stroke="var(--signal)" strokeWidth="1.5" />
                    </g>
                ))}
                {/* Gateway with buffer */}
                <rect x="150" y="50" width="150" height="98" rx="10" fill="var(--surface)" stroke="var(--signal)" strokeWidth="2" />
                <text x="225" y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text)">Gorad Connect</text>
                <text x="225" y="92" textAnchor="middle" fontSize="11" fill="var(--text-muted)">tags → events</text>
                {Array.from({ length: 8 }).map((_, n) => (
                    <rect key={n} x={166 + n * 15} y="108" width="11" height="24" rx="2"
                        fill={n < p.buffered ? 'var(--warning)' : 'var(--surface-sunken)'}
                        stroke="var(--border)" style={{ transition: 'fill 0.3s' }} />
                ))}
                <text x="225" y="166" textAnchor="middle" fontSize="11" fill="var(--text-muted)">
                    {p.buffered} event{p.buffered === 1 ? '' : 's'} queued
                </text>
                {/* Link to broker */}
                <line x1="300" y1="99" x2="430" y2="99" stroke={line(!down)} strokeWidth="2" strokeDasharray={down ? '5 5' : '0'} />
                {down && <text x="365" y="90" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ng)">×</text>}
                {moving && [0, 0.45, 0.9].map((d) => (
                    <circle key={d} className="sf-dot" cx="310" cy="99" r="4" fill="var(--signal)" style={{ animationDelay: `${d}s` }} />
                ))}
                {/* Broker and consumers */}
                <rect x="430" y="70" width="122" height="58" rx="8" fill="var(--surface)" stroke={line(!down)} />
                <text x="491" y="95" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text)">Broker</text>
                <text x="491" y="112" textAnchor="middle" fontSize="11" fill="var(--text-muted)">SPC · OEE · your systems</text>
            </svg>
            <figcaption className="sf-state" style={{ color: down ? 'var(--warning)' : 'var(--text-muted)', textAlign: 'center', marginTop: 8 }} aria-live="off">
                {p.label}
            </figcaption>
        </figure>
    )
}

import { useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { useInView, useReducedMotion, useStepper } from './hooks.js'

// The fail-closed cycle. The ordered list is the content (readable without JS or
// animation); the diagram highlights the current step.

const STEPS = [
    { title: 'Trigger', text: 'The PLC signals that a part is in position. The station checks the line is safe before it starts.' },
    { title: 'Capture every view', text: 'Each camera captures its view and runs the checks in the signed program.' },
    { title: 'A view faults', text: 'Camera 3 times out. Skipping it could let a bad part through, so Gorad treats a missing result as a failed one.', fault: true },
    { title: 'Write the journal', text: 'The verdict and the reason are written to the journal first, so there is always a record.' },
    { title: 'NG to the PLC', text: 'Only then does the PLC get the result: NG. The part is rejected, never passed by mistake.', fault: true },
]

const ACCENT = 'var(--signal)'
const NG = 'var(--ng)'
const OK = 'var(--ok)'
const MUTED = 'var(--border-strong)'
const TEXT = 'var(--text)'
const SUB = 'var(--text-muted)'

function Node({ x, y, w = 120, h = 54, label, sub, color, active }) {
    return (
        <g style={{ transition: 'opacity 0.3s' }} opacity={active ? 1 : 0.55}>
            <rect x={x} y={y} width={w} height={h} rx="8" fill="var(--surface)" stroke={color} strokeWidth={active ? 2 : 1} />
            <text x={x + w / 2} y={y + 23} textAnchor="middle" fontSize="13" fontWeight="600" fill={TEXT}>{label}</text>
            {sub && <text x={x + w / 2} y={y + 40} textAnchor="middle" fontSize="11" fill={SUB}>{sub}</text>}
        </g>
    )
}

function Wire({ d, on, color = ACCENT }) {
    return <path d={d} fill="none" stroke={on ? color : MUTED} strokeWidth={on ? 2 : 1.5} strokeDasharray={on ? '0' : '4 4'} style={{ transition: 'stroke 0.3s' }} />
}

export default function CycleDiagram() {
    const ref = useRef(null)
    const inView = useInView(ref, 0.35)
    const reduced = useReducedMotion()
    const [paused, setPaused] = useState(false)
    const running = inView && !reduced && !paused
    const [step, setStep] = useStepper(STEPS.length + 1, 1900, running)
    // Reduced motion shows the finished state. Step STEPS.length is a hold on the result.
    const s = reduced ? STEPS.length : step
    const at = (n) => s >= n

    const cams = [
        { y: 22, label: 'Camera 1', ok: true },
        { y: 92, label: 'Camera 2', ok: true },
        { y: 162, label: 'Camera 3', ok: false },
    ]

    return (
        <div className="cycle" ref={ref}>
            <ol className="cycle-steps">
                {STEPS.map((st, n) => (
                    <li key={st.title} className={`${s === n || (s === STEPS.length && n === STEPS.length - 1) ? 'active' : ''}${st.fault ? ' fault' : ''}`}>
                        <strong>{st.title}</strong>
                        <span>{st.text}</span>
                    </li>
                ))}
            </ol>
            <div className="cycle-stage">
                <div className="card" style={{ padding: 16 }}>
                    <svg className="cycle-svg" viewBox="0 0 560 240" role="img" aria-label="Diagram: three cameras feed the verdict; camera 3 times out, the journal records NG, then the PLC receives NG.">
                        {/* PLC trigger */}
                        <Node x={8} y={92} w={92} label="PLC" sub="trigger" color={at(0) ? ACCENT : MUTED} active={at(0)} />
                        {cams.map((c, n) => (
                            <g key={c.label}>
                                <Wire d={`M100 119 C 125 119, 125 ${c.y + 27}, 150 ${c.y + 27}`} on={at(1)} />
                                <Node x={150} y={c.y} w={110} label={c.label}
                                    sub={!at(1) ? 'waiting' : c.ok ? 'OK' : at(2) ? 'timeout' : 'capturing…'}
                                    color={!at(1) ? MUTED : c.ok ? OK : at(2) ? NG : ACCENT} active={at(1)} />
                                <Wire d={`M260 ${c.y + 27} C 285 ${c.y + 27}, 285 119, 310 119`} on={at(2)} color={c.ok ? OK : NG} />
                            </g>
                        ))}
                        {/* Verdict */}
                        <Node x={310} y={92} w={90} label={at(2) ? 'NG' : 'Verdict'} sub={at(2) ? 'view missing' : 'pending'} color={at(2) ? NG : MUTED} active={at(2)} />
                        {/* Journal then PLC output */}
                        <Wire d="M400 119 L 430 119 L 430 58 L 444 58" on={at(3)} color={NG} />
                        <Node x={444} y={32} w={108} label="Journal" sub={at(3) ? 'NG written' : '—'} color={at(3) ? ACCENT : MUTED} active={at(3)} />
                        <Wire d="M498 86 L 498 150" on={at(4)} color={NG} />
                        <Node x={444} y={150} w={108} label="PLC output" sub={at(4) ? 'NG · reject' : '—'} color={at(4) ? NG : MUTED} active={at(4)} />
                        <text x="498" y="226" textAnchor="middle" fontSize="11" fill={SUB}>journal first, then output</text>
                    </svg>
                </div>
                {!reduced && (
                    <div className="cycle-controls">
                        <p>Step {Math.min(s + 1, STEPS.length)} of {STEPS.length}</p>
                        <div className="btn-row">
                            <button className="icon-btn" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play animation' : 'Pause animation'}>
                                {paused ? <Play size={16} /> : <Pause size={16} />}
                            </button>
                            <button className="icon-btn" onClick={() => { setStep(0); setPaused(false) }} aria-label="Replay from the start">
                                <RotateCcw size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

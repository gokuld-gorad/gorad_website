import Explainer from './Explainer.jsx'
import { C, Label, Line } from './parts.jsx'

const steps = [
    { title: 'The NG rate crosses your limit', text: 'Over the last hour, Station 3 rejects more than the 2 % limit quality set in an auto-raise rule.', fault: true },
    { title: 'An NCR is raised', text: 'NCR-2026-0042 opens with the station, the view and the NG images attached as evidence.' },
    { title: 'Contain', text: 'Suspect parts are quarantined. Investigation cannot start until containment is done.' },
    { title: 'Investigate and fix', text: 'The 8D steps guide root cause and corrective action, each with an owner and a due date.' },
    { title: 'Verify and close', text: 'Closing needs every required step and a disposition. A closed NCR is read-only.' },
    { title: 'Did it go away?', text: 'NCR compares the reject rate before the NCR with the rate after the fix.' },
]

const states = ['Open', 'Contained', 'Investigating', 'Action', 'Verify', 'Closed']
const stateAt = [-1, 0, 1, 3, 5, 5]
// NG rate (%) over time; crosses the 2 % limit near the end
const rate = [0.8, 0.9, 0.7, 1.0, 1.2, 1.6, 2.4, 3.1, 3.8, 4.1]
const cx = (i) => 30 + i * 24
const cy = (v) => 220 - v * 26

function Stage({ step }) {
    const s = stateAt[step]
    return (
        <>
            {states.map((name, i) => {
                const done = i <= s
                const current = i === s
                return (
                    <g key={name} style={{ transition: 'opacity 0.3s' }} opacity={done ? 1 : 0.45}>
                        <rect x={10 + i * 91} y={14} width={85} height={28} rx="14" fill={current ? C.signal : done ? C.sunken : C.surface}
                            stroke={done ? C.signal : C.line} style={{ transition: 'fill 0.3s' }} />
                        <Label x={52 + i * 91} y={32} anchor="middle" size={11} weight={600} color={current ? 'var(--on-signal)' : C.text}>{name}</Label>
                    </g>
                )
            })}
            {/* NG rate chart */}
            <Label x={30} y={76} size={11} color={C.text} weight={600}>NG rate, Station 3</Label>
            <Line d={`M24 ${cy(2)} H270`} color={C.ng} dashed />
            <Label x={272} y={cy(2) + 4} size={10} color={C.ng}>2 %</Label>
            <path d={rate.map((v, i) => `${i ? 'L' : 'M'}${cx(i)} ${cy(v)}`).join(' ')} fill="none" stroke={C.signal} strokeWidth="2" />
            {rate.map((v, i) => <circle key={i} cx={cx(i)} cy={cy(v)} r="3.5" fill={v > 2 ? C.ng : C.signal} />)}
            {/* Right panel */}
            <rect x={310} y={62} width={240} height={180} rx="8" fill={C.surface} stroke={C.line} />
            {step < 5 ? (
                <g opacity={step >= 1 ? 1 : 0.3} style={{ transition: 'opacity 0.3s' }}>
                    <Label x={326} y={88} color={C.text} weight={700} size={13}>NCR-2026-0042</Label>
                    <Label x={326} y={110} size={11}>Station 3 · View 2 · missing clip</Label>
                    <Label x={326} y={128} size={11}>Raised by rule: NG rate above 2 %</Label>
                    <Label x={326} y={146} size={11}>Evidence: NG images attached</Label>
                    <Label x={326} y={174} size={11} color={step >= 2 ? C.ok : C.subtle}>{step >= 2 ? '✓' : '○'} Containment: suspect parts held</Label>
                    <Label x={326} y={194} size={11} color={step >= 3 ? C.ok : C.subtle}>{step >= 3 ? '✓' : '○'} Root cause and corrective action</Label>
                    <Label x={326} y={214} size={11} color={step >= 4 ? C.ok : C.subtle}>{step >= 4 ? '✓' : '○'} Verified, disposition recorded</Label>
                </g>
            ) : (
                <g>
                    <Label x={326} y={88} color={C.text} weight={700} size={13}>Did it go away?</Label>
                    <Label x={326} y={124} size={11}>Before</Label>
                    <rect x={380} y={112} width={4.1 * 36} height={16} rx="3" fill={C.ng} opacity="0.8" />
                    <Label x={385 + 4.1 * 36} y={124} size={11} color={C.text}>4.1 %</Label>
                    <Label x={326} y={162} size={11}>After</Label>
                    <rect x={380} y={150} width={0.6 * 36} height={16} rx="3" fill={C.ok} opacity="0.85" />
                    <Label x={385 + 0.6 * 36} y={162} size={11} color={C.text}>0.6 %</Label>
                    <Label x={326} y={206} size={11} color={C.ok} weight={600}>The fix held.</Label>
                </g>
            )}
        </>
    )
}

export default function NcrExplainer() {
    return <Explainer steps={steps} Stage={Stage} mode="steps" ms={2800} note="Example values" label="An NG rate crosses its limit, an NCR is raised and moves through containment, investigation, action, verification and closing, then the reject rate before and after is compared." />
}

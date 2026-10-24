import Explainer from './Explainer.jsx'
import { C, Label, Line } from './parts.jsx'

const steps = [
    { title: 'Readings arrive by themselves', text: 'Measurements come from Vision, Connect or a gauge. Each subgroup is plotted the moment it completes.' },
    { title: 'Judged against locked limits', text: 'Every point is checked against the locked limits and the rules you enabled.' },
    { title: 'A pattern appears', text: 'Nine points in a row sit above the centre line. No point is outside the limits, but the process has shifted.' },
    { title: 'The rule fires', text: 'SPC flags the violation within seconds and notifies the right people.', fault: true },
    { title: 'Acknowledge and act', text: 'Quality acknowledges it with a cause and an action, and can raise an NCR in one step.' },
]

// Subgroup means in sigma units; points 11–19 are the shifted run.
const values = [0.4, -0.8, 0.2, 1.1, -0.5, -1.2, 0.6, -0.2, 0.9, -0.7, 0.1, 0.6, 0.9, 0.5, 1.2, 0.8, 1.4, 0.7, 1.1, 1.3]
const visibleAt = [8, 11, 20, 20, 20]
const X0 = 60
const DX = 24.5
const y = (v) => 128 - v * 26
const inRun = (i) => i >= 11

function Stage({ step }) {
    const n = visibleAt[step]
    const pts = values.slice(0, n)
    const runColor = step >= 3 ? C.ng : C.warn
    return (
        <>
            <Line d={`M${X0 - 10} 50 H540`} color={C.ng} dashed />
            <Line d={`M${X0 - 10} 128 H540`} color={C.line} />
            <Line d={`M${X0 - 10} 206 H540`} color={C.ng} dashed />
            <Label x={14} y={54}>UCL</Label>
            <Label x={14} y={132}>CL</Label>
            <Label x={14} y={210}>LCL</Label>
            <path d={pts.map((v, i) => `${i ? 'L' : 'M'}${X0 + i * DX} ${y(v)}`).join(' ')} fill="none" stroke={C.signal} strokeWidth="1.5" />
            {pts.map((v, i) => (
                <circle key={i} cx={X0 + i * DX} cy={y(v)} r="4.5"
                    fill={step >= 2 && inRun(i) ? runColor : C.signal} style={{ transition: 'fill 0.3s' }} />
            ))}
            {step >= 2 && (
                <rect x={X0 + 11 * DX - 10} y={y(1.4) - 14} width={8 * DX + 20} height={y(0.5) - y(1.4) + 28} rx="8"
                    fill="none" stroke={runColor} strokeDasharray="5 4" />
            )}
            {step >= 3 && (
                <g>
                    <rect x={300} y={222} width={240} height={26} rx="6" fill={step === 4 ? C.sunken : C.surface} stroke={step === 4 ? C.ok : C.ng} />
                    <Label x={420} y={239} anchor="middle" color={step === 4 ? C.ok : C.ng} weight={600} size={11.5}>
                        {step === 4 ? 'Acknowledged · cause: tool wear' : 'Rule 2: 9 points on one side'}
                    </Label>
                </g>
            )}
            <Label x={X0} y={244}>Subgroups →</Label>
        </>
    )
}

export default function SpcExplainer() {
    return <Explainer steps={steps} Stage={Stage} note="Example values" label="Control chart: points arrive, nine in a row above the centre line trigger rule 2, and the violation is acknowledged." />
}

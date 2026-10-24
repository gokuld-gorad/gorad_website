import Explainer from './Explainer.jsx'
import { Box, C, Label, Line, Pill } from './parts.jsx'

const steps = [
    { title: 'Print', text: 'The label for box 1 is printed at the packing station: part number, lot and quantity.' },
    { title: 'Read it back', text: 'A Gorad Vision station reads the printed codes and text with a camera.' },
    { title: 'Match: release', text: 'What was read matches what was expected, so the box is released and the check is recorded.' },
    { title: 'Mismatch: hold', text: 'On box 2 the label reads PN 4471-A, but 4471-B was expected. The box is held until the label is right.', fault: true },
]

function Stage({ step }) {
    const box2 = step === 3
    const read = step >= 1
    const pn = box2 ? 'PN 4471-A' : 'PN 4471-B'
    const ok = step === 2
    const bad = step === 3
    return (
        <>
            <Box x={14} y={70} w={110} h={70} label="Printer" sub="packing station" />
            <Line d="M124 105 H160" on />
            <g>
                <rect x={160} y={70} width={150} height={74} rx="4" fill="#ffffff" stroke={bad ? C.ng : ok ? C.ok : C.line} strokeWidth={bad || ok ? 2 : 1} style={{ transition: 'stroke 0.3s' }} />
                <text x={172} y={92} fontSize="12" fontWeight="700" fill="#15161a">{pn}</text>
                <text x={172} y={110} fontSize="10.5" fill="#555a66">Lot 17 · Qty 24</text>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                    <rect key={i} x={172 + i * 7.5} y={118} width={i % 3 === 0 ? 3 : 1.6} height={18} fill="#15161a" />
                ))}
            </g>
            {/* Camera */}
            <g opacity={read ? 1 : 0.4} style={{ transition: 'opacity 0.3s' }}>
                <rect x={208} y={14} width={54} height={30} rx="5" fill={C.surface} stroke={C.signal} strokeWidth="1.5" />
                <circle cx={235} cy={29} r="8" fill="none" stroke={C.signal} strokeWidth="1.5" />
                <path d="M222 44 L180 70 M248 44 L292 70" stroke={C.signal} strokeWidth="1" strokeDasharray="3 3" opacity={read ? 1 : 0} />
                <Label x={270} y={34} size={10.5}>Vision station</Label>
            </g>
            <Line d="M310 105 H372" on={step >= 2} color={bad ? C.ng : C.ok} />
            <Box x={372} y={70} w={150} h={74} label={box2 ? 'Box 2' : 'Box 1'} sub={bad ? 'held' : ok ? 'released' : 'waiting for check'}
                color={bad ? C.ng : ok ? C.ok : C.line} bold={ok || bad} />
            <Label x={160} y={178} size={11}>Expected</Label>
            <Label x={160} y={196} color={C.text} weight={600} size={12}>PN 4471-B · Lot 17 · Qty 24</Label>
            <Label x={160} y={222} size={11} color={read ? C.muted : 'transparent'}>Read</Label>
            <Label x={160} y={240} color={read ? (bad ? C.ng : C.text) : 'transparent'} weight={600} size={12}>{pn} · Lot 17 · Qty 24</Label>
            <Pill x={402} y={190} w={90} label={bad ? 'Held' : 'Released'} color={bad ? C.ng : C.ok} show={ok || bad} />
        </>
    )
}

export default function LabelExplainer() {
    return <Explainer steps={steps} Stage={Stage} ms={2600} note="Example label" label="A label is printed, read back by a camera and compared with the expected data; a match releases the box and a mismatch holds it." />
}

import Explainer from './Explainer.jsx'
import { Box, C, Label, Line, Pill } from './parts.jsx'

const steps = [
    { title: 'A machine stops', text: 'An operator presses the Andon on Press 3, or Line Performance records the downtime.', fault: true },
    { title: 'The order opens itself', text: 'A breakdown work order opens, linked to that stop. A second signal for the same stop joins it instead of opening another.' },
    { title: 'A technician takes it', text: 'On a phone or tablet, even without network. Changes made offline show as pending until they are sent.' },
    { title: 'Done, with the action taken', text: 'Every required checklist item is ticked and the action taken is recorded.' },
    { title: 'Verified', text: 'Press 3 is safety-critical, so the order closes only when a supervisor verifies it.' },
]

const stages = ['Andon call', 'Order opened', 'In progress', 'Done', 'Verified']
const detail = [
    ['Press 3 · stopped 10:42', 'Andon: breakdown'],
    ['WO-0193 · breakdown · Press 3', 'Linked to the 10:42 stop'],
    ['WO-0193 · assigned to technician', 'Working offline · 2 changes pending'],
    ['WO-0193 · done', 'Checklist complete · action: replaced valve'],
    ['WO-0193 · verified by supervisor', 'Closed · read-only'],
]

function Stage({ step }) {
    return (
        <>
            {stages.map((name, i) => (
                <g key={name}>
                    {i > 0 && <Line d={`M${10 + i * 110 - 10} 61 H${10 + i * 110}`} on={step >= i} />}
                    <Box x={10 + i * 110} y={40} w={100} h={42} label={name}
                        color={i === step ? (i === 0 ? C.warn : C.signal) : step > i ? C.ok : C.line}
                        bold={i === step} active={i <= step} />
                </g>
            ))}
            <rect x={60} y={120} width={440} height={96} rx="8" fill={C.surface} stroke={C.line} />
            <Label x={80} y={152} color={C.text} weight={700} size={13}>{detail[step][0]}</Label>
            <Label x={80} y={176} size={11.5}>{detail[step][1]}</Label>
            <Pill x={380} y={186} w={104} label="Offline" color={C.warn} show={step === 2} />
            <Pill x={380} y={186} w={104} label="Closed" color={C.ok} show={step === 4} />
        </>
    )
}

export default function MaintenanceExplainer() {
    return <Explainer steps={steps} Stage={Stage} mode="steps" ms={2800} note="Example order" label="A stop on Press 3 opens a breakdown work order, a technician works it offline, records the action, and a supervisor verifies it." />
}

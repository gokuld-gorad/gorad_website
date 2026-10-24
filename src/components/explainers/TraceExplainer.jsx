import Explainer from './Explainer.jsx'
import { Box, C, Label, Line } from './parts.jsx'

const steps = [
    { title: 'Every step is recorded', text: 'Lots are received, parts and assemblies are built from them, assemblies ship. Each link is scanned or recorded by Vision and Connect.' },
    { title: 'A problem is found', text: 'A bearing lot turns out to be defective. Quality flags it.', fault: true },
    { title: 'Follow it downstream', text: 'One query walks the genealogy and finds every part, assembly and shipment built from that lot.' },
    { title: 'Recall only what is affected', text: 'The recall report lists exactly what to hold or recall, and what is clear.' },
]

const W = 96
const nodes = {
    L17: { x: 10, y: 50, label: 'Steel lot L-17' },
    B03: { x: 10, y: 160, label: 'Bearing lot B-03' },
    P1: { x: 150, y: 20, label: 'Part 101' },
    P2: { x: 150, y: 80, label: 'Part 102' },
    P3: { x: 150, y: 140, label: 'Part 103' },
    P4: { x: 150, y: 200, label: 'Part 104' },
    A1: { x: 295, y: 50, label: 'Assembly A1' },
    A2: { x: 295, y: 115, label: 'Assembly A2' },
    A3: { x: 295, y: 180, label: 'Assembly A3' },
    S1: { x: 444, y: 80, label: 'Shipment S-881' },
    S2: { x: 444, y: 160, label: 'Shipment S-882' },
}
const edges = [['L17', 'P1'], ['L17', 'P2'], ['B03', 'P3'], ['B03', 'P4'], ['P1', 'A1'], ['P3', 'A1'], ['P2', 'A2'], ['P4', 'A3'], ['A2', 'S1'], ['A1', 'S2'], ['A3', 'S2']]
const affected = new Set(['B03', 'P3', 'P4', 'A1', 'A3', 'S2'])

function Stage({ step }) {
    const colorOf = (id) => {
        if (id === 'B03' && step >= 1) return C.ng
        if (step >= 2 && affected.has(id)) return C.ng
        if (step >= 3) return C.ok
        return C.line
    }
    return (
        <>
            {edges.map(([a, b]) => {
                const A = nodes[a]
                const B = nodes[b]
                const hot = step >= 2 && affected.has(a) && affected.has(b)
                const x1 = A.x + W
                const y1 = A.y + 17
                const y2 = B.y + 17
                return <Line key={a + b} d={`M${x1} ${y1} C ${x1 + 25} ${y1}, ${B.x - 25} ${y2}, ${B.x} ${y2}`} on={hot} color={C.ng} />
            })}
            {Object.entries(nodes).map(([id, n]) => (
                <Box key={id} x={n.x} y={n.y} w={W} h={34} label={n.label} color={colorOf(id)} bold={step >= 1 && colorOf(id) === C.ng} />
            ))}
            <Label x={280} y={250} anchor="middle" size={11.5} weight={600} color={step >= 3 ? C.text : 'transparent'}>
                Affected: 2 parts · 2 assemblies · shipment S-882. Shipment S-881 is clear.
            </Label>
        </>
    )
}

export default function TraceExplainer() {
    return <Explainer steps={steps} Stage={Stage} ms={2600} note="Example data" label="A genealogy from lots to parts, assemblies and shipments; a flagged bearing lot highlights the affected parts and one affected shipment." />
}

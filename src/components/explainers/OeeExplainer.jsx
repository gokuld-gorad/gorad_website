import Explainer from './Explainer.jsx'
import { C, Label } from './parts.jsx'

const steps = [
    { title: 'States come from the machine', text: 'Gorad Connect reads running and stopped straight from the PLC. Nobody fills in a sheet.' },
    { title: 'Every stop gets a reason', text: 'Operators pick a reason on the tablet. A stop nobody answered stays "unspecified" and goes to review.' },
    { title: 'Missing data stays missing', text: 'When the readings stop, that time is "no data". It is never counted as running.', fault: true },
    { title: 'One honest OEE', text: 'Availability × performance × quality, from those states, the part counts and the ideal cycle time.' },
]

// One 8-hour shift: [start h, end h, kind, reason]
const segments = [
    [0, 1.6, 'run'], [1.6, 2.1, 'stop', 'Changeover'], [2.1, 4.0, 'run'], [4.0, 4.5, 'stop', 'No material'],
    [4.5, 5.2, 'run'], [5.2, 5.8, 'nodata', 'No data'], [5.8, 6.2, 'stop', 'Unspecified'], [6.2, 8, 'run'],
]
const X0 = 40
const H = 60 // px per hour
const color = { run: C.ok, stop: C.warn, nodata: C.subtle }
const bars = [['Availability', 82], ['Performance', 91], ['Quality', 98], ['OEE', 73]]

function Stage({ step }) {
    return (
        <>
            <defs>
                <pattern id="oee-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect width="6" height="6" fill={C.sunken} />
                    <line x1="0" y1="0" x2="0" y2="6" stroke={C.subtle} strokeWidth="2" />
                </pattern>
            </defs>
            <Label x={X0} y={26} color={C.text} weight={600} size={12}>Line 2 · day shift</Label>
            {segments.map(([a, b, kind, reason], i) => {
                const x = X0 + a * H
                const w = (b - a) * H
                const showNoData = kind === 'nodata' && step >= 2
                const fill = kind === 'nodata' ? (showNoData ? 'url(#oee-hatch)' : C.sunken) : color[kind]
                return (
                    <g key={i}>
                        <rect x={x} y={36} width={w} height={34} fill={fill} opacity={kind === 'nodata' ? 1 : 0.85}
                            stroke={showNoData ? C.ng : 'none'} strokeWidth={showNoData ? 1.5 : 0} style={{ transition: 'all 0.3s' }} />
                        {((kind === 'stop' && step >= 1) || showNoData) && (
                            // "No data" sits above the bar so it never collides with the stop labels below.
                            <Label x={x + w / 2} y={kind === 'nodata' ? 30 : 88} anchor="middle" size={10} color={kind === 'nodata' ? C.ng : C.muted}
                                weight={reason === 'Unspecified' || kind === 'nodata' ? 600 : 400}>{reason}</Label>
                        )}
                    </g>
                )
            })}
            {[0, 2, 4, 6, 8].map((h) => (
                <Label key={h} x={X0 + h * H} y={104} anchor="middle" size={10} color={C.subtle}>{String(6 + h).padStart(2, '0')}:00</Label>
            ))}
            {bars.map(([name, pct], i) => {
                const yy = 130 + i * 30
                const isOee = name === 'OEE'
                return (
                    <g key={name} style={{ transition: 'opacity 0.4s' }} opacity={step >= 3 ? 1 : 0.15}>
                        <Label x={X0} y={yy + 14} color={C.text} weight={isOee ? 700 : 500} size={11.5}>{name}</Label>
                        <rect x={140} y={yy} width={360} height={18} rx="4" fill={C.sunken} />
                        <rect x={140} y={yy} width={pct * 3.6} height={18} rx="4" fill={isOee ? C.signal : C.ok} opacity={isOee ? 1 : 0.75}
                            style={{ transformBox: 'fill-box', transformOrigin: 'left', transform: `scaleX(${step >= 3 ? 1 : 0})`, transition: 'transform 0.6s ease-out' }} />
                        <Label x={510} y={yy + 14} color={C.text} weight={isOee ? 700 : 500} size={11.5}>{pct} %</Label>
                    </g>
                )
            })}
        </>
    )
}

export default function OeeExplainer() {
    return <Explainer steps={steps} Stage={Stage} ms={2700} note="Example values" label="A shift timeline with running, stopped and no-data periods, and the OEE built from availability, performance and quality." />
}

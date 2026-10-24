import Explainer from './Explainer.jsx'
import { Box, C, Label } from './parts.jsx'

const steps = [
    { title: 'Mounted on Press 1', text: 'Die D-12 is scanned onto Press 1. Every stroke from the press counter is added to the die.' },
    { title: 'Moved to Press 2', text: 'The die moves to Press 2 and keeps its count. Counts follow the tool, not the machine.' },
    { title: 'Warning limit', text: 'The count passes the warning limit. The toolroom is alerted once, so service can be planned.' },
    { title: 'Stop limit', text: 'The count passes the stop limit and stays latched until the die is serviced. Limits alert people; they do not stop the press.', fault: true },
    { title: 'Serviced and reset', text: 'A service record resets the count. The history and cost per part are kept.' },
]

const counts = [42000, 61000, 84000, 100400, 0]
const WARN = 80000
const STOP = 100000
const MAX = 120000
const X0 = 40
const BAR = 480

function Stage({ step }) {
    const count = counts[step]
    const onPress2 = step >= 1
    const state = count >= STOP ? 'stop' : count >= WARN ? 'warn' : 'ok'
    const fill = { ok: C.ok, warn: C.warn, stop: C.ng }[state]
    const xOf = (v) => X0 + (v / MAX) * BAR
    return (
        <>
            <Box x={40} y={20} w={180} h={56} label="Press 1" sub={onPress2 ? 'no tool' : 'Die D-12 mounted'} color={onPress2 ? C.line : C.signal} />
            <Box x={340} y={20} w={180} h={56} label="Press 2" sub={onPress2 ? 'Die D-12 mounted' : 'no tool'} color={onPress2 ? C.signal : C.line} />
            <g style={{ transform: `translateX(${onPress2 ? 300 : 0}px)`, transition: 'transform 0.8s ease-in-out' }}>
                <rect x={90} y={92} width={80} height={28} rx="5" fill={C.sunken} stroke={fill} strokeWidth="2" style={{ transition: 'stroke 0.3s' }} />
                <Label x={130} y={110} anchor="middle" color={C.text} weight={600} size={11.5}>Die D-12</Label>
            </g>
            <rect x={X0} y={168} width={BAR} height={20} rx="5" fill={C.sunken} />
            <rect x={X0} y={168} width={Math.max(0, xOf(count) - X0)} height={20} rx="5" fill={fill} opacity="0.85"
                style={{ transition: 'width 0.7s ease-out, fill 0.3s' }} />
            <line x1={xOf(WARN)} y1={158} x2={xOf(WARN)} y2={198} stroke={C.warn} strokeDasharray="4 3" strokeWidth="1.5" />
            <line x1={xOf(STOP)} y1={158} x2={xOf(STOP)} y2={198} stroke={C.ng} strokeDasharray="4 3" strokeWidth="1.5" />
            <Label x={xOf(WARN)} y={152} anchor="middle" size={10} color={C.warn}>warning 80k</Label>
            <Label x={xOf(STOP)} y={152} anchor="middle" size={10} color={C.ng}>stop 100k</Label>
            <Label x={X0} y={224} color={C.text} weight={700} size={14}>{count.toLocaleString('en-US')} strokes</Label>
            <Label x={520} y={224} anchor="end" weight={600} size={11.5} color={fill}>
                {state === 'stop' ? 'Stop limit reached · latched' : state === 'warn' ? 'Warning sent' : step === 4 ? 'Serviced · count reset' : 'Within life'}
            </Label>
        </>
    )
}

export default function ToolLifeExplainer() {
    return <Explainer steps={steps} Stage={Stage} ms={2600} note="Example values" label="A die moves from Press 1 to Press 2 keeping its stroke count, passes the warning and stop limits, and is reset by a service." />
}

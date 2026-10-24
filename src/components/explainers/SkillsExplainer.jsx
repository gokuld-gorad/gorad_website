import Explainer from './Explainer.jsx'
import { Box, C, Label, Line } from './parts.jsx'

const steps = [
    { title: 'A person signs in at a station', text: 'On the run screen, at changeover or on the line tablet. Never during inspection.' },
    { title: 'The station rules are checked', text: 'Station 4 needs "Press operation" at level qualified. The check uses the qualification valid at that moment.' },
    { title: 'Allowed', text: 'A valid qualification at the right level: the person starts work.' },
    { title: 'Refused', text: 'Missing, expired or too low a level: the person sees why.', fault: true },
    { title: 'Override', text: 'A supervisor can allow one person at one station for a limited time (12 hours by default), with a reason. Every override is audited.' },
]

function Stage() {
    return (
        <>
            <Box x={10} y={104} w={110} h={52} label="Sign-in" sub="Station 4" color={C.signal} />
            <Line d="M120 130 H170" />
            <Box x={170} y={92} w={150} h={76} label="Station rule" sub="Press operation · qualified" color={C.signal} />
            <Line d="M320 130 C 345 130, 345 50, 370 50" color={C.ok} />
            <Line d="M320 130 H370" color={C.ng} />
            <Line d="M320 130 C 345 130, 345 210, 370 210" color={C.warn} />
            <Box x={370} y={26} w={180} h={48} label="Allowed" sub="valid qualification" color={C.ok} bold />
            <Box x={370} y={106} w={180} h={48} label="Refused" sub="missing · expired · too low" color={C.ng} bold />
            <Box x={370} y={186} w={180} h={48} label="Override" sub="supervisor · up to 12 h · audited" color={C.warn} bold />
            <Label x={10} y={250} size={10.5}>Works offline: the answer stays valid for a set window if the server cannot be reached.</Label>
        </>
    )
}

export default function SkillsExplainer() {
    return <Explainer steps={steps} Stage={Stage} mode="static" label="A sign-in at Station 4 is checked against the station rule and is allowed, refused, or overridden by a supervisor for a limited time." />
}

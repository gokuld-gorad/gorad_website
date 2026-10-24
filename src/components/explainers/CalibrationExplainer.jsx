import Explainer from './Explainer.jsx'
import { Box, C, Label, Line } from './parts.jsx'

const steps = [
    { title: 'Registered', text: 'A new gauge that has never been calibrated counts as overdue from the day it is registered.' },
    { title: 'In service', text: 'After a passing calibration, the gauge is usable until its next due date.' },
    { title: 'Due', text: 'From 14 days before the due date (adjustable), quality gets a reminder. The gauge is still usable.' },
    { title: 'Overdue', text: 'After the due date the gauge is not usable, and SPC knows it.', fault: true },
    { title: 'Failed, quarantined', text: 'A failed calibration takes the gauge out of use. A passing calibration alone does not bring it back: quality has to return it to service.', fault: true },
]

function Stage() {
    return (
        <>
            <Box x={20} y={20} w={120} h={46} label="Registered" sub="never calibrated" />
            <Line d="M140 43 C 300 43, 430 43, 450 100" color={C.ng} />
            <Label x={260} y={36} size={10.5} anchor="middle">no calibration yet</Label>

            <Box x={20} y={110} w={120} h={46} label="In service" sub="usable" color={C.ok} bold />
            <Line d="M140 140 H230" color={C.warn} />
            <Box x={230} y={110} w={120} h={46} label="Due" sub="usable · reminder" color={C.warn} bold />
            <Line d="M350 140 H420" color={C.ng} />
            <Box x={420} y={110} w={120} h={46} label="Overdue" sub="not usable" color={C.ng} bold />
            <Label x={185} y={124} size={10} anchor="middle">14 days</Label>
            <Label x={385} y={124} size={10} anchor="middle">due date</Label>

            <Line d="M80 156 V 205 H230" color={C.ng} />
            <Label x={90} y={196} size={10.5}>calibration fails</Label>
            <Box x={230} y={186} w={160} h={46} label="Quarantined" sub="failed · not usable" color={C.ng} bold />
            <Line d="M390 209 H470 V 242 H 30 V 150" color={C.ok} dashed />
            <Label x={250} y={256} size={10.5} anchor="middle">pass, then quality returns it to service</Label>
        </>
    )
}

export default function CalibrationExplainer() {
    return <Explainer steps={steps} Stage={Stage} mode="static" label="Gauge states: registered gauges are overdue until calibrated; in service, then due, then overdue; a failed calibration quarantines the gauge until quality returns it to service." />
}

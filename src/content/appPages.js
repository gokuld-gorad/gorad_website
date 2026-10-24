import { appIndex } from './appIndex.js'

// One entry per app page. Every claim comes from the platform's docs/apps/<app>.md.
// Plain JS (no JSX): routes.js reads it to build the page list.
export const APP_STATUS_NOTE =
    'Early access. Built and tested in software, not yet proven on a plant line. Available to pilot plants.'

const details = [
    {
        slug: 'spc',
        lead: 'SPC fed automatically by Gorad Vision measurements and PLC tags through Gorad Connect, plus manual gauge entry. Out-of-control conditions are flagged within seconds, against locked limits you can defend in an audit.',
        problem: 'Measurements sit in spreadsheets and gauges, charts are drawn after the fact, and a drift is found when the parts are already made.',
        features: [
            { title: 'Data arrives by itself', text: 'Vision measurements and verdicts, Connect tags and manual gauge readings feed the same characteristics.' },
            { title: 'The charts you expect', text: 'Variable, attribute and defect charts (R, S and MR dispersion; p, np, c and u), EWMA, CUSUM, and short-run DNOM and Z-MR.' },
            { title: 'Rules in seconds', text: 'Each subgroup is judged as soon as it completes, with Western Electric 1–4 and Nelson 1–8 rules.' },
            { title: 'Locked limits', text: 'Limits are previewed, then locked by quality with a reason and re-authentication. Every lock is a new, audited revision.' },
            { title: 'Capability', text: 'Cp, Cpk, Pp and Ppk with 95 % intervals and a normality test, with a warning when there is too little data.' },
            { title: 'Act on violations', text: 'The right roles are notified, acknowledge with a cause code and an action, and can raise an NCR in one step.' },
        ],
        rules: [
            'Nothing is judged until limits are locked.',
            'A subgroup never spans a program version or a shift change.',
            'A short-run reading for an unknown part is refused, never guessed.',
            'SPC only reads published results. It never touches the inspection path.',
        ],
        worksWith: ['vision', 'connect', 'ncr-capa', 'calibration-msa'],
        reports: 'Characteristic report and audit pack',
    },
    {
        slug: 'ncr-capa',
        lead: 'Raise NCRs by hand or automatically from Vision and SPC, work them through containment, investigation and corrective action with an 8D template, and check whether the fix worked.',
        problem: 'Rejects are counted, but the link from a reject to its cause, its action and its proof lives in emails and memory.',
        features: [
            { title: 'Raised from the line', text: 'Rules raise an NCR from a count of NG results, an NG rate above your limit, or an SPC violation. Rules are off until quality turns them on.' },
            { title: '8D, versioned', text: 'Each NCR copies the active template when it is created, so a new template never changes open NCRs.' },
            { title: 'A real workflow', text: 'Draft, open, contained, investigating, corrective action, verification and closed, with guards at every step.' },
            { title: 'Evidence attached', text: 'Files, Vision images and SPC references stay with the NCR.' },
            { title: 'Did it go away?', text: 'After closing, NCR compares reject rates before the NCR and after the fix.' },
            { title: 'Reminders', text: 'Owners and quality are notified on assignment, closing and when an NCR is overdue.' },
        ],
        rules: [
            'Containment comes before investigation, and closing needs every required step and a disposition.',
            'Closed NCRs are read-only. Reopening needs a reason and is counted.',
            'Use-as-is needs a concession reference.',
            'NCR never changes a verdict and never writes to a PLC.',
        ],
        worksWith: ['vision', 'spc', 'traceability'],
        reports: 'The NCR record and the NCR register, in PDF and Excel',
    },
    {
        slug: 'calibration-msa',
        lead: 'A gauge register, a calibration due list and Gauge R&R studies, with gauge status shared with SPC.',
        problem: 'Calibration dates live in a spreadsheet, an overdue gauge is still in use, and Gauge R&R studies are done once and lost.',
        features: [
            { title: 'Gauge register', text: 'Every gauge with its calibrations, as-found and as-left values and certificates.' },
            { title: 'Due list', text: 'Gauges due and overdue, with reminders to quality before the date.' },
            { title: 'Quarantine', text: 'A failed calibration takes the gauge out of use until quality puts it back.' },
            { title: 'Gauge R&R', text: 'Crossed studies with ANOVA or average-and-range: %GRR, %EV, %AV, number of distinct categories and a verdict.' },
            { title: 'Shared with SPC', text: 'SPC knows when a gauge is not usable.' },
        ],
        rules: [
            'A gauge that has never been calibrated is overdue from the day it is registered.',
            'A passing calibration never lifts a quarantine by itself.',
            'Gauge R&R follows the AIAG MSA reference behaviour. It is a statistical aid, not a certification.',
        ],
        worksWith: ['spc'],
        reports: 'Gauge record, register, due list and study, in PDF and Excel',
    },
    {
        slug: 'line-performance',
        lead: 'Andon, OEE with drill-down and downtime, from machine signals read by Gorad Connect, with quality from part counts or Vision verdicts.',
        problem: 'OEE is calculated by hand after the shift, missing data is quietly counted as running, and nobody agrees on the number.',
        features: [
            { title: 'Live line view', text: 'Machine states and Andon calls as they happen, on a screen, a tablet or a TV board.' },
            { title: 'Andon', text: 'Calls from a PLC button or the tablet, with escalation when nobody responds.' },
            { title: 'Downtime with reasons', text: 'Every stop gets a reason. Stops nobody answered become "unspecified" and go to a review queue.' },
            { title: 'OEE with drill-down', text: 'Availability, performance and quality per line and shift, with ideal cycle times per part.' },
            { title: 'Governed policies', text: 'Plant policies are versioned. Changing them or recomputing a past shift needs a reason and re-authentication.' },
        ],
        rules: [
            'Missing or bad data is "no data", never counted as running.',
            'A missing ideal cycle makes the result incomplete, never 0 % or 100 %.',
            'Each line has one quality source, so rejects are never counted twice.',
            'Line Performance never writes to a PLC.',
        ],
        worksWith: ['connect', 'vision', 'maintenance'],
        reports: 'Shift report in PDF and Excel',
    },
    {
        slug: 'maintenance',
        lead: 'Work orders, preventive maintenance plans and spares, with breakdown orders opened from Line Performance or a Connect fault signal, and a technician page that works offline.',
        problem: 'Breakdowns are reported by phone, PM is tracked on paper, and the spare part is never in stock when it is needed.',
        features: [
            { title: 'Breakdowns open themselves', text: 'An Andon call, a downtime or a PLC fault signal opens a work order. One stop is one order.' },
            { title: 'Preventive maintenance', text: 'PM plans by calendar, usage or condition, with a tolerance window, checked automatically.' },
            { title: 'Spares', text: 'A spares register with stock moves. Stock can never go below zero.' },
            { title: 'Technician page', text: 'Works offline on a phone or tablet and can be installed like an app. Queued changes show as pending.' },
            { title: 'Safety-critical assets', text: 'Their orders close only when a supervisor verifies them.' },
        ],
        rules: [
            'One breakdown source per site, so one stop never opens two orders.',
            'Putting an order on hold, cancelling or reopening it needs a reason.',
            'Finishing needs every required checklist item and, for a breakdown, the action taken.',
            'Closed orders are read-only.',
        ],
        worksWith: ['line-performance', 'connect', 'tool-life'],
        reports: 'Period report in PDF and Excel',
    },
    {
        slug: 'tool-life',
        lead: 'Stroke and shot counts for tools, dies, moulds and fixtures, read from PLC counters through Gorad Connect, with warning and stop limits, service records and cost per part.',
        problem: 'Tool life is estimated, counters are reset by hand, and a die runs past its limit because nobody was watching the count.',
        features: [
            { title: 'Counts follow the tool', text: 'Strokes belong to the tool mounted at that moment, multiplied by its cavities, and stay with it when it moves between presses.' },
            { title: 'Mount by scan', text: 'Mount, replace and move tools by scanning their QR code.' },
            { title: 'Warning and stop limits', text: 'Each limit alerts once and stays latched until a service resets it.' },
            { title: 'Exact history', text: 'Correcting a mount time later recomputes the counts exactly.' },
            { title: 'Cost per part', text: 'What each tool costs per part made.' },
        ],
        rules: [
            'Only the configured counter counts. Bad, stale or reset readings never do.',
            'Mounts never overlap, on a machine or for a tool.',
            'Limits alert people. They do not stop the press.',
        ],
        worksWith: ['connect', 'maintenance'],
        reports: 'Cost-per-part report in CSV, PDF and Excel',
    },
    {
        slug: 'traceability',
        lead: 'Part genealogy across stations, from receiving to shipping, with Vision results and process data linked to each item.',
        problem: 'When a problem is found, nobody can say quickly which parts, batches and shipments are affected, so the recall is either too big or too small.',
        features: [
            { title: 'Receive, build, ship', text: 'Lots in, work in progress, shipments out, with parent-child links between items.' },
            { title: 'Scan as you go', text: 'Barcodes are scanned at each step, including with a tablet or phone camera.' },
            { title: 'Inspection linked', text: 'Each item points to its Vision results: station, cycle and views.' },
            { title: 'Process data linked', text: 'A snapshot of the PLC values at the time, from Gorad Connect.' },
            { title: 'Recall scope', text: 'Flag an item and see everything upstream and downstream of it.' },
        ],
        rules: [
            'Nothing is deleted. Shipped items stay on record.',
            'Repeated scans change nothing.',
            'An item can never become its own ancestor.',
            'Every record shows how it was captured: scan, Connect, Vision or by hand.',
        ],
        worksWith: ['vision', 'connect', 'label-dispatch', 'ncr-capa'],
        reports: 'Recall report in PDF and Excel',
    },
    {
        slug: 'label-dispatch',
        lead: 'Print labels at packing and verify them with a Gorad Vision station before the box ships.',
        problem: 'Labels are printed by hand, checked by eye, and a wrong label is found by the customer.',
        features: [
            { title: 'Templates and printing', text: 'Label templates printed to industrial label printers over the network.' },
            { title: 'Pack check', text: 'A Vision station reads codes and text and counts items, with every Vision safety rule.' },
            { title: 'Packing lists and records', text: 'Every check is recorded against what was expected.' },
            { title: 'Printer status', text: 'The printer is watched. An unknown status is never treated as ready.' },
            { title: 'Linked', text: 'Serials are registered in Traceability, and failures can raise an NCR.' },
        ],
        rules: [
            'A pack check is OK only for an explicit OK verdict against the current expectation.',
            'GS1 field types are supported. GS1 compliance is not claimed; check your sector’s rules.',
            'The server never writes to a PLC.',
        ],
        worksWith: ['vision', 'traceability', 'ncr-capa'],
        reports: 'Pack-check records',
    },
    {
        slug: 'skills',
        lead: 'A skill matrix, qualifications with levels and expiry dates, training records, and a check when a person signs in at a station.',
        problem: 'Who is qualified for which station lives in a spreadsheet, qualifications expire unnoticed, and an auditor’s question takes a day to answer.',
        features: [
            { title: 'Skill matrix', text: 'People and skills, with levels: in training, supervised, qualified and trainer.' },
            { title: 'Station rules', text: 'Each station lists the skills and levels it needs.' },
            { title: 'Sign-in check', text: 'When a person starts work at a station, on the run screen, at changeover or on the line tablet.' },
            { title: 'Expiry reminders', text: 'Before a qualification runs out.' },
            { title: 'Overrides', text: 'A supervisor can let someone work at one station for a limited time, with a reason. Every override is audited.' },
        ],
        rules: [
            'The check runs at sign-in, never during inspection.',
            'It never blocks production indefinitely: answers keep working offline for a set window.',
            'History is never edited, so "who was qualified on 1 September?" has an answer.',
        ],
        worksWith: ['vision', 'line-performance'],
        reports: 'Matrix, expiries and station audit, in PDF and Excel',
    },
]

// Full page content: the index fields plus the details above.
export const appPages = appIndex.map((a) => ({ ...a, ...details.find((d) => d.slug === a.slug) }))

export function findAppPage(slug) {
    return appPages.find((a) => a.slug === slug)
}

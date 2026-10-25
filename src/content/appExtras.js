// Per-app content for the plain-language layer of each app page: an everyday
// example, buyer-facing advantages, FAQs and the technical terms the page uses
// (keys of src/content/glossary.js). Claims stay within the platform's docs/apps.
export const appExtras = {
    spc: {
        plain: 'Like the fuel gauge in a car, which warns you before the tank is empty, SPC watches your measurements and warns you when the process starts to drift, before parts go out of tolerance.',
        advantages: [
            { title: 'Catch drift before scrap', text: 'A shift in the process is flagged while parts are still good.' },
            { title: 'No manual charting', text: 'Measurements arrive from inspection, machines or gauges by themselves.' },
            { title: 'Ready for audits', text: 'Locked limits, every revision recorded, and an audit pack per characteristic.' },
            { title: 'Know your capability', text: 'Cp and Cpk with confidence intervals, so you know how good the process really is.' },
            { title: 'Act straight away', text: 'The right people are notified, and an NCR is one step away.' },
        ],
        faqs: [
            { q: 'Do we have to enter measurements by hand?', a: 'No. Measurements from Gorad Vision and machine values from Gorad Connect arrive automatically. Manual entry is there for hand gauges.' },
            { q: 'Which rules does it check?', a: 'Western Electric rules 1–4 and Nelson rules 1–8 on the main chart, plus EWMA and CUSUM charts for small, slow shifts.' },
            { q: 'Can anyone change the control limits?', a: 'No. Quality locks the limits with a reason and by confirming their password. Each lock is a new, recorded revision.' },
            { q: 'We make many part numbers in short runs. Does SPC still work?', a: 'Yes. Short-run charts (DNOM and Z-MR) let different part numbers share one chart against their own nominal values.' },
        ],
        terms: ['SPC', 'Control limits', 'Subgroup', 'Nelson rules', 'Cp / Cpk', 'EWMA / CUSUM'],
    },
    'ncr-capa': {
        plain: 'An NCR is the case file for a problem, like a patient file at a hospital: what happened, how it was contained, what caused it, what was done about it, and proof that the cure worked.',
        advantages: [
            { title: 'Problems don’t slip through the cracks', text: 'Rules raise an NCR from inspection or SPC as soon as a limit is crossed.' },
            { title: 'One proven method', text: 'Every NCR follows the 8D steps, from forming the team to preventing a repeat.' },
            { title: 'Evidence in one place', text: 'Images, measurements and files stay attached to the NCR.' },
            { title: 'Proof the fix worked', text: 'Reject rates before and after the fix are compared for you.' },
            { title: 'Reports ready to share', text: 'The NCR record and register in PDF and Excel.' },
        ],
        faqs: [
            { q: 'Can NCRs be raised automatically?', a: 'Yes, by rules: a number of rejects, a reject rate above your limit, or an SPC violation. Rules are off until quality switches them on.' },
            { q: 'Do we have to use 8D?', a: '8D is the default template. Templates are versioned, so a new version never changes NCRs that are already open.' },
            { q: 'Can a closed NCR be edited?', a: 'No. Closed NCRs are read-only. Reopening one needs a reason and is counted.' },
            { q: 'Can an NCR change an inspection result?', a: 'No. NCR only reads results. It never changes a verdict or sends anything to a PLC.' },
        ],
        terms: ['NCR', 'CAPA', '8D', 'Containment', 'Disposition', 'Concession'],
    },
    'calibration-msa': {
        plain: 'A gauge is like a kitchen scale: if it is off, every measurement you take is off. Calibration checks the scale against a known weight. MSA checks whether the whole measuring process, gauge and people together, is good enough to trust.',
        advantages: [
            { title: 'No overdue gauge in use by accident', text: 'Due dates are tracked and quality is reminded before they pass.' },
            { title: 'Failed gauges taken out of use', text: 'A failed calibration quarantines the gauge until quality puts it back.' },
            { title: 'Gauge R&R without spreadsheets', text: 'Set up the study, enter readings, and get the result and verdict.' },
            { title: 'SPC knows', text: 'SPC is told when a gauge is not usable.' },
            { title: 'Certificates in one place', text: 'Every calibration with its certificate, as-found and as-left values.' },
        ],
        faqs: [
            { q: 'What happens when a calibration fails?', a: 'The gauge is quarantined. A later passing calibration does not release it by itself; quality must return it to service.' },
            { q: 'Which Gauge R&R methods are used?', a: 'ANOVA and the average-and-range method, following the AIAG MSA reference behaviour.' },
            { q: 'Is the Gauge R&R result a certification?', a: 'No. It is a statistical aid to decide whether a measurement system is good enough.' },
            { q: 'What about a gauge that has never been calibrated?', a: 'It counts as overdue from the day it is registered.' },
        ],
        terms: ['Calibration', 'MSA', 'Gauge R&R', '%GRR', 'ndc', 'Quarantine'],
    },
    'line-performance': {
        plain: 'OEE answers one question: of all the good parts this machine could have made today, how many did it actually make? Line Performance works that out from the machine’s own signals and shows where the rest were lost.',
        advantages: [
            { title: 'Real numbers, not guesses', text: 'States and counts come from the machine, not from a sheet filled in at the end of the shift.' },
            { title: 'See losses as they happen', text: 'Live line view and Andon calls on screens, tablets and TV boards.' },
            { title: 'A reason for every stop', text: 'Stops get a reason; unanswered ones go to a review queue.' },
            { title: 'Honest about missing data', text: 'Time without readings is shown as “no data”, never counted as running.' },
            { title: 'Shift reports, done', text: 'A shift report in PDF and Excel at the end of every shift.' },
        ],
        faqs: [
            { q: 'Where does the data come from?', a: 'Machine states and counts come from your PLCs through Gorad Connect. Quality comes from good and reject counts, or from Gorad Vision verdicts.' },
            { q: 'What if the readings stop for a while?', a: 'That time is shown as “no data”. It is never counted as running, so OEE is never flattered.' },
            { q: 'What if we don’t know the ideal cycle time?', a: 'The result is marked incomplete instead of showing 0 % or 100 %. You can set ideal cycle times per machine and per part.' },
            { q: 'Does it control the machine?', a: 'No. Line Performance never writes to a PLC.' },
        ],
        terms: ['OEE', 'Availability', 'Performance', 'Andon', 'Ideal cycle time', 'Downtime'],
    },
    maintenance: {
        plain: 'Instead of a phone call and a paper note when a machine breaks down, a work order opens itself the moment the machine stops. And planned maintenance reminds you before parts wear out, not after.',
        advantages: [
            { title: 'Breakdowns logged automatically', text: 'An Andon call, a recorded stop or a machine fault signal opens the order.' },
            { title: 'Planned maintenance on time', text: 'Plans by date, by usage or by condition, checked automatically.' },
            { title: 'Spares under control', text: 'Stock moves recorded, and stock can never go below zero.' },
            { title: 'Works on the shop floor', text: 'The technician page works offline on a phone or tablet.' },
            { title: 'Safe sign-off', text: 'Work on safety-critical machines closes only after a supervisor verifies it.' },
        ],
        faqs: [
            { q: 'How are breakdown orders created?', a: 'From Line Performance (an Andon call or a recorded stop), or from a machine fault signal through Gorad Connect. Each site picks one source, so one stop never opens two orders.' },
            { q: 'Do we need Line Performance?', a: 'No. Without it, breakdowns can come from a fault signal through Connect, or orders can be opened by hand.' },
            { q: 'Can technicians work without network?', a: 'Yes. The technician page works offline and shows changes as pending until they are sent.' },
            { q: 'What kinds of preventive maintenance are supported?', a: 'Calendar plans, usage plans (for example running hours or strokes) and condition plans, each with a tolerance window.' },
        ],
        terms: ['Work order', 'Preventive maintenance', 'Breakdown', 'MTBF / MTTR', 'Safety-critical asset'],
    },
    'tool-life': {
        plain: 'A press die or a mould can only make so many parts before it needs servicing, like the tyres on a car. Tool Life counts every stroke for the tool actually mounted, warns you before the limit, and shows what each tool costs per part.',
        advantages: [
            { title: 'An exact count per tool', text: 'Counts follow the tool from press to press, not the machine.' },
            { title: 'Service at the right time', text: 'A warning before the limit, and a stop alert at it.' },
            { title: 'No limit forgotten', text: 'Alerts stay on until the tool is serviced.' },
            { title: 'Mistakes can be corrected', text: 'Fix a mount time later and the counts are recalculated exactly.' },
            { title: 'Know the cost per part', text: 'What each tool really costs per part made.' },
        ],
        faqs: [
            { q: 'Where do the counts come from?', a: 'From the machine’s stroke or shot counter, read by Gorad Connect. Bad, stale or reset readings are never counted.' },
            { q: 'What about moulds with several cavities?', a: 'Each stroke is multiplied by the number of cavities, so tool life is counted in parts.' },
            { q: 'Will it stop the press at the limit?', a: 'No. Limits alert people; they do not stop the machine.' },
            { q: 'What if someone forgot to scan a tool when mounting it?', a: 'The mount can be entered afterwards, and it claims the strokes counted while it was missing.' },
        ],
        terms: ['Stroke / shot', 'Cavities', 'Mount', 'Warning and stop limits', 'Cost per part'],
    },
    traceability: {
        plain: 'Traceability is a family tree for your parts: which batches went into which part, which parts into which assembly, which assembly into which shipment. When a batch turns out bad, you follow the tree and find exactly what is affected.',
        advantages: [
            { title: 'Recall only what you must', text: 'See exactly which parts, assemblies and shipments are affected.' },
            { title: 'Inspection evidence per part', text: 'Each item points to its inspection result and camera views.' },
            { title: 'Process data per part', text: 'A snapshot of the machine values when the part was made.' },
            { title: 'Fast capture', text: 'Scan at each step, including with a phone or tablet camera.' },
            { title: 'Nothing is lost', text: 'Records are never deleted, even after shipping.' },
        ],
        faqs: [
            { q: 'How is data captured?', a: 'By scanning barcodes, by hand, and automatically from Gorad Vision and Gorad Connect. Every record shows how it was captured.' },
            { q: 'Can records be deleted?', a: 'No. There is no delete. Shipped items stay on record for as long as you need them.' },
            { q: 'Do we need Gorad Vision to use it?', a: 'No. Traceability works on its own. With Vision, each part also links to its inspection images.' },
            { q: 'What does the recall report show?', a: 'Everything upstream and downstream of a flagged item, in PDF and Excel.' },
        ],
        terms: ['Genealogy', 'Lot', 'Recall', 'Upstream / downstream'],
    },
    'label-dispatch': {
        plain: 'Like a cashier checking the price tag before you leave the shop, Label & Dispatch checks every label with a camera before the box ships. A wrong label is caught at packing, not by your customer.',
        advantages: [
            { title: 'Wrong labels caught at packing', text: 'The printed label is read back and must match what was expected.' },
            { title: 'Printer problems caught early', text: 'An unknown printer status is never treated as ready.' },
            { title: 'Every box on record', text: 'Each check is recorded against the packing list.' },
            { title: 'Same safety rules as inspection', text: 'The check runs on a Gorad Vision station, so a fault never passes a box.' },
            { title: 'Linked to traceability', text: 'Serials are registered in Traceability; failures can raise an NCR.' },
        ],
        faqs: [
            { q: 'Which label printers work with it?', a: 'Industrial label printers that accept ZPL over the network.' },
            { q: 'Is it GS1 compliant?', a: 'GS1 field types are supported, but GS1 compliance is not claimed. Check your customer’s or sector’s rules.' },
            { q: 'Do we need a Gorad Vision station?', a: 'Yes. The pack check is an inspection, so it runs on a Vision station with all its safety rules.' },
            { q: 'What happens on a mismatch?', a: 'The box is held until the label is right, and the failed check is recorded.' },
        ],
        terms: ['ZPL', 'GS1', 'Pack check', 'Serial number'],
    },
    skills: {
        plain: 'Like a driving licence for each station: before someone starts work, the system checks that they hold the right “licence” for that job, at the right level, and that it has not expired.',
        advantages: [
            { title: 'The right person at the right station', text: 'Checked automatically at sign-in.' },
            { title: 'No expired qualifications', text: 'Reminders go out before a qualification runs out.' },
            { title: 'Audit answers in seconds', text: '“Who was qualified at Station 4 on 1 September?” has a recorded answer.' },
            { title: 'Flexible when needed', text: 'A supervisor can allow a person for a limited time, with a reason.' },
            { title: 'Never stops the line', text: 'Answers keep working offline, and the check never runs during inspection.' },
        ],
        faqs: [
            { q: 'What if the server can’t be reached?', a: 'The station keeps the last answer for a set window (12 hours by default), so work continues.' },
            { q: 'Can a supervisor let someone work anyway?', a: 'Yes, for one person at one station for a limited time, with a reason. Supervisors cannot override for themselves, and every override is audited.' },
            { q: 'Does it slow down inspection?', a: 'No. The check runs when a person signs in, never per part.' },
            { q: 'What levels are there?', a: 'In training, supervised, qualified and trainer. Each station rule sets the minimum level.' },
        ],
        terms: ['Skill matrix', 'Qualification level', 'Override', 'Station rule'],
    },
}

// App catalogue. Status words are deliberate: nothing is "ready" until bench
// evidence exists (platform decision D-052).
export const STATUS = {
    early: { label: 'Early access', tone: 'signal' },
    planned: { label: 'Planned', tone: 'neutral' },
}

export const appGroups = [
    {
        name: 'Quality',
        apps: [
            { name: 'SPC', slug: 'spc', text: 'Real-time statistical process control from automatic measurements, with characteristic reports and an audit pack.', status: 'early' },
            { name: 'NCR / CAPA', slug: 'ncr-capa', text: 'Non-conformances and 8D, raised straight from Vision or SPC, with PDF and Excel reports.', status: 'early' },
            { name: 'Calibration & MSA', slug: 'calibration-msa', text: 'Gauge register, calibration due list and Gauge R&R studies.', status: 'early' },
        ],
    },
    {
        name: 'Production',
        apps: [
            { name: 'Line Performance', slug: 'line-performance', text: 'Andon, OEE with drill-down and downtime tracking, with shift reports in PDF and Excel.', status: 'early' },
            { name: 'Maintenance', slug: 'maintenance', text: 'Work orders, PM plans and spares, with a technician page that works offline.', status: 'early' },
            { name: 'Tool & Fixture Life', slug: 'tool-life', text: 'Stroke and shot counts, limits and PM triggers, with a cost-per-part report.', status: 'early' },
        ],
    },
    {
        name: 'Compliance & logistics',
        apps: [
            { name: 'Traceability', slug: 'traceability', text: 'Part genealogy across stations, from receiving to shipping, with a recall report.', status: 'early' },
            { name: 'Label & Dispatch', slug: 'label-dispatch', text: 'Print labels at packing and verify them with a camera before the box ships.', status: 'early' },
            { name: 'Skills & Training', slug: 'skills', text: 'A skill matrix, with a sign-in check on the station before a run starts.', status: 'early' },
            { name: 'Energy & Carbon', text: 'Energy use and carbon reporting for exporters. Built with a methodology partner.', status: 'planned' },
        ],
    },
]

// Industries: generic sectors first, specific example parts inside them. Examples
// link to the use cases; sectors without a published example say so honestly.
export const capabilities = [
    { title: 'Defects and surface damage', text: 'Cracks, chips, dents, scratches, voids and anything that does not look like a good part.' },
    { title: 'Presence and count', text: 'Is every component, feature or item there, and how many are there?' },
    { title: 'Measurement', text: 'Sizes, gaps, positions and percentages, checked against your limits.' },
    { title: 'Codes and text', text: 'Barcodes, data matrix codes and printed or engraved text, read and checked.' },
    { title: 'Variant and orientation', text: 'The right variant for the batch, the right way round, in the right place.' },
    { title: 'Sorting and classification', text: 'Put each part or defect into the right category.' },
]

export const industries = [
    {
        slug: 'automotive',
        icon: 'car',
        name: 'Automotive & components',
        short: 'Engine, drivetrain and emission parts, forged, cast or machined.',
        lead: 'Automotive parts go into vehicles in their millions, and one escape can mean a recall. Gorad inspects every part, records every decision, and links the results to the rest of your quality system.',
        challenges: [
            'Defects can appear anywhere on complex forged, cast or machined parts',
            'Customers expect proof of inspection for every part, not just a sample',
            'Manual inspection cannot keep up with line speed, shift after shift',
        ],
        inspect: ['Defects and surface damage', 'Presence and count', 'Measurement', 'Codes and text'],
        examples: ['connecting-rod', 'catalyst-blockage', 'bearing-pin-count'],
        apps: ['spc', 'traceability', 'tool-life', 'line-performance'],
        description: 'AI visual inspection for automotive components: connecting rods, catalysts and filters, bearings and more, with traceability and SPC on the same platform.',
    },
    {
        slug: 'electronics',
        icon: 'cpu',
        name: 'Electronics & power electronics',
        short: 'PCB assemblies, power modules and electronic sub-assemblies.',
        lead: 'Small parts, many variants and a single wrong component can fail in the field. Gorad checks presence, position, polarity and variant on every board and module, and keeps the result per serial number.',
        challenges: [
            'Many board variants run on the same line',
            'A reversed or missing component is easy to miss by eye',
            'Each board needs its own record for traceability',
        ],
        inspect: ['Presence and count', 'Variant and orientation', 'Codes and text', 'Defects and surface damage'],
        examples: ['pcb-assembly', 'igbt-variant'],
        apps: ['traceability', 'ncr-capa', 'label-dispatch'],
        note: 'Gorad inspects assemblies. Full solder-joint AOI is not offered today.',
        description: 'Visual inspection for PCB assemblies and power electronics: component presence, location, polarity and variant checks, with per-board traceability.',
    },
    {
        slug: 'aerospace-heavy-engineering',
        icon: 'plane',
        name: 'Aerospace & heavy engineering',
        short: 'Precision machined parts, fabricated assemblies and critical components.',
        lead: 'Where parts are expensive and failures are critical, every inspection needs evidence. Our founder has built and deployed production vision systems in aerospace and heavy engineering, and Gorad is built around the same discipline: every decision recorded, every program signed.',
        challenges: [
            'Critical features must be checked on every part, with proof',
            'Parts are large or complex and need several views',
            'Audits ask who checked what, when, and with which gauge',
        ],
        inspect: ['Defects and surface damage', 'Presence and count', 'Measurement', 'Codes and text'],
        examples: [],
        apps: ['traceability', 'calibration-msa', 'ncr-capa', 'skills'],
        description: 'Visual inspection with full evidence for aerospace and heavy engineering parts: critical features, surface damage and part marking, with traceability and calibration records.',
    },
    {
        slug: 'building-materials',
        icon: 'brick',
        name: 'Building materials',
        short: 'Bricks, blocks and other products made on fast, continuous lines.',
        lead: 'Damaged products are usually sorted by people watching a fast line, and attention drops. Gorad checks each piece as it passes and rejects damaged ones automatically.',
        challenges: [
            'Lines run fast and continuously',
            'Cracks and chipped edges are easy to miss when attention drops',
            'Reject rates are rarely measured, so problems stay hidden',
        ],
        inspect: ['Defects and surface damage', 'Measurement', 'Presence and count'],
        examples: ['brick-damage'],
        apps: ['line-performance', 'spc'],
        description: 'Automatic inspection of bricks and building materials on the line: cracks, chipped edges and broken corners, with reject rates per shift.',
    },
    {
        slug: 'packaging-logistics',
        icon: 'package',
        name: 'Packaging & logistics',
        short: 'Labels, codes, counts and the last check before a box ships.',
        lead: 'A wrong label or a short count is found by your customer, not by you. Gorad reads labels and codes, counts items and holds the box until everything matches.',
        challenges: [
            'Labels are printed by hand and checked by eye',
            'A wrong label or a missing item means a returned shipment',
            'There is no record of what was checked before shipping',
        ],
        inspect: ['Codes and text', 'Presence and count', 'Variant and orientation'],
        examples: ['label-packing-check'],
        apps: ['label-dispatch', 'traceability'],
        description: 'Label verification, code reading and counting at packing: every box checked before it ships, with a record of every check.',
    },
]

export function findIndustry(slug) {
    return industries.find((i) => i.slug === slug)
}

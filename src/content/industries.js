// Industries: generic sectors first, specific example parts inside them. Examples
// link to the use cases; sectors without a published example say so honestly.
// `applications` are typical 2D inspection tasks per sector, each with the setup it
// usually needs. Keep them inside what Gorad Vision does today: no line-scan, no 3D,
// no full solder-joint AOI; code grading is indicative, never a certified verification.
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
        inspect: ['Defects and surface damage', 'Presence and count', 'Measurement', 'Codes and text', 'Variant and orientation'],
        examples: [],
        applications: [
            { title: 'Aerospace', items: [
            { name: 'Foreign object debris (FOD)', checks: 'Stray particles and objects on composite layups, tooling and cleanroom surfaces.', setup: 'Area scan, dark-field or diffuse light' },
            { name: 'Composite ply and layup', checks: 'Ply orientation, missing plies, wrinkles and gaps.', setup: 'High-resolution area scan, raking light' },
            { name: 'Fasteners and rivets', checks: 'Presence, orientation and head type.', setup: 'Area scan, bright-field, telecentric lens' },
            { name: 'Drilled holes', checks: 'Hole presence, count and edge chipping.', setup: 'Backlight or coaxial light' },
            { name: 'Sealant beads', checks: 'Continuity, width and gaps along the bead path.', setup: 'Area scan, one or more views along the path' },
            { name: 'Part marking', checks: 'Laser-etched serials, Data Matrix (DPM) codes and nameplates, read and recorded.', setup: 'Macro lens, dome or ring light, OCR and code reading' },
            { name: 'Machined part gauging (2D)', checks: 'Edge positions, hole diameters and slot widths against your limits.', setup: 'Telecentric lens, collimated backlight' },
            { name: 'Avionics assemblies', checks: 'Component presence, position and polarity on boards.', setup: 'High-resolution camera, multi-angle light' },
            { name: 'Wire harnesses and connectors', checks: 'Pin presence, pin-out and crimp position.', setup: 'Area scan, macro optics' },
            ] },
            { title: 'Heavy engineering', items: [
            { name: 'Casting surfaces', checks: 'Cold shuts, surface porosity and sand inclusions.', setup: 'Area scan, raking or dark-field light' },
            { name: 'Forging surfaces', checks: 'Laps, folds and surface cracks.', setup: 'Area scan, structured or dark-field light' },
            { name: 'Weld beads and seams', checks: 'Bead presence and visible defects such as spatter, undercut and surface cracks.', setup: 'Area scan, controlled light' },
            { name: 'Bolts and fasteners', checks: 'Presence, count and torque-mark alignment.', setup: 'Area scan, bright-field' },
            { name: 'Nameplates and serials', checks: 'Serial and heat numbers read for traceability.', setup: 'Area scan, OCR' },
            { name: 'Machined component gauging (2D)', checks: 'Hole and step dimensions and chamfers.', setup: 'Telecentric lens, backlight' },
            { name: 'Painted and coated surfaces', checks: 'Runs, missed coverage and visible texture defects such as orange peel.', setup: 'Area scan, controlled raking light' },
            ] },
        ],
        scope: 'Turbine blades and engine internals need borescope or 3D systems, and full solder-joint AOI needs dedicated machines. High-speed strip inspection (such as hot-rolled steel) needs line-scan cameras. These are outside what Gorad offers today. In heavy engineering, rugged enclosures for heat, dust and vibration, and good lighting and mounting, often matter more than the AI.',
        apps: ['traceability', 'calibration-msa', 'ncr-capa', 'skills'],
        description: 'Visual inspection with full evidence for aerospace and heavy engineering parts: critical features, surface damage and part marking, with traceability.',
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
    {
        slug: 'pharma',
        icon: 'flask',
        name: 'Pharmaceuticals',
        short: 'Vials, syringes, tablets, blister packs, labels and cartons.',
        lead: 'In pharma, a missing cap, an unreadable code or a wrong label has to be caught before the product leaves the line. Gorad checks containers, tablets, labels and codes on every unit and keeps a record of each decision.',
        challenges: [
            'Every container and label needs checking, not a sample',
            'Codes and printed text must be readable and correct on every unit',
            'Audits ask what was checked, when, and what was rejected',
        ],
        inspect: ['Defects and surface damage', 'Presence and count', 'Measurement', 'Codes and text', 'Variant and orientation'],
        examples: [],
        applications: [
            { items: [
            { name: 'Vials and ampoules', checks: 'Cracks, fill level, cap and seal, and discoloration.', setup: 'Several cameras or a rotating part, backlight' },
            { name: 'Blister packs', checks: 'Missing or broken tablets, wrong tablets and foreign material.', setup: 'Area scan, bright-field' },
            { name: 'Tablets and capsules', checks: 'Chips, cracks, coating defects and colour variation.', setup: 'Area scan, multi-angle light' },
            { name: 'Labels and print', checks: 'Lot, expiry, text errors, print quality and placement.', setup: 'Area scan, OCR' },
            { name: 'Data Matrix and serial codes', checks: 'Code read and checked against the expected data, with an indicative print-quality grade.', setup: 'High-resolution area scan, code reading' },
            { name: 'Pre-filled syringes', checks: 'Plunger position, needle presence and barrel defects.', setup: 'Rotating fixture, several cameras' },
            { name: 'Cartons and leaflets', checks: 'Presence, count and orientation of inserts.', setup: 'Area scan, OCR' },
            ] },
        ],
        scope: 'Particle inspection of injectables for batch release, and certified code verification for track-and-trace regulations, need validated, dedicated systems. Gorad does not claim either today. Very fast bulk tablet sorting (more than 20 parts per second) is also outside today’s scope.',
        apps: ['traceability', 'ncr-capa', 'label-dispatch', 'calibration-msa'],
        note: 'Gorad inspects containers, products and labels visually. It does not replace laboratory release tests.',
        description: 'Visual inspection for vials, containers and pharmaceutical packaging: presence, codes, labels and defects, with per-unit traceability.',
    },
]

export function findIndustry(slug) {
    return industries.find((i) => i.slug === slug)
}

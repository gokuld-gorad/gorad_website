import { Camera, part, ray, tag } from './UseCaseArt.jsx'

// The station types Gorad Vision supports, drawn in the use-case art style: part grey,
// cameras cyan. Only what the product does today: static stations, stop-and-go
// conveyors and multi-position robot cells (see the platform spec's station types).
const solid = { fill: 'var(--surface-sunken)', stroke: 'var(--text-muted)', strokeWidth: 1.3 }
const mono = { ...tag, fontSize: 9, fill: 'var(--text-subtle)' }

const art = {
    fixed: (
        <>
            <Camera x={70} y={30} r={30} />
            <Camera x={170} y={30} r={-30} />
            <Camera x={120} y={18} />
            <path d="M76 38 L108 78 M164 38 L132 78 M120 26 L120 70" {...ray} />
            <ellipse cx="120" cy="88" rx="26" ry="9" {...solid} />
            <rect x="80" y="96" width="80" height="12" rx="2" {...part} />
            <path d="M92 108 V124 M148 108 V124 M70 124 H170" {...part} />
            <text x="120" y="138" {...mono} textAnchor="middle">fixture</text>
        </>
    ),
    conveyor: (
        <>
            <Camera x={120} y={18} />
            <path d="M120 26 L104 70 M120 26 L136 70" {...ray} />
            <path d="M20 92 H220 M20 104 H220" {...part} />
            {[34, 74, 166, 206].map((x) => <circle key={x} cx={x} cy="98" r="5" {...part} />)}
            <rect x="56" y="74" width="24" height="18" rx="2" {...solid} />
            <rect x="108" y="74" width="24" height="18" rx="2" fill="var(--surface-sunken)" stroke="var(--signal)" strokeWidth="1.6" />
            <rect x="160" y="74" width="24" height="18" rx="2" {...solid} />
            <path d="M140 64 V92" stroke="var(--text-muted)" strokeWidth="3" strokeLinecap="round" />
            <text x="148" y="62" {...mono}>stop</text>
            <path d="M30 124 H64 M58 119 L64 124 L58 129" {...part} />
            <text x="76" y="127" {...mono}>stop · inspect · go</text>
        </>
    ),
    robot: (
        <>
            <Camera x={40} y={44} r={40} />
            <Camera x={200} y={44} r={-40} />
            <Camera x={120} y={16} />
            <path d="M47 51 L104 76 M193 51 L136 76 M120 24 L120 64" {...ray} />
            <rect x="92" y="122" width="32" height="8" rx="2" {...solid} />
            <path d="M108 122 V108 L90 92 L112 78" fill="none" stroke="var(--text-muted)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="108" cy="108" r="4.5" {...solid} />
            <circle cx="90" cy="92" r="4.5" {...solid} />
            <rect x="112" y="68" width="22" height="16" rx="3" fill="var(--surface-sunken)" stroke="var(--signal)" strokeWidth="1.6" />
            <path d="M150 96 a20 20 0 0 0 -8 -26" fill="none" stroke="var(--text-subtle)" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x="160" y="110" {...mono}>several positions</text>
        </>
    ),
}

const types = [
    {
        id: 'fixed',
        title: 'Fixed station',
        text: 'The part is placed in a fixture or stops at the station. One camera or several look at it from different sides.',
    },
    {
        id: 'conveyor',
        title: 'Conveyor, stop-and-go',
        text: 'The conveyor stops the part, the station inspects it, and it moves on. The PLC or a barcode selects the program for each variant.',
    },
    {
        id: 'robot',
        title: 'Robot or cobot cell',
        text: 'A robot presents the part to the cameras at several positions, for parts that need many views. Still one verdict per part.',
    },
]

export default function StationTypes() {
    return (
        <div className="station-types">
            {types.map((t) => (
                <div className="station-type" key={t.id}>
                    <svg className="station-art" viewBox="0 0 240 140" aria-hidden="true">{art[t.id]}</svg>
                    <h3>{t.title}</h3>
                    <p>{t.text}</p>
                </div>
            ))}
        </div>
    )
}

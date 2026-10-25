import { Camera, bad, part, ray, tag } from './UseCaseArt.jsx'

// One small diagram per application card on the industry pages, in the same style as
// the use-case art: the part in neutral strokes, the camera in Signal, the defect in red.
// Everything marked `art-bad` pulses, and the NG verdict shows, when the card is hovered.
const fillLiquid = { fill: 'var(--signal)', opacity: 0.14 }
const solid = { fill: 'var(--surface-sunken)', stroke: 'var(--text-muted)', strokeWidth: 1.3 }
const mono = { ...tag, fontSize: 9, fill: 'var(--text-muted)' }

function Vial({ x, fillY }) {
    return (
        <g>
            <rect x={x - 9} y="38" width="18" height="8" rx="2" {...part} />
            <rect x={x - 6} y="46" width="12" height="8" {...part} />
            <rect x={x - 12} y={fillY} width="24" height={114 - fillY} rx="3" {...fillLiquid} />
            <rect x={x - 14} y="54" width="28" height="62" rx="5" {...part} />
        </g>
    )
}

// A Data Matrix-like symbol: solid L on the left and bottom, timing pattern on top and right.
function matrixModules() {
    const n = 10
    const cells = []
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            const edge = c === 0 || r === n - 1
            const timing = (r === 0 && c % 2 === 0) || (c === n - 1 && r % 2 === 1)
            const inner = r > 0 && c < n - 1 && ((r * 7 + c * 3 + r * c) % 5 < 2)
            const damaged = r >= 6 && r <= 8 && c >= 6 && c <= 8
            if ((edge || timing || inner) && !damaged) cells.push([r, c])
        }
    }
    return cells
}

const art = {
    'vials-ampoules': (
        <>
            <Camera x={120} y={14} />
            <path d="M120 22 L84 36 M120 22 L156 36" {...ray} />
            <Vial x={80} fillY={68} />
            <Vial x={120} fillY={88} />
            <Vial x={160} fillY={68} />
            <path d="M102 68 H138" {...bad} strokeDasharray="4 3" className="art-bad" />
            <text x="182" y="92" {...tag} fill="var(--ng)">fill low</text>
            <path d="M40 118 H200 M40 124 H200" {...part} />
        </>
    ),
    'blister-packs': (
        <>
            <Camera x={120} y={14} />
            <path d="M120 22 L60 38 M120 22 L180 38" {...ray} />
            <rect x="48" y="38" width="144" height="84" rx="6" {...part} />
            {[0, 1].map((r) => [0, 1, 2, 3, 4].map((c) => {
                const cx = 70 + c * 25
                const cy = 61 + r * 38
                const empty = r === 1 && c === 3
                return (
                    <g key={`${r}${c}`}>
                        <ellipse cx={cx} cy={cy} rx="10" ry="13" {...(empty ? { ...bad, strokeDasharray: '3 2' } : part)} className={empty ? 'art-bad' : undefined} />
                        {!empty && <circle cx={cx} cy={cy} r="6.5" {...solid} />}
                    </g>
                )
            }))}
            <text x="145" y="134" {...tag} fill="var(--ng)" textAnchor="middle">empty</text>
        </>
    ),
    'tablets-capsules': (
        <>
            <Camera x={120} y={14} />
            <path d="M120 22 L72 44 M120 22 L168 44" {...ray} />
            <rect x="52" y="44" width="136" height="80" rx="6" {...part} />
            {[0, 1].map((r) => [0, 1, 2, 3].map((c) => {
                const cx = 72 + c * 32
                const cy = 64 + r * 38
                return (
                    <g key={`${r}${c}`}>
                        <circle cx={cx} cy={cy} r="12" {...solid} />
                        <path d={`M${cx - 7} ${cy} H${cx + 7}`} {...part} strokeWidth="1.1" />
                    </g>
                )
            }))}
            <path d="M141 92 L151 97 L146 101 Z" fill="var(--ng)" fillOpacity="0.25" stroke="var(--ng)" strokeWidth="1.4" className="art-bad" />
            <text x="196" y="96" {...tag} fill="var(--ng)">chip</text>
        </>
    ),
    'labels-print': (
        <>
            <Camera x={30} y={30} r={20} />
            <path d="M38 38 L70 58" {...ray} />
            <rect x="56" y="28" width="128" height="96" rx="3" {...part} />
            <rect x="70" y="42" width="100" height="68" rx="2" {...part} />
            <text x="78" y="58" {...mono}>Product A 500 mg</text>
            <text x="78" y="76" {...mono}>LOT  2417</text>
            <text x="78" y="94" {...mono}>EXP  08/2027</text>
            <rect x="74" y="84" width="76" height="14" rx="2" {...bad} className="art-bad" />
            <text x="120" y="136" {...tag} fill="var(--ng)" textAnchor="middle">expected 09/2027</text>
        </>
    ),
    'data-matrix': (
        <>
            <Camera x={120} y={14} />
            <path d="M120 22 L92 38 M120 22 L148 38" {...ray} />
            <path d="M84 50 V40 H94 M146 40 H156 V50 M156 102 V112 H146 M94 112 H84 V102" fill="none" stroke="var(--signal)" strokeWidth="1.6" />
            {matrixModules().map(([r, c]) => <rect key={`${r}-${c}`} x={90 + c * 6} y={46 + r * 6} width="6" height="6" fill="var(--text-muted)" />)}
            <rect x="125" y="81" width="20" height="20" {...bad} strokeDasharray="3 2" className="art-bad" />
            <text x="164" y="96" {...tag} fill="var(--ng)">damaged</text>
        </>
    ),
    'pre-filled-syringes': (
        <>
            <Camera x={120} y={14} />
            <path d="M120 22 L80 52 M120 22 L160 52" {...ray} />
            <rect x="36" y="63" width="28" height="14" rx="3" {...part} />
            <rect x="66" y="58" width="100" height="24" rx="3" {...part} />
            <rect x="68" y="60" width="62" height="20" {...fillLiquid} />
            <rect x="166" y="50" width="6" height="40" rx="1" {...part} />
            <rect x="172" y="66" width="38" height="8" {...part} />
            <rect x="210" y="56" width="6" height="28" rx="1" {...part} />
            <path d="M104 52 V88" stroke="var(--signal)" strokeWidth="1.2" strokeDasharray="3 2" />
            <rect x="130" y="59" width="10" height="22" rx="2" fill="var(--surface-sunken)" stroke="var(--ng)" strokeWidth="1.8" className="art-bad" />
            <path d="M104 98 H135 M104 94 V102 M135 94 V102" {...bad} strokeWidth="1.3" />
            <text x="120" y="116" {...tag} fill="var(--ng)" textAnchor="middle">plunger too far</text>
        </>
    ),
    'cartons-leaflets': (
        <>
            <Camera x={120} y={14} />
            <path d="M120 22 L82 42 M120 22 L158 42" {...ray} />
            <rect x="50" y="44" width="62" height="72" rx="2" {...part} />
            <path d="M50 44 L42 34 M112 44 L118 34" {...part} />
            <rect x="58" y="52" width="46" height="56" rx="1" {...solid} />
            <path d="M64 64 H98 M64 72 H98 M64 80 H92 M58 86 H104" {...part} strokeWidth="1" />
            <rect x="128" y="44" width="62" height="72" rx="2" {...part} />
            <path d="M128 44 L122 34 M190 44 L198 34" {...part} />
            <rect x="136" y="52" width="46" height="56" rx="1" {...bad} strokeDasharray="4 3" className="art-bad" />
            <text x="159" y="130" {...tag} fill="var(--ng)" textAnchor="middle">no leaflet</text>
        </>
    ),
}

export function hasApplicationArt(id) {
    return Boolean(id && art[id])
}

export default function ApplicationArt({ id }) {
    return (
        <svg className="app-art" viewBox="0 0 240 140" aria-hidden="true">
            {art[id]}
            <g className="art-ng">
                <rect x="198" y="6" width="36" height="16" rx="3" fill="var(--ng)" />
                <text x="216" y="18" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" fill="#fff">NG</text>
            </g>
        </svg>
    )
}

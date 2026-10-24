// One line illustration per inspection use case, in a single style: the part in
// neutral strokes, cameras and their view in Signal blue, the defect in red.
const part = { fill: 'none', stroke: 'var(--text-muted)', strokeWidth: 1.6 }
const cam = { fill: 'var(--surface)', stroke: 'var(--signal)', strokeWidth: 1.6 }
const ray = { stroke: 'var(--signal)', strokeWidth: 1, strokeDasharray: '3 3', opacity: 0.7 }
const bad = { fill: 'none', stroke: 'var(--ng)', strokeWidth: 1.8 }
const tag = { fontFamily: 'var(--font-mono)', fontSize: 10 }

function Camera({ x, y, r = 0 }) {
    return (
        <g transform={`translate(${x} ${y}) rotate(${r})`}>
            <rect x="-11" y="-8" width="22" height="16" rx="3" {...cam} />
            <circle cx="0" cy="0" r="4" {...cam} />
        </g>
    )
}

const art = {
    'connecting-rod': (
        <>
            <circle cx="70" cy="80" r="30" {...part} />
            <circle cx="70" cy="80" r="16" {...part} />
            <circle cx="186" cy="80" r="16" {...part} />
            <circle cx="186" cy="80" r="8" {...part} />
            <path d="M98 70 L172 74 M98 90 L172 86" {...part} />
            <Camera x={70} y={18} />
            <Camera x={186} y={18} />
            <Camera x={128} y={132} r={180} />
            <path d="M70 26 L70 48 M186 26 L186 62 M128 124 L130 90" {...ray} />
            <circle cx="130" cy="79" r="6" {...bad} />
        </>
    ),
    'catalyst-blockage': (
        <>
            <Camera x={120} y={14} />
            <path d="M120 22 L80 36 M120 22 L160 36" {...ray} />
            <circle cx="120" cy="82" r="44" {...part} />
            {Array.from({ length: 8 }).map((_, r) =>
                Array.from({ length: 8 }).map((__, c) => {
                    const x = 88 + c * 8
                    const y = 50 + r * 8
                    const inside = (x + 4 - 120) ** 2 + (y + 4 - 82) ** 2 < 36 ** 2
                    if (!inside) return null
                    const blocked = (r === 2 && c > 3 && c < 6) || (r === 5 && c === 2) || (r === 3 && c === 5)
                    return <rect key={`${r}${c}`} x={x} y={y} width="6.5" height="6.5" fill={blocked ? 'var(--ng)' : 'none'} stroke="var(--text-subtle)" strokeWidth="0.8" />
                }),
            )}
            <text x="176" y="86" {...tag} fill="var(--ng)">4 % blocked</text>
        </>
    ),
    'pcb-assembly': (
        <>
            <rect x="40" y="40" width="160" height="88" rx="4" {...part} />
            <rect x="56" y="54" width="34" height="22" rx="2" {...part} />
            <rect x="102" y="54" width="18" height="12" rx="2" {...part} />
            <rect x="132" y="56" width="52" height="26" rx="2" {...part} />
            <rect x="58" y="94" width="22" height="14" rx="2" {...part} />
            <circle cx="64" cy="101" r="1.6" fill="var(--text-muted)" />
            <rect x="140" y="96" width="24" height="18" rx="2" {...bad} strokeDasharray="4 3" />
            <Camera x={84} y={16} />
            <Camera x={156} y={16} />
            <path d="M84 24 L60 40 M84 24 L120 40 M156 24 L130 40 M156 24 L190 40" {...ray} />
        </>
    ),
    'igbt-variant': (
        <>
            <rect x="52" y="54" width="136" height="70" rx="6" {...part} />
            {[70, 96, 122, 148, 170].map((x) => <path key={x} d={`M${x} 54 V40 H${x + 8} V54`} {...part} />)}
            <rect x="68" y="78" width="74" height="22" rx="3" {...part} />
            <text x="76" y="93" {...tag} fill="var(--text-muted)">4471-A</text>
            <Camera x={196} y={22} r={-20} />
            <path d="M190 30 L142 78" {...ray} />
            <text x="152" y="114" {...tag} fill="var(--ng)">expected B</text>
        </>
    ),
    'bearing-pin-count': (
        <>
            <circle cx="120" cy="80" r="48" {...part} />
            <circle cx="120" cy="80" r="24" {...part} />
            {Array.from({ length: 16 }).map((_, i) => {
                const a = (i / 16) * Math.PI * 2
                const x = 120 + Math.cos(a) * 36
                const y = 80 + Math.sin(a) * 36
                return i === 3
                    ? <circle key={i} cx={x} cy={y} r="6" {...bad} strokeDasharray="3 2" />
                    : <circle key={i} cx={x} cy={y} r="5" fill="var(--surface-sunken)" stroke="var(--text-muted)" strokeWidth="1.3" />
            })}
            <Camera x={120} y={14} />
            <text x="176" y="40" {...tag} fill="var(--ng)">15 / 16</text>
        </>
    ),
    'brick-damage': (
        <>
            <path d="M48 70 L148 70 L192 52 L92 52 Z" {...part} />
            <path d="M48 70 V108 H148 V70 M148 108 L192 90 V52" {...part} />
            <path d="M100 74 L108 86 L102 96 L110 106" {...bad} />
            <path d="M174 59 L186 55 L183 66 Z" fill="var(--ng)" opacity="0.25" stroke="var(--ng)" strokeWidth="1.4" />
            <path d="M28 118 H212" {...part} />
            {[44, 84, 124, 164, 204].map((x) => <circle key={x} cx={x} cy="124" r="5" {...part} />)}
            <Camera x={120} y={16} />
            <path d="M120 24 L84 52 M120 24 L170 52" {...ray} />
        </>
    ),
}

export default function UseCaseArt({ id }) {
    return (
        <svg className="uc-art" viewBox="0 0 240 140" aria-hidden="true">
            {art[id]}
        </svg>
    )
}

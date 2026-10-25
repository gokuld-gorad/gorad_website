import { Camera, bad, part, ray, tag } from './UseCaseArt.jsx'

// Application diagrams for automotive, electronics, aerospace & heavy engineering,
// building materials and packaging. Same rules as ApplicationArt.jsx: part grey,
// camera cyan, defect red and marked `art-bad`. Coordinates are in a 240 x 140 box.
const solid = { fill: 'var(--surface-sunken)', stroke: 'var(--text-muted)', strokeWidth: 1.3 }
const mono = { ...tag, fontSize: 9, fill: 'var(--text-muted)' }
const tint = { fill: 'var(--signal)', opacity: 0.14 }
const dashedBad = { ...bad, strokeDasharray: '3 2' }
const B = { className: 'art-bad' }

function TopCam({ l, r, y }) {
    return (
        <>
            <Camera x={120} y={14} />
            <path d={`M120 22 L${l} ${y} M120 22 L${r} ${y}`} {...ray} />
        </>
    )
}

function Note({ x, y, children, anchor = 'start' }) {
    return <text x={x} y={y} {...tag} fill="var(--ng)" textAnchor={anchor}>{children}</text>
}

function hexPoints(cx, cy, r) {
    return Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i + Math.PI / 6
        return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
    }).join(' ')
}

// Gear outline with one tooth left out; returns [outline, missing-tooth path].
function gearPaths(cx, cy, n, ri, ro, skip) {
    const pt = (r, a) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`
    let d = ''
    let miss = ''
    for (let i = 0; i < n; i++) {
        const w = (Math.PI * 2) / n
        const a = i * w - Math.PI / 2
        const tooth = [pt(ri, a), pt(ro, a + w * 0.15), pt(ro, a + w * 0.45), pt(ri, a + w * 0.6)]
        if (i === skip) {
            d += `${i ? 'L' : 'M'}${tooth[0]} L${tooth[3]} `
            miss = `M${tooth[0]} L${tooth[1]} L${tooth[2]} L${tooth[3]}`
        } else {
            d += `${i ? 'L' : 'M'}${tooth[0]} L${tooth[1]} L${tooth[2]} L${tooth[3]} `
        }
        d += `L${pt(ri, a + w)} `
    }
    return [d + 'Z', miss]
}

function Bottle({ x, fillY, cap }) {
    return (
        <g>
            {cap || <rect x={x - 7} y="34" width="14" height="9" rx="2" {...part} />}
            <path d={`M${x - 5} 43 V52 Q${x - 15} 56 ${x - 15} 66 V112 Q${x - 15} 116 ${x - 11} 116 H${x + 11} Q${x + 15} 116 ${x + 15} 112 V66 Q${x + 15} 56 ${x + 5} 52 V43`} {...part} />
            {fillY && <rect x={x - 13} y={fillY} width="26" height={114 - fillY} rx="2" {...tint} />}
        </g>
    )
}

function Pcb({ children }) {
    return (
        <>
            <TopCam l={60} r={180} y={36} />
            <rect x="40" y="36" width="160" height="88" rx="4" {...part} />
            {children}
        </>
    )
}

const [gearOutline, gearMissing] = gearPaths(120, 80, 14, 32, 42, 3)

export const sectorArt = {
    /* Automotive */
    'stamped-parts': (
        <>
            <TopCam l={56} r={184} y={48} />
            <path d="M48 52 Q120 40 192 50 L198 112 Q120 124 42 116 Z" {...part} />
            <path d="M70 66 Q120 58 170 64 L172 98 Q120 106 68 100 Z" {...part} strokeWidth="1" />
            <ellipse cx="150" cy="84" rx="11" ry="6" {...bad} {...B} />
            <Note x={168} y={132} anchor="middle">dent</Note>
        </>
    ),
    'welds-spot': (
        <>
            <TopCam l={60} r={180} y={52} />
            <rect x="34" y="52" width="150" height="44" rx="2" {...part} />
            <rect x="58" y="60" width="150" height="44" rx="2" {...part} />
            {[80, 106, 132, 158].map((x) => x === 132
                ? <circle key={x} cx={x} cy="78" r="6" {...dashedBad} {...B} />
                : <circle key={x} cx={x} cy="78" r="5" {...solid} />)}
            <Note x={132} y={124} anchor="middle">missing weld</Note>
        </>
    ),
    'machined-gauging': (
        <>
            <TopCam l={70} r={170} y={40} />
            <path d="M60 48 H180 V108 H60 Z" fill="var(--text-muted)" fillOpacity="0.28" stroke="var(--text-muted)" strokeWidth="1.4" />
            <circle cx="92" cy="78" r="11" fill="var(--surface-sunken)" stroke="var(--text-muted)" strokeWidth="1.4" />
            <circle cx="150" cy="78" r="12" fill="var(--surface-sunken)" stroke="var(--ng)" strokeWidth="1.8" {...B} />
            <path d="M60 116 H180 M60 112 V120 M180 112 V120" stroke="var(--signal)" strokeWidth="1.2" />
            <text x="120" y="130" {...tag} fill="var(--signal)" textAnchor="middle">80.00</text>
            <path d="M138 78 H162" stroke="var(--ng)" strokeWidth="1.2" />
            <Note x={186} y={82}>Ø 12.08</Note>
        </>
    ),
    'die-cast-forged': (
        <>
            <TopCam l={64} r={176} y={44} />
            <path d="M56 56 Q60 44 76 46 L164 44 Q182 46 184 62 L180 104 Q176 118 160 118 L80 118 Q60 116 58 100 Z" {...part} />
            <path d="M84 60 V104 M120 58 V106 M156 60 V104" {...part} strokeWidth="1" />
            {[[136, 76], [142, 82], [134, 86], [146, 74], [140, 90]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2.4" {...bad} {...B} />)}
            <Note x={196} y={86}>porosity</Note>
        </>
    ),
    'mouldings': (
        <>
            <TopCam l={70} r={170} y={46} />
            <circle cx="120" cy="84" r="36" {...part} />
            <circle cx="120" cy="84" r="20" {...part} />
            <path d="M154 72 L170 68 L168 78 L156 82" fill="var(--ng)" fillOpacity="0.2" stroke="var(--ng)" strokeWidth="1.6" {...B} />
            <Note x={176} y={92}>flash</Note>
        </>
    ),
    'seals-orings': (
        <>
            <TopCam l={70} r={170} y={48} />
            <circle cx="80" cy="86" r="30" {...part} />
            <circle cx="80" cy="86" r="22" fill="none" stroke="var(--text-muted)" strokeWidth="4" opacity="0.7" />
            <circle cx="80" cy="86" r="14" {...part} />
            <circle cx="160" cy="86" r="30" {...part} />
            <circle cx="160" cy="86" r="22" {...dashedBad} strokeWidth="2" {...B} />
            <circle cx="160" cy="86" r="14" {...part} />
            <Note x={160} y={132} anchor="middle">no O-ring</Note>
        </>
    ),
    'threads-holes': (
        <>
            <TopCam l={60} r={180} y={40} />
            <rect x="48" y="40" width="144" height="84" rx="6" {...part} />
            {[[84, 64], [156, 64], [84, 100], [156, 100]].map(([x, y]) => {
                const bare = x === 156 && y === 100
                return (
                    <g key={`${x}${y}`}>
                        <circle cx={x} cy={y} r="11" {...(bare ? bad : part)} {...(bare ? B : {})} />
                        {!bare && <circle cx={x} cy={y} r="7.5" fill="none" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="2 2" />}
                    </g>
                )
            })}
            <Note x={120} y={136} anchor="middle">no thread</Note>
        </>
    ),
    'harness-connectors': (
        <>
            <TopCam l={66} r={174} y={34} />
            <rect x="62" y="34" width="116" height="58" rx="5" {...part} />
            {[0, 1].map((r) => [0, 1, 2, 3, 4, 5].map((c) => {
                const x = 74 + c * 18
                const y = 48 + r * 22
                const miss = r === 1 && c === 4
                return <rect key={`${r}${c}`} x={x} y={y} width="10" height="10" rx="1.5" {...(miss ? dashedBad : solid)} {...(miss ? B : {})} />
            }))}
            {[78, 96, 114, 132, 150, 168].map((x) => <path key={x} d={`M${x - 2} 92 Q${x} 112 ${x - 10} 128`} {...part} strokeWidth="1.2" />)}
            <Note x={186} y={78}>pin</Note>
            <Note x={186} y={90}>missing</Note>
        </>
    ),
    'part-codes': (
        <>
            <path d="M44 48 V38 H54 M186 38 H196 V48 M196 116 V126 H186 M54 126 H44 V116" fill="none" stroke="var(--signal)" strokeWidth="1.6" />
            <rect x="52" y="46" width="136" height="72" rx="6" {...part} />
            {Array.from({ length: 36 }, (_, i) => [i % 6, Math.floor(i / 6)]).filter(([c, r]) => c === 0 || r === 5 || (r * 5 + c * 3) % 4 === 0).map(([c, r]) => <circle key={`${c}${r}`} cx={66 + c * 6} cy={60 + r * 6} r="2" fill="var(--text-muted)" />)}
            <text x="112" y="72" {...mono}>PN 4471-220</text>
            <text x="112" y="88" {...mono}>SN 0881</text>
            <rect x="108" y="78" width="66" height="14" rx="2" {...bad} {...B} />
            <Note x={120} y={136} anchor="middle">unreadable</Note>
            <Camera x={120} y={14} />
        </>
    ),
    'bearings-gears': (
        <>
            <Camera x={36} y={24} r={20} />
            <path d="M44 32 L84 56" {...ray} />
            <path d={gearOutline} {...part} />
            <path d={gearMissing} {...dashedBad} {...B} />
            <circle cx="120" cy="80" r="12" {...part} />
            <Note x={176} y={46}>missing</Note>
            <Note x={176} y={58}>tooth</Note>
        </>
    ),
    'painted-parts': (
        <>
            <TopCam l={56} r={184} y={46} />
            <path d="M44 50 Q120 36 196 50 V116 Q120 104 44 116 Z" fill="var(--signal)" fillOpacity="0.08" stroke="var(--text-muted)" strokeWidth="1.6" />
            <path d="M132 58 Q134 70 131 82 Q129 92 134 98 Q140 92 137 82 Q135 70 138 58" fill="var(--ng)" fillOpacity="0.2" stroke="var(--ng)" strokeWidth="1.5" {...B} />
            <Note x={150} y={100}>run</Note>
        </>
    ),
    'variant-check': (
        <>
            <TopCam l={60} r={180} y={50} />
            {[70, 120, 170].map((x) => {
                const wrong = x === 120
                return (
                    <g key={x}>
                        <rect x={x - 20} y="54" width="40" height="56" rx="4" {...(wrong ? bad : part)} {...(wrong ? B : {})} />
                        <circle cx={x} cy="70" r="5" {...part} />
                        {wrong ? <circle cx={x} cy="94" r="5" {...part} /> : <rect x={x - 6} y="88" width="12" height="12" rx="1" {...part} />}
                    </g>
                )
            })}
            <Note x={120} y={128} anchor="middle">wrong variant</Note>
        </>
    ),

    /* Electronics */
    'component-orientation': (
        <Pcb>
            <rect x="60" y="56" width="34" height="14" rx="3" {...part} />
            <rect x="62" y="56" width="5" height="14" fill="var(--text-muted)" />
            <rect x="60" y="90" width="34" height="14" rx="3" {...part} />
            <rect x="62" y="90" width="5" height="14" fill="var(--text-muted)" />
            <rect x="140" y="72" width="34" height="14" rx="3" {...bad} {...B} />
            <rect x="167" y="72" width="5" height="14" fill="var(--ng)" />
            <Note x={157} y={106} anchor="middle">reversed</Note>
        </Pcb>
    ),
    'markings-labels': (
        <>
            <TopCam l={72} r={168} y={40} />
            <rect x="66" y="44" width="108" height="66" rx="3" {...solid} />
            {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M${76 + i * 18} 44 V36 M${76 + i * 18} 110 V118`} {...part} />)}
            <text x="78" y="68" {...mono}>U7  74HC08</text>
            <text x="78" y="88" {...mono}>2417 · A3</text>
            <rect x="96" y="58" width="56" height="14" rx="2" {...bad} {...B} />
            <Note x={120} y={136} anchor="middle">expected 74HC32</Note>
        </>
    ),
    'busbars-heatsinks': (
        <>
            <TopCam l={60} r={180} y={60} />
            <rect x="36" y="64" width="168" height="26" rx="2" {...part} />
            {[60, 120, 180].map((x) => <circle key={x} cx={x} cy="77" r="6" {...part} />)}
            <path d="M146 90 L150 100 L156 90" fill="var(--ng)" fillOpacity="0.25" stroke="var(--ng)" strokeWidth="1.5" {...B} />
            <Note x={151} y={116} anchor="middle">burr</Note>
        </>
    ),
    'transformers-coils': (
        <>
            <TopCam l={70} r={170} y={40} />
            <rect x="62" y="40" width="10" height="80" rx="2" {...part} />
            <rect x="168" y="40" width="10" height="80" rx="2" {...part} />
            {Array.from({ length: 16 }, (_, i) => 78 + i * 5.6).map((x) => <path key={x} d={`M${x.toFixed(1)} 52 V108`} {...part} strokeWidth="1.2" />)}
            <path d="M120 52 L134 108" stroke="var(--ng)" strokeWidth="1.8" {...B} />
            <Note x={120} y={132} anchor="middle">crossed wire</Note>
        </>
    ),
    'connectors-terminals': (
        <>
            <TopCam l={66} r={174} y={48} />
            <rect x="56" y="88" width="128" height="30" rx="3" {...part} />
            {[72, 92, 112, 132, 152, 172].map((x) => x === 132
                ? <path key={x} d="M132 88 L140 60" stroke="var(--ng)" strokeWidth="2.4" strokeLinecap="round" {...B} />
                : <path key={x} d={`M${x - 4} 88 V56`} stroke="var(--text-muted)" strokeWidth="2.4" strokeLinecap="round" />)}
            <path d="M128 56 V88" stroke="var(--signal)" strokeWidth="1" strokeDasharray="2 2" />
            <Note x={150} y={134} anchor="middle">bent pin</Note>
        </>
    ),
    'conformal-coating': (
        <Pcb>
            <path d="M46 42 H150 V118 H46 Z" fill="var(--signal)" fillOpacity="0.18" />
            <rect x="62" y="58" width="30" height="20" rx="2" {...part} />
            <rect x="104" y="84" width="30" height="20" rx="2" {...part} />
            <rect x="160" y="56" width="32" height="56" rx="2" fill="none" stroke="var(--signal)" strokeWidth="1.2" strokeDasharray="4 3" />
            <text x="176" y="120" {...mono} textAnchor="middle" fontSize="8">keep-out</text>
            <path d="M150 70 Q160 72 166 80 Q162 88 150 90 Z" fill="var(--ng)" fillOpacity="0.25" stroke="var(--ng)" strokeWidth="1.4" {...B} />
            <Note x={120} y={136} anchor="middle">coating in keep-out</Note>
        </Pcb>
    ),
    'cable-routing': (
        <>
            <TopCam l={60} r={180} y={36} />
            <rect x="40" y="40" width="20" height="80" rx="3" {...part} />
            <rect x="180" y="40" width="20" height="80" rx="3" {...part} />
            <path d="M60 52 C110 52 130 52 180 52" {...part} />
            <path d="M60 72 C110 72 130 72 180 72" {...part} strokeDasharray="6 2" />
            <path d="M60 92 C110 92 130 112 180 112" stroke="var(--ng)" strokeWidth="1.8" fill="none" {...B} />
            <path d="M60 112 C110 112 130 92 180 92" {...part} strokeDasharray="2 2" />
            <Note x={120} y={134} anchor="middle">wrong position</Note>
        </>
    ),

    /* Aerospace & heavy engineering */
    'foreign-objects': (
        <>
            <TopCam l={56} r={184} y={42} />
            <rect x="44" y="42" width="152" height="80" rx="6" {...part} />
            {[70, 120, 170].map((x) => <circle key={x} cx={x} cy="62" r="6" {...part} />)}
            <circle cx="150" cy="98" r="6" {...bad} {...B} />
            <circle cx="150" cy="98" r="2.4" {...bad} {...B} />
            <Note x={150} y={134} anchor="middle">loose washer</Note>
        </>
    ),
    'fasteners-rivets': (
        <>
            <TopCam l={56} r={184} y={46} />
            <rect x="40" y="46" width="160" height="70" rx="3" {...part} />
            <path d="M40 81 H200" {...part} strokeWidth="1" />
            {[0, 1].map((r) => [0, 1, 2, 3, 4, 5].map((c) => {
                const x = 58 + c * 25
                const y = 64 + r * 34
                const miss = r === 1 && c === 3
                return miss
                    ? <circle key={`${r}${c}`} cx={x} cy={y} r="6" {...dashedBad} {...B} />
                    : <g key={`${r}${c}`}><circle cx={x} cy={y} r="6" {...solid} /><circle cx={x} cy={y} r="1.6" fill="var(--text-muted)" /></g>
            }))}
            <Note x={133} y={132} anchor="middle">missing rivet</Note>
        </>
    ),
    'drilled-holes': (
        <>
            <TopCam l={56} r={184} y={42} />
            <rect x="44" y="42" width="152" height="80" rx="4" {...part} />
            {[0, 1].map((r) => [0, 1, 2, 3].map((c) => {
                const x = 72 + c * 32
                const y = 64 + r * 36
                return <circle key={`${r}${c}`} cx={x} cy={y} r="8" {...part} />
            }))}
            <path d="M136 92 L140 88 L143 92 L147 90" stroke="var(--ng)" strokeWidth="1.8" fill="none" {...B} />
            <circle cx="136" cy="100" r="12" {...dashedBad} strokeWidth="1.2" {...B} />
            <Note x={174} y={134} anchor="middle">edge chip</Note>
        </>
    ),
    'sealant-beads': (
        <>
            <TopCam l={60} r={180} y={36} />
            <rect x="44" y="36" width="152" height="90" rx="6" {...part} />
            <path d="M62 52 H178 V108" fill="none" stroke="var(--text-muted)" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
            <path d="M62 52 V82" fill="none" stroke="var(--text-muted)" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
            <path d="M62 94 V108 H130" fill="none" stroke="var(--text-muted)" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
            <path d="M142 108 H178" fill="none" stroke="var(--text-muted)" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
            <rect x="128" y="100" width="16" height="16" rx="2" {...dashedBad} {...B} />
            <rect x="54" y="80" width="16" height="16" rx="2" {...dashedBad} {...B} />
            <Note x={100} y={84}>gaps</Note>
        </>
    ),
    'forging-surfaces': (
        <>
            <TopCam l={60} r={180} y={46} />
            <path d="M44 74 Q44 52 70 52 H130 Q150 52 160 64 L196 64 V96 L160 96 Q150 108 130 108 H70 Q44 108 44 86 Z" {...part} />
            <path d="M96 60 L102 70 L98 80 L106 92 L102 100" fill="none" stroke="var(--ng)" strokeWidth="1.8" {...B} />
            <Note x={120} y={128} anchor="middle">surface crack</Note>
        </>
    ),
    'weld-beads': (
        <>
            <TopCam l={60} r={180} y={50} />
            <rect x="36" y="50" width="80" height="64" {...part} />
            <rect x="124" y="50" width="80" height="64" {...part} />
            {Array.from({ length: 10 }, (_, i) => 52 + i * 6).filter((y) => y < 82 || y > 96).map((y) => <path key={y} d={`M114 ${y} Q120 ${y + 5} 126 ${y}`} {...part} strokeWidth="1.3" />)}
            <rect x="112" y="82" width="16" height="16" rx="2" {...dashedBad} {...B} />
            <Note x={140} y={92}>gap</Note>
            <circle cx="96" cy="64" r="1.6" fill="var(--text-muted)" />
            <circle cx="102" cy="72" r="1.2" fill="var(--text-muted)" />
        </>
    ),
    'bolts-torque': (
        <>
            <TopCam l={70} r={170} y={40} />
            <circle cx="120" cy="84" r="44" {...part} />
            <circle cx="120" cy="84" r="18" {...part} />
            {Array.from({ length: 6 }, (_, i) => {
                const a = (Math.PI / 3) * i
                const x = 120 + Math.cos(a) * 32
                const y = 84 + Math.sin(a) * 32
                const moved = i === 1
                const m = moved ? 0.9 : 0
                return (
                    <g key={i}>
                        <polygon points={hexPoints(x, y, 7)} {...solid} />
                        <path d={`M${(x - 9 * Math.cos(a + m)).toFixed(1)} ${(y - 9 * Math.sin(a + m)).toFixed(1)} L${(x + 9 * Math.cos(a + m)).toFixed(1)} ${(y + 9 * Math.sin(a + m)).toFixed(1)}`} stroke={moved ? 'var(--ng)' : 'var(--signal)'} strokeWidth="1.8" {...(moved ? B : {})} />
                    </g>
                )
            })}
            <Note x={174} y={126}>mark moved</Note>
        </>
    ),
    'nameplates': (
        <>
            <TopCam l={66} r={174} y={40} />
            <rect x="56" y="40" width="128" height="80" rx="4" {...part} />
            {[[64, 48], [176, 48], [64, 112], [176, 112]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2.5" {...part} />)}
            <text x="72" y="64" {...mono}>TYPE  GR-40</text>
            <text x="72" y="82" {...mono}>SERIAL 2417-0883</text>
            <text x="72" y="100" {...mono}>HEAT  7A21</text>
            <rect x="68" y="90" width="72" height="14" rx="2" {...bad} {...B} />
            <Note x={120} y={136} anchor="middle">unreadable</Note>
        </>
    ),

    /* Building materials */
    'tiles-slabs': (
        <>
            <TopCam l={70} r={170} y={36} />
            <rect x="66" y="36" width="108" height="90" rx="2" {...part} />
            <rect x="74" y="44" width="92" height="74" rx="1" fill="var(--signal)" fillOpacity="0.07" stroke="var(--text-muted)" strokeWidth="0.8" />
            <path d="M104 44 L110 62 L104 76 L114 92" fill="none" stroke="var(--ng)" strokeWidth="1.8" {...B} />
            <path d="M174 114 L162 126 L174 126 Z" fill="var(--ng)" fillOpacity="0.25" stroke="var(--ng)" strokeWidth="1.4" {...B} />
            <Note x={196} y={92} anchor="middle">crack,</Note>
            <Note x={196} y={104} anchor="middle">chip</Note>
        </>
    ),
    'sanitaryware': (
        <>
            <TopCam l={70} r={170} y={40} />
            <ellipse cx="120" cy="84" rx="64" ry="42" {...part} />
            <ellipse cx="120" cy="88" rx="46" ry="28" {...part} />
            <circle cx="120" cy="96" r="5" {...part} />
            {[[92, 76], [98, 82], [90, 86]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2" {...bad} {...B} />)}
            <Note x={120} y={137} anchor="middle">pinholes</Note>
        </>
    ),
    'size-squareness': (
        <>
            <TopCam l={70} r={170} y={40} />
            <rect x="68" y="44" width="104" height="72" fill="none" stroke="var(--signal)" strokeWidth="1.2" strokeDasharray="4 3" />
            <path d="M68 44 L172 44 L178 116 L74 116 Z" fill="var(--text-muted)" fillOpacity="0.18" stroke="var(--ng)" strokeWidth="1.6" {...B} />
            <path d="M172 58 A14 14 0 0 1 184 50" fill="none" stroke="var(--ng)" strokeWidth="1.2" />
            <Note x={188} y={62}>87.2°</Note>
        </>
    ),
    'shade-colour': (
        <>
            <TopCam l={56} r={184} y={50} />
            {[56, 92, 128, 164].map((x, i) => (
                <rect key={x} x={x - 14} y="56" width="32" height="54" rx="2" fill="var(--text-muted)" fillOpacity={i === 2 ? 0.6 : 0.22} stroke={i === 2 ? 'var(--ng)' : 'var(--text-muted)'} strokeWidth={i === 2 ? 1.8 : 1.3} {...(i === 2 ? B : {})} />
            ))}
            <Note x={130} y={128} anchor="middle">shade off</Note>
        </>
    ),
    'pallet-counts': (
        <>
            <TopCam l={56} r={184} y={36} />
            <rect x="48" y="36" width="144" height="90" rx="3" {...part} strokeDasharray="5 3" />
            {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => {
                const miss = r === 2 && c === 3
                const x = 54 + c * 34
                const y = 42 + r * 27
                return <rect key={`${r}${c}`} x={x} y={y} width="30" height="23" rx="2" {...(miss ? dashedBad : solid)} {...(miss ? B : {})} />
            }))}
            <Note x={216} y={92} anchor="middle">11/12</Note>
        </>
    ),

    /* Packaging & logistics */
    'box-label': (
        <>
            <TopCam l={70} r={170} y={34} />
            <rect x="56" y="34" width="128" height="92" rx="2" {...part} />
            <g transform="rotate(-8 120 80)">
                <rect x="78" y="54" width="84" height="52" rx="2" {...bad} {...B} />
                {[84, 87, 92, 94, 99, 103, 105, 110, 114, 116, 121].map((x) => <path key={x} d={`M${x} 64 V84`} stroke="var(--text-muted)" strokeWidth="1.5" />)}
                <text x="84" y="98" {...mono} fontSize="8">SKU 3302</text>
            </g>
            <Note x={120} y={138} anchor="middle">label skewed</Note>
        </>
    ),
    'date-lot-codes': (
        <>
            <TopCam l={60} r={180} y={46} />
            <rect x="40" y="46" width="160" height="70" rx="8" {...part} />
            <text x="58" y="74" {...mono} fontSize="11" letterSpacing="1">LOT 2417</text>
            <text x="58" y="96" {...mono} fontSize="11" letterSpacing="1">EXP 09/</text>
            <rect x="54" y="84" width="120" height="16" rx="2" {...bad} {...B} />
            <Note x={120} y={132} anchor="middle">incomplete print</Note>
        </>
    ),
    'cartons-boxes': (
        <>
            <Camera x={30} y={30} r={20} />
            <path d="M38 38 L74 62" {...ray} />
            <path d="M60 64 L140 64 L176 50 L96 50 Z" {...part} />
            <path d="M60 64 V116 H140 V64 M140 116 L176 102 V50" {...part} />
            <path d="M96 50 L112 26 L188 26 L176 50" fill="none" stroke="var(--ng)" strokeWidth="1.8" {...B} />
            <Note x={200} y={44}>flap</Note>
            <Note x={200} y={56}>open</Note>
        </>
    ),
    'caps-closures': (
        <>
            <TopCam l={84} r={156} y={30} />
            <Bottle x={78} />
            <Bottle x={120} cap={<rect x="113" y="30" width="14" height="9" rx="2" transform="rotate(-18 120 36)" {...bad} {...B} />} />
            <Bottle x={162} />
            <path d="M40 118 H200 M40 124 H200" {...part} />
            <Note x={120} y={138} anchor="middle">cap not seated</Note>
        </>
    ),
    'bottle-fill': (
        <>
            <TopCam l={84} r={156} y={30} />
            <Bottle x={78} fillY={66} />
            <Bottle x={120} fillY={90} />
            <Bottle x={162} fillY={66} />
            <path d="M104 66 H136" {...bad} strokeDasharray="4 3" {...B} />
            <path d="M40 118 H200 M40 124 H200" {...part} />
            <Note x={196} y={92}>fill low</Note>
        </>
    ),
    'pack-contents': (
        <>
            <TopCam l={60} r={180} y={38} />
            <rect x="48" y="38" width="144" height="88" rx="3" {...part} />
            <rect x="56" y="46" width="128" height="12" rx="1" {...solid} />
            {[0, 1].map((r) => [0, 1, 2].map((c) => {
                const x = 78 + c * 42
                const y = 78 + r * 28
                const wrong = r === 1 && c === 1
                return wrong
                    ? <rect key={`${r}${c}`} x={x - 10} y={y - 10} width="20" height="20" rx="2" {...bad} {...B} />
                    : <circle key={`${r}${c}`} cx={x} cy={y} r="10" {...solid} />
            }))}
            <Note x={120} y={138} anchor="middle">wrong item</Note>
        </>
    ),
    'pallet-labels': (
        <>
            <Camera x={30} y={30} r={20} />
            <path d="M38 38 L150 72" {...ray} />
            {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={66 + c * 36} y={34 + r * 26} width="34" height="24" rx="1" {...part} />))}
            <path d="M56 112 H182 M56 120 H182 M62 112 V120 M119 112 V120 M176 112 V120" {...part} />
            <rect x="140" y="62" width="26" height="18" rx="1" {...dashedBad} {...B} />
            <Note x={206} y={60} anchor="middle">no</Note>
            <Note x={206} y={72} anchor="middle">label</Note>
        </>
    ),
}

import { useRef } from 'react'
import { useInView, useReducedMotion, useStepper } from './hooks.js'

// Homepage hero visual: a camera view where a scan line passes over a part and a
// verdict appears. Plain enough for anyone: "the machine looks, then decides".
// Each part takes two ticks: scanning, then the result. Part 3 of 4 has a defect.
const PARTS = [
    { n: 1041, ok: true },
    { n: 1042, ok: true },
    { n: 1043, ok: false },
    { n: 1044, ok: true },
]
const TICK_MS = 1500

export default function HeroScan() {
    const ref = useRef(null)
    const inView = useInView(ref, 0.2)
    const reduced = useReducedMotion()
    const [tick] = useStepper(PARTS.length * 2, TICK_MS, inView && !reduced)
    const scanning = !reduced && tick % 2 === 0
    const part = PARTS[reduced ? 0 : Math.floor(tick / 2)]
    const showNg = !scanning && !part.ok

    return (
        <figure className="hero-scan" ref={ref} aria-label="Illustration: a camera scans each part and marks it OK or NG.">
            <div className="hero-scan-frame">
                <svg viewBox="0 0 720 300" className="hero-scan-svg" aria-hidden="true">
                    <defs>
                        <linearGradient id="beam" x1="0" x2="1">
                            <stop offset="0" stopColor="var(--signal)" stopOpacity="0" />
                            <stop offset="0.5" stopColor="var(--signal)" stopOpacity="0.55" />
                            <stop offset="1" stopColor="var(--signal)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="hero-shade" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0" stopColor="#000" stopOpacity="0.35" />
                            <stop offset="0.5" stopColor="#000" stopOpacity="0" />
                            <stop offset="1" stopColor="#000" stopOpacity="0.45" />
                        </linearGradient>
                    </defs>

                    {/* The part: a flange photographed on an inspection stage */}
                    <image href="/images/hero/hero-part.webp" x="0" y="0" width="720" height="300" preserveAspectRatio="xMidYMid slice" />
                    {/* The same flange with a chipped rim, for the defective part; always loaded so it swaps without a flicker */}
                    <image href="/images/hero/hero-part-ng.webp" x="0" y="0" width="720" height="300" preserveAspectRatio="xMidYMid slice" opacity={part.ok ? 0 : 1} />
                    <rect width="720" height="300" fill="url(#hero-shade)" />

                    {/* Viewfinder corners */}
                    {[[40, 30, 1, 1], [680, 30, -1, 1], [40, 270, 1, -1], [680, 270, -1, -1]].map(([x, y, dx, dy]) => (
                        <path key={`${x}${y}`} d={`M${x} ${y + 22 * dy} V${y} H${x + 22 * dx}`} fill="none" stroke="var(--signal)" strokeWidth="2" opacity="0.8" />
                    ))}

                    {/* The verdict marks the chip on the NG part */}
                    <g className={`hero-defect${showNg ? ' on' : ''}`}>
                        <circle cx="502" cy="148" r="17" fill="none" stroke="var(--ng)" strokeWidth="2.5" />
                    </g>

                    {/* Scan beam */}
                    {scanning && (
                        <g className="hero-beam" key={tick}>
                            <rect x="-60" y="20" width="120" height="260" fill="url(#beam)" />
                            <rect x="-1" y="20" width="2" height="260" fill="var(--signal)" />
                        </g>
                    )}
                </svg>

                <div className="hero-scan-bar">
                    <span className="hero-scan-id">Part #{part.n} · illustration</span>
                    {scanning ? (
                        <span className="hero-chip scanning">Inspecting…</span>
                    ) : part.ok ? (
                        <span className="hero-chip ok">OK · all checks passed</span>
                    ) : (
                        <span className="hero-chip ng">NG · chipped edge found</span>
                    )}
                </div>
            </div>
            <figcaption className="sr-only">
                Every part is inspected by camera. Good parts are marked OK; a part with a defect is marked NG and rejected.
            </figcaption>
        </figure>
    )
}

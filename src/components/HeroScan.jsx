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
                        <pattern id="scan-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                            <path d="M24 0 H0 V24" fill="none" stroke="var(--border)" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="720" height="300" fill="url(#scan-grid)" opacity="0.6" />

                    {/* Viewfinder corners */}
                    {[[40, 30, 1, 1], [680, 30, -1, 1], [40, 270, 1, -1], [680, 270, -1, -1]].map(([x, y, dx, dy]) => (
                        <path key={`${x}${y}`} d={`M${x} ${y + 22 * dy} V${y} H${x + 22 * dx}`} fill="none" stroke="var(--signal)" strokeWidth="2" opacity="0.8" />
                    ))}

                    {/* The part: a connecting rod in outline */}
                    <g fill="none" stroke="var(--text-muted)" strokeWidth="2.2" strokeLinejoin="round">
                        <circle cx="220" cy="150" r="72" />
                        <circle cx="220" cy="150" r="40" />
                        <circle cx="520" cy="150" r="40" />
                        <circle cx="520" cy="150" r="20" />
                        <path d="M288 128 C 360 136, 420 136, 482 136 M288 172 C 360 164, 420 164, 482 164" />
                    </g>

                    {/* The defect, marked only on the NG part */}
                    <g className={`hero-defect${showNg ? ' on' : ''}`}>
                        <circle cx="385" cy="141" r="16" fill="none" stroke="var(--ng)" strokeWidth="2.5" />
                        <path d="M375 141 l6 -4 l5 6 l6 -5" fill="none" stroke="var(--ng)" strokeWidth="2" />
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
                    <span className="hero-scan-id">Part #{part.n}</span>
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

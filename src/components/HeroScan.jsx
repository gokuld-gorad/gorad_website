import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion, useStepper } from './hooks.js'

// Homepage visual: a camera view where a scan line passes over a part and a verdict
// appears, for a run of different parts, so the first impression is "Gorad inspects my
// part". Each part takes two ticks: scanning, then the result. The NG parts show their
// defect in the image itself (a chipped brick corner, a chipped flange rim) and the
// marker circles it. All images are illustrations.
const PARTS = [
    { img: 'hero-part', label: 'Flange #1041', ok: 'all checks passed' },
    { img: 'scan-pcb', label: 'Board #2207', ok: 'all components present' },
    { img: 'scan-brick', label: 'Brick #0412', ng: 'chipped corner found', mark: [444, 128, 25] },
    { img: 'scan-bearing', label: 'Bearing #3318', ok: 'all rollers present' },
    { img: 'hero-part-ng', label: 'Flange #1043', ng: 'chipped edge found', mark: [502, 148, 17] },
    { img: 'scan-conrod', label: 'Conrod #5126', ok: 'all faces passed' },
]
const TICK_MS = 1500

export default function HeroScan() {
    const ref = useRef(null)
    const inView = useInView(ref, 0.2)
    const reduced = useReducedMotion()
    // Only the first image is in the page HTML; the rest load once the scan is on screen.
    const [loadAll, setLoadAll] = useState(false)
    useEffect(() => { if (inView) setLoadAll(true) }, [inView])
    const [tick] = useStepper(PARTS.length * 2, TICK_MS, inView && !reduced && loadAll)
    const index = reduced ? 0 : Math.floor(tick / 2)
    const part = PARTS[index]
    const scanning = !reduced && tick % 2 === 0
    const showNg = !scanning && Boolean(part.ng)

    return (
        <figure className="hero-scan" ref={ref} aria-label="Illustration: a camera scans different parts one after another and marks each OK or NG.">
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

                    {/* The parts, stacked; the current one is shown */}
                    {PARTS.map((p, i) => (i === 0 || loadAll) && (
                        <image
                            key={p.img}
                            className="hero-part-img"
                            href={`/images/hero/${p.img}.webp`}
                            x="0" y="0" width="720" height="300"
                            preserveAspectRatio="xMidYMid slice"
                            opacity={i === index ? 1 : 0}
                        />
                    ))}
                    <rect width="720" height="300" fill="url(#hero-shade)" />

                    {/* Viewfinder corners */}
                    {[[40, 30, 1, 1], [680, 30, -1, 1], [40, 270, 1, -1], [680, 270, -1, -1]].map(([x, y, dx, dy]) => (
                        <path key={`${x}${y}`} d={`M${x} ${y + 22 * dy} V${y} H${x + 22 * dx}`} fill="none" stroke="var(--signal)" strokeWidth="2" opacity="0.8" />
                    ))}

                    {/* The verdict marks the defect on an NG part */}
                    {part.mark && (
                        <g className={`hero-defect${showNg ? ' on' : ''}`}>
                            <circle cx={part.mark[0]} cy={part.mark[1]} r={part.mark[2]} fill="none" stroke="var(--ng)" strokeWidth="2.5" />
                        </g>
                    )}

                    {/* Scan beam */}
                    {scanning && (
                        <g className="hero-beam" key={tick}>
                            <rect x="-60" y="20" width="120" height="260" fill="url(#beam)" />
                            <rect x="-1" y="20" width="2" height="260" fill="var(--signal)" />
                        </g>
                    )}
                </svg>

                <div className="hero-scan-bar">
                    <span className="hero-scan-id">{part.label} · illustration</span>
                    {scanning ? (
                        <span className="hero-chip scanning">Inspecting…</span>
                    ) : part.ng ? (
                        <span className="hero-chip ng">NG · {part.ng}</span>
                    ) : (
                        <span className="hero-chip ok">OK · {part.ok}</span>
                    )}
                </div>
            </div>
            <figcaption className="sr-only">
                Every part is inspected by camera: flanges, circuit boards, bricks, bearings and connecting rods. Good parts are marked OK; a part with a defect is marked NG and rejected.
            </figcaption>
        </figure>
    )
}

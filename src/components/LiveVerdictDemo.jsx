import { useRef } from 'react'
import { useInView, useReducedMotion, useStepper } from './hooks.js'

// An illustration of the Gorad Vision station screen (not a screenshot): parts cycle
// OK, OK, NG with its reason, OK. Pauses off-screen and for reduced-motion visitors.

const CYCLES = [
    { n: 1041, ok: true },
    { n: 1042, ok: true },
    { n: 1043, ok: false },
    { n: 1044, ok: true },
]

// Components on a board: [x, y, w, h]
const BOARDS = [
    [[18, 18, 34, 22], [62, 16, 22, 22], [98, 20, 40, 30], [20, 56, 26, 16], [60, 54, 16, 22], [92, 62, 22, 12], [124, 60, 18, 18]],
    [[16, 20, 26, 26], [52, 18, 46, 18], [110, 16, 26, 14], [22, 60, 40, 16], [76, 50, 18, 26], [104, 52, 34, 22]],
]

function Board({ variant, missing }) {
    const parts = BOARDS[variant]
    const gap = parts[4]
    return (
        <svg viewBox="0 0 156 92" role="img" aria-label={missing ? 'Board with a missing component' : 'Board with all components present'}>
            <rect width="156" height="92" fill="#16352a" />
            <g stroke="#2f6b52" strokeWidth="1" fill="none">
                <path d="M0 46h156M40 0v92M90 0v92M120 46v46" />
            </g>
            {parts.map(([x, y, w, h], i) =>
                missing && i === 4 ? null : (
                    <g key={i}>
                        <rect x={x} y={y} width={w} height={h} rx="2" fill={i % 3 === 0 ? '#1d1f24' : '#cfd3da'} />
                        <rect x={x + 2} y={y + 2} width={w - 4} height="2" fill={i % 3 === 0 ? '#3a3d45' : '#ffffff'} opacity="0.5" />
                    </g>
                ),
            )}
            {missing && (
                <rect x={gap[0] - 4} y={gap[1] - 4} width={gap[2] + 8} height={gap[3] + 8} fill="none" stroke="#ff5a4f" strokeWidth="2" strokeDasharray="4 3" />
            )}
        </svg>
    )
}

export default function LiveVerdictDemo() {
    const ref = useRef(null)
    const inView = useInView(ref, 0.3)
    const reduced = useReducedMotion()
    const [i] = useStepper(CYCLES.length, 2400, inView && !reduced)
    const c = CYCLES[i]
    const okCount = 986 + CYCLES.slice(0, i + 1).filter((x) => x.ok).length
    const ngCount = 3 + CYCLES.slice(0, i + 1).filter((x) => !x.ok).length

    return (
        <figure ref={ref}>
            <div className="kiosk" aria-hidden="true">
                <div className="kiosk-bar">
                    <span><strong>Station 3</strong> · Program PCB-A12 v4</span>
                    <span className="kiosk-live">LIVE</span>
                </div>
                <div className="kiosk-body">
                    <div className="kiosk-panel">
                        <div className="kiosk-views">
                            <div className="kiosk-view ok">
                                <Board variant={0} />
                                <span className="kiosk-view-label">View 1 · OK</span>
                            </div>
                            <div className={`kiosk-view ${c.ok ? 'ok' : 'ng'}`}>
                                <Board variant={1} missing={!c.ok} />
                                <span className="kiosk-view-label">View 2 · {c.ok ? 'OK' : 'NG'}</span>
                            </div>
                        </div>
                        <div className="kiosk-stats">
                            <div className="kiosk-stat"><b>{okCount}</b>OK</div>
                            <div className="kiosk-stat"><b>{ngCount}</b>NG</div>
                            <div className="kiosk-stat"><b>#{c.n}</b>Cycle</div>
                        </div>
                    </div>
                    <div className="kiosk-panel">
                        <div className={`verdict ${c.ok ? 'ok' : 'ng'}`}>
                            {c.ok ? 'OK' : 'NG'}
                            <small>PART {c.n}</small>
                        </div>
                        <div className="kiosk-reason">
                            {c.ok ? (
                                <p>All views passed. Result sent to the PLC.</p>
                            ) : (
                                <>
                                    <strong>Missing component</strong>
                                    <p>View 2 · capacitor C12 not found</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <figcaption className="kiosk-caption">
                Illustration of the Gorad Vision station screen: every part gets a verdict, and every NG says why.
            </figcaption>
        </figure>
    )
}

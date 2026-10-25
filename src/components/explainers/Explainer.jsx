import { useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { useInView, useReducedMotion, useStepper } from '../hooks.js'

// Shared frame for the "How it works" visuals on app pages. The ordered list is the
// content (readable without JS or motion); the Stage draws the current step.
//   mode "animated" / "steps": advances by itself while visible, with pause and replay
//   mode "static":             no motion, the Stage shows its complete picture
export default function Explainer({ steps, Stage, mode = 'animated', ms = 2400, label, note }) {
    const ref = useRef(null)
    const inView = useInView(ref, 0.35)
    const reduced = useReducedMotion()
    const [paused, setPaused] = useState(false)
    const isStatic = mode === 'static'
    const running = !isStatic && inView && !reduced && !paused
    // One extra tick holds the last step before the loop restarts.
    const [tick, setTick] = useStepper(steps.length + 1, ms, running)
    const last = steps.length - 1
    const step = isStatic || reduced ? last : Math.min(tick, last)

    return (
        <div className="cycle explainer" ref={ref}>
            <ol className="cycle-steps">
                {steps.map((s, i) => (
                    <li key={s.title} className={`${!isStatic && i === step ? 'active' : ''}${s.fault ? ' fault' : ''}`}>
                        <strong>{s.title}</strong>
                        <span>{s.text}</span>
                    </li>
                ))}
            </ol>
            <div className="cycle-stage">
                <div className="card explainer-frame">
                    <svg className="explainer-svg" viewBox="0 0 560 260" role="img" aria-label={label}>
                        <Stage step={step} />
                    </svg>
                </div>
                <p className="explainer-swipe" aria-hidden="true">Swipe to see the whole picture</p>
                {(note || (!isStatic && !reduced)) && (
                    <div className="cycle-controls">
                        <p>{isStatic || reduced ? note : `Step ${step + 1} of ${steps.length}${note ? ` · ${note}` : ''}`}</p>
                        {!isStatic && !reduced && (
                            <div className="btn-row">
                                <button className="icon-btn" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play animation' : 'Pause animation'}>
                                    {paused ? <Play size={16} /> : <Pause size={16} />}
                                </button>
                                <button className="icon-btn" onClick={() => { setTick(0); setPaused(false) }} aria-label="Replay from the start">
                                    <RotateCcw size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

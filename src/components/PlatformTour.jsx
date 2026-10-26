import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { useReducedMotion } from './hooks.js'

// A 30-second screen recording of the Factory Platform running on demo data (recorded
// from the sim demo; see docs/image-prompts.md). Muted and looping; it loads and plays
// only while in view, has a pause button, and never autoplays with reduced motion.
export default function PlatformTour() {
    const ref = useRef(null)
    const reduced = useReducedMotion()
    const [playing, setPlaying] = useState(false)
    const [userPaused, setUserPaused] = useState(false)

    useEffect(() => {
        const video = ref.current
        if (!video || reduced || userPaused || !('IntersectionObserver' in window)) return
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) video.play().then(() => setPlaying(true)).catch(() => {})
            else { video.pause(); setPlaying(false) }
        }, { threshold: 0.35 })
        io.observe(video)
        return () => io.disconnect()
    }, [reduced, userPaused])

    const toggle = () => {
        const video = ref.current
        if (!video) return
        if (video.paused) { setUserPaused(false); video.play().then(() => setPlaying(true)).catch(() => {}) }
        else { setUserPaused(true); video.pause(); setPlaying(false) }
    }

    return (
        <figure className="tour">
            <div className="screen-shot tour-frame">
                <div className="screen-chrome" aria-hidden="true"><span /><span /><span /></div>
                <video
                    ref={ref}
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/video/platform-tour-poster.webp"
                    width="1200"
                    height="900"
                    aria-label="Screen recording of the Gorad Factory Platform with demo data: live machine readings, an SPC control chart, its violations, a non-conformance record and the maintenance work orders."
                >
                    <source src="/video/platform-tour.mp4" type="video/mp4" />
                </video>
                <button type="button" className="tour-toggle" onClick={toggle} aria-label={playing ? 'Pause the tour' : 'Play the tour'}>
                    {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
                </button>
            </div>
            <figcaption className="tour-caption">Real software, demo data · 30 seconds, no sound</figcaption>
        </figure>
    )
}

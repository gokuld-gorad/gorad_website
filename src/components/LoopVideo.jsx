import { useRef } from 'react'
import { Pause, Play } from 'lucide-react'
import { useAutoplayVideo } from './hooks.js'

// Decorative AI-generated loop behind a section (captioned "Illustration"). Dimmed by
// CSS so the text on top stays readable; same playback rules as the platform tour.
export default function LoopVideo({ src, poster }) {
    const ref = useRef(null)
    const { playing, toggle } = useAutoplayVideo(ref, 0.2)
    return (
        <div className="loop-video">
            <video ref={ref} muted loop playsInline preload="none" poster={poster} aria-hidden="true">
                <source src={src} type="video/mp4" />
            </video>
            <span className="loop-video-note">Illustration</span>
            <button type="button" className="video-toggle" onClick={toggle} aria-label={playing ? 'Pause the background video' : 'Play the background video'}>
                {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
            </button>
        </div>
    )
}

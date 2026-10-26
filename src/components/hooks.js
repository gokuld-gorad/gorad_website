import { useEffect, useState } from 'react'

// Both hooks start with the server-safe value so hydration matches the pre-rendered HTML.

export function useReducedMotion() {
    const [reduced, setReduced] = useState(false)
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReduced(mq.matches)
        const onChange = (e) => setReduced(e.matches)
        mq.addEventListener('change', onChange)
        return () => mq.removeEventListener('change', onChange)
    }, [])
    return reduced
}

export function useInView(ref, threshold = 0.25) {
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el || !('IntersectionObserver' in window)) return
        const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold })
        io.observe(el)
        return () => io.disconnect()
    }, [ref, threshold])
    return inView
}

// Advances a step counter every `ms` while `running`; wraps at `count`.
export function useStepper(count, ms, running) {
    const [step, setStep] = useState(0)
    useEffect(() => {
        if (!running) return
        const id = setInterval(() => setStep((s) => (s + 1) % count), ms)
        return () => clearInterval(id)
    }, [count, ms, running])
    return [step, setStep]
}

// Muted video that plays only while in view, pauses when scrolled away, never autoplays
// with reduced motion, and stays paused once the visitor pauses it.
export function useAutoplayVideo(ref, threshold = 0.35) {
    const reduced = useReducedMotion()
    const [playing, setPlaying] = useState(false)
    const [userPaused, setUserPaused] = useState(false)
    useEffect(() => {
        const video = ref.current
        if (!video || reduced || userPaused || !('IntersectionObserver' in window)) return
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) video.play().then(() => setPlaying(true)).catch(() => {})
            else { video.pause(); setPlaying(false) }
        }, { threshold })
        io.observe(video)
        return () => io.disconnect()
    }, [ref, threshold, reduced, userPaused])
    const toggle = () => {
        const video = ref.current
        if (!video) return
        if (video.paused) { setUserPaused(false); video.play().then(() => setPlaying(true)).catch(() => {}) }
        else { setUserPaused(true); video.pause(); setPlaying(false) }
    }
    return { playing, toggle }
}

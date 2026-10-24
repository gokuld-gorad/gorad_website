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

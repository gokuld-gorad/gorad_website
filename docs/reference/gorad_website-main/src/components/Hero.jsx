import { motion } from 'framer-motion'
import { ArrowRight, Eye } from 'lucide-react'

function AnimatedGrid() {
    return (
        <div className="hero-bg">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <defs>
                    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,240,255,0.08)" strokeWidth="0.5" />
                    </pattern>
                    <radialGradient id="fade" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="white" stopOpacity="1" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </radialGradient>
                    <mask id="gridMask">
                        <rect width="100%" height="100%" fill="url(#fade)" />
                    </mask>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" mask="url(#gridMask)" />
            </svg>
            <div className="hero-gradient" />
        </div>
    )
}

export default function Hero() {
    const scrollToContact = () => {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    }

    const scrollToSolutions = () => {
        document.querySelector('#solutions')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="hero" id="hero">
            <AnimatedGrid />
            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <motion.div
                    className="section-label"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <Eye size={14} /> AI-Powered Solutions
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                >
                    GORAD <span className="accent">PVT LTD</span>
                </motion.h1>
                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                >
                    AI-Powered Visual Inspection &amp; Automation
                </motion.p>
                <motion.div
                    className="hero-buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.7 }}
                >
                    <button className="btn btn-primary" onClick={scrollToContact}>
                        Request Demo <ArrowRight size={18} />
                    </button>
                    <button className="btn btn-secondary" onClick={scrollToSolutions}>
                        Explore Solutions
                    </button>
                </motion.div>
            </motion.div>
        </section>
    )
}

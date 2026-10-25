import { motion } from 'framer-motion'

const steps = [
    { title: 'Study & Analysis', desc: 'Thoroughly understand and define the problem.' },
    { title: 'Concept & Pricing', desc: 'Detailed solution concept and transparent pricing.' },
    { title: 'Hardware Installation', desc: 'Install complete system hardware with optimized optics.' },
    { title: 'Data Collection & Model Training', desc: 'Gather data and train highly accurate AI models.' },
    { title: 'Model Deployment', desc: 'Deploy trained models onto the production system.' },
    { title: 'System Testing', desc: 'Comprehensive testing of the complete system.' },
    { title: 'Production & Support', desc: 'Go live with continuous monitoring and support.' },
]

const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
        opacity: 1, x: 0,
        transition: { delay: i * 0.12, duration: 0.5 }
    })
}

export default function Roadmap() {
    return (
        <section className="section" id="roadmap">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">How We Deliver</span>
                    <h2>Implementation Roadmap</h2>
                    <p>A structured 7-step process for successful deployment.</p>
                </motion.div>
                <div className="timeline">
                    {steps.map(({ title, desc }, i) => (
                        <motion.div
                            key={title}
                            className="timeline-item"
                            custom={i}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-30px' }}
                        >
                            <div className="timeline-dot" />
                            <span className="timeline-step">Step {String(i + 1).padStart(2, '0')}</span>
                            <h4>{title}</h4>
                            <p>{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

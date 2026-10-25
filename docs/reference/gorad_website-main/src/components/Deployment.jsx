import { motion } from 'framer-motion'
import { Hand, Cog, Bot, Server } from 'lucide-react'

const steps = [
    {
        num: 1,
        icon: Hand,
        title: 'Manual',
        desc: 'Manual loading and manual triggering for simple setups.',
    },
    {
        num: 2,
        icon: Cog,
        title: 'Semi-Automated',
        desc: 'Manual loading with automatic system triggering.',
    },
    {
        num: 3,
        icon: Bot,
        title: 'Fully Automated',
        desc: 'Integrated with Cobots, Conveyors, and Robots.',
    },
]

export default function Deployment() {
    return (
        <section className="section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Flexible Options</span>
                    <h2>Deployment Models</h2>
                    <p>Choose the automation level that fits your operations.</p>
                </motion.div>
                <div className="deploy-steps">
                    {steps.map(({ num, icon: Icon, title, desc }, i) => (
                        <motion.div
                            key={title}
                            className="deploy-step"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                        >
                            <div className="deploy-step-number">{num}</div>
                            <Icon size={28} style={{ color: 'var(--accent)', marginBottom: 12 }} />
                            <h4>{title}</h4>
                            <p>{desc}</p>
                        </motion.div>
                    ))}
                </div>
                <motion.div
                    className="deploy-arch"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <div className="glass-card" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 28px', marginTop: 32 }}>
                        <Server size={18} style={{ color: 'var(--accent)' }} />
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Architecture: <strong style={{ color: 'var(--text-primary)' }}>Standalone</strong> or <strong style={{ color: 'var(--text-primary)' }}>Client-Server</strong> (multiple edge systems managed by a single server)
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

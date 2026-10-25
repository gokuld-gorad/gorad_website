import { motion } from 'framer-motion'
import { Lightbulb, PiggyBank, Heart, ShieldCheck, Handshake } from 'lucide-react'

const items = [
    { icon: Lightbulb, title: 'Innovate', desc: 'Continuously seeking advanced solutions' },
    { icon: PiggyBank, title: 'Cost Efficient', desc: 'Affordable, high-value technology' },
    { icon: Heart, title: 'Committed', desc: 'Dedicated to project success' },
    { icon: ShieldCheck, title: 'Transparent', desc: 'Clear and honest communication' },
    { icon: Handshake, title: 'Trust', desc: 'Reliable, long-term partnerships' },
]

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.1, duration: 0.5 }
    })
}

export default function Philosophy() {
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
                    <span className="section-label">Our Core Principles</span>
                    <h2>Our Philosophy</h2>
                    <p>Combining the best industry practices with cost-effective, affordable solutions.</p>
                </motion.div>
                <div className="grid-5">
                    {items.map(({ icon: Icon, title, desc }, i) => (
                        <motion.div
                            key={title}
                            className="glass-card philosophy-card"
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-40px' }}
                        >
                            <div className="icon-box"><Icon size={22} /></div>
                            <h4>{title}</h4>
                            <p>{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

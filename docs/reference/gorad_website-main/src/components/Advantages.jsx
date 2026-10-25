import { motion } from 'framer-motion'
import {
    Zap, Target, TrendingUp, AlertTriangle,
    Award, SmilePlus, BarChart3, Rocket, Lock
} from 'lucide-react'

const advantages = [
    { icon: Zap, title: 'Superior Efficiency', desc: 'Better human-machine collaboration, maximizing throughput.' },
    { icon: Target, title: 'Increased Accuracy', desc: 'Zero Defect standard in quality control.' },
    { icon: TrendingUp, title: 'Profitability', desc: 'Efficient Return on Investment (ROI).' },
    { icon: AlertTriangle, title: 'Reduced Errors', desc: 'Zero Error operations guaranteed.' },
    { icon: Award, title: 'Business Reputation', desc: 'Eliminate supply of defective products.' },
    { icon: SmilePlus, title: 'Happy Customers', desc: 'Zero Complaints through consistent quality.' },
    { icon: BarChart3, title: 'Business Visibility', desc: 'Increased market presence with quality products.' },
    { icon: Rocket, title: 'Quick Deployment', desc: 'Faster time-to-value for automation projects.' },
    { icon: Lock, title: 'Secure Systems', desc: 'Robust and reliable system security.' },
]

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.06, duration: 0.5 }
    })
}

export default function Advantages() {
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
                    <span className="section-label">Why Choose Us</span>
                    <h2>Advantages</h2>
                    <p>Tangible results that drive immediate and long-term business value.</p>
                </motion.div>
                <div className="grid-3">
                    {advantages.map(({ icon: Icon, title, desc }, i) => (
                        <motion.div
                            key={title}
                            className="glass-card adv-card"
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-30px' }}
                        >
                            <div className="icon-box"><Icon size={20} /></div>
                            <h4>{title}</h4>
                            <p>{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

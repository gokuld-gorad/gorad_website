import { motion } from 'framer-motion'
import {
    Factory, Pill, Car, Shirt, Cpu, Plane, CircuitBoard, Package, ShoppingBag
} from 'lucide-react'

const industries = [
    { icon: Factory, name: 'Manufacturing', desc: 'Smart quality control for production lines' },
    { icon: Pill, name: 'Pharmaceuticals', desc: 'Compliance-grade inspection' },
    { icon: Car, name: 'Automobiles', desc: 'Precision part verification' },
    { icon: Shirt, name: 'Textiles', desc: 'Fabric defect detection' },
    { icon: Cpu, name: 'Electronics', desc: 'PCB & component inspection' },
    { icon: Plane, name: 'Aerospace', desc: 'Safety-critical checks' },
    { icon: CircuitBoard, name: 'Semiconductors', desc: 'Wafer & die inspection' },
    { icon: Package, name: 'Logistics', desc: 'Package verification' },
    { icon: ShoppingBag, name: 'Consumer Goods', desc: 'Label & packaging QC' },
]

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.06, duration: 0.5 }
    })
}

export default function Industries() {
    return (
        <section className="section" id="solutions">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">What We Do</span>
                    <h2>Visual Inspection Solutions</h2>
                    <p>Advanced AI-powered inspection across diverse industries.</p>
                </motion.div>
                <div className="bento-grid">
                    {industries.map(({ icon: Icon, name, desc }, i) => (
                        <motion.div
                            key={name}
                            className="glass-card bento-item"
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-40px' }}
                        >
                            <div className="icon-box"><Icon size={20} /></div>
                            <h4>{name}</h4>
                            <p>{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

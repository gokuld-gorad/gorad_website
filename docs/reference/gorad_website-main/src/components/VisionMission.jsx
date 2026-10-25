import { motion } from 'framer-motion'
import { Telescope, Rocket } from 'lucide-react'

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.15, duration: 0.6 }
    })
}

export default function VisionMission() {
    return (
        <section className="section" id="about">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Who We Are</span>
                    <h2>Vision &amp; Mission</h2>
                </motion.div>
                <div className="vm-grid">
                    <motion.div
                        className="glass-card vm-card"
                        custom={0}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        <div className="icon-box"><Telescope size={24} /></div>
                        <h3>Our Vision</h3>
                        <p>To provide AI and automation solutions precisely tailored to your business needs.</p>
                    </motion.div>
                    <motion.div
                        className="glass-card vm-card"
                        custom={1}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        <div className="icon-box"><Rocket size={24} /></div>
                        <h3>Our Mission</h3>
                        <p>We build a better and smarter future for manufacturing and industry.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

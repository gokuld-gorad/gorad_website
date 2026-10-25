import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const data = [
    {
        category: 'Inspection & Verification',
        items: ['Assembly verification (presence/absence)', 'Automated defect detection', 'Automated sorting and classification'],
    },
    {
        category: 'Data & Identification',
        items: ['Barcode generation', 'Barcode scanning and tracking', 'Optical Character Recognition & Verification (OCR & OCV)'],
    },
    {
        category: 'Quality & Process',
        items: ['Measurement and Dimensioning', 'Process monitoring', 'Safety checks'],
    },
]

const colVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.15, duration: 0.6 }
    })
}

export default function Capabilities() {
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
                    <span className="section-label">Key Capabilities</span>
                    <h2>Inspection Dashboard</h2>
                    <p>Comprehensive visual inspection across every stage of your operations.</p>
                </motion.div>
                <div className="grid-3">
                    {data.map(({ category, items }, ci) => (
                        <motion.div
                            key={category}
                            className="glass-card"
                            custom={ci}
                            variants={colVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-40px' }}
                        >
                            <div className="cap-category">
                                <div className="cap-category-title">{category}</div>
                                {items.map((item) => (
                                    <div key={item} className="cap-item">
                                        <CheckCircle size={16} />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

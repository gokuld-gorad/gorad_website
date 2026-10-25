import { motion } from 'framer-motion'
import { Network, Server, Camera } from 'lucide-react'

const groups = [
    {
        icon: Network,
        title: 'PLC Protocols',
        pills: ['Modbus', 'Profinet', 'S7', 'TCP', 'Profibus'],
    },
    {
        icon: Server,
        title: 'Enterprise Systems',
        pills: ['MES', 'SCADA', 'ERP Integration'],
    },
    {
        icon: Camera,
        title: 'Camera Compatibility',
        pills: ['IP Cameras', 'GigE Vision', 'USB / Webcam', 'Industrial Line Scan'],
    },
]

export default function TechIntegration() {
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
                    <span className="section-label">Plug & Play</span>
                    <h2>Technology Integration</h2>
                    <p>Seamless integration with your existing infrastructure.</p>
                </motion.div>
                <div className="grid-3">
                    {groups.map(({ icon: Icon, title, pills }, gi) => (
                        <motion.div
                            key={title}
                            className="glass-card"
                            style={{ padding: '36px 32px' }}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ delay: gi * 0.12, duration: 0.6 }}
                        >
                            <div className="icon-box" style={{ marginBottom: 20 }}><Icon size={22} /></div>
                            <div className="tech-group">
                                <div className="tech-group-title">{title}</div>
                                <div className="tech-pills">
                                    {pills.map((pill) => (
                                        <span key={pill} className="tech-pill">{pill}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

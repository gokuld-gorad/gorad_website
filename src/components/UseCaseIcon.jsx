import { Cog, Cpu, Gauge, Package, Repeat, Zap } from 'lucide-react'

const icons = { zap: Zap, cpu: Cpu, cog: Cog, package: Package, gauge: Gauge, repeat: Repeat }

export default function UseCaseIcon({ name, size = 20 }) {
    const Icon = icons[name]
    return <Icon size={size} aria-hidden="true" />
}

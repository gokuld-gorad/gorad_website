import { BrickWall, CircleDot, Cpu, Filter, Gauge, Package, Repeat, Wrench, Zap } from 'lucide-react'

const icons = {
    wrench: Wrench,
    filter: Filter,
    cpu: Cpu,
    zap: Zap,
    'circle-dot': CircleDot,
    'brick-wall': BrickWall,
    package: Package,
    gauge: Gauge,
    repeat: Repeat,
}

export default function UseCaseIcon({ name, size = 20 }) {
    const Icon = icons[name]
    return <Icon size={size} aria-hidden="true" />
}

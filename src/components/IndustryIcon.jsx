import { BrickWall, Car, Cpu, FlaskConical, Package, Plane } from 'lucide-react'

const icons = { car: Car, cpu: Cpu, plane: Plane, brick: BrickWall, package: Package, flask: FlaskConical }

export default function IndustryIcon({ name, size = 22 }) {
    const Icon = icons[name]
    return <Icon size={size} aria-hidden="true" />
}

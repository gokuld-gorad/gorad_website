// Small SVG building blocks shared by the explainers. Colours are theme tokens.
export const C = {
    signal: 'var(--signal)',
    ok: 'var(--ok)',
    ng: 'var(--ng)',
    warn: 'var(--warning)',
    text: 'var(--text)',
    muted: 'var(--text-muted)',
    subtle: 'var(--text-subtle)',
    line: 'var(--border-strong)',
    surface: 'var(--surface)',
    sunken: 'var(--surface-sunken)',
}

const fade = { transition: 'opacity 0.3s, stroke 0.3s, fill 0.3s' }

export function Box({ x, y, w = 110, h = 44, label, sub, color = C.line, active = true, fill = C.surface, bold }) {
    return (
        <g style={fade} opacity={active ? 1 : 0.45}>
            <rect x={x} y={y} width={w} height={h} rx="7" fill={fill} stroke={color} strokeWidth={bold ? 2 : 1.2} style={fade} />
            <text x={x + w / 2} y={sub ? y + h / 2 - 3 : y + h / 2 + 4} textAnchor="middle" fontSize="12.5" fontWeight="600" fill={C.text}>{label}</text>
            {sub && <text x={x + w / 2} y={y + h / 2 + 13} textAnchor="middle" fontSize="10.5" fill={C.muted}>{sub}</text>}
        </g>
    )
}

export function Line({ d, on = true, color = C.signal, dashed }) {
    return (
        <path d={d} fill="none" stroke={on ? color : C.line} strokeWidth={on ? 2 : 1.3}
            strokeDasharray={dashed || !on ? '4 4' : undefined} style={fade} />
    )
}

export function Label({ x, y, children, color = C.muted, size = 11, anchor = 'start', weight = 400 }) {
    return <text x={x} y={y} fontSize={size} fill={color} textAnchor={anchor} fontWeight={weight} style={fade}>{children}</text>
}

export function Pill({ x, y, w, label, color, show = true }) {
    return (
        <g style={fade} opacity={show ? 1 : 0}>
            <rect x={x} y={y} width={w} height="22" rx="11" fill={color} opacity="0.14" />
            <rect x={x} y={y} width={w} height="22" rx="11" fill="none" stroke={color} />
            <text x={x + w / 2} y={y + 15} textAnchor="middle" fontSize="11" fontWeight="600" fill={color}>{label}</text>
        </g>
    )
}

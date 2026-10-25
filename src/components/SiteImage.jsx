import manifest from '../content/imageManifest.json'

// Shows an image from public/images/<group>/ only if scripts/add-images.py has
// published it; otherwise renders nothing. AI-generated images carry an
// "Illustration" caption; real screenshots say so (see docs/image-prompts.md).
export function hasImage(group, name) {
    return Boolean(manifest[group] && manifest[group][name])
}

export function imageNames(group) {
    return Object.keys(manifest[group] || {})
}

export default function SiteImage({ group, name, variant = 'full', className = '', caption = 'Illustration', alt = '' }) {
    if (!hasImage(group, name)) return null
    const [w, h] = manifest[group][name]
    const card = variant === 'card'
    const scale = card ? 0.5 : 1
    return (
        <figure className={`site-image ${card ? 'site-image-card' : 'site-image-full'} ${className}`}>
            <img
                src={`/images/${group}/${name}${card ? '-card' : ''}.webp`}
                alt={alt}
                width={Math.round(w * scale)}
                height={Math.round(h * scale)}
                loading={card ? 'lazy' : 'eager'}
                decoding="async"
            />
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    )
}

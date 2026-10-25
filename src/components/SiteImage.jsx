import manifest from '../content/imageManifest.json'

// Shows an image from public/images/<group>/ only if scripts/add-images.py has
// published it; otherwise renders nothing. AI-generated images carry an
// "Illustration" caption (see docs/image-prompts.md).
export function hasImage(group, name) {
    return (manifest[group] || []).includes(name)
}

export default function SiteImage({ group, name, variant = 'full', className = '', caption = 'Illustration' }) {
    if (!hasImage(group, name)) return null
    const card = variant === 'card'
    return (
        <figure className={`site-image ${card ? 'site-image-card' : 'site-image-full'} ${className}`}>
            <img
                src={`/images/${group}/${name}${card ? '-card' : ''}.webp`}
                alt=""
                width={card ? 800 : 1600}
                height={card ? 450 : 900}
                loading={card ? 'lazy' : 'eager'}
                decoding="async"
            />
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    )
}

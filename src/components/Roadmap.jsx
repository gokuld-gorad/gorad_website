import { roadmap } from '../content/roadmap.js'

// `compact` shows the step names only (homepage); the full version adds a line per
// step and the pilot note (Vision page).
export default function Roadmap({ compact = false }) {
    return (
        <>
            <ol className={`roadmap${compact ? ' roadmap-compact' : ''}`}>
                {roadmap.map((r) => (
                    <li key={r.title}>
                        <h3>{r.title}</h3>
                        {!compact && <p>{r.text}</p>}
                    </li>
                ))}
            </ol>
            {!compact && (
                <div className="callout roadmap-note">
                    <p>Not sure yet? Start with a <strong>pilot</strong>: we do the first steps on your own sample parts, so you see results before you commit. <a href="/pilot/">How the pilot works</a> · <a href="/how-we-work/">Every step in detail</a></p>
                </div>
            )}
        </>
    )
}

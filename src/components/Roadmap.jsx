import { roadmap } from '../content/roadmap.js'

export default function Roadmap() {
    return (
        <>
            <ol className="roadmap">
                {roadmap.map((r) => (
                    <li key={r.title}>
                        <h3>{r.title}</h3>
                        <p>{r.text}</p>
                    </li>
                ))}
            </ol>
            <div className="callout roadmap-note">
                <p>Not sure yet? Start with a <strong>pilot</strong>: we do the first steps on your own sample parts, so you see results before you commit. <a href="/pilot/">How the pilot works</a> · <a href="/how-we-work/">Every step in detail</a></p>
            </div>
        </>
    )
}

// Gorad against the categories a buyer actually weighs. Categories, not brands, and
// fair wording ("varies", "limited"): engineers who know these products must agree.
const columns = ['Smart camera', 'Custom integrator project', 'Separate point tools', 'Gorad Factory Platform']

const rows = [
    { label: 'Multi-camera, one verdict per part', cells: ['Limited', 'Yes', '—', 'Yes'] },
    { label: 'A fault means NG, by design', cells: ['Depends on setup', 'Depends on the integrator', '—', 'Built in, covered by tests'] },
    { label: 'Signed, versioned inspection programs', cells: ['Varies', 'Rarely', '—', 'Yes'] },
    { label: 'Change it without the original integrator', cells: ['Partly', 'Rarely', '—', 'Yes, from SETUP'] },
    { label: 'Classical and AI checks in one program', cells: ['Limited', 'Custom code', '—', 'Yes'] },
    { label: 'Inspection feeds SPC, NCR and OEE', cells: ['No', 'Custom work', 'Separate systems', 'Same platform'] },
    { label: 'One login and one audit trail', cells: ['—', 'Varies', 'No', 'Yes'] },
    { label: 'Air-gapped updates', cells: ['Varies', 'Manual', 'Varies', 'By USB, from the web interface'] },
]

export default function Comparison() {
    return (
        <>
            <div className="compare-wrap" role="region" aria-label="Comparison table" tabIndex={0}>
                <table className="compare">
                    <caption className="sr-only">How the Gorad Factory Platform compares with smart cameras, custom integrator projects and separate point tools</caption>
                    <thead>
                        <tr>
                            <th scope="col"><span className="sr-only">Capability</span></th>
                            {columns.map((c, i) => (
                                <th scope="col" key={c} className={i === columns.length - 1 ? 'us' : undefined}>{c}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.label}>
                                <th scope="row">{r.label}</th>
                                {r.cells.map((c, i) => (
                                    <td key={i} className={i === r.cells.length - 1 ? 'us' : undefined}>{c}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="compare-note">Typical characteristics of each category. Individual products and projects vary.</p>
        </>
    )
}

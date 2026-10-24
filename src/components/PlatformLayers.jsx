// The platform as three layers. All text is in the markup; hover and focus only highlight.
const apps = ['SPC', 'NCR / CAPA', 'Line Performance', 'Traceability', 'Maintenance', 'Tool Life', 'Label & Dispatch', 'Skills', 'Calibration & MSA']
const core = ['Users & roles', 'Offline licence', 'Site → line → station', 'Audit trail', 'Event bus', 'Updates & backup']

export default function PlatformLayers({ linked = true }) {
    const Name = ({ href, children }) =>
        linked && href ? <a href={href} className="layer-name">{children}</a> : <span className="layer-name">{children}</span>
    return (
        <div className="layers" role="list" aria-label="Gorad Factory Platform layers">
            <div className="layer" role="listitem" tabIndex={0}>
                <div className="layer-head">
                    <Name>Apps</Name>
                    <span className="layer-tag">Quality · Production · Compliance</span>
                </div>
                <p>Add apps as you need them. They share one login, one audit trail and the same plant data.</p>
                <div className="layer-chips">{apps.map((a) => <span className="chip" key={a}>{a}</span>)}</div>
            </div>
            <div className="layer-row">
                <div className="layer" role="listitem" tabIndex={0}>
                    <div className="layer-head">
                        <Name href="/factory-platform/vision/">Gorad Vision</Name>
                        <span className="layer-tag">Inspection</span>
                    </div>
                    <p>Fail-closed visual inspection with a PLC handshake and signed programs.</p>
                </div>
                <div className="layer" role="listitem" tabIndex={0}>
                    <div className="layer-head">
                        <Name href="/factory-platform/connect/">Gorad Connect</Name>
                        <span className="layer-tag">Machine data</span>
                    </div>
                    <p>Reads PLCs and meters and turns tags into standard events.</p>
                </div>
            </div>
            <div className="layer" role="listitem" tabIndex={0}>
                <div className="layer-head">
                    <Name>Platform Core</Name>
                    <span className="layer-tag">Shared by everything</span>
                </div>
                <div className="layer-chips">{core.map((a) => <span className="chip" key={a}>{a}</span>)}</div>
            </div>
        </div>
    )
}

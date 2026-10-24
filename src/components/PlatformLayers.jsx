import { appIndex as appPages } from '../content/appIndex.js'

// The platform as three layers. All text is in the markup; hover and focus only highlight.
const core = ['Users & roles', 'Offline licence', 'Site → line → station', 'Audit trail', 'Event bus', 'Updates & backup']

function Name({ href, children }) {
    return href ? <a href={href} className="layer-name">{children}</a> : <span className="layer-name">{children}</span>
}

export default function PlatformLayers() {
    return (
        <div className="layers" role="list" aria-label="Gorad Factory Platform layers">
            <div className="layer" role="listitem">
                <div className="layer-head">
                    <Name href="/factory-platform/#apps">Apps</Name>
                    <span className="layer-tag">Quality · Production · Compliance</span>
                </div>
                <p>Add apps as you need them. They share one login, one audit trail and the same plant data.</p>
                <div className="layer-chips">
                    {appPages.map((a) => <a className="chip" key={a.slug} href={`/factory-platform/${a.slug}/`}>{a.name}</a>)}
                </div>
            </div>
            <div className="layer-row">
                <div className="layer" role="listitem">
                    <div className="layer-head">
                        <Name href="/factory-platform/vision/">Gorad Vision</Name>
                        <span className="layer-tag">Inspection</span>
                    </div>
                    <p>Fail-closed visual inspection with a PLC handshake and signed programs.</p>
                </div>
                <div className="layer" role="listitem">
                    <div className="layer-head">
                        <Name href="/factory-platform/connect/">Gorad Connect</Name>
                        <span className="layer-tag">Machine data</span>
                    </div>
                    <p>Reads PLCs and meters and turns tags into standard events.</p>
                </div>
            </div>
            <div className="layer" role="listitem">
                <div className="layer-head">
                    <Name href="/factory-platform/">Platform Core</Name>
                    <span className="layer-tag">Shared by everything</span>
                </div>
                <div className="layer-chips">{core.map((a) => <span className="chip" key={a}>{a}</span>)}</div>
            </div>
        </div>
    )
}

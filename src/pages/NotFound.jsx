export default function NotFound() {
    return (
        <section className="section">
            <div className="container" style={{ textAlign: 'center', maxWidth: 560 }}>
                <span className="eyebrow">404</span>
                <h1 style={{ fontSize: '2.4rem', marginBottom: 12 }}>Page not found</h1>
                <p>The page you were looking for does not exist or has moved.</p>
                <div className="btn-row" style={{ justifyContent: 'center', marginTop: 28 }}>
                    <a href="/" className="btn btn-primary">Go to the homepage</a>
                    <a href="/contact/" className="btn btn-secondary">Contact us</a>
                </div>
            </div>
        </section>
    )
}

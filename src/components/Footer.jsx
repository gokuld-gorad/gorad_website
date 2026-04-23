export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-logo">
                    GORAD<span>.</span>
                </div>
                <p>© {new Date().getFullYear()} Gorad Pvt Ltd. All rights reserved.</p>
            </div>
        </footer>
    )
}

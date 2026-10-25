// Site-wide facts. Plain JS (no JSX) so the prerender script can import it too.
export const SITE_URL = 'https://www.gorad.in'
export const COMPANY = 'Gorad Pvt Ltd'
export const PLATFORM = 'Gorad Factory Platform'
export const CIN = 'U62099KA2026PTC214948'

export const EMAIL_INFO = 'info@gorad.in'
export const EMAIL_SALES = 'sales@gorad.in'
export const ADDRESS_LINES = [
    'Booth No. 100, 38, 2nd Main',
    'Ashwini Layout, Viveka Nagar',
    'Bengaluru 560047, India',
]

export const FOUNDER = {
    name: 'Gokulramesh Dhanasekar',
    photo: '/images/founder.webp',
    title: 'Founder',
    linkedin: 'https://www.linkedin.com/in/gokulramesh-d/',
}

// PDFs rendered from print/*.html by scripts/make-pdfs.sh
export const DOWNLOADS = {
    brochure: { href: '/downloads/gorad-factory-platform-brochure.pdf', label: 'Brochure', note: '2 pages, PDF' },
    datasheet: { href: '/downloads/gorad-factory-platform-datasheet.pdf', label: 'Technical datasheet', note: '2 pages, PDF' },
}

export const GOOGLE_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbwQbbpJhkqEIBnOhg-PWQmz5sRXkmF8R5-fguk_FUsMXeESiSS0voTP9bSEf0lhFAFK/exec'

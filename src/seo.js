import { SITE_URL, COMPANY, PLATFORM, EMAIL_INFO, FOUNDER, CIN } from './site.js'
import { homeFaqs } from './content/faqs.js'
import { glossary } from './content/glossary.js'
import { VISION } from './content/company.js'

const esc = (s) =>
    String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const organization = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#org`,
    name: COMPANY,
    alternateName: 'Gorad',
    slogan: VISION,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    email: EMAIL_INFO,
    identifier: { '@type': 'PropertyValue', propertyID: 'CIN', value: CIN },
    founder: {
        '@type': 'Person',
        name: FOUNDER.name,
        jobTitle: FOUNDER.title,
        image: `${SITE_URL}${FOUNDER.photo}`,
        sameAs: [FOUNDER.linkedin],
    },
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Booth No. 100, 38, 2nd Main, Ashwini Layout, Viveka Nagar',
        addressLocality: 'Bengaluru',
        postalCode: '560047',
        addressCountry: 'IN',
    },
}

const software = {
    '@type': 'SoftwareApplication',
    name: PLATFORM,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Manufacturing software',
    operatingSystem: 'Linux (Ubuntu, RHEL); browser-based user interface',
    publisher: { '@id': `${SITE_URL}/#org` },
    description:
        'Composable manufacturing software: visual inspection, PLC and meter data, SPC, NCR/CAPA, OEE, traceability and maintenance on one on-premise platform.',
}

function jsonLd(route) {
    const graph = [organization]
    if (route.page === 'home' || route.page === 'platform') graph.push(software)
    // The FAQ is shown on the Factory Platform page, so its structured data lives there.
    if (route.page === 'platform') {
        graph.push({
            '@type': 'FAQPage',
            mainEntity: homeFaqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
        })
    }
    if (route.page === 'glossary') {
        graph.push({
            '@type': 'DefinedTermSet',
            name: 'Gorad glossary',
            hasDefinedTerm: Object.entries(glossary).map(([name, description]) => ({ '@type': 'DefinedTerm', name, description })),
        })
    }
    // "<" is escaped so the JSON can never close the script tag.
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
}

export function renderHead(route) {
    const url = SITE_URL + route.path
    const image = `${SITE_URL}/og-image.png`
    return [
        `<title>${esc(route.title)}</title>`,
        `<meta name="description" content="${esc(route.description)}" />`,
        route.noindex
            ? '<meta name="robots" content="noindex" />'
            : `<link rel="canonical" href="${url}" />`,
        '<meta property="og:type" content="website" />',
        '<meta property="og:site_name" content="Gorad" />',
        `<meta property="og:title" content="${esc(route.title)}" />`,
        `<meta property="og:description" content="${esc(route.description)}" />`,
        `<meta property="og:url" content="${url}" />`,
        `<meta property="og:image" content="${image}" />`,
        '<meta property="og:image:width" content="1200" />',
        '<meta property="og:image:height" content="630" />',
        '<meta name="twitter:card" content="summary_large_image" />',
        `<script type="application/ld+json">${jsonLd(route)}</script>`,
    ].join('\n    ')
}

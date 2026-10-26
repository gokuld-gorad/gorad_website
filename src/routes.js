import { appIndex as appPages } from './content/appIndex.js'
import { industries } from './content/industries.js'
import { guides } from './content/guides.js'

// One entry per page: URL, search title and description. Paths end in "/" because
// each page is served from <path>/index.html on GitHub Pages.
const appRoutes = appPages.map((a) => ({
    path: `/factory-platform/${a.slug}/`,
    page: 'app',
    slug: a.slug,
    title: a.seoTitle ?? `${a.fullName} — ${a.tagline}`,
    description: a.description,
}))

const guideRoutes = guides.map((g) => ({
    path: `/guides/${g.slug}/`,
    page: 'guide',
    slug: g.slug,
    title: g.seoTitle,
    description: g.description,
}))

const industryRoutes = industries.map((i) => ({
    path: `/industries/${i.slug}/`,
    page: 'industry',
    slug: i.slug,
    title: `${i.name} — Gorad`,
    description: i.description,
}))

export const routes = [
    {
        path: '/',
        page: 'home',
        title: 'Gorad — AI inspection and factory software you can trust',
        description:
            'Gorad builds AI software for factories: camera inspection of every part, machine data and quality apps, inside your own plant. Anything that fails is rejected.',
    },
    {
        path: '/factory-platform/',
        page: 'platform',
        title: 'Gorad Factory Platform — inspection, machine data and quality',
        description:
            'A shared core for users, licences and audit, with Gorad Vision, Gorad Connect and apps for SPC, NCR/CAPA, OEE and traceability. Start with one app.',
    },
    {
        path: '/factory-platform/vision/',
        page: 'vision',
        title: 'Gorad Vision — fail-closed visual inspection with PLC handshake',
        description:
            'Multi-camera inspection that rejects the part on any fault, writes a journal before the PLC output and runs only signed programs.',
    },
    {
        path: '/factory-platform/connect/',
        page: 'connect',
        title: 'Gorad Connect — PLC and meter data gateway (Modbus, S7, OPC UA)',
        description:
            'Read PLCs and meters over Modbus TCP, Siemens S7 and OPC UA, map tags to standard events and keep every event when the network drops.',
    },
    {
        path: '/factory-platform/use-cases/',
        page: 'usecases',
        title: 'Use cases — Gorad Factory Platform',
        description:
            'Example applications: connecting rod and catalyst checks, PCB assembly, brick damage, label checks, OEE from machine signals and a closed quality loop.',
    },
    ...appRoutes,
    {
        path: '/industries/',
        page: 'industries',
        title: 'Industries — AI visual inspection for the parts you make | Gorad',
        description:
            'Automotive, electronics, aerospace and heavy engineering, building materials, packaging, pharma, or any discrete part, by capability.',
    },
    ...industryRoutes,
    {
        path: '/about/',
        page: 'about',
        title: 'About Gorad — factory software you can trust on the line',
        description:
            'Gorad Pvt Ltd is an engineering company based in Bengaluru, India, building the Gorad Factory Platform for discrete manufacturers around the world.',
    },
    {
        path: '/how-we-work/',
        page: 'howwework',
        title: 'How we work — from first call to a running line | Gorad',
        description:
            'Seven clear steps from study and pricing to installation, training, testing and support, with what we need from you at each one.',
    },
    {
        path: '/glossary/',
        page: 'glossary',
        title: 'Glossary — factory and inspection terms in plain language | Gorad',
        description:
            'Plain-language definitions of inspection, machine data, quality and production terms: OEE, SPC, PLC, NCR, 8D, Gauge R&R, OPC UA and more.',
    },
    {
        path: '/guides/',
        page: 'guides',
        title: 'Guides — inspection, cameras, OEE and pilots | Gorad',
        description:
            'Practical guides: fail-closed inspection, rule-based or AI inspection, choosing cameras and lighting, OEE from PLC signals, and running a vision pilot.',
    },
    ...guideRoutes,
    {
        path: '/security/',
        page: 'security',
        title: 'Security & trust — Gorad Factory Platform',
        description:
            'On-premise, no outbound connection, signed programs and updates, server-side roles, an audit log and SBOM. Designed with IEC 62443 principles, not certified.',
    },
    {
        path: '/partners/',
        page: 'partners',
        title: 'For integrators & machine builders — Gorad Factory Platform',
        description:
            'Build inspection and robot cells on Gorad Vision: one product for every customer, a standard PLC signal map and programs you can hand over.',
    },
    {
        path: '/pilot/',
        page: 'pilot',
        title: 'Pilot programme — Gorad Factory Platform',
        description:
            'Gorad is selecting a small number of plants worldwide to pilot the Factory Platform on a real station. See who it is for and how a pilot works.',
    },
    {
        path: '/contact/',
        page: 'contact',
        title: 'Contact Gorad — book a demo or apply for the pilot',
        description:
            'Book a demo of the Gorad Factory Platform or apply for the pilot programme. Gorad Pvt Ltd, Bengaluru, India.',
    },
    {
        path: '/privacy/',
        page: 'privacy',
        title: 'Privacy policy — Gorad',
        description: 'How Gorad Pvt Ltd handles the personal data you send through gorad.in.',
    },
]

export const notFound = {
    path: '/404',
    page: 'notfound',
    title: 'Page not found — Gorad',
    description: 'The page you were looking for does not exist or has moved. Go to the Gorad homepage, or contact us and we will help you find it.',
    noindex: true,
}

export function findRoute(pathname) {
    const p = pathname.endsWith('/') ? pathname : pathname + '/'
    return routes.find((r) => r.path === p) || notFound
}

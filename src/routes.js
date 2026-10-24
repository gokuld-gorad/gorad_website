// One entry per page: URL, search title and description. Paths end in "/" because
// each page is served from <path>/index.html on GitHub Pages.
export const routes = [
    {
        path: '/',
        page: 'home',
        title: 'Gorad — Factory software that fails safe',
        description:
            'Gorad Factory Platform brings visual inspection, machine data and quality apps together on one on-premise platform. Any fault rejects the part — never a silent pass.',
    },
    {
        path: '/factory-platform/',
        page: 'platform',
        title: 'Gorad Factory Platform — one platform for inspection, machine data and quality',
        description:
            'A shared core for users, licences and audit, with Gorad Vision, Gorad Connect and apps for SPC, NCR/CAPA, OEE, traceability and maintenance. Start with one app and grow.',
    },
    {
        path: '/factory-platform/vision/',
        page: 'vision',
        title: 'Gorad Vision — fail-closed visual inspection with PLC handshake',
        description:
            'Multi-camera visual inspection that rejects the part on any fault, writes a journal before the PLC output and runs only signed programs. Classical and AI tools in one program.',
    },
    {
        path: '/factory-platform/connect/',
        page: 'connect',
        title: 'Gorad Connect — PLC and meter data gateway (Modbus TCP, S7, OPC UA)',
        description:
            'Read PLCs and meters over Modbus TCP, Siemens S7 and OPC UA, map tags to standard events and keep every event when the network drops.',
    },
    {
        path: '/factory-platform/use-cases/',
        page: 'usecases',
        title: 'Use cases — Gorad Factory Platform',
        description:
            'Example applications: power electronics modules, PCB assembly, forged and machined parts in a robot cell, label checks at packing, OEE from machine signals and a closed quality loop.',
    },
    {
        path: '/pilot/',
        page: 'pilot',
        title: 'Pilot programme — Gorad Factory Platform',
        description:
            'Gorad is selecting a small number of plants in India and Europe to pilot the Factory Platform on a real station. See who it is for and how a pilot works.',
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
    description: 'The page you were looking for does not exist.',
    noindex: true,
}

export function findRoute(pathname) {
    const p = pathname.endsWith('/') ? pathname : pathname + '/'
    return routes.find((r) => r.path === p) || notFound
}

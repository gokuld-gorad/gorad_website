// Plain-text answers. The Factory Platform page shows the ones marked `home` and publishes
// exactly those as FAQPage structured data (Google requires the two to match).
// Keep every claim within docs/sales/PLATFORM_OVERVIEW.md of the platform repo.
export const faqs = [
    {
        q: 'Which PLCs does Gorad work with?',
        home: true,
        a: 'Gorad Vision and Gorad Connect talk to PLCs over Modbus TCP, Siemens S7 and OPC UA (as a client). EtherNet/IP and an OPC UA server are not available today.',
    },
    {
        q: 'Does the platform need the internet or a cloud account?',
        home: true,
        a: 'No. Everything runs on-premise, and an air-gapped plant can run it fully offline: the licence activates offline, and programs, updates and backups move by USB from the web interface.',
    },
    {
        q: 'What happens if a camera or the software fails during inspection?',
        home: true,
        a: 'The part is rejected. A cycle is OK only when every expected view reports OK; an error, timeout or missing view produces NG. The result is written to the journal before the PLC output.',
    },
    {
        q: 'Do we need AI, or can we use rule-based inspection?',
        a: 'Both. A Gorad Vision program can combine classical tools (presence, measurement, colour, codes) with AI tools (anomaly, detection, OCR, classification, segmentation). Classical tools come first wherever they are enough.',
    },
    {
        q: 'Which cameras are supported?',
        a: 'GenICam / GigE Vision industrial cameras and USB cameras. Multi-camera stations get one verdict per part across all views.',
    },
    {
        q: 'Can we start with one app?',
        home: true,
        a: 'Yes. Each app stands on its own and shares the platform core. Most plants start with Vision or Connect and add SPC, NCR/CAPA or Line Performance later on the same platform.',
    },
    {
        q: 'Does it run on Windows?',
        a: 'The user interface runs in any modern browser, including on Windows PCs. The server runs on Ubuntu, RHEL or a virtual machine; a native Windows install is not available.',
    },
    {
        q: 'Is the platform ready for production?',
        home: true,
        a: 'The Factory Platform is in early access. Every app is built and tested in software, and the pilot programme proves it on real stations before general release.',
    },
]

export const homeFaqs = faqs.filter((f) => f.home)

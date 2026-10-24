// Plain-text answers: shown on the homepage and published as FAQPage structured data.
// Keep every claim within docs/sales/PLATFORM_OVERVIEW.md of the platform repo.
export const faqs = [
    {
        q: 'Which PLCs does Gorad work with?',
        a: 'Gorad Vision and Gorad Connect talk to PLCs over Modbus TCP, Siemens S7 and OPC UA (as a client). EtherNet/IP and an OPC UA server are not available today.',
    },
    {
        q: 'Does the platform need the internet or a cloud account?',
        a: 'No. Everything runs on-premise, and an air-gapped plant can run it fully offline: the licence activates offline, and programs, updates and backups move by USB from the web interface.',
    },
    {
        q: 'What happens if a camera or the software fails during inspection?',
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
        a: 'Yes. Each app stands on its own and shares the platform core. Most plants start with Vision or Connect and add SPC, NCR/CAPA or Line Performance later on the same platform.',
    },
    {
        q: 'Does it run on Windows?',
        a: 'The user interface runs in any modern browser, including on Windows PCs. The server runs on Ubuntu, RHEL or a virtual machine; a native Windows install is not available.',
    },
    {
        q: 'Is the platform ready for production?',
        a: 'The Factory Platform is in early access. Every app is built and tested in software, and Gorad is now running pilots on real stations before general release.',
    },
]

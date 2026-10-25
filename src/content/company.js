// Company statements, shared by the homepage, About and How we work.
// Vision and mission are Gorad's own words from the company profile.
export const VISION = 'To provide AI and automation solutions precisely tailored to your business needs.'
export const MISSION = 'We build a better and smarter future for manufacturing and industry.'

import { Eye, Gauge, Handshake, Lightbulb, ShieldCheck } from 'lucide-react'

export const principles = [
    { name: 'Innovate', icon: Lightbulb, text: 'AI where it helps, simple rules where they are enough.' },
    { name: 'Cost efficient', icon: Gauge, text: 'Start with one station or one app. Grow when it pays.' },
    { name: 'Committed', icon: Handshake, text: 'With you from the first sample to production.' },
    { name: 'Transparent', icon: Eye, text: 'We tell you what we cannot do, before you spend money.' },
    { name: 'Trust', icon: ShieldCheck, text: 'Your data stays in your plant, and every decision is on record.' },
]

// How the product is built: the engineering side of the philosophy.
export const engineeringPrinciples = [
    { title: 'Proof before claims', text: 'We say something works when it has been shown to work on real hardware, not before. Until then we say "early access", and we mean it.' },
    { title: 'Fail safe, always', text: 'When something goes wrong, the platform rejects the part or says it does not know. It never guesses in your favour.' },
    { title: 'One product for every plant', text: 'No customer-specific code. Differences between plants are configuration, so every customer gets the same tested product.' },
    { title: 'Your plant, your data', text: 'Runs inside your plant and works offline by default. Nothing leaves unless you decide it should.' },
    { title: 'Honest scope', text: 'We tell you where Gorad does not fit before you spend time on a pilot.' },
    { title: 'Build in order', text: 'Platform core first, then machine data and inspection, then the apps on top, so each layer stands on a proven one.' },
]

// The seven steps in detail, for the How we work page.
export const roadmapDetail = [
    {
        title: 'Study & analysis',
        we: 'Look at your part, the defects you need to catch, your line, cycle time and PLC.',
        you: 'Sample parts, good and defective, and a drawing or specification if you have one.',
        result: 'An honest view of whether Gorad fits, and how.',
    },
    {
        title: 'Concept & pricing',
        we: 'Propose the stations, cameras, lighting, checks and apps, with a transparent price.',
        you: 'Tell us what matters most: escapes, speed, traceability, reports.',
        result: 'A clear proposal you can take to your management.',
    },
    {
        title: 'Hardware & installation',
        we: 'Choose cameras, lighting, optics and the industrial PC for your part, and install them with you or your integrator.',
        you: 'Mounting space, power, network and access to the PLC.',
        result: 'A station on your line, ready to learn.',
    },
    {
        title: 'Data & training',
        we: 'Collect images on the line, set up rule-based checks, and train AI only where rules are not enough.',
        you: 'Production parts and defect examples, and someone from quality to confirm what is good and what is not.',
        result: 'An inspection program that knows your part.',
    },
    {
        title: 'Deployment',
        we: 'Release the signed program to the station, check it on golden samples, and connect it to your PLC.',
        you: 'Time on the line, and your PLC programmer for the handshake.',
        result: 'The station inspects live parts.',
    },
    {
        title: 'Testing',
        we: 'Test on your parts and your PLC, including what happens when a camera, the network or the software fails.',
        you: 'Agree the acceptance criteria with us, and sign them off.',
        result: 'Evidence that it works, and fails safely.',
    },
    {
        title: 'Production & support',
        we: 'Hand over, train your operators and engineers, and support you. Updates arrive signed, over the network or by USB.',
        you: 'Run the line, review rejects, and tell us what you need next.',
        result: 'A running station that your team can change.',
    },
]

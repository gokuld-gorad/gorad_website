🤖 The "Master Prompt" for Cursor
Role: You are an expert Full-stack Developer and UI/UX Designer specializing in industrial AI and minimalist futuristic aesthetics.

Task: Build a high-performance, single-page React landing page for Gorad PVT LTD using Vite, Tailwind CSS, and Framer Motion.

Design Language:

Aesthetic: "Industrial Cyber-Minimalism."

Colors: Background: #050505 (Deep Black). Accents: #00F0FF (Electric Cyan) and #6366F1 (Indigo).

Components: Glassmorphism cards (backdrop-blur), glowing borders, and mono-spaced fonts for technical data.

Animations: Smooth scroll, reveal-on-scroll (Framer Motion), and a subtle moving grid background.

Structure & Content:

Navigation: Sticky, blurred background. Links: Solutions, Roadmap, About, Contact.

Hero Section: * Headline: "A Smarter Future for Industry."

Subheadline: "Providing AI and automation solutions precisely tailored to your business needs."

Background: An animated SVG grid or a floating 3D-effect particle field.

CTA: "Request a Demo" (scrolls to form).

Philosophy Section: * Title: "Our Core Principles."

Layout: 5 clean cards (Innovate, Cost Efficient, Committed, Transparent, Trust). On hover, the border should glow cyan.

Visual Inspection Grid: * A "Bento Box" style layout showing industries: Manufacturing, Pharma, Automobile, Textiles, Electronics, etc.

Include the "Key Inspection Capabilities" table styled as a modern, dark-themed dashboard.

Technical Architecture: * Display "Technology Integration" (PLC Protocols, Cameras) using tech-pills/tags.

Show "Deployment Methods" (Manual to Fully Automated) as a progressive 3-step graphic.

Animated Roadmap: * A vertical timeline for the "7-Step Implementation Roadmap." Each step should fade in as the user scrolls.

Advantages Section: * A high-contrast grid showing "Superior Efficiency," "Zero Defect," and "ROI" with sharp, minimalist icons from lucide-react.

Contact & Forms:

Two distinct forms: "General Inquiry" and "Demo/POC Request."

Use a clean, input-field focused design with glow-on-focus effects.

Footer: Full contact details, address in Bengaluru, and copyright.

Technical Requirements:

Use lucide-react for icons.

Use framer-motion for all entrance animations.

Make it fully responsive (mobile-friendly).

Ensure the code is modular (separate components for Hero, Roadmap, etc.).

🛠️ How to use this in Cursor:
Initialize the project: In the Cursor terminal, run:
npm create vite@latest . -- --template react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install framer-motion lucide-react

Trigger the AI: Open your App.jsx and index.css. Use Cmd+K and paste the prompt above.

Refine: After it generates the first draft, point to specific areas and say:

"Make the Roadmap timeline line glow as I scroll past it."

"Add a subtle scanning line animation over the Hero image to represent AI inspection."

📸 Pro-Tip for Images:
Since Cursor can't "draw" images, ask it to:

"Use placeholder images from Unsplash for now with keywords like 'industrial robot', 'circuit board', 'automated warehouse', but wrap them in a CSS overlay that adds a cyan tint to match the site's vibe."

This will give you a cohesive, professional look immediately. 
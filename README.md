# Gorad Pvt Ltd — Company Website

A futuristic, minimal, and performance-optimized landing page for **Gorad Pvt Ltd**, an AI startup specializing in visual inspection and automation solutions.

## ✨ Features

- **Dark Theme:** High-contrast design with a deep black background and electric cyan/indigo accent colors.
- **Glassmorphism:** Elegant semi-transparent cards with a backdrop-blur effect and glowing borders.
- **Smooth Animations:** Built using **Framer Motion** for elegant scroll-triggered entrance animations, a glowing vertical roadmap timeline, and interactive hover states.
- **Responsive Layouts:** Modern layouts including a "Bento-box" style industries grid and a dark dashboard capabilities setup, fully responsive across desktop, tablet, and mobile displays.
- **Tabbed Forms:** Interactive contact sections supporting "General Enquiry" and "Demo / POC Requests", pre-configured for Formspree integration.

## 🛠️ Tech Stack

- **Core:** React 18, Vite
- **Styling:** Vanilla CSS (`src/index.css` acts as a complete global design system with CSS tokens)
- **Animations:** framer-motion
- **Icons:** lucide-react

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (Node Package Manager)

### Installation & Local Development

1. **Navigate to the project directory:**
   ```bash
   cd gorad_website
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The site will be running at `http://localhost:5173/gorad_website/`.

## 📁 Project Structure

```text
gorad_website/
├── docs/                      # Original prompt context and strategy documents
├── src/
│   ├── components/            # Modular React components (one for each section)
│   │   ├── Navbar.jsx         # Sticky navigation with blur effect
│   │   ├── Hero.jsx           # Animated grid hero with CTAs
│   │   ├── VisionMission.jsx  # Glassmorphic cards
│   │   ├── Philosophy.jsx     # Core principles
│   │   ├── Industries.jsx     # Bento grid layout
│   │   ├── Capabilities.jsx   # 3-column feature dashboard
│   │   ├── TechIntegration.jsx# Tech pills
│   │   ├── Deployment.jsx     # 3-step progressive graphic
│   │   ├── Roadmap.jsx        # Vertical scrolling timeline
│   │   ├── Advantages.jsx     # Highlight cards
│   │   ├── Contact.jsx        # Dual-tab Formspree form
│   │   └── Footer.jsx         # Minimal footer
│   ├── App.jsx                # Main composition layout
│   ├── index.css              # Complete design system and component styles
│   └── main.jsx               # React DOM entry point
├── index.html                 # Root HTML document and SEO metadata
├── package.json               # Script and dependency manifest
└── vite.config.js             # Vite build configuration (set up for GitHub Pages)
```

## ⚙️ Configuration & Important Steps

### 1. Activating the Contact Form
The contact form is built to work seamlessly without a backend using **Formspree**. To receive emails from visitors:

1. Create a free account at [Formspree](https://formspree.io/).
2. Create a new form to get your unique Form ID endpoint.
3. Open `src/components/Contact.jsx`.
4. Update the `FORMSPREE_ENDPOINT` constant at the top of the file:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID' // ← Paste your ID here
   ```

### 2. Deploying to GitHub Pages

The project's Vite configuration is already prepared for GitHub pages (`base: '/gorad_website/'`). To deploy the site:

1. Push this repository to GitHub. Make sure the repository name is exactly `gorad_website`.
2. Generate the production build locally:
   ```bash
   npm run build
   ```
3. Commit the contents of the generated `dist/` directory, or use a tool like `gh-pages` to push the `dist/` folder to the `gh-pages` branch. 
   *(Alternatively, you can configure GitHub Actions to build and deploy to GitHub Pages automatically on push).*
   
   If using the `gh-pages` package:
   ```bash
   npm install gh-pages --save-dev
   ```
   Add `"deploy": "gh-pages -d dist"` to the `scripts` in your `package.json`. Then run:
   ```bash
   npm run build
   npm run deploy
   ```

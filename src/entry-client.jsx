import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { findRoute } from './routes.js'
import { pageLoaders } from './pages.client.js'
import './index.css'

const root = document.getElementById('root')
const route = findRoute(window.location.pathname)

// Load this page's code before hydrating, so the first render matches the
// pre-rendered HTML exactly.
pageLoaders[route.page]().then(({ default: Page }) => {
    const app = (
        <React.StrictMode>
            <App route={route} Page={Page} />
        </React.StrictMode>
    )
    // Pre-rendered pages hydrate; the dev server serves an empty shell and renders.
    if (root.hasChildNodes()) hydrateRoot(root, app)
    else createRoot(root).render(app)
})

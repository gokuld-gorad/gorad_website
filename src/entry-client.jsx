import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root')
const app = (
    <React.StrictMode>
        <App path={window.location.pathname} />
    </React.StrictMode>
)

// Pre-rendered pages hydrate; the dev server serves an empty shell and renders.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)

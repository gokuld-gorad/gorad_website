import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { routes, notFound } from './routes.js'
import { renderHead } from './seo.js'

export { routes, notFound }

export function render(route) {
    const html = renderToString(
        <React.StrictMode>
            <App path={route.path} />
        </React.StrictMode>,
    )
    return { html, head: renderHead(route) }
}

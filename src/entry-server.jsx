import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { routes, notFound } from './routes.js'
import { renderHead } from './seo.js'
import Home from './pages/Home.jsx'
import FactoryPlatform from './pages/FactoryPlatform.jsx'
import Vision from './pages/Vision.jsx'
import Connect from './pages/Connect.jsx'
import UseCases from './pages/UseCases.jsx'
import AppPage from './pages/AppPage.jsx'
import Industries from './pages/Industries.jsx'
import Industry from './pages/Industry.jsx'
import About from './pages/About.jsx'
import HowWeWork from './pages/HowWeWork.jsx'
import Glossary from './pages/Glossary.jsx'
import Security from './pages/Security.jsx'
import Partners from './pages/Partners.jsx'
import Pilot from './pages/Pilot.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import NotFound from './pages/NotFound.jsx'

export { routes, notFound }

// Keys match `page` in routes.js and pages.client.js.
const pages = {
    home: Home,
    platform: FactoryPlatform,
    vision: Vision,
    connect: Connect,
    usecases: UseCases,
    app: AppPage,
    industries: Industries,
    industry: Industry,
    about: About,
    howwework: HowWeWork,
    glossary: Glossary,
    security: Security,
    partners: Partners,
    pilot: Pilot,
    contact: Contact,
    privacy: Privacy,
    notfound: NotFound,
}

export function render(route) {
    const html = renderToString(
        <React.StrictMode>
            <App route={route} Page={pages[route.page]} />
        </React.StrictMode>,
    )
    return { html, head: renderHead(route) }
}

// One dynamic import per page so each page ships as its own chunk. Keys match
// `page` in routes.js and the static map in entry-server.jsx.
export const pageLoaders = {
    home: () => import('./pages/Home.jsx'),
    platform: () => import('./pages/FactoryPlatform.jsx'),
    vision: () => import('./pages/Vision.jsx'),
    connect: () => import('./pages/Connect.jsx'),
    usecases: () => import('./pages/UseCases.jsx'),
    app: () => import('./pages/AppPage.jsx'),
    industries: () => import('./pages/Industries.jsx'),
    industry: () => import('./pages/Industry.jsx'),
    about: () => import('./pages/About.jsx'),
    security: () => import('./pages/Security.jsx'),
    partners: () => import('./pages/Partners.jsx'),
    pilot: () => import('./pages/Pilot.jsx'),
    contact: () => import('./pages/Contact.jsx'),
    privacy: () => import('./pages/Privacy.jsx'),
    notfound: () => import('./pages/NotFound.jsx'),
}

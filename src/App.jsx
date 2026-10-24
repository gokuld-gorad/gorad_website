import Layout from './components/Layout.jsx'
import { findRoute } from './routes.js'
import Home from './pages/Home.jsx'
import FactoryPlatform from './pages/FactoryPlatform.jsx'
import Vision from './pages/Vision.jsx'
import Connect from './pages/Connect.jsx'
import Pilot from './pages/Pilot.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import NotFound from './pages/NotFound.jsx'

const pages = {
    home: Home,
    platform: FactoryPlatform,
    vision: Vision,
    connect: Connect,
    pilot: Pilot,
    contact: Contact,
    privacy: Privacy,
    notfound: NotFound,
}

export default function App({ path }) {
    const route = findRoute(path)
    const Page = pages[route.page]
    return (
        <Layout path={route.path}>
            <Page />
        </Layout>
    )
}

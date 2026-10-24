import Layout from './components/Layout.jsx'

// The page component is chosen by the entry: the server imports every page, the
// browser loads only the one it needs (see entry-client.jsx and pages.client.js).
export default function App({ route, Page }) {
    return (
        <Layout path={route.path}>
            <Page slug={route.slug} />
        </Layout>
    )
}

import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import {
    Header,
    ScrollToTop,
    Footer,
} from "./components/theme/index"
import {Box} from "@navikt/ds-react";
import "@navikt/ds-css";
import './App.css'
import Home from "./pages/Home";
import Privacy from './pages/Privacy';
import Accessibility from "./pages/Accessibility";
import { Helmet } from "react-helmet";

const routes = [
    { path: "/tilgjengelighet", component: <Accessibility /> },
    { path: "/personvern", component: <Privacy /> },
    { path: "/", component: <Home /> },
];

export default function App() {
    return (
        <main>
            <Helmet>
                <script defer src="https://cdn.nav.no/team-researchops/sporing/sporing.js" data-host-url="https://umami.nav.no" data-website-id="53e7f8ec-26e3-4e42-a41a-cddde0d58709"></script>
            </Helmet>
            <div style={{background: "rgba(19,17,54)"}}>
                <Header/>
            </div>
            <Box className="py-6 px-5">
                <div className=" md:w-5/6 max-w-[80rem] m-auto">
                <Router>
                    <Routes>
                        {routes.map(({path, component}) => (
                            <Route key={path} path={path} element={component}/>
                        ))}
                    </Routes>
                </Router>
                </div>
            </Box>
            <Footer/>
            <ScrollToTop/>
        </main>
)
}
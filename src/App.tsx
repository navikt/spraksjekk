import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import {
    Header,
    ScrollToTop,
    Footer,
} from "./components/theme/index"
import {ContentContainer} from "@navikt/ds-react";
import "@navikt/ds-css";
import './App.css'
import Home from "./pages/Home";
import Privacy from './pages/Privacy';
import Accessibility from "./pages/Accessibility";
import AmplitudeContextProvider from "./context/AmplitudeContext";

const routes = [
    { path: "/tilgjengelighet", component: <Accessibility /> },
    { path: "/personvern", component: <Privacy /> },
    { path: "/", component: <Home /> },
];

export default function App() {
    return (
        <main>
            <Header/>
            <ContentContainer className="mt-6 mb-6">
                <Router>
                    <Routes>
                        {routes.map(({ path, component }) => (
                            <AmplitudeContextProvider><Route key={path} path={path} element={component} /></AmplitudeContextProvider>
                        ))}
                    </Routes>
                </Router>
            </ContentContainer>
            <Footer />
            <ScrollToTop/>
        </main>
    )
}
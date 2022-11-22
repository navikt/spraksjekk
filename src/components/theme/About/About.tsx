import {ShakeHands, EyeScreened} from "@navikt/ds-icons";
import './About.css'

function About() {
    return (
        <>
            <p className="a11y-lineheight">NAV Språkhjelp hjelper deg med å gjøre tekstene dine enklere å forstå.</p>
            <ul className="ListRemoveStyling">
                <li><ShakeHands title="Håndtrykk"/> NAV lagrer ikke teksten.</li>
                <li><EyeScreened title="Personvern"/> Ikke legg inn personopplysninger.</li>
            </ul>
        </>
    );
}

export default About;
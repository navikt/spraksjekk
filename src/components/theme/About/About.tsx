import { ShakeHands, EyeScreened } from "@navikt/ds-icons";
import './About.css'

function About() {
    return (
        <div className="pb-2">
            <p className="a11y-lineheight">NAV Språkhjelp hjelper deg med å gjøre tekstene mer lettlest.</p>
            <ul className="ListRemoveStyling">
                <li><ShakeHands title="Håndtrykk" /> NAV lagrer ikke teksten.</li>
                <li><EyeScreened title="Personvern"/> Ikke legg inn personopplysninger.</li>
            </ul>
        </div>
    );
}

export default About;
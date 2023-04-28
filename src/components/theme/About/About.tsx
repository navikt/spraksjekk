import {ShakeHands, EyeScreened} from "@navikt/ds-icons";
import './About.css'

function About() {
    return (
        <>
            <p className="a11y-lineheight">Klarspråkshjelpen gir deg umiddelbar tilbakemelding på teksten din.</p>
            <ul className="ListRemoveStyling">
                <li><ShakeHands title="Håndtrykk"/> Teksten blir ikke lagret.</li>
                <li><EyeScreened title="Personvern"/> Ikke legg inn personopplysninger.</li>
            </ul>
        </>
    );
}

export default About;
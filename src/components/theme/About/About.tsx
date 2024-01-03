import {ShakeHands, EyeScreened} from "@navikt/ds-icons";
import './About.css'

function About() {
    return (
        <>
            <p className="a11y-lineheight">Klarspråkshjelpen gir deg umiddelbar tilbakemelding på teksten din.</p>
            <ul className="ListRemoveStyling mt-4">
                <li><ShakeHands className="inline" title="Håndtrykk"/> Teksten blir ikke lagret — husk å kopiere den før du avslutter.</li>
                <li><EyeScreened className="inline" title="Personvern"/> Ikke legg inn personopplysninger.</li>
            </ul>
        </>
    );
}

export default About;
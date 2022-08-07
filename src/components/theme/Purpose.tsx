import { DirectionSign, ShakeHands, EyeScreened } from "@navikt/ds-icons";

function Purpose() {
    return (
        <div className="pb-2">
            <p>Nav Språkhjelp hjelper deg med å gjøre tekstene mer lettlest.</p>
            <ul className="ListRemoveStyling">
                <li><ShakeHands title="Håndtrykk" /> NAV lagrer ikke teksten.</li>
                <li><EyeScreened title="Personvern"/> Ikke legg inn personopplysninger.</li>
            </ul>
        </div>
    );
}

export default Purpose;
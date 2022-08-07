import {
    ShakeHandsIcon,
    PrivacyIcon,
} from "../../components"

function Purpose() {
    return (
        <div className="pb-2">
            <ul className="ListRemoveStyling">
                <li><ShakeHandsIcon/> NAV lagrer ikke teksten.</li>
                <li><PrivacyIcon/> Ikke legg inn personopplysninger.</li>
            </ul>
        </div>
    );
}

export default Purpose;
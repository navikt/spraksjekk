import {Link} from "@navikt/ds-react";
import {ExternalLink} from "@navikt/ds-icons";
import './Feedback.css'

function Feedback() {
    return (
        <div id="feedback-block">
        <Link target="_blank" id="feedback-link" className="feedback-space"
              href="https://github.com/navikt/spraksjekk">
            Kildekode<ExternalLink title="Ekstern lenke"/>
        </Link>
        <Link target="_blank" id="feedback-link"
              href="https://github.com/navikt/spraksjekk/blob/master/README.md">
            Tilbakemelding<ExternalLink title="Ekstern lenke"/>
        </Link>
    </div>
    );
}

export default Feedback;
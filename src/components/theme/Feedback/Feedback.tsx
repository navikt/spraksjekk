import {Link} from "@navikt/ds-react";
import {ExternalLink} from "@navikt/ds-icons";
import './Feedback.css'

function Feedback() {
    return (
        <div id="feedback-block">
        <Link target="_blank" className="feedback-link feedback-space"
              href="https://github.com/navikt/spraksjekk">
            Kildekode<ExternalLink title="Ekstern lenke"/>
        </Link>
        <Link target="_blank" className="feedback-link"
              href="https://aksel.nav.no/artikkel/sprakhjelp?tema=innholdsarbeid">
            Om Språkhjelp<ExternalLink title="Ekstern lenke"/>
        </Link>
    </div>
    );
}

export default Feedback;
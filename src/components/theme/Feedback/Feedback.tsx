import {Link} from "@navikt/ds-react";
import {ExternalLink} from "@navikt/ds-icons";
import './Feedback.css'

function Feedback() {
    return (
        <Link target="_blank" className="språkhjelp-mt-6 språkhjelp-float-right språkhjelp-pb-5rem"
              href="https://github.com/navikt/spraksjekk/blob/master/README.md">
            Tilbakemelding<ExternalLink title="Ekstern lenke" />
        </Link>
    );
}

export default Feedback;
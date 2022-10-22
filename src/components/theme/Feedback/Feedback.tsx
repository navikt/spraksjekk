import {Link} from "@navikt/ds-react";
import {ExternalLink} from "@navikt/ds-icons";
import './Feedback.css'

function Feedback() {
    return (
        <Link target="_blank" className="mt-6 float-right pb-5rem"
              href="https://github.com/navikt/spraksjekk/blob/master/README.md">
            Tilbakemelding<ExternalLink title="Ekstern lenke" />
        </Link>
    );
}

export default Feedback;
import {Heading} from "@navikt/ds-react";
import { WarningColored } from "@navikt/ds-icons";

function Privacy(props: { content: any; }) {
    let rawcontent = props.content;
    rawcontent = rawcontent.replaceAll("Kopier lenke", "");

    // Email
    function extractEmails(text) {
        return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
    }

    let email = extractEmails(rawcontent)
    let emailCount = 0
    let getemail = <></>
    if (email) {
        getemail = email.map((email, index) => <li key={index} className="språkhjelp-pb-2">"{email}"</li>)
        emailCount = email.length
    }
    const listEmail = getemail

    // Phone
    function extractPhone(text) {
        return text.match(/(\s*[0-9]+){8,11}/gi);
    }

    let phone = extractPhone(rawcontent)
    let phoneCount = 0
    let getphone = <></>
    if (phone) {
        getphone = phone.map((phone, index) => <li key={index} className="språkhjelp-pb-2">"{phone}"</li>)
        phoneCount = phone.length
    }
    const listPhone = getphone

    // Full names
    function extractName(text) {
        return text.match(/([A-Z][a-z][a-z]*(?: [A-Z][a-z][a-z]*){1,2})/g);
    }

    let names = extractName(rawcontent)
    let namesCount = 0
    let getnames = []
    if (names) {
        getnames = names.filter((name, index) => names.indexOf(name) === index).map((name, index) => <li key={index}
                                                                                                         className="språkhjelp-pb-2">"{name}"</li>)
        namesCount = getnames.length
    }
    const listNames = getnames;

    return (
        <>
            {emailCount + phoneCount + namesCount >= 1 && (
                <>
                    <Heading spacing level="2" size="xsmall" id="modal-heading">
                        {emailCount + phoneCount + namesCount} {emailCount + phoneCount + namesCount == 1 ? (<> mulig
                        personopplysning</>) : (<>mulige
                        personopplysninger</>)} <WarningColored />
                    </Heading>

                    <ul className="språkhjelp-list-disc språkhjelp-list-inside">
                        {emailCount >= 1 && (<>
                                {listEmail}
                        </>)}
                        {phoneCount >= 1 && (<>
                                {listPhone}
                        </>)}
                        {namesCount >= 1 && (<>
                                {listNames}
                        </>)}
                    </ul>

                </>
            )}
        </>
    );
}

export default Privacy;
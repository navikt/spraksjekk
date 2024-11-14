import {Accordion, Heading} from "@navikt/ds-react";

function PersonalData(props: { content: any; }) {
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
        return text.match(/(\b\d{2}[-.\s]?\d{2}[-.\s]?\d{2}[-.\s]?\d{2}\b|\b\d{3}[-.\s]?\d{2}[-.\s]?\d{3}\b)/g);
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

    // Fødselsnummer
    function extractFodselsnummer(text) {
        return text.match(/(\d{6}\s?\d{5})/g);
    }

    let fodselsnummer = extractFodselsnummer(rawcontent)
    let fodselsnummerCount = 0
    let getfodselsnummer = <></>
    if (fodselsnummer) {
        getfodselsnummer = fodselsnummer.map((fodselsnummer, index) => <li key={index} className="språkhjelp-pb-2">"{fodselsnummer}"</li>)
        fodselsnummerCount = fodselsnummer.length
    }
    const listFodselsnummer = getfodselsnummer;

    return (
        <>
            {emailCount + phoneCount + namesCount + fodselsnummerCount >= 1 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {emailCount + phoneCount + namesCount + fodselsnummerCount} {emailCount + phoneCount + namesCount + fodselsnummerCount == 1 ? (<> mulig
                        personopplysning</>) : (<>mulige
                        personopplysninger</>)}
                    </Accordion.Header>
                    <Accordion.Content className="språkhjelp-remove-accordion-padding-bottom">
                        {emailCount >= 1 && (<>
                            <Heading spacing level="3" size="xsmall">
                                E-postadresser
                            </Heading>
                            <ul className="språkhjelp-list-disc språkhjelp-pt-5 språkhjelp-list-inside">
                                {listEmail}
                            </ul>
                        </>)}
                        {phoneCount >= 1 && (<>
                            <Heading spacing level="3" size="xsmall">
                                Telefonnummer
                            </Heading>
                            <ul className="språkhjelp-list-disc språkhjelp-pt-5 språkhjelp-list-inside">
                                {listPhone}
                            </ul>
                        </>)}
                        {namesCount >= 1 && (<>
                            <Heading spacing level="3" size="xsmall">
                                Navn
                            </Heading>
                            <ul className="språkhjelp-list-disc språkhjelp-pt-5 språkhjelp-list-inside">
                                {listNames}
                            </ul>
                        </>)}
                        {fodselsnummerCount >= 1 && (<>
                            <Heading spacing level="3" size="xsmall">
                                Fødselsnummer
                            </Heading>
                            <ul className="språkhjelp-list-disc språkhjelp-pt-5 språkhjelp-list-inside">
                                {listFodselsnummer}
                            </ul>
                        </>)}
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default PersonalData;
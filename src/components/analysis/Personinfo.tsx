import {Accordion} from "@navikt/ds-react";

function PersonInfo(props: { content: any; }) {
    let rawcontent = props.content;
    let personinfoHere = 1;
    rawcontent = rawcontent.replaceAll("Kopier lenke", "");

    // Email
    function extractEmails(text) {
        return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
    }
    let email = extractEmails(rawcontent)
    let emailCount = 0
    let getemail = <></>
    if (email) {
        getemail = email.map((email, index) => <li key={index} className="pb-2">{email}</li>)
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
        getphone = phone.map((phone, index) => <li key={index} className="pb-2">{phone}</li>)
        phoneCount = phone.length
    }
    const listPhone = getphone

    return (
        <>
            {emailCount+phoneCount >= 1 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {emailCount+phoneCount} {emailCount+phoneCount == 1 ? (<> mulig personopplysning</>) : (<>mulige
                        personopplysninger</>)}
                    </Accordion.Header>
                    <Accordion.Content className="removeAccordionPaddingBottom">
                        {emailCount >= 1 && (<>E-postadresser:
                        <ul className="list-disc pt-5 list-inside">
                            {listEmail}
                        </ul></>)}
                        {phoneCount >= 1 && (<>
                        Telefon:
                        <ul className="list-disc pt-5 list-inside">
                            {listPhone}
                        </ul></>)}
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default PersonInfo;
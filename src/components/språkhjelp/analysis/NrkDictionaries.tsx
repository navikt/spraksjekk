import {Accordion, Heading, Link} from "@navikt/ds-react";
import {ExternalLink} from "@navikt/ds-icons";
import {Nrkordliste} from "./dictionaries/index";

function NrkDictionaries(props: { content: any; }) {
    const value = props.content;
    let ordliste = Nrkordliste;
    let ordlisteResultater;

    const keyword = value;
    if (keyword !== "") {
        const results = ordliste.nrkordliste.filter((ordliste) => {
            return keyword.toLowerCase().match("\\b" + ordliste.ord.toLowerCase() + "\\b")
        });
        ordlisteResultater = results;
    }

    let ordlisteVisResultater = 0;
    if (ordlisteResultater != 0) {
        ordlisteVisResultater = 1;
    }

    return (
        <>
            {ordlisteVisResultater != 0 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {ordlisteResultater.length == 1 ? (<>1 mulig støtende
                            ord</>) : (<>{ordlisteResultater.length} mulige støtende ord</>)}
                    </Accordion.Header>
                    <Accordion.Content>
                        <Heading spacing level="3" size="xsmall">
                            Vær varsom
                        </Heading>
                        Ord i teksten som kan være støtende, eller som bør brukes med varsomhet:
                        <Accordion className="språkhjelp-inner-accordion språkhjelp-mt-4">
                            {ordlisteResultater.map((ordliste, i) => (
                                <Accordion.Item key={ordliste.id}>
                                    <Accordion.Header className="språkhjelp-inner-accordion">
                                        <span className="firstLetter">"{ordliste.ord}"</span>
                                    </Accordion.Header>
                                    <Accordion.Content className="språkhjelp-inner-accordion-content">
                                        <Heading spacing level="4" size="xsmall">
                                            Forklaring
                                        </Heading>
                                        <p>{ordliste.bokmål}</p>
                                        <Heading spacing level="4" size="xsmall">
                                            Kilde
                                        </Heading>
                                        {<Link target="_blank"
                                               href={ordliste.lenke}>
                                            {ordliste.kilde}<ExternalLink/>
                                        </Link>}
                                    </Accordion.Content>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default NrkDictionaries;
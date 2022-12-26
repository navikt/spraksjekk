import {Accordion, Heading, Link} from "@navikt/ds-react";
import {ExternalLink} from "@navikt/ds-icons";
import {Nrkordliste} from "./dictionaries/index";

function NrkDictionaries(props: { content: any; }) {
    const value = props.content;
    let gammelnavsk = Nrkordliste;
    let gammelnavskResultater;

    const keyword = value;
    if (keyword !== "") {
        const results = gammelnavsk.nrkordliste.filter((gammelnavsk) => {
            return keyword.toLowerCase().match("\\b" + gammelnavsk.ord.toLowerCase() + "\\b")
        });
        gammelnavskResultater = results;
    }

    let gammelnavskVisResultater = 0;
    if (gammelnavskResultater != 0) {
        gammelnavskVisResultater = 1;
    }

    return (
        <>
            {gammelnavskVisResultater != 0 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {gammelnavskResultater.length == 1 ? (<>1 mulig støtende
                            ord</>) : (<>{gammelnavskResultater.length} mulige støtende ord</>)}
                    </Accordion.Header>
                    <Accordion.Content>
                        <Heading spacing level="3" size="xsmall">
                            Vær varsom
                        </Heading>
                        Ord i teksten som kan være støtende, eller som bør brukes med varsomhet:
                        <Accordion className="språkhjelp-inner-accordion språkhjelp-mt-4">
                            {gammelnavskResultater.map((gammelnavsk, i) => (
                                <Accordion.Item key={gammelnavsk.id}>
                                    <Accordion.Header className="språkhjelp-inner-accordion">
                                        <span className="firstLetter">"{gammelnavsk.ord}"</span>
                                    </Accordion.Header>
                                    <Accordion.Content className="språkhjelp-inner-accordion-content">
                                        <Heading spacing level="4" size="xsmall">
                                            Forklaring
                                        </Heading>
                                        <p>{gammelnavsk.bokmål}</p>
                                        <Heading spacing level="4" size="xsmall">
                                            Kilde
                                        </Heading>
                                        {<Link target="_blank"
                                               href={gammelnavsk.lenke}>
                                            {gammelnavsk.kilde}<ExternalLink/>
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
import {Accordion, Heading, Link} from "@navikt/ds-react";
import {ExternalLink} from "@navikt/ds-icons";
import {Avløserord, Datatermer} from "../../dictionaries";

function GammelnavskCheck(props: { content: any; }) {
    const value = props.content;
    let gammelnavsk = Avløserord;
    let gammelnavskResultater;

    let datatermer = Datatermer;
    let datatermerResultater;

    const keyword = value;
    if (keyword !== "") {
        const results = gammelnavsk.avløserord.filter((gammelnavsk) => {
            return keyword.toLowerCase().match("\\b" + gammelnavsk.importord.toLowerCase() + "\\b")
        });
        gammelnavskResultater = results;

        const results2 = datatermer.datatermer.filter((datatermer) => {
            return keyword.toLowerCase().match("\\b" + datatermer.ord.toLowerCase() + "\\b")
        });
        datatermerResultater = results2;
    }

    let gammelnavskVisResultater = 0;
    if (gammelnavskResultater != 0) {
        gammelnavskVisResultater = 1;
    }

    let datatermerVisResultater = 0;
    if (datatermerResultater != 0) {
        datatermerVisResultater = 1;
    }

    return (
        <>
            {gammelnavskVisResultater + datatermerVisResultater != 0 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {gammelnavskResultater.length+datatermerResultater.length == 1 ? (<>1 mulig
                            avløserord</>) : (<>{gammelnavskResultater.length+datatermerResultater.length} mulige avløserord</>)}
                    </Accordion.Header>
                    <Accordion.Content>
                        Norske ord som kan brukes i stedet for de tilsvarende engelske:
                        {gammelnavskResultater && (
                            <Accordion className="gammelnavskAccordion mt-4">
                                {gammelnavskResultater.map((gammelnavsk, i) => (
                                    <Accordion.Item key="">
                                        <Accordion.Header className="gammelnavskAccordion">
                                            <span className="firstLetter">"{gammelnavsk.importord}"</span>
                                        </Accordion.Header>
                                        <Accordion.Content className="gammelnavskAccordionContent">
                                            <Heading spacing level="4" size="xsmall">
                                                Avløserord
                                            </Heading>
                                            <p>{gammelnavsk.avløserord}</p>
                                            <Heading spacing level="4" size="xsmall">
                                                Kilde
                                            </Heading>
                                            {<Link target="_blank"
                                                   href="https://www.sprakradet.no/sprakhjelp/Skriverad/Avloeysarord/">
                                                På godt norsk – avløserord<ExternalLink/>
                                            </Link>}
                                        </Accordion.Content>
                                    </Accordion.Item>
                                ))}
                            </Accordion>)}
                        {datatermerResultater && (
                            <Accordion className="gammelnavskAccordion">
                                {datatermerResultater.map((gammelnavsk, i) => (
                                    <Accordion.Item key="">
                                        <Accordion.Header className="gammelnavskAccordion">
                                            <span className="firstLetter">{gammelnavsk.ord}</span>
                                        </Accordion.Header>
                                        <Accordion.Content className="gammelnavskAccordionContent">
                                            <Heading spacing level="4" size="xsmall">
                                                Avløserord
                                            </Heading>
                                            <p>{gammelnavsk.bokmål}</p>
                                            <Heading spacing level="4" size="xsmall">
                                                Definisjon/forklaring
                                            </Heading>
                                            <p>{gammelnavsk.definisjon}</p>
                                            <Heading spacing level="4" size="xsmall">
                                                Kilde
                                            </Heading>
                                            {<Link target="_blank"
                                                   href="https://www.sprakradet.no/sprakhjelp/Skriverad/Ordlister/Datatermar/">
                                                Språkrådets datatermer <ExternalLink/>
                                            </Link>}
                                        </Accordion.Content>
                                    </Accordion.Item>
                                ))}
                            </Accordion>)}
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default GammelnavskCheck;
import {Accordion, Heading, Link} from "@navikt/ds-react";
import {ExternalLink} from "@navikt/ds-icons";
import {Avløserord, Datatermer} from "./dictionaries/index";

function ordlisteCheck(props: { content: any; }) {
    const value = props.content;
    let ordliste = Avløserord;
    let ordlisteResultater;
    let datatermer = Datatermer;
    let datatermerResultater;

    const keyword = value;
    if (keyword !== "") {
        const results = ordliste.avløserord.filter((ordliste) => {
            return keyword.toLowerCase().match("\\b" + ordliste.importord.toLowerCase() + "\\b")
        });
        ordlisteResultater = results;

        const results2 = datatermer.datatermer.filter((datatermer) => {
            return keyword.toLowerCase().match("\\b" + datatermer.ord.toLowerCase() + "\\b")
        });
        datatermerResultater = results2;
    }

    let ordlisteVisResultater = 0;
    if (ordlisteResultater != 0) {
        ordlisteVisResultater = 1;
    }

    let datatermerVisResultater = 0;
    if (datatermerResultater != 0) {
        datatermerVisResultater = 1;
    }

    return (
        <>
            {ordlisteVisResultater + datatermerVisResultater != 0 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {ordlisteResultater.length + datatermerResultater.length == 1 ? (<>1 mulig
                            avløserord</>) : (<>{ordlisteResultater.length + datatermerResultater.length} mulige
                            avløserord</>)}
                    </Accordion.Header>
                    <Accordion.Content>
                        Norske ord som kan brukes i stedet for de tilsvarende engelske:
                        {ordlisteResultater && (
                            <Accordion className="språkhjelp-inner-accordion språkhjelp-mt-4">
                                {ordlisteResultater.map((ordliste, i) => (
                                    <Accordion.Item key="">
                                        <Accordion.Header className="språkhjelp-inner-accordion">
                                            <span className="språkhjelp-firstLetter">"{ordliste.importord}"</span>
                                        </Accordion.Header>
                                        <Accordion.Content className="språkhjelp-inner-accordion-content">
                                            <Heading spacing level="4" size="xsmall">
                                                Avløserord
                                            </Heading>
                                            <p>{ordliste.avløserord}</p>
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
                            <Accordion className="språkhjelp-inner-accordion">
                                {datatermerResultater.map((ordliste, i) => (
                                    <Accordion.Item key="">
                                        <Accordion.Header className="språkhjelp-inner-accordion">
                                            <span className="firstLetter">"{ordliste.ord}"</span>
                                        </Accordion.Header>
                                        <Accordion.Content className="språkhjelp-inner-accordion-content">
                                            <Heading spacing level="4" size="xsmall">
                                                Avløserord
                                            </Heading>
                                            <p>{ordliste.bokmål}</p>
                                            <Heading spacing level="4" size="xsmall">
                                                Definisjon/forklaring
                                            </Heading>
                                            <p>{ordliste.definisjon}</p>
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

export default ordlisteCheck;
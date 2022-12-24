import {Accordion, Heading, Link} from "@navikt/ds-react";
import {ExternalLink} from "@navikt/ds-icons";
import {Kansellisten} from "./dictionaries/index";

function GammelnavskDictionary(props: { content: any; }) {
    const value = props.content;
    let kansellisten = Kansellisten;
    let kansellistenResultater;

    const keyword = value;
    if (keyword !== "") {
        const results = kansellisten.kansellisten.filter((gammelnavsk) => {
            return keyword.toLowerCase().match("\\b" + gammelnavsk.kanselliord.toLowerCase() + "\\b")
        });
        kansellistenResultater = results;
    }

    let kansellistenVisResultater = 0;
    if (kansellistenResultater != 0) {
        kansellistenVisResultater = 1;
    }

    return (
        <>
            {kansellistenVisResultater != 0 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {kansellistenResultater.length == 1 ? (<>1 ord som kan byttes
                            ut</>) : (<>{kansellistenResultater.length} ord som kan
                            byttes ut</>)}
                    </Accordion.Header>
                    <Accordion.Content>
                        <Heading spacing level="3" size="xsmall">
                            Velg enkle ord
                        </Heading>
                        <div className="språkhjelp-pb-6">Ord og uttrykk som er utdaterte eller sier noe på en vanskeligere måte enn
                            nødvendig:
                        </div>
                        {kansellistenResultater.length >= 1 &&
                            <>
                                <Heading spacing level="4" size="xsmall" className="språkhjelp-mb-4">
                                    Kansellisten
                                </Heading>
                                <Accordion className="språkhjelp-inner-accordion">
                                    {kansellistenResultater.map((gammelnavsk, i) => (
                                        <>
                                            <Accordion.Item key="{gammelnavsk.id}">
                                                <Accordion.Header className="språkhjelp-inner-accordion">
                                                    <span
                                                        className="språkhjelp-firstLetter">"{gammelnavsk.kanselliord}"</span>
                                                </Accordion.Header>
                                                <Accordion.Content className="språkhjelp-inner-accordion-content">
                                                    <Heading spacing level="4" size="xsmall">
                                                        Forslag
                                                    </Heading>
                                                    Skriv heller: {gammelnavsk.alternativ_1}
                                                    <Heading spacing className="språkhjelp-pt-6" level="4"
                                                             size="xsmall">
                                                        Kilde
                                                    </Heading>
                                                    <Link target="_blank"
                                                          href="https://www.sprakradet.no/klarsprak/om-skriving/kansellisten/">
                                                        Kansellisten<ExternalLink/>
                                                    </Link>

                                                </Accordion.Content>
                                            </Accordion.Item>
                                        </>
                                    ))}
                                </Accordion>
                            </>}
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default GammelnavskDictionary;
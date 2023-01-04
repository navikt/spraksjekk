import {Accordion, Heading, Link} from "@navikt/ds-react";
import {ExternalLink} from "@navikt/ds-icons";
import {Kansellisten} from "./dictionaries/index";

function KansellistenDictionary(props: { content: any; }) {
    const value = props.content;
    let kansellisten = Kansellisten;
    let kansellistenResultater;

    const keyword = value;
    if (keyword !== "") {
        const results = kansellisten.kansellisten.filter((kansellisten) => {
            return keyword.toLowerCase().match("\\b" + kansellisten.kanselliord.toLowerCase() + "\\b")
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
                        <div className="språkhjelp-pb-6">Ord og uttrykk som er utdaterte eller sier noe på en
                            vanskeligere måte enn
                            nødvendig:
                        </div>
                        {kansellistenResultater.length >= 1 &&
                            <>
                                <Accordion className="språkhjelp-inner-accordion">
                                    {kansellistenResultater.map((kansellisten, i) => (
                                        <>
                                            <Accordion.Item key="{kansellisten.id}">
                                                <Accordion.Header className="språkhjelp-inner-accordion">
                                                    <span
                                                        className="språkhjelp-firstLetter">"{kansellisten.kanselliord}"</span>
                                                </Accordion.Header>
                                                <Accordion.Content className="språkhjelp-inner-accordion-content">
                                                    <Heading spacing level="4" size="xsmall">
                                                        Forslag
                                                    </Heading>
                                                    Skriv heller: {kansellisten.alternativ_1}
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

export default KansellistenDictionary;
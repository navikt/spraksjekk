import {Accordion, Heading, Link} from "@navikt/ds-react";
import {ExternalLink} from "@navikt/ds-icons";
import {Avløserord} from "../../data";

function GammelnavskCheck(props: { content: any; }) {
    const value = props.content;
    let gammelnavsk = Avløserord;
    let gammelnavskResultater;

    const keyword = value;
    if (keyword !== "") {
        const results = gammelnavsk.avløserord.filter((gammelnavsk) => {
            return keyword.toLowerCase().match("\\b" + gammelnavsk.importord.toLowerCase() + "\\b")
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
                        {gammelnavskResultater.length == 1 ? (<>1 mulig
                            avløserord</>) : (<>{gammelnavskResultater.length} mulige avløserord</>)}
                    </Accordion.Header>
                    <Accordion.Content>
                        Norske ord som kan brukes i stedet for de tilsvarende engelske:
                        <Accordion className="gammelnavskAccordion mt-4">
                            {gammelnavskResultater.map((gammelnavsk, i) => (
                                <Accordion.Item key="">
                                    <Accordion.Header className="gammelnavskAccordion">
                                        <span className="firstLetter">{gammelnavsk.importord}</span>
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
                        </Accordion>
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default GammelnavskCheck;
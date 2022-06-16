import {Accordion, Heading, Link} from "@navikt/ds-react";
import {ExternalLink} from "@navikt/ds-icons";
import {Gammelnavsk} from "../../data";

function GammelnavskCheck(props: { content: any; }) {
    const value = props.content;
    let gammelnavsk = Gammelnavsk;
    let gammelnavskResultater;

    const keyword = value;
    if (keyword !== "") {
        const results = gammelnavsk.gammelnavsk_ordliste.filter((gammelnavsk) => {
            return keyword.toLowerCase().match(gammelnavsk.ord.toLowerCase())
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
                        {gammelnavskResultater.length == 1 ? (<>1 ord som bør
                            unngås</>) : (<>{gammelnavskResultater.length} ord som bør unngås</>)}
                    </Accordion.Header>
                    <Accordion.Content>
                        Ord og utrykk som bør unngås:
                        {/*                        <Link target="_blank" href="https://github.com/navikt/ordlister/blob/main/gammelnavsk/gammelnavsk_ordliste_2utgave.pdf">
                            Gammelnavske ord og utrykk<ExternalLink />
                        </Link>:*/}
                        <Accordion className="gammelnavskAccordion mt-4">
                            {gammelnavskResultater.map((gammelnavsk, i) => (
                                <Accordion.Item key={gammelnavsk.id}>
                                    <Accordion.Header className="gammelnavskAccordion">
                                        <span className="firstLetter">{gammelnavsk.ord}</span>
                                    </Accordion.Header>
                                    <Accordion.Content className="gammelnavskAccordionContent">
                                        <Heading spacing level="4" size="xsmall">
                                            Gammelnavsk
                                        </Heading>
                                        {gammelnavsk.gammelnavsk}
                                        <Heading spacing className="pt-6" level="4" size="xsmall">
                                            Klart språk
                                        </Heading>
                                        {gammelnavsk.klart_språk}
                                        <Heading spacing className="pt-6"  level="4" size="xsmall">
                                            Kilde
                                        </Heading>
                                        <Link target="_blank"
                                              href="https://github.com/navikt/ordlister/blob/main/gammelnavsk/gammelnavsk_ordliste_2utgave.pdf">
                                            Gammelnavsk ordliste<ExternalLink/>
                                        </Link>

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
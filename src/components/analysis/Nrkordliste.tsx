import {Accordion, Heading, Link} from "@navikt/ds-react";
import {ExternalLink} from "@navikt/ds-icons";
import {Nrkordliste} from "../../data";

function GammelnavskCheck(props: { content: any; }) {
    const value = props.content;
    let gammelnavsk = Nrkordliste;
    let gammelnavskResultater;

    const keyword = value;
    if (keyword !== "") {
        const results = gammelnavsk.nrkordliste.filter((gammelnavsk) => {
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
                        {gammelnavskResultater.length == 1 ? (<>1 mulig støtende
                            ord</>) : (<>{gammelnavskResultater.length} mulig støtende ord</>)}
                    </Accordion.Header>
                    <Accordion.Content>
                        Ord som kan være støtende, eller som bør brukes med varsomhet:
                        <Accordion className="gammelnavskAccordion mt-4">
                            {gammelnavskResultater.map((gammelnavsk, i) => (
                                <Accordion.Item key={gammelnavsk.id}>
                                    <Accordion.Header className="gammelnavskAccordion">
                                        <span className="firstLetter">{gammelnavsk.ord}</span>
                                    </Accordion.Header>
                                    <Accordion.Content className="gammelnavskAccordionContent">
                                        <Heading spacing level="4" size="xsmall">
                                            Forklaring
                                        </Heading>
                                        <p>{gammelnavsk.bokmål}</p>
{/*                                        {gammelnavsk.bruk = "2" &&
                                            <>
                                                <p>Vær varsom eller oppmerksom når du bruker dette ordet.</p>
                                            </>
                                        }*/}
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

export default GammelnavskCheck;
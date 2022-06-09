import {useState, useEffect} from 'react';
import {Accordion, Heading, Link} from "@navikt/ds-react";
import {ExternalLink} from "@navikt/ds-icons";
import {Gammelnavsk} from "../data";

function Begrepsordbok(props: { content: any; }) {
    const value = props.content;
    let gammelnavsk = Gammelnavsk;
    let gammelnavskResultater;
    const [begreper, setBegreper] = useState([]);
    const [runned, setRunned] = useState("");

    useEffect(
        hentBegrep, // <- function that will run on every dependency update
        [] // <-- empty dependency array
    )

    function hentBegrep() {
        let url = 'https://data.nav.no/api/dcat';
        let data = '{ "size": 1000, "query": {"match": {"type": "godkjent_begrep"}}}';

        // make the API call
        fetch(url,
            {
                method: "POST",
                body: data
            })
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                setBegreper(data.hits.hits)
                // console.log(data.hits.hits[2]._source.content.lowercase_term.slice(0, -1))
            })
    }

    const keyword = value;
    if (keyword !== "" && begreper) {
        const results = begreper.filter((begreper) => {
            return keyword.toLowerCase().match(begreper._source.content.lowercase_term.toLowerCase())
        });
        gammelnavskResultater = results;
        // console.log(results)
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
                        {gammelnavskResultater.length == 1 ? (<>1 godkjent
                            begrep</>) : (<>{gammelnavskResultater.length} godkjente begreper</>)}
                    </Accordion.Header>
                    <Accordion.Content>
                        <Link target="_blank"
                              href="https://data.nav.no/?Tema=%5B%22Begreper%22%5D&sortKey=%22issued%22&sortOrder=%22desc%22">
                            Begrepskatalogen<ExternalLink/>
                        </Link>:
                        <Accordion className="gammelnavskAccordion mt-4">
                            {gammelnavskResultater.map((gammelnavsk, i) => (
                                <Accordion.Item key="">
                                    <Accordion.Header className="gammelnavskAccordion">
                                        <span className="firstLetter">{gammelnavsk._source.content.term}</span>
                                    </Accordion.Header>
                                    <Accordion.Content className="gammelnavskAccordionContent">
                                        {gammelnavsk._source.content.clean_definisjon && (
                                            <Heading spacing level="4" size="xsmall">
                                                Definisjon
                                            </Heading>
                                        )}
                                        <p
                                            className="firstLetter">{gammelnavsk._source.content.clean_definisjon}</p>
                                        {gammelnavsk._source.content.clean_begrepsforklaring && (
                                            <Heading spacing className="pt-6" level="4" size="xsmall">
                                                Begrepsforklaring
                                            </Heading>
                                        )}
                                        <p
                                            className="firstLetter">{gammelnavsk._source.content.clean_begrepsforklaring}</p>
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

export default Begrepsordbok;
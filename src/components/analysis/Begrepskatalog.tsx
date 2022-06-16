import {useState, useEffect} from 'react';
import {Accordion, Heading, Link} from "@navikt/ds-react";
import {ExternalLink} from "@navikt/ds-icons";

function Begrepsordbok(props: { content: any; }) {
    const value = props.content;
    let gammelnavskResultater;
    const [begreper, setBegreper] = useState([]);

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
            })
    }

    const keyword = value;
    if (keyword !== "" && begreper) {
        const results = begreper.filter((begreper) => {
            return keyword.toLowerCase().match(begreper._source.content.lowercase_term.toLowerCase())
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
                        {gammelnavskResultater.length == 1 ? (<>1 ord i
                            Begrepskatalogen</>) : (<>{gammelnavskResultater.length} ord i Begrepskatalogen</>)}
                    </Accordion.Header>
                    <Accordion.Content>
                        Det er nødvendig å forstå et begrep for å kunne forklare det i klarspråk. Her finner du definisjoner fra <Link target="_blank"
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
                                            <Heading spacing level="4" size="xsmall">
                                                Begrepsforklaring
                                            </Heading>
                                        )}
                                        <p
                                            className="firstLetter">{gammelnavsk._source.content.clean_begrepsforklaring}</p>
                                        <Link target="_blank"
                                              href={"https://data.nav.no/begrep/" + gammelnavsk._id}>
                                            Åpne i Berepskatalogen<ExternalLink/>
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

export default Begrepsordbok;
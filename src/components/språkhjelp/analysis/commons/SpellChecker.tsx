import React, {useState} from "react";
import {Accordion, Heading, Button} from "@navikt/ds-react";
import {Typo} from "typo-js-ts";

function SpellChecker(props: { content: any; }) {
    const [misspellings, setMisspellings] = useState([]);
    const [doubleSpacesCount, setDoubleSpacesCount] = useState(0);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState("");
    let value = props.content;
    value = value.replaceAll("Kontakt", "");
    value = value.replaceAll(/\d+(?: \d+)/g, "");
    value = value.replace(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, '');
    value = value.replace(/[^\w\sÆØÅæøå\/\\é-]/g, '');
    value = value.replace(/\n/g, ' ');
    value = value.replace(/\d+/g, '');
    value = value.replace(/\//g, ' ');
    value = value.toLowerCase();

    const checkSpelling = () => {
        setText("");
        setLoading("true");
        setMisspellings([]);

        // @ts-ignore
        let dict = new Typo("no_NB", false, false, {
            dictionaryPath: "hunspell-dictionaries"
        });

        dict.ready
            .then(() => {
                // Promise that dictionary is loaded

                // Split the text into an array of words
                const words = value.split(/\s+/);

                // Check each word for spelling mistakes
                let mistakes = words.filter((word) => !dict.check(word));

                // Removes whitespace elements
                mistakes = mistakes.filter(mistakes => !/^\s*$/.test(mistakes));

                // Removes elements that ends with -
                mistakes = mistakes.filter(mistake => !mistake.match(/-/));

                // Removes duplicates
                mistakes = mistakes.filter((mistake, index) => mistakes.indexOf(mistake) === index);

                // Remove words with 3 or less chars
                mistakes = mistakes.filter(mistake => mistake.length > 3);

                console.log(mistakes)

                setMisspellings(mistakes);
                setDoubleSpacesCount(mistakes.length);
                setText("OK");
                setLoading("");
            })
            .catch((error) => {
                // dictionary was not loaded
                console.error(error);
            });
    };
    return (
        <>
            {doubleSpacesCount != -1 && (
                <Accordion.Item>
                    <Accordion.Header>
                        Stavekontroll
                    </Accordion.Header>
                    <Accordion.Content className="språkhjelp-inner-accordion-content">
                        <Button variant="secondary" onClick={checkSpelling}>Stavekontroll</Button>
                        {text !== "" && (
                            <>
                                {misspellings.length > 0 ? (
                                    <>
                                        <hr className="språkhjelp-mb-6"/>
                                        <Heading aria-live="polite" spacing level="3" size="xsmall">
                                            {misspellings.length} mulige stavefeil
                                        </Heading>
                                        <ul>
                                            {misspellings.map((mistake) => (
                                                <li key={mistake}>"{mistake}"</li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        <hr className="språkhjelp-mb-6"/>
                                        <Heading aria-live="polite" spacing level="3" size="xsmall">
                                            Fant ingen stavefeil.
                                        </Heading>
                                    </>
                                )}
                            </>
                        )}
                        {loading == "true" && (
                            <>
                                <hr className="språkhjelp-mb-6"/>
                                <p aria-live="polite">Kontrollerer teksten...</p>
                            </>
                        )}
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default SpellChecker;
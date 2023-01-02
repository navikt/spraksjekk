import React, {useState} from "react";
import {Accordion, Heading, Button, Pagination} from "@navikt/ds-react";
import {Typo} from "typo-js-ts";

function SpellChecker(props: { content: any; }) {
    const [misspellings, setMisspellings] = useState([]);
    const [mispellingsCount, setmispellingsCount] = useState(0);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState("");
    let value = props.content;
    const [page, setPage] = useState(1);
    let pageSize = 10;
    value = value.replaceAll("Kontakt", "");
    value = value.replaceAll(/\d+(?: \d+)/g, "");
    value = value.replace(/[-a-zA-Z\d@:%._\+~#=]{1,256}\.[a-zA-Z\d()]{1,6}\b([-a-zA-Z\d()@:%_\+.~#?&//=]*)/g, '');
    value = value.replace(/[^\w\sÆØÅæøå\/\\é-]/g, '');
    value = value.replace(/\n/g, ' ');
    value = value.replace(/\d+/g, '');
    value = value.replace(/\//g, ' ');
    value = value.toLowerCase();

    // Pagination pages
    const indexOfLastPost = page * pageSize;
    const indexOfFirstPost = indexOfLastPost - pageSize;
    const allFreq = Object.entries(misspellings)
        .slice(indexOfFirstPost, indexOfLastPost);

    // Number of pages in pagination
    let pagesCount = Math.ceil(mispellingsCount / pageSize)

    const checkSpelling = () => {
        setText("");
        setLoading("true");
        setMisspellings([]);

        setTimeout(function () {
            // @ts-ignore
            let dict = new Typo("no_NB", false, false, {
                dictionaryPath: "hunspell-dictionaries"
            });

            dict.ready
                .then(() => {
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

                    // Remove words with 3 or fewer chars
                    mistakes = mistakes.filter(mistake => mistake.length > 3);

                    setMisspellings(mistakes);
                    setmispellingsCount(mistakes.length);
                    setText("OK");
                    setLoading("");
                })
                .catch((error) => {
                    // dictionary was not loaded
                    console.error(error);
                });
        }, 400);
    };
    return (
        <>
            {mispellingsCount != -1 && (
                <Accordion.Item>
                    <Accordion.Header>
                        Stavekontroll
                    </Accordion.Header>
                    <Accordion.Content className="språkhjelp-inner-accordion-content">
                        {loading == "true" ? (
                            <Button loading>Stavekontroll</Button>
                        ) : (
                            <Button variant="secondary" onClick={() => checkSpelling()}>Stavekontroll</Button>
                        )}
                        {text !== "" && (
                            <>
                                {misspellings.length > 0 ? (
                                    <>
                                        <hr className="språkhjelp-mb-6"/>
                                        <Heading aria-live="polite" spacing level="3" size="xsmall">
                                            {misspellings.length} ord som må sjekkes
                                        </Heading>
                                        <ul>
                                            {allFreq.map((wordFreq: [string, string]) => {
                                                return (
                                                    <li key={wordFreq[0]}>
                                                        "{wordFreq[1]}"
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                        {mispellingsCount > pageSize &&
                                            <div className="språkhjelp-pagination-container språkhjelp-mb-6">
                                                <Pagination
                                                    className="språkhjelp-pagination"
                                                    page={page}
                                                    onPageChange={setPage}
                                                    count={pagesCount}
                                                    size="small"
                                                    siblingCount={0}
                                                    boundaryCount={1}
                                                />
                                            </div>
                                        }
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
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default SpellChecker;
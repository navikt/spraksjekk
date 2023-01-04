import {Accordion, Heading, Link, Button, Pagination} from "@navikt/ds-react";
import {useState} from "react";
import {ExternalLink} from "@navikt/ds-icons";

function LongParagraphs(props: { content: any; }) {
    let rawcontent = props.content;
    const [page, setPage] = useState(1);
    let pagesCount = 1
    let paragraphLength = 4;
    let pageSize = 3;

    // Declaring all letiables
    rawcontent = rawcontent.replaceAll("Kopier lenke", "");
    rawcontent = rawcontent.split("\n")
        .map((l: string) => l.length > 0 && ![".", ":", "!", "?"].includes(l.slice(-1))
            ? l + "."
            : l
        )
        .join("\n");
    let content = rawcontent;
    const paragraphs = content.split(/\n/).sort(function (a: { replace: (arg0: RegExp, arg1: string) => { (): any; new(): any; split: { (arg0: string): { (): any; new(): any; length: number; }; new(): any; }; }; }, b: { replace: (arg0: RegExp, arg1: string) => { (): any; new(): any; split: { (arg0: string): { (): any; new(): any; length: number; }; new(): any; }; }; }) {
        return b.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|").length - a.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|").length;
    });
    let longParagraphsCounter = 0;
    let myLongParagraphs = [];

    // Loop through the entire array of paragraphs
    for (let i in paragraphs) {
        const sentencesInParagraphs = paragraphs[i].replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
        if (sentencesInParagraphs.length >= paragraphLength) {
            // +1 for every long word in document
            myLongParagraphs.push(paragraphs[i]);
            longParagraphsCounter++;
        }
    }

    // Check if there are any long paragraphs
    let longParagraphHere = 0
    for (let i in paragraphs) {
        const sentencesInParagraphs = paragraphs[i].replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
        if (sentencesInParagraphs.length >= paragraphLength) {
            // +1 for every long word in document
            longParagraphHere = 1;
        }
    }
    const [expanded, setExpanded] = useState([]);
    const firstSentenceRegex = /^[^.!?]*[.!?]/;

    // Create a list of long paragraphs
    const longParagraphs = myLongParagraphs.filter((item) => item.length > paragraphLength);

    // Pagination pages
    const indexOfLastPost = page * pageSize;
    const indexOfFirstPost = indexOfLastPost - pageSize;
    const allFreq = Object.entries(longParagraphs)
        .slice(indexOfFirstPost, indexOfLastPost);

    // Number of pages in pagination
    pagesCount = Math.ceil(longParagraphsCounter / pageSize)

    return (
        <>
            {longParagraphHere != 0 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {longParagraphsCounter} {longParagraphsCounter == 1 ? (<>langt avsnitt</>) : (<>lange
                        avsnitt</>)}
                    </Accordion.Header>
                    <Accordion.Content>
                        <Heading spacing level="3" size="xsmall">
                            Skriv korte og enkle avsnitt
                        </Heading>
                        "Et avsnitt bør ha ett hovedbudskap og ikke ha mer enn to til tre setninger." - <Link
                        target="_blank"
                        href="https://aksel.nav.no/artikkel/sprakarbeid?tema=innholdsarbeid">
                        Aksel<ExternalLink title="Ekstern lenke"/>
                    </Link>
                        <Heading className="språkhjelp-pt-6" spacing level="3" size="xsmall">
                            Avsnitt med over tre setninger
                        </Heading>
                        <ul className="språkhjelp-list-disc språkhjelp-pt-5 språkhjelp-list-inside">
                            {allFreq.map((wordFreq: [string, string]) => {
                                return (
                                    <li key={wordFreq[0]} className="språkhjelp-pb-5">
                                        {expanded[wordFreq[0]] ? <>"{wordFreq[1]} </> : <>"{wordFreq[1].match(firstSentenceRegex)[0]} </>}
                                        <Button size="xsmall" variant="secondary" onClick={() => {
                                            setExpanded(prevExpanded => {
                                                const newExpanded = [...prevExpanded];
                                                newExpanded[wordFreq[0]] = !newExpanded[wordFreq[0]];
                                                return newExpanded;
                                            });
                                        }}>
                                            {expanded[wordFreq[0]] ? "Vis mindre" : "Les mer"}
                                        </Button>" <b>({wordFreq[1].replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|").length}&nbsp;setninger)</b>
                                    </li>
                                );
                            })}
                        </ul>
                        {longParagraphsCounter > pageSize &&
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
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default LongParagraphs;
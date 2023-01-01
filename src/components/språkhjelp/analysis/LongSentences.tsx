import {Accordion, Heading, Link, Pagination} from "@navikt/ds-react";
import {useState} from "react";
import {ExternalLink} from "@navikt/ds-icons";

function LongSentences(props: { content: any; }) {
    let rawcontent = props.content;
    const [page, setPage] = useState(1);
    let pagesCount = 1
    let sentenceLength = 21;
    let pageSize = 3;

    // Declaring all letiables
    rawcontent = rawcontent.replaceAll("Kopier lenke", "");
    rawcontent = rawcontent.split("\n")
        .map((l: string) => l.length > 0 && ![".", ":", "!", "?", "*"].includes(l.slice(-1))
            ? l + "."
            : l
        )
        .join("\n");
    let content = rawcontent;

    const sentences = content.replace(/([.?!–"“:*])\s*(?=[A-ZÆØÅ.*«»0-9"“–\d])/g, "$1|").split("|").sort(function (a, b) {
        return b.split(/\s+/).length - a.split(/\s+/).length;
    });
    let longSentenceCounter = 0;
    let myLongSentences = [];

    // Loop through the entire array of sentences
    for (let i in sentences) {
        const sentenceWords = sentences[i].split(/\s+/);
        if (sentenceWords.length >= sentenceLength) {
            // +1 for every long word in document
            myLongSentences.push(sentences[i]);
            longSentenceCounter++;
        }
    }

    // Check if there are any long sentences
    let longSentenceHere = 0;
    for (let i in sentences) {
        const sentenceWords = sentences[i].split(/\s+/);
        if (sentenceWords.length >= sentenceLength) {
            // +1 for every long sentence in document
            longSentenceHere = 1;
        }
    }

    // Create a list of long sentences
    const longSentences = myLongSentences.filter((item) => item.length > sentenceLength);

    // Number of long sentences
    longSentenceCounter = longSentences.length;

    // Pagination pages
    const indexOfLastPost = page * pageSize;
    const indexOfFirstPost = indexOfLastPost - pageSize;
    const allFreq = Object.entries(longSentences)
        .slice(indexOfFirstPost, indexOfLastPost);

    // Number of pages in pagination
    pagesCount = Math.ceil(longSentenceCounter / pageSize)

    return (
        <>
            {longSentenceHere != 0 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {longSentenceCounter} {longSentenceCounter == 1 ? (<>lang setning</>) : (<>lange
                        setninger</>)}
                    </Accordion.Header>
                    <Accordion.Content className="språkhjelp-remove-accordion-padding-bottom">
                        <Heading spacing level="3" size="xsmall">
                            Skriv korte og enkle setninger
                        </Heading>
                        Ifølge studier kan setninger med over 20 ord anses som vanskelige å lese - <Link
                        target="_blank"
                        href="https://strainindex.wordpress.com/2012/04/30/longer-the-sentence-greater-the-strain/">
                        Nirmaldasan<ExternalLink title="Ekstern lenke"/>
                    </Link>

                        <Heading className="språkhjelp-pt-6" spacing level="3" size="xsmall">
                            Setninger med over 20 ord
                        </Heading>
                        <ul className="språkhjelp-list-disc språkhjelp-pt-5 språkhjelp-list-inside">
                            {allFreq.map((wordFreq: [string, string]) => {
                                return (
                                    <li key={wordFreq[0]} className="språkhjelp-pb-5">
                                            "{wordFreq[1]}" <b>({wordFreq[1].split(/\s+/).length}&nbsp;ord)</b>
                                    </li>
                                );
                            })}
                        </ul>
                        {longSentenceCounter > pageSize &&
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

export default LongSentences;
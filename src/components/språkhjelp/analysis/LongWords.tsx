import {Accordion, TextField, Table, Pagination, Heading, Link} from "@navikt/ds-react";
import {useState, useCallback, useEffect} from 'react'
import {ExternalLink} from "@navikt/ds-icons";

function LongWords(props: { content: any; }) {
    const [page, setPage] = useState(1);
    const [pagesCount, setpagesCount] = useState(0);
    const [wordLength, setWordLength] = useState(7)
    let longWordCounter = 0;
    let pageSize = 10;

    // Decl/**/ari/**/ng all variables
    let rawcontent = props.content;
    rawcontent = rawcontent.replaceAll("Kopier lenke", "");
    rawcontent = rawcontent.replaceAll("/", " / ");
    rawcontent = rawcontent.replaceAll(/(.*)\.+[A-Za-z]{2,6}/g, "");
    rawcontent = rawcontent.replaceAll(/http(.*)/g, "");
    rawcontent = rawcontent.split("\n")
        .map((l: string) => l.length > 0 && ![".", ":", "!", "?", " "].includes(l.slice(-1))
            ? l + "."
            : l
        )
        .join("\n");
    let content = rawcontent;

    const words = content
        .toLowerCase()
        .split(/\s+/)
        .map((s: string) => s.replace(/[.,:?()!"«»]+/g, ""));

    // Find the longest word
    let longestWord = 0;
    let array = words;
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i].length > longestWord) {
            longestWord = array[i].length;
        }
    }

    // Merge dublicate words
    function removeDuplicates(words) {
        return words.filter((item,
                             index) => words.indexOf(item) === index);
    }

    let longWordsHere = 0;
    let fileterWords = removeDuplicates(words)
    // Loop through the entire array of words
    for (let i in words) {
        if (words[i].length > 6) {
            // +1 for every long word in document
            longWordsHere = 1;
        }
        /*        if (words[i].length > wordLength) {
                    // +1 for every long word in document
                    longWordCounter++;
                }*/
    }

    // Create a list of long words
    const longWords = removeDuplicates(words)
        .sort(function (a, b) {
            return b.length - a.length;
        })
        .filter((item: string | any[]) => item.length > (wordLength - 1));

    longWordCounter = longWords.length;
    let totalFreqWords = 0;
    let value = "";

    const indexOfLastPost = page * 10;
    const indexOfFirstPost = indexOfLastPost - 10;
    const allFreq = Object.entries(longWords)
        .slice(indexOfFirstPost, indexOfLastPost);

    const calculateFreqMap = useCallback(() => {
        // Kalkuler antall sider for Pagination
        totalFreqWords = longWordCounter;
        if (totalFreqWords >= 10) {
            setpagesCount(Math.ceil(totalFreqWords / pageSize));
        }
    }, [value]);

    useEffect(() => {
        calculateFreqMap();
    }, [calculateFreqMap]);

    const listLongWords = longWords.map((word, index) =>
        <li key={index}>{word} ({word.length} tegn)</li>
    );

    return (
        <>
            {longWordsHere == 1 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {listLongWords.length == 1 ? (<>1 unikt langt</>) : (<>{longWordCounter} unike lange</>)} ord
                    </Accordion.Header>
                    <Accordion.Content>
                        <Heading spacing level="3" size="xsmall">
                            Velg korte og enkle ord
                        </Heading>
                        Ifølge lesbarhetsindeksen Liks anses ord med over 6 bokstaver som lange - <Link
                        target="_blank"
                        href="https://no.wikipedia.org/wiki/Lesbarhetsindeks">
                        Wikipedia<ExternalLink title="Ekstern lenke"/>
                    </Link>

                        <Heading className="språkhjelp-pt-6" spacing level="3" size="xsmall">
                            Ord med over 6 bokstaver
                        </Heading>
                        {/*
                        <TextField label="antall bokstever" className="lengthField"
                                                hideLabel
                        // @ts-ignorets-ignore
                                                value={wordLength}
                                                max={longestWord}
                                                min="1"
                        // @ts-ignorets-ignore
                                                onChange={(e) => setpagesCount(Math.ceil(longWordCounter / pageSize)) & setWordLength(e.target.value)}
                                                type="number"
                                                size="small"
                        />
                        <ul className="list-disc pt-5 list-inside">
                            {listLongWords}
                        </ul> */}
                        <div className="språkhjelp-overflow-scroll">
                            <Table zebraStripes size="small">
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell scope="col">Ord</Table.HeaderCell>
                                        <Table.HeaderCell scope="col">Bokstaver</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {allFreq.map((wordFreq: [string, string]) => {
                                        return (
                                            <Table.Row key={wordFreq[0]}>
                                                <Table.HeaderCell scope="row">
                                                    {wordFreq[1]}
                                                </Table.HeaderCell>
                                                <Table.DataCell>{wordFreq[1].length}</Table.DataCell>
                                            </Table.Row>
                                        );
                                    })}
                                </Table.Body>
                            </Table>
                        </div>
                        {longWordCounter > 10 &&
                            <div className="språkhjelp-pagination-container">
                                <Pagination
                                    className="språkhjelp-spacing-30 språkhjelp-pagination"
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

export default LongWords;
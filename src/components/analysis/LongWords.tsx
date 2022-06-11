import {Accordion, TextField, Table, Pagination} from "@navikt/ds-react";
import {useState, useCallback, useEffect} from 'react'

function LongWords(props: { content: any; }) {
    const [page, setPage] = useState(1);
    const [pagesCount, setpagesCount] = useState(0);
    const [wordLength, setWordLength] = useState(7)
    let longWordCounter = 0;
    let pageSize = 10;

    // Decl/**/ari/**/ng all variables
    let rawcontent = props.content;
    rawcontent = rawcontent.replaceAll("Kopier lenke", "");
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
        .map((s: string) => s.replace(/[.,:?()!"]+/g, ""));

    // Find longest word
    let longestWord = 0;
    let array = words;
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i].length > longestWord) {
            longestWord = array[i].length - 1;
        }
    }

    // Slå sammen ord som er like
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
                        Ord med <TextField label="antall bokstever" className="lengthField"
                                           hideLabel
                        // @ts-ignorets-ignore
                                           value={wordLength}
                                           max={longestWord}
                                           min="1"
                        // @ts-ignorets-ignore
                                           onChange={(e) => setpagesCount(Math.ceil(longWordCounter / pageSize)) & setWordLength(e.target.value)}
                                           type="number"
                                           size="small"
                    /> eller flere bokstaver:
                        {/* <ul className="list-disc pt-5 list-inside">
                            {listLongWords}
                        </ul> */}
                        <Table zebraStripes size="small" className="mt-6">
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
                        {longWordCounter > 10 &&
                            <div className="pagination-container">
                                <Pagination
                                    className="spacing-30 pagination"
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
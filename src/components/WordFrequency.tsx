import { Accordion, Table, Pagination } from "@navikt/ds-react";
import { useState, useEffect, useCallback } from 'react'

function WordFrequency(props: { content: any; }) {
    const value = props.content;
    const [page, setPage] = useState(1);
    const [pagesCount, setpagesCount] = useState(0);
    const [freqMap, setFreqMap] = useState<Record<string, number>>({});
    let totalFreqWords = 0;
    let pageSize = 10;
    const indexOfLastPost = page * 10;
    const indexOfFirstPost = indexOfLastPost - 10;
    const allFreq = Object.entries(freqMap)
        .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
        .slice(indexOfFirstPost, indexOfLastPost);

    const calculateFreqMap = useCallback(() => {
        if (!value) {
            setFreqMap({});
            return;
        }

        const words = value
            .toLowerCase()
            .split(/\s+/)
            .map((s) => s.replace(/[.,:?()!"]+/g, ""));

        let newFreqMap: Record<string, number> = {};
        words.forEach(function (w) {
            if (!newFreqMap[w]) {
                newFreqMap[w] = 0;
            }
            newFreqMap[w] += 1;
        });
        setFreqMap(newFreqMap);

        // Kalkuler antall sider for Pagination
        totalFreqWords = Object.keys(newFreqMap).length;
        if (totalFreqWords >= 10) {
            setpagesCount(Math.ceil(totalFreqWords / pageSize));
        }
    }, [value]);

    useEffect(() => {
        calculateFreqMap();
    }, [calculateFreqMap]);

    return (
        <>
            {value.length >= 1 && (
                <Accordion.Item>
                    <Accordion.Header>
                        Frekvensordliste
                    </Accordion.Header>
                    <Accordion.Content className="overflow-x-auto gammelnavskAccordionContent">
                        <Table zebraStripes size="small">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell scope="col">Ord</Table.HeaderCell>
                                    <Table.HeaderCell scope="col">Frekvens</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {allFreq.map((wordFreq: [string, number]) => {
                                    return (
                                        <Table.Row key={wordFreq[0]}>
                                            <Table.HeaderCell scope="row">
                                                {wordFreq[0]}
                                            </Table.HeaderCell>
                                            <Table.DataCell>{wordFreq[1]}</Table.DataCell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table>
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
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default WordFrequency;
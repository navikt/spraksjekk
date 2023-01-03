import {Accordion} from "@navikt/ds-react";
import React, {useState} from 'react'

function WordCount(props: { content: any; }) {
    const [wordLength] = useState(6)
    const content = props.content;
    const value = props.content;
    const totalchars = value.length;
    const words = content.split(/\s+/);
    let wordCounter = 0;
    let longWordCounter = 0;
    let dotCounter = 0;
    let mellomrom = 0;
    let lengeUtenMellomrom = 0;

    // Get total number of words in text
    wordCounter = words.length;
    const totalwords = wordCounter;

    // Count paragraphs
    mellomrom = value.split(" ").length - 1
    lengeUtenMellomrom = value.length - mellomrom
    let paragrafer = value.split("\n\n");
    let gp = paragrafer.length;
    let pp = 0;
    let strip_whitespace = /\s+/gi;
    while (gp >= 0) {
        gp--;
        let tmp = paragrafer[gp];
        tmp = tmp ? tmp.replace(strip_whitespace, "") : tmp;
        if (tmp && tmp.length > 1) {
            pp++;
        }
    }
    const totalcharsnospace = lengeUtenMellomrom;
    const totalparagraphs = pp;

    // Count sentences
    const countPunctuation = (value: string | any[]) => {
        const punct = "!\;\.*?";
        let count = 0;
        for (let i = 0; i < value.length; i++) {
            if (!punct.includes(value[i])) {
                continue;
            }
            count++;
        }
        return count;
    };
    dotCounter = countPunctuation(value);
    const totalsentences = dotCounter;

    let longWordsHere = 0;
    // Loop through the entire array of words
    for (let i in words) {
        if (words[i].length > 6) {
            // +1 for every long word in document
            longWordsHere = 1;
        }
        if (words[i].length > wordLength) {
            // +1 for every long word in document
            longWordCounter++;
        }
    }

    return (
        <Accordion.Item>
            <Accordion.Header className="språkhjelp-inner-accordion">
                Ordtelling: {totalwords} ord
            </Accordion.Header>
            <Accordion.Content className="språkhjelp-inner-accordion-content">
                <ul>
                    <li>Ord: {totalwords}</li>
                    <li>Setninger: {totalsentences}</li>
                    <li>Avsnitt: {totalparagraphs}</li>
                    <li>Tegn: {totalchars} {totalchars != totalcharsnospace && (<>({totalcharsnospace} uten
                        mellomrom)</>)}</li>
                </ul>
            </Accordion.Content>
        </Accordion.Item>
    );
}

export default WordCount;
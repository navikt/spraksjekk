import { LixMelding } from "./index.js";
import { Accordion, Link } from "@navikt/ds-react";
import { ExternalLink } from "@navikt/ds-icons";
import { useState } from 'react'

function Lix(props: { content: any }) {
    const [wordLength] = useState(6)
    const value = props.content;
    const content = props.content;
    let lix = 0;
    let wordCounter = 0;
    let longWordCounter = 0;
    let dotCounter = 0;

    // Get total number of words in text
    const words = content.split(/\s+/);
    wordCounter = words.length;

    // Count sentences
    const countPunctuation = (value: string | any[]) => {
        const punct = "!\;\.*?";
        let count = 0;
        for (let i = 0; i < value.length; i++) {
            if (!punct.includes(value[i])) {
                continue;
            };
            count++;
        };
        return count;
    };
    dotCounter = countPunctuation(value);

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

    // Calculate LIX
    lix = Math.round(wordCounter / dotCounter + (longWordCounter * 100) / wordCounter);

    return (
        <>
            {lix >= 34 && lix < 100 && (
                <Accordion.Item>
                    <Accordion.Header>
                        Liks {lix}: <LixMelding lix={lix} />
                    </Accordion.Header>
                    <Accordion.Content className="gammelnavskAccordionContent">
                        Liks-verdi: {lix}<br/><br />
                        Teksten er <LixMelding lix={lix} /> ifølge <Link target="_blank" href="https://no.wikipedia.org/wiki/Lesbarhetsindeks">
                            lesbarhetsindeksen Liks<ExternalLink />
                        </Link>.
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default Lix;
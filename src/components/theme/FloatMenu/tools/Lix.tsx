import {useState} from 'react'
import {Accordion, BodyShort, Heading, Link} from "@navikt/ds-react";
import {ExternalLink} from "@navikt/ds-icons";

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
            }
            count++;
        }
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

    let lixMelding = "";

    // LIX begrunnelse
    if (lix < 34) {
        lixMelding = "Enkel å lese";
    }
    if (lix > 33 && lix < 44) {
        lixMelding = "Middels å lese";
    }
    if (lix > 43) {
        lixMelding = "Vanskelig å lese";
    }

    return (
        <>
            {lix >= 0 && lix < 100 && dotCounter > 0 && (
                <>
                Liks: {lix}. {lixMelding}
                </>
            )}
        </>
    );
}

export default Lix;
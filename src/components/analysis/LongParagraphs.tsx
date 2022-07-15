import {Accordion, TextField} from "@navikt/ds-react";
import {useState} from "react";

function LongParagraphs(props: { content: any; }) {
    let rawcontent = props.content;
    const [paragraphLength, setParagraphLength] = useState(3)
    // Declaring all letiables
    rawcontent = rawcontent.replaceAll("Kopier lenke", "");
    rawcontent = rawcontent.split("\n")
        .map((l: string) => l.length > 0 && ![".", ":", "!", "?"].includes(l.slice(-1))
            ? l + "."
            : l
        )
        .join("\n");
    let content = rawcontent;

    const paragraphs = content.split(/\n/);
    let longParagraphsCounter = 0;
    let myLongParagraphs = [];

    // Loop through the entire array of paragraphs
    for (let i in paragraphs) {
        const sentencesInParagraphs = paragraphs[i].replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
        if (sentencesInParagraphs.length > paragraphLength) {
            // +1 for every long word in document
            myLongParagraphs.push(paragraphs[i]);
            longParagraphsCounter++;
        }
    }

    // Check if there are any long paragraphs
    let longParagraphHere = 0
    for (let i in paragraphs) {
        const sentencesInParagraphs = paragraphs[i].replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
        if (sentencesInParagraphs.length > 3) {
            // +1 for every long word in document
            longParagraphHere = 1;
        }
    }

    // Create a list of long paragraphs
    const longParagraphs = myLongParagraphs.filter((item) => item.length > paragraphLength);
    const listLongParagraphs = longParagraphs.map((paragraph, index) =>
        <li key={index} className="pb-5">{paragraph} ({paragraph.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|").length} setninger)</li>
    );

    return (
        <>
            {longParagraphHere != 0 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {longParagraphsCounter} {longParagraphsCounter == 1 ? (<>langt avsnitt</>) : (<>lange
                        avsnitt</>)}
                    </Accordion.Header>
                    <Accordion.Content>
                        {/*Avsnitt med over 3 setninger:*/}
                        Avsnitt med over <TextField label="antall ord" className="lengthField"
                                                    hideLabel
                        // @ts-ignorets-ignore
                                                    value={paragraphLength}
                                                    max="50"
                                                    min="1"
                        // @ts-ignorets-ignore
                                                    onChange={(e) => setParagraphLength(e.target.value)}
                                                    type="number"
                                                    size="small"
                    /> setninger:
                        <ul className="list-disc pt-5 list-inside">
                            {listLongParagraphs}
                        </ul>
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default LongParagraphs;
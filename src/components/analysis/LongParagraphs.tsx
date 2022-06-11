import { Accordion } from "@navikt/ds-react";

function LongParagraphs(props: { content: any; }) {
    let rawcontent = props.content;
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
        if (sentencesInParagraphs.length > 3) {
            // +1 for every long word in document
            myLongParagraphs.push(paragraphs[i]);
            longParagraphsCounter++;
        }
    }

    // Create a list of long paragraphs
    const longParagraphs = myLongParagraphs.filter((item) => item.length > 3);
    const listLongParagraphs = longParagraphs.map((paragraph, index) =>
        <li key={index} className="pb-5">{paragraph}</li>
    );

    return (
        <>
            {longParagraphsCounter != 0 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {longParagraphsCounter} {longParagraphsCounter == 1 ? (<>langt avsnitt</>) : (<>lange avsnitt</>)}
                    </Accordion.Header>
                    <Accordion.Content>
                        Avsnitt med over 3 setninger:
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
import { Accordion } from "@navikt/ds-react";

function LongSentences(props: { content: any; }) {
    let rawcontent = props.content;
    // Declaring all letiables
    rawcontent = rawcontent.replaceAll("Kopier lenke", "");
    // rawcontent = rawcontent.replaceAll(" *", "");
    rawcontent = rawcontent.split("\n")
        .map((l: string) => l.length > 0 && ![".", ":", "!", "?", "*"].includes(l.slice(-1))
            ? l + "."
            : l
        )
        .join("\n");
    let content = rawcontent;
    
    const sentences = content.replace(/([.?!:*\/r\/n])\s*(?=[A-Z*])/g, "$1|").split("|");
    let longSentencesCounter = 0;
    let myLongSentences = [];
    
    // Loop through the entire array of sentences
    for (let i in sentences) {
        const sentenceWords = sentences[i].split(/\s+/);
        if (sentenceWords.length > 20) {
            // +1 for every long word in document
            myLongSentences.push(sentences[i]);
            longSentencesCounter++;
        }
    }

    // Create a list of long sentences
    const longSentences = myLongSentences.filter((item) => item.length > 20);
    const listLongSentences = longSentences.map((sentence, index) =>
        <li key={index} className="pb-5">{sentence}</li>
    );

    return (
        <>
            {longSentencesCounter != 0 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {longSentencesCounter} {longSentencesCounter == 1 ? (<>lang setning</>) : (<>lange setninger</>)}
                    </Accordion.Header>
                    <Accordion.Content className="removeAccordionPaddingBottom">
                        Setninger med over 20 ord:
                        <ul className="list-disc pt-5 list-inside">
                            {listLongSentences}
                        </ul>
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default LongSentences;
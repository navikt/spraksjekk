import {Accordion, TextField} from "@navikt/ds-react";
import {useState} from "react";

function LongSentences(props: { content: any; }) {
    let rawcontent = props.content;
    const [sentenceLength, setSentenceLength] = useState(20)
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

    const sentences = content.replace(/([.?!"“:*\/r\/n])\s*(?=[A-Z*])/g, "$1|").split("|").sort(function (a, b) {
        return b.split(/\s+/).length - a.split(/\s+/).length;
    });
    let longSentencesCounter = 0;
    let myLongSentences = [];

    // Loop through the entire array of sentences
    for (let i in sentences) {
        const sentenceWords = sentences[i].split(/\s+/);
        if (sentenceWords.length > sentenceLength) {
            // +1 for every long word in document
            myLongSentences.push(sentences[i]);
            longSentencesCounter++;
        }
    }

    // Check if there are any long sentences
    let longSentenceHere = 0;
    for (let i in sentences) {
        const sentenceWords = sentences[i].split(/\s+/);
        if (sentenceWords.length > 20) {
            // +1 for every long word in document
            longSentenceHere = 1;
        }
    }

    // Create a list of long sentences
    const longSentences = myLongSentences.filter((item) => item.length > sentenceLength);
    const listLongSentences = longSentences.map((sentence, index) =>
        <li key={index} className="pb-5">{sentence} ({sentence.split(/\s+/).length} ord)</li>
    );

    return (
        <>
            {longSentenceHere != 0 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {longSentencesCounter} {longSentencesCounter == 1 ? (<>lang setning</>) : (<>lange
                        setninger</>)}
                    </Accordion.Header>
                    <Accordion.Content className="removeAccordionPaddingBottom">
                        {/*Setninger med over 20 ord:*/}
                        Setninger med over <TextField label="antall ord" className="lengthField"
                                                      hideLabel
                        // @ts-ignorets-ignore
                                                      value={sentenceLength}
                                                      max="100"
                                                      min="1"
                        // @ts-ignorets-ignore
                                                      onChange={(e) => setSentenceLength(e.target.value)}
                                                      type="number"
                                                      size="small"
                    /> ord:
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
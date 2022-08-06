import {Accordion, Heading, Link, TextField} from "@navikt/ds-react";
import {useState} from "react";
import {ExternalLink} from "@navikt/ds-icons";

function LongParagraphs(props: { content: any; }) {
    let rawcontent = props.content;
    const [paragraphLength, setParagraphLength] = useState(4)
    // Declaring all letiables
    rawcontent = rawcontent.replaceAll("Kopier lenke", "");
    rawcontent = rawcontent.split("\n")
        .map((l: string) => l.length > 0 && ![".", ":", "!", "?"].includes(l.slice(-1))
            ? l + "."
            : l
        )
        .join("\n");
    let content = rawcontent;

    const paragraphs = content.split(/\n/).sort(function (a, b) {
        return b.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|").length - a.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|").length;
    });
    let longParagraphsCounter = 0;
    let myLongParagraphs = [];

    // Loop through the entire array of paragraphs
    for (let i in paragraphs) {
        const sentencesInParagraphs = paragraphs[i].replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
        if (sentencesInParagraphs.length >= paragraphLength) {
            // +1 for every long word in document
            myLongParagraphs.push(paragraphs[i]);
            longParagraphsCounter++;
        }
    }

    // Check if there are any long paragraphs
    let longParagraphHere = 0
    for (let i in paragraphs) {
        const sentencesInParagraphs = paragraphs[i].replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
        if (sentencesInParagraphs.length >= 4) {
            // +1 for every long word in document
            longParagraphHere = 1;
        }
    }

    // Create a list of long paragraphs
    const longParagraphs = myLongParagraphs.filter((item) => item.length > paragraphLength);
    const listLongParagraphs = longParagraphs.map((paragraph, index) =>
        <li key={index}
            className="pb-5">{paragraph}
            <b>({paragraph.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|").length}&nbsp;setninger)</b></li>
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
                        {/*  <TextField label="antall ord" className="lengthField"
                                   hideLabel
                            // @ts-ignorets-ignore
                                   value={paragraphLength}
                                   max="50"
                                   min="1"
                            // @ts-ignorets-ignore
                                   onChange={(e) => setParagraphLength(e.target.value)}
                                   type="number"
                                   size="small"
                        />*/}
                        <Heading spacing level="3" size="xsmall">
                            Skriv korte og enkle avsnitt
                        </Heading>
                        "Hvert avsnitt skal ha ett budskap og ikke inneholde mer enn 2-3 setninger." - <Link
                        target="_blank"
                        href="https://aksel.nav.no/artikkel/sprakarbeid?tema=innholdsarbeid">
                        Aksel<ExternalLink title="Ekstern lenke"/>
                    </Link>

                        <Heading className="mt-6" spacing level="3" size="xsmall">
                            Avsnitt med over 3 setninger
                        </Heading>
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
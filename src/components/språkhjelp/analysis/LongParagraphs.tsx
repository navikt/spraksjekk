import {Accordion, Heading, Link, Button} from "@navikt/ds-react";
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

    const paragraphs = content.split(/\n/).sort(function (a: { replace: (arg0: RegExp, arg1: string) => { (): any; new(): any; split: { (arg0: string): { (): any; new(): any; length: number; }; new(): any; }; }; }, b: { replace: (arg0: RegExp, arg1: string) => { (): any; new(): any; split: { (arg0: string): { (): any; new(): any; length: number; }; new(): any; }; }; }) {
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
    const [expanded, setExpanded] = useState([]);
    const firstSentenceRegex = /^[^.!?]*[.!?]/; // This regular expression will match the characters at the beginning of the string up until the first period, question mark, or exclamation point.

    // Create a list of long paragraphs
    const longParagraphs = myLongParagraphs.filter((item) => item.length > paragraphLength);
    const listLongParagraphs = longParagraphs.map((paragraph, index) =>
        <li key={index} className="språkhjelp-pb-5">
            {expanded[index] ? <>"{paragraph}"</> : <>"{paragraph.match(firstSentenceRegex)[0]} (...)"</>}
            <Button style={{marginLeft: "5px", marginRight: "5px"}} size="xsmall" variant="secondary" onClick={() => {
                setExpanded(prevExpanded => {
                    const newExpanded = [...prevExpanded];
                    newExpanded[index] = !newExpanded[index];
                    return newExpanded;
                });
            }}>
                {expanded[index] ? "Vis mindre" : "Les mer"}
            </Button><b>({paragraph.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|").length}&nbsp;setninger)</b>
        </li>
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
                        "Et avsnitt bør ha ett hovedbudskap og ikke ha mer enn to til tre setninger." - <Link
                        target="_blank"
                        href="https://aksel.nav.no/artikkel/sprakarbeid?tema=innholdsarbeid">
                        Aksel<ExternalLink title="Ekstern lenke"/>
                    </Link>

                        <Heading className="språkhjelp-pt-6" spacing level="3" size="xsmall">
                            Avsnitt med over tre setninger
                        </Heading>
                        <ul className="språkhjelp-list-disc språkhjelp-pt-5 språkhjelp-list-inside">
                            {listLongParagraphs}
                        </ul>
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default LongParagraphs;
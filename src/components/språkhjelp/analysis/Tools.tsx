import {Lix, WordFrequency, WordCount, SpellChecker} from "./tools/index";
import {Accordion} from "@navikt/ds-react";

function Tools(props: { content: any; }) {
    const value = props.content;
    return (
        <Accordion.Item>
            <Accordion.Header>
                Liks og ordtelling
            </Accordion.Header>
            <Accordion.Content>
                <Accordion className="språkhjelp-inner-accordion språkhjelp-mt-2">
                    <Lix content={value}/>
                    <WordCount content={value}/>
                    <WordFrequency content={value}/>
                    <SpellChecker content={value}/>
                </Accordion>
            </Accordion.Content>
        </Accordion.Item>
    );
}

export default Tools;
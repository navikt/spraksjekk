import './Språkhjelp.css'
import {Accordion, Alert} from "@navikt/ds-react";
import {
    LongParagraphs,
    LongSentences,
    LongWords,
    DublicateWords,
    GammelnavskDictionary,
    NrkDictionaries,
    AvløserordDictionary,
    Begrepskatalog,
    PersonalData,
    Lix,
    WordCount
} from "./analysis/index"

function Resultbox(props) {
    let value = props.content;
    return (
        <>
            {value.length == 0 ? (
                    <Alert variant="info">Legg til tekst for å få opp resultater.</Alert>) :
                (
                    <>
                        <Accordion className="språkhjelp-navds-accordion">
                            <LongParagraphs content={value}/>
                            <LongSentences content={value}/>
                            <LongWords content={value}/>
                            <DublicateWords content={value}/>
                            <GammelnavskDictionary content={value}/>
                            <NrkDictionaries content={value}/>
                            <AvløserordDictionary content={value}/>
                            <Begrepskatalog content={value}/>
                            <PersonalData content={value}/>
                            <Lix content={value}/>
                            <WordCount content={value}/>
                        </Accordion>
                    </>
                )}
        </>
    );
}

export default Resultbox;
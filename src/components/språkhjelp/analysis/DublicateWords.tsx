import {Accordion} from "@navikt/ds-react";

function DublicateWords(props: { content: any; }) {
    let value = props.content;
    value = value.replaceAll("Kontakt", "");
    value = value.replaceAll(/\d+(?: \d+)/g, "");
    value = value.toLowerCase();

    // Find dublicate words
    let dublicateWordsList: string | number | boolean | JSX.Element[] | null | undefined = [];
    let dublicateWordsCount = 0;
    if (value.match(/\b(\w{2,5})\s+\1\b/g)) {
        dublicateWordsCount = value.match(/\b(\w{2,5})\s+\1\b/g).length
        // @ts-ignore
        dublicateWordsList = value.match(/\b(\w{2,5})\s+\1\b/g).map((duplicatedword, index) =>
            <li className="språkhjelp-pb-2" key={index}>"{duplicatedword}"</li>
        );
    }
    return (
        <>
            {dublicateWordsCount != 0 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {dublicateWordsCount == 1 ? (<>1 gjentakelse av like
                            ord</>) : (<>{dublicateWordsCount} gjentakelser av like ord</>)}
                    </Accordion.Header>
                    <Accordion.Content className="språkhjelp-remove-accordion-padding-bottom">
                        Like ord som er gjentatt etter hverandre:
                        <ul className="språkhjelp-list-disc språkhjelp-pt-5 språkhjelp-list-inside">
                            {dublicateWordsList}
                        </ul>
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default DublicateWords;
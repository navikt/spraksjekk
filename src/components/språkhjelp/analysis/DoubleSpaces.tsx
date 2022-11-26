import {Accordion, Heading} from "@navikt/ds-react";

function DoubleSpaces(props: { content: any; }) {
    let value = props.content;
    value = value.replaceAll("Kontakt", "");
    value = value.replaceAll(/\d+(?: \d+)/g, "");
    value = value.toLowerCase();

    // Find dublicate words
    let dublicateWordsList: string | number | boolean | JSX.Element[] | null | undefined = [];
    let dublicateWordsCount = 0;
    if (value.match(/ {2,}/g)) {
        dublicateWordsCount = value.match(/ {2,}/g).length

        // @ts-ignore
     /*   dublicateWordsList = value.match(/{2,}/g).map((duplicatedword, index) =>
           <></>/!* <li className="språkhjelp-pb-2" key={index}ßß>{duplicatedword}</li>*!/
        );*/
    }
    return (
        <>
            {dublicateWordsCount != 0 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {dublicateWordsCount == 1 ? (<>1 tilfelle av for mange mellomrom</>) : (<>{dublicateWordsCount} tilfeller av for mange mellomrom</>)}
                    </Accordion.Header>
                    <Accordion.Content className="">
                        <Heading spacing level="3" size="xsmall">
                            Bruk ett mellomrom mellom ord.
                        </Heading>
                        Teksten inneholder {dublicateWordsCount == 1 ? (<>ett tilfelle</>) : (<>{dublicateWordsCount} tilfeller</>)} der det er mer enn ett mellomrom mellom ord.
                        {/*<ul className="språkhjelp-list-disc språkhjelp-pt-5 språkhjelp-list-inside">
                            {dublicateWordsList}
                        </ul>*/}
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default DoubleSpaces;
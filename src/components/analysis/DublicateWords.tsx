import { Accordion } from "@navikt/ds-react";

function DublicateWords(props: { content: any; }) {
    let value = props.content;
    value = value.replaceAll("Kontakt", "");
    value = value.replaceAll(/\d+(?: \d+)/g, "");
    value = value .toLowerCase();

    // Find dublicate words
    let dublicateWordsList: string | number | boolean | JSX.Element[] | null | undefined = [];
    let dublicateWordsCount = 0;
    if (value.match(/\b(\w+)\s+\1\b/g)) {
        dublicateWordsCount = value.match(/\b(\w+)\s+\1\b/g).length
        // @ts-ignore
        dublicateWordsList = value.match(/\b(\w+)\s+\1\b/g).map((duplicatedword, index) =>
            <li key={index} >{duplicatedword}</li>
        );
    }
    return (
        <>
            {dublicateWordsCount != 0 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {dublicateWordsCount == 1 ? (<>1 gjentakelse av like ord</>) : (<>{dublicateWordsCount} gjentakelser av like ord</>)}
                    </Accordion.Header>
                    <Accordion.Content>
                        Gjentakelse av like ord etter hverandre:
                        <ul className="list-disc pt-5 list-inside">
                            {dublicateWordsList}
                        </ul>
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default DublicateWords;
import {Accordion, Heading} from "@navikt/ds-react";

function DoubleSpaces(props: { content: any; }) {
    let value = props.content;
    value = value.replaceAll("Kontakt", "");
    value = value.replaceAll(/\d+(?: \d+)/g, "");
    value = value.toLowerCase();

    // Finn  tilfeller der det er mer en ett mellomrom mellom ord
    let doubleSpacesCount = 0;
    if (value.match(/ {2,}/g)) {
        doubleSpacesCount = value.match(/ {2,}/g).length
    }
    return (
        <>
            {doubleSpacesCount != 0 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {doubleSpacesCount == 1 ? (<>1 tilfelle av for mange mellomrom</>) : (<>{doubleSpacesCount} tilfeller av for mange mellomrom</>)}
                    </Accordion.Header>
                    <Accordion.Content className="">
                        <Heading spacing level="3" size="xsmall">
                            Bruk ett mellomrom mellom ord.
                        </Heading>
                        Det er {doubleSpacesCount == 1 ? (<>ett tilfelle</>) : (<>{doubleSpacesCount} tilfeller</>)} i teksten der det er mer enn ett mellomrom mellom ord.
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default DoubleSpaces;
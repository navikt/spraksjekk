import {Accordion, Heading} from "@navikt/ds-react";

function CommaCheck(props: { content: any; }) {
    let value = props.content;
    value = value.replaceAll("Kontakt", "");
    value = value.replaceAll(/\d+(?: \d+)/g, "");
    value = value.toLowerCase();

    // Finn  tilfeller der det er mer en ett mellomrom mellom ord
    let CommaCheckCount = 0;
    if (value.match(/\b( men)\b/g)) {
        CommaCheckCount = value.match(/\b( men)\b/g).length
    }
    return (
        <>
            {CommaCheckCount != 0 && (
                <Accordion.Item>
                    <Accordion.Header>
                        {CommaCheckCount == 1 ? (<>1 tilfelle av manglende komma</>) : (<>{CommaCheckCount} tilfeller av manglende komma</>)}
                    </Accordion.Header>
                    <Accordion.Content className="">
                        <Heading spacing level="3" size="xsmall">
                            Alltid komma foran "men"
                        </Heading>
                        Det er {CommaCheckCount == 1 ? (<>ett tilfelle</>) : (<>{CommaCheckCount} tilfeller</>)} i teksten der det mangler komma foran "men".
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </>
    );
}

export default CommaCheck;
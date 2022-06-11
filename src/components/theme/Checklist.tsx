import { Accordion, Table, Checkbox } from "@navikt/ds-react";
import { useState } from 'react'

const Checklist = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const data = [
        {
            id: 1,
            name: "Tar du hensyn til leseren?",
            checkpoint: <><li>Begynn med det som er viktigst for brukerne.</li><li>Hvilket problem skal brukerne løse?</li><li>Er alt innhold i teksten relevant for brukerne eller er det informasjon du kan fjerne?</li><li>Vis hvilke steg brukerne må gjøre for å utføre oppgaven. Bruk gjerne nummererte lister eller andre visuelle virkemidler.</li></>,
        },
        {
            id: 2,
            name: "Skriver du for alle?",
            checkpoint: <><li>Skriv korte setninger.</li><li>Skriv setninger som ikke skaper tvetydighet eller tvil.</li><li>Bruk vanlige ord som brukerne forstår.</li><li>Unngå metaforer og forkortelser.</li><li>Bruk hele setninger og unngå å starte med leddsetninger.</li></>,
        },
        {
            id: 3,
            name: "Har du brukt et aktivt og konkret språk?",
            checkpoint: <><li>Skriv direkte til leseren. Skriv du, dere og vi.</li><li>Bruk et aktivt språk. Skriv «vi har behandlet søknaden din» og ikke «søknaden er behandlet».</li><li>Bytt ut ord som slutter på –ing eller –else med verb. Skriv «inntekten din endrer seg» og ikke «endring i inntekt».</li><li>Plasser eiendomspronomen bak substantivet. Skriv «søknaden din» og ikke «din søknad».</li><li>Bruke bestemt form når du skriver substantiver. Skriv «arbeidsgiveren» og ikke «arbeidsgiver».</li></>,
        },
        {
            id: 4,
            name: "Har teksten din en god struktur?",
            checkpoint: <><li>Gir overskriften og mellomtitlene i teksten selvstendig mening?</li><li>Gir overskriften og mellomtitlene i teksten en samlet beskrivelse av hovedpoengene i teksten?</li><li>Oppsummerer innledningen det viktigste i teksten? Har innledningen mer enn 2-3 setninger?</li><li>Er hvert avsnitt mer enn 2 – 3 setninger?</li><li>Har teksten mer enn tre avsnitt før ny mellomtittel?</li><li>Trenger teksten flere mellomtitler?</li><li>Bruker du punktlister for å gjøre hovedpoengene lettere å finne for leseren?</li><li>Unngår du kursiv, understreking og store bokstaver?</li></>,
        },
        {
            id: 5,
            name: "Søkeord og lenker",
            checkpoint: <><li>Har du brukt brukervennlige søkeord i overskrift og mellomtitler?</li><li>Bruk ord som leseren vanligvis bruker, da er det enklere å finne om noen søker etter teksten din i Google eller på selve nettsiden.</li><li>Har du lenker i teksten? Er lenketekstene selvforklarende? Bruk gjerne samme lenketekst som overskriften i teksten du lenker til.</li><li>Skill mellom lenker som er helt nødvendige for at brukerne skal få løst oppgaven de skal gjøre, og andre lenker med relevant informasjon.</li><li>Ikke bruk nedlastbare filer (pdf, word etc.).</li></>,
        },
        {
            id: 6,
            name: "Har du testet teksten din?",
            checkpoint: <><li>Har du lest teksten høyt?</li><li>Har en kollega lest korrektur?</li><li>Har du spurt en bruker eller kollega som ikke kjenner fagområdet om teksten er forståelig?</li></>,
        },
    ];

    const toggleSelectedRow = (value: string) =>
        setSelectedRows((list) =>
            list.includes(value)
                ? list.filter((id) => id !== value)
                : [...list, value]
        );

    return (
        <Accordion.Item>
            <Accordion.Header>
                Sjekkliste
            </Accordion.Header>
            <Accordion.Content>
                <Table zebraStripes size="medium" >
                    <Table.Body>
                        {data.map(
                            ({ id, name, checkpoint }) =>
                                <Table.ExpandableRow key={id} content={<ul className="list-disc list-outside">{checkpoint}</ul>} togglePlacement="right" selected={selectedRows.includes(name)}>
                                    <Table.DataCell>
                                        <Checkbox
                                            size="small"
                                            hideLabel
                                            checked={selectedRows.includes(name)}
                                            onChange={() => toggleSelectedRow(name)}
                                            aria-labelledby="id{name}"
                                        >
                                            {" "}
                                        </Checkbox>
                                    </Table.DataCell>
                                    <Table.HeaderCell scope="row">
                                        <span id="id{fnr}">{name}</span>
                                    </Table.HeaderCell>
                                </Table.ExpandableRow>
                        )}
                    </Table.Body>
                </Table>
            </Accordion.Content>
        </Accordion.Item>
    );
}

export default Checklist;
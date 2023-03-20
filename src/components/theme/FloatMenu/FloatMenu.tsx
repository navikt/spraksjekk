import {BodyLong, Button, Heading, Modal, Textarea, CheckboxGroup, Checkbox, ReadMore} from "@navikt/ds-react";
import {useState} from "react";
import {Link} from "@navikt/ds-react";
import {BubbleMenu} from "@tiptap/react";
import {Lix, Privacy} from "./tools/index";

function FloatMenu(props) {
    let editor = props.editor
    let higlighetdwords = props.higlighetdwords
    let higlighetdwordsModified = higlighetdwords.replaceAll("\n", "%20%20");
    higlighetdwordsModified = higlighetdwordsModified.replaceAll("%20%20%20%20", "%20%20");
    let higlighetdwordsModifiedAppertium = higlighetdwords.replaceAll("\n", "%0A%0A");
    higlighetdwordsModifiedAppertium = higlighetdwordsModifiedAppertium.replaceAll("%0A%0A%0A%0A", "%0A%0A");
    const dictionaryLink = "https://ordbokene.no/bm,nn/search?q=" + higlighetdwords.toLowerCase()
    const ngramLink = "https://api.nb.no/dhlab/nb_ngram/#ngram/query?terms=" + higlighetdwords.toLowerCase() + "&lang=all&case_sens=0&freq=rel&corpus=avis"
    const datanorgeLink = "https://data.norge.no/concepts?q=" + higlighetdwords.toLowerCase()
    const analyzeLink = "https://navikt.github.io/spraksjekk/?q=" + higlighetdwordsModified
    const [open, setOpen] = useState(false);

    const [harSpørsmål, setHarSprørsmål] = useState(0)
    const [harGodtatt, setHarGodtatt] = useState("")
    // @ts-ignore
    const handleChange = (val: any[]) => setHarSprørsmål(val);

    const [harSamtykket, setHarSamtykket] = useState(false)
    const handleChangeSamtykke = (val: any[]) => console.log(val);
    const [state, setState] = useState([]);
    const [translatedText, setTranslatedText] = useState('');

    const [mySnippet, setMySnippet] = useState("")

    const handleChangeSnippet = (event) => {
        setMySnippet(event.target.value);
    }

    function avbryt() {
        setOpen(false)
        setHarGodtatt("")
        setHarSprørsmål(0)
        setState(["samtykke"]);
        setTranslatedText("")
    }

    function fun() {
        event.preventDefault()
        setOpen(true)
        setMySnippet(higlighetdwords)
    }

    function generer() {
        handleTranslate()
        setState(["samtykke"]);
    }

    function closemodal() {
        setOpen((x) => !x)
        setHarGodtatt("")
        setHarSprørsmål(0)
        setTranslatedText("")
    }

    async function handleTranslate() {
        try {
            const response = await fetch("https://www.apertium.org/apy/translate?q=" + higlighetdwordsModifiedAppertium + "&langpair=nob|nn");
            const data = await response.json();
            setTranslatedText(data.responseData.translatedText);
            if (data.responseData) {
                setTranslatedText(data.responseData.translatedText);
                setHarGodtatt("yes")
            } else {
                setTranslatedText("En feil oppstod. Prøv igjen på et senere tidspunkt.");
                setHarGodtatt("yes")
            }
        } catch (error) {
            setTranslatedText("En feil oppstod. Prøv igjen på et senere tidspunkt.");
            setHarGodtatt("yes")
        }
    }


    // @ts-ignore
    return (
        <>
            <BubbleMenu tippyOptions={{
                aria: {
                    content: 'auto',
                    expanded: false,
                },
            }} editor={editor}>
                {!higlighetdwords.match(/[?]+|[!]+|[.]+|[,]+|[:]/g) ? (
                    <>
                        <Link className="navds-button navds-button--secondary navds-button--small navds-label--small"
                              target="_blank" style={{textDecoration: "none"}} href={dictionaryLink}>Ordbøkene</Link>
                        <Link className="navds-button navds-button--secondary navds-button--small navds-label--small"
                              style={{marginLeft: '-1px', textDecoration: "none"}} target="_blank"
                              href={ngramLink}>N-gram</Link>
                        <Link className="navds-button navds-button--secondary navds-button--small navds-label--small"
                              style={{marginLeft: '-1px', textDecoration: "none"}} target="_blank"
                              href={datanorgeLink}>Begrepskatalog</Link>
                    </>
                ) : (<>{higlighetdwords.match(/[?]+|[!]+|[.]/g) && (
                    <>
                        <Link
                            className="navds-button navds-button--secondary navds-button--small navds-label--small språkhjelp-nounderline"
                            style={{textDecoration: "none"}} target="_blank" href={analyzeLink}><Lix
                            content={higlighetdwords}/></Link>
                        <button onClick={() => fun()}
                                className="navds-button navds-button--secondary navds-button--small navds-label--small språkhjelp-nounderline"
                                style={{textDecoration: "none"}}>Oversett
                        </button>
                    </>
                )}</>)}
            </BubbleMenu>

            <Modal
                open={open}
                aria-label="Modal demo"
                onClose={() => closemodal()}
                aria-labelledby="modal-heading"
                style={{minWidth: "300px"}}
            >
                <Modal.Content>
                    {harGodtatt == "" && (
                        <>                    <Heading spacing level="1" size="medium" id="modal-heading">
                            Oversett til nynorsk
                        </Heading>

                            Vi bruker <Link href="https://wiki.apertium.org/wiki/Apertium"
                                            target="_blank">Apertium</Link> til å oversette teksten.
                            <br/><br/>
                            <Textarea maxRows={5} label="Tekst som sendes til Apertium" value={mySnippet}
                                      onChange={handleChangeSnippet}/>
                            <br/>
                            <div className="språkhjelp-mb-4">
                                <Privacy content={mySnippet}/>
                            </div>
                            <CheckboxGroup
                                className="språkhjelp-remove-accordion-padding-bottom"
                                legend="Velg de som passer"
                                onChange={(v) => setState(v)}
                                value={state}
                            >
                                <Checkbox value="ingen-personinfo">Teksten inneholder ingen
                                    personopplysninger</Checkbox>
                                <Checkbox value="samtykke">Jeg godtar at Apertium oversetter teksten</Checkbox>
                            </CheckboxGroup>
                            <br/>
                            <Button className="språkhjelp-mr-2" onClick={() => avbryt()}
                                    variant="tertiary">Avbryt</Button>
                            {state.length != 2 ? (
                                <Button disabled>Oversett</Button>
                            ) : (
                                <Button onClick={() => generer()}>Oversett</Button>
                            )}
                        </>
                    )}

                    {harGodtatt != "" && (
                        <>
                            <Heading spacing level="1" size="medium" id="modal-heading">
                                Nynorsk oversettelse
                            </Heading>
                            <BodyLong style={{whiteSpace: "break-spaces"}}>
                                {translatedText ? (
                                    <>"{translatedText}" - Apertium</>) : (<>En feil oppstod. Prøv igjen på et senere
                                        tidspunkt.</>
                                )}
                            </BodyLong>
                            {/*                            <ReadMore className="språkhjelp-mt-4" header="Vis orginal tekst">
                                {higlighetdwords}
                            </ReadMore>*/}
                            <br/>
                            <Button className="språkhjelp-mr-2" onClick={() => avbryt()} variant="primary">Lukk</Button>
                        </>
                    )}

                </Modal.Content>
            </Modal>
        </>
    );
}

export default FloatMenu;
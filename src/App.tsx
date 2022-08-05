import {useEffect, useState} from 'react';
import {useEditor, EditorContent, BubbleMenu} from '@tiptap/react'
import {
    Header,
    Lix,
    WordCount,
    LongWords,
    LongSentences,
    LongParagraphs,
    DublicateWords,
    ShakeHandsIcon,
    PrivacyIcon,
    ScrollToTop,
    Begrepskatalog,
    Feedback,
    GammelnavskDictionary,
    NrkDictionaries,
    AvløserordDictionary,
    PersonalData,
} from "./components"
import {ContentContainer, Heading, Alert, Grid, Cell, Accordion, Label, Switch, Button} from "@navikt/ds-react";
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import {htmlToText} from "html-to-text";
import {Search} from "@navikt/ds-icons";
import "@navikt/ds-css";
import './App.css'

export default () => {
    const queryParams = new URLSearchParams(location.search);
    let q1 = ""
    let q2 = ""
    let q3 = ""
    const [query, setQuery] = useState("")
    if (queryParams.get('q')) {
        q1 = queryParams.get('q').replaceAll(" Kopier lenke ", "</p><p>");
        q2 = q1.split("\n\n" && "  ").map((el, i) => {
            return `<p>${el}</p>`;
        }).join('')
        useEffect(() => {
                q3 = q1.replaceAll("  ", "</p>");
                let text = htmlToText(q3, {
                    wordwrap: false
                });
                text = text.replaceAll(/\[[^\]]*\]/g, "");
                setValue(text)
        }, []);
    }
    const [value, setValue] = useState(q2)
    const [mobilvisning, setMobilvisning] = useState(false)
    let higlighetdwords = window.getSelection().toString().toLowerCase();
    let higlighetdwordscount = window.getSelection().toString().toLowerCase().split(/\s+/);

    function focusTiptap() {
        if (editor) {
            editor.commands.focus()
        }
    }


    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            })
        ],
        editorProps: {
            attributes: {
                role: 'form',
            },
        },
        content: value,
        autofocus: true,
        onUpdate: ({editor}) => {
            const html = editor.getHTML()
            let text = htmlToText(html, {
                wordwrap: false
            });
            text = text.replaceAll(/\[[^\]]*\]/g, "");
            setValue(text)
        },
    })
    return (
        <main>
            {editor && <BubbleMenu className="bubble-menu" tippyOptions={{duration: 100}} editor={editor}>
                {!higlighetdwords.match(/[?]+|[!]+|[.]+|[,]+|[:]/g) && (
                    <>
                        <Button role="link" variant="secondary" onClick={(e) => {
                            e.preventDefault();
                            window.open('https://ordbokene.no/bm,nn/search?q=' + higlighetdwords, "_blank");
                        }}><Search/> Ordbøkene.no</Button>
                        <Button role="link" style={{marginLeft: '-1px'}} variant="secondary" onClick={(e) => {
                            e.preventDefault();
                            window.open('https://www.nb.no/ngram/?1_1_2_' + higlighetdwords + '_1_1_0_1800%2C2021_2_2_2_12_2', "_blank");
                        }}><Search/> N-gram</Button>
                    </>
                )}
            </BubbleMenu>}
            <Header/>
            <ContentContainer className="my-6">
                <Grid>
                    {mobilvisning == true ? (<Cell xs={12} sm={7} lg={4}>
                        <Heading spacing level="2" size="large">
                            Språkhjelp
                        </Heading>
                        <div className="mobilvisning-container">
                            <Label onClick={() => focusTiptap()} className="mobilvisning-label">Skriv eller lim inn
                                tekst</Label>
                            <Switch aria-hidden="false" onChange={() => setMobilvisning(!mobilvisning)}
                                    checked={mobilvisning}
                                    className="mobilvisning-button" size="medium" position="left">
                                Mobilvisning
                            </Switch>
                        </div>
                        <EditorContent id="tiptapeditor" className="mb-6" editor={editor}/>
                        <div className="pb-2">
                            <ul className="ListRemoveStyling">
                                <li><ShakeHandsIcon/> NAV lagrer ikke teksten.</li>
                                <li><PrivacyIcon/> Ikke legg inn personopplysninger.</li>
                            </ul>
                        </div>
                    </Cell>) : (<Cell xs={12} sm={7} lg={8}>
                        <Heading spacing level="2" size="large">
                            Språkhjelp
                        </Heading>
                        <div className="mobilvisning-container">
                            <Label onClick={() => focusTiptap()} className="mobilvisning-label">Skriv eller lim inn
                                tekst</Label>
                            <Switch aria-hidden="false" onChange={() => setMobilvisning(!mobilvisning)}
                                    checked={mobilvisning}
                                    className="mobilvisning-button" size="medium" position="left">
                                Mobilvisning
                            </Switch>
                        </div>
                        <EditorContent id="tiptapeditor" className="mb-6" editor={editor}/>
                            <div className="pb-2">
                            <ul className="ListRemoveStyling">
                                <li><ShakeHandsIcon/> NAV lagrer ikke teksten.</li>
                                <li><PrivacyIcon/> Ikke legg inn personopplysninger.</li>
                            </ul>
                        </div>
                    </Cell>)}

                    <Cell xs={12} sm={5} lg={4}>
                        <Heading spacing level="2" size="large">
                            Resultater
                        </Heading>
                        {value.length == 0 ? (
                                <Alert variant="info">Legg til tekst for å få opp resultater.</Alert>) :
                            (
                                <>
                                    <Accordion>
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
                        <Feedback/>
                    </Cell>
                </Grid>
            </ContentContainer>
            <ScrollToTop/>
        </main>
    )
}
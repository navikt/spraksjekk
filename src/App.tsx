import {useEffect, useState} from 'react';
import {useEditor, EditorContent} from '@tiptap/react'
import "@navikt/ds-css";
import './App.css'
import {
    Header,
    Lix,
    WordCount,
    LongWords,
    LongSentences,
    LongParagraphs,
    DublicateWords,
    ScrollToTop,
    Begrepskatalog,
    Feedback,
    GammelnavskDictionary,
    NrkDictionaries,
    AvløserordDictionary,
    PersonalData,
    About,
    MyBubbleMenu,
} from "./components"
import {ContentContainer, Heading, Alert, Grid, Cell, Accordion, Label, Switch} from "@navikt/ds-react";
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import {htmlToText} from "html-to-text";

export default () => {
    const queryParams = new URLSearchParams(location.search);
    let q1 = ""
    let q2 = ""
    let q3 = ""
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

    function focusTiptap() {
        if (editor) {
            editor.commands.focus()
        }
    }

    let mobileView = 4
    if (!mobilvisning) {
        mobileView = 8
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
            {/* Meny som vises når ord markeres i editoren */}
            {editor && <MyBubbleMenu higlighetdwords={higlighetdwords} editor={editor} />}
            <Header/>
            <ContentContainer className="my-6">
                <Grid>
                    {/* @ts-ignore */}
                    <Cell xs={12} sm={7} lg={mobileView}>
                        <Heading spacing level="2" size="large">Få øyeblikkelig språkhjelp</Heading>
                        <div className="mobilvisning-container">
                            <Label onClick={() => focusTiptap()} className="mobilvisning-label">Skriv eller lim inn
                                tekst</Label>
                            <Switch aria-hidden="false" onChange={() => setMobilvisning(!mobilvisning)}
                                    checked={mobilvisning}
                                    className="mobilvisning-button" size="medium" position="left">
                                Mobilvisning
                            </Switch>
                        </div>
                        <EditorContent editor={editor} id="tiptapeditor" className="mb-6" />
                        <About />
                    </Cell>
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
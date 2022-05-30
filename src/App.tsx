import {useState} from 'react';
import {useEditor, EditorContent} from '@tiptap/react'
import {
    Header,
    Lix,
    OrdTelling,
    LongWords,
    LongSentences,
    LongParagraphs,
    DublicateWords,
    GammelnavskCheck,
    ShakeHands,
    MenuBar
} from "./components"
import {ContentContainer, Heading, BodyShort, Alert, Grid, Cell, Accordion, Label} from "@navikt/ds-react";
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import {htmlToText} from "html-to-text";
import "@navikt/ds-css";
import './App.css'

export default () => {
    const [value, setValue] = useState("")

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
        content: ``,
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
        <div>
            <Header/>
            <ContentContainer className="my-6">
                <Grid>
                    <Cell xs={12} sm={7} lg={8}>
                        <Heading spacing level="2" size="large">
                            Språksjekk
                        </Heading>
                        <Label onClick={() => focusTiptap()} className="pb-2">Skriv eller lim inn tekst</Label>
                        <EditorContent id="tiptapeditor" className="mb-6" editor={editor}/>
                        <BodyShort className="pb-2">
                            <ShakeHands/>
                            {" "}NAV lagrer ikke teksten.</BodyShort>
                    </Cell>
                    <Cell xs={12} sm={5} lg={4}>
                        <Heading spacing level="2" size="large">
                            Resultater
                        </Heading>
                        {value.length == 0 ? (
                                <Alert variant="info">Du får språksjekk resultatene umiddelbart når du legger til tekst.</Alert>) :
                            (
                                <>
                                    <Accordion className="pb-6">
                                        <LongParagraphs content={value}/>
                                        <LongSentences content={value}/>
                                        <LongWords content={value}/>
                                        <DublicateWords content={value}/>
                                        <GammelnavskCheck content={value}/>
                                        <Lix content={value}/>
                                        <OrdTelling content={value}/>
                                        {/* <Checklist /> */}
                                    </Accordion>
                                </>
                            )}
                    </Cell>
                </Grid>
            </ContentContainer>
        </div>
    )
}
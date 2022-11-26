import {useEffect, useState} from 'react';
import {useEditor, EditorContent} from '@tiptap/react'
import {
    Header,
    ScrollToTop,
    Feedback,
    About,
    FloatMenu,
} from "./components/theme/index"
import {Språkhjelp} from "./components/språkhjelp/index"
import {ContentContainer, Heading, Grid, Cell, Label, Switch} from "@navikt/ds-react";
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import {htmlToText} from "html-to-text";
import "@navikt/ds-css";
import './App.css'

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
                wordwrap: false,
                whitespaceCharacters: "",
            });
            text = text.replaceAll(/\[[^\]]*\]/g, "");
            setValue(text)
        },
    })
    // @ts-ignore
    return (
        <main>
            {editor && <FloatMenu higlighetdwords={higlighetdwords} editor={editor}/>}
            <Header/>
            <ContentContainer className="my-6">
                <Grid>
                    {/* @ts-ignore */}
                    <Cell xs={12} sm={7} lg={mobileView}>
                        <Heading spacing level="2" size="large">Finn ut hvor lett det er å lese teksten din</Heading>
                        <div className="mobilvisning-container">
                            {/* @ts-ignore */}
                            <Label htmlFor="tiptapeditor" onClick={() => focusTiptap()} className="mobilvisning-label">Skriv eller lim inn
                                tekst</Label>
                            <Switch aria-hidden="false" onChange={() => setMobilvisning(!mobilvisning)}
                                    checked={mobilvisning}
                                    className="mobilvisning-button" size="medium" position="left">
                                Mobilvisning
                            </Switch>
                        </div>
                        <EditorContent editor={editor} id="tiptapeditor" className="mb-6"/>
                        <About/>
                    </Cell>
                    <Cell xs={12} sm={5} lg={4}>
                        <Heading spacing level="2" size="large">
                            Resultater
                        </Heading>
                        <Språkhjelp content={value}/>
                        <Feedback/>
                    </Cell>
                </Grid>
            </ContentContainer>
            <ScrollToTop/>
        </main>
    )
}
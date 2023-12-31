import {Cell, Grid, Heading, Label, Switch} from "@navikt/ds-react";
import {EditorContent, useEditor} from "@tiptap/react";
import {About, FloatMenu} from "../components/theme";
import {Språkhjelp} from "../components/språkhjelp";
import {useEffect, useState} from "react";
import {htmlToText} from "html-to-text";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";


function Home() {
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
    let higlighetdwords = window.getSelection().toString();
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
        <>
            {editor && <FloatMenu higlighetdwords={higlighetdwords} editor={editor}/>}
            <Grid>
                {/* @ts-ignore */}
                <Cell xs={12} sm={7} lg={mobileView}>
                    <Heading className="aksel-blue-heading" spacing level="2" size="large">Finn ut hvor lett det er å lese teksten din</Heading>
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
                    <form>
                        <EditorContent aria-label="tekstboks" role="textbox" editor={editor} id="tiptapeditor" className="prose max-w-none" />
                    </form>
                    <About/>
                </Cell>

                <Cell xs={12} sm={5} lg={4}>
                    <aside>
                        <Heading className="aksel-blue-heading" spacing level="2" size="large">
                            Resultater
                        </Heading>
                        <Språkhjelp content={value}/>
                    </aside>
                </Cell>
            </Grid>
        </>
    )
}

export default Home;
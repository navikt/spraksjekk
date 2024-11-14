import { Box, HGrid, Heading, Label, Switch } from "@navikt/ds-react";
import { EditorContent, useEditor } from "@tiptap/react";
import { About, FloatMenu } from "../components/theme";
import { Språkhjelp } from "../components/språkhjelp";
import { useEffect, useState } from "react";
import { htmlToText } from "html-to-text";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

function Home() {
    const queryParams = new URLSearchParams(location.search);
    let q1 = "";
    let q2 = "";
    let q3 = "";
    if (queryParams.get('q')) {
        q1 = queryParams.get('q').replaceAll(" Kopier lenke ", "</p><p>");
        // @ts-ignore
        q2 = q1.split("\n\n" && "  ").map((el, i) => {
            return `<p>${el}</p>`;
        }).join('');
        useEffect(() => {
            q3 = q1.replaceAll("  ", "</p>");
            let text = htmlToText(q3, {
                wordwrap: false
            });
            text = text.replaceAll(/\[[^\]]*\]/g, "");
            setValue(text);
        }, []);
    }
    const [value, setValue] = useState(q2);
    const [mobilvisning, setMobilvisning] = useState(false);
    let higlighetdwords = window.getSelection().toString();
    function focusTiptap() {
        if (editor) {
            editor.commands.focus();
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
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            let text = htmlToText(html, {
                wordwrap: false,
                whitespaceCharacters: "",
            });
            text = text.replaceAll(/\[[^\]]*\]/g, "");
            setValue(text);
        },
    });

    return (
        <>
            {editor && <FloatMenu higlighetdwords={higlighetdwords} editor={editor} />}
            <HGrid className="flex flex-col lg:flex-row">
                <Box className="lg:flex-grow my-5">
                    <Heading className="aksel-blue-heading" spacing level="2" size="large">
                        Finn ut hvor lett det er å lese teksten din
                    </Heading>
                    <div className="pt-5 pb-2 mobilvisning-container">
                        <Label htmlFor="tiptapeditor" onClick={() => focusTiptap()} className="mobilvisning-label">
                            Skriv eller lim inn tekst
                        </Label>
                    </div>
                    <form>
                        <EditorContent aria-label="tekstboks" role="textbox" editor={editor} id="tiptapeditor" className="prose max-w-none" />
                    </form>
                    <About />
                </Box>

                <Box as="aside" className="lg:p-4 mt-4 lg:mt-0 lg:ml-4 lg:w-1/3">
                    <Heading className="aksel-blue-heading" spacing level="2" size="large">
                        Resultater
                    </Heading>
                    <Språkhjelp content={value} />
                </Box>
            </HGrid>
        </>
    );
}

export default Home;
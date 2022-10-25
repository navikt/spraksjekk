import {Search} from "@navikt/ds-icons";
import {Button} from "@navikt/ds-react";
import {BubbleMenu} from "@tiptap/react";

function FloatMenu(props) {
    let higlighetdwords = props.higlighetdwords
    let editor = props.editor
    return (
        <BubbleMenu className="bubble-menu" tippyOptions={{aria: {
                content: 'auto',
                expanded: false,
            },}} editor={editor}>
            {!higlighetdwords.match(/[?]+|[!]+|[.]+|[,]+|[:]/g) && (
                <>
                    <Button role="link" variant="secondary" onClick={(e) => {
                        e.preventDefault();
                        window.open('https://ordbokene.no/bm,nn/search?q=' + higlighetdwords, "_blank");
                    }}><Search/> Ordbøkene.no</Button>
                    <Button role="link" style={{marginLeft: '-1px'}} variant="secondary" onClick={(e) => {
                        e.preventDefault();
                        window.open('https://www.nb.no/ngram/#1_1_2_' + higlighetdwords + '_1_1_0_1800%2C2021_2_2_2_12_2', "_blank");
                    }}><Search/> N-gram</Button>
                </>
            )}
        </BubbleMenu>
    );
}

export default FloatMenu;
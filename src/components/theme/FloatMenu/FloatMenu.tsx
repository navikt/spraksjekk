import {ExternalLink} from "@navikt/ds-icons";
import {Button} from "@navikt/ds-react";
import {BubbleMenu} from "@tiptap/react";

function FloatMenu(props) {
    let higlighetdwords = props.higlighetdwords
    let editor = props.editor
    higlighetdwords = higlighetdwords.replaceAll("\n", "%20%20");
    higlighetdwords = higlighetdwords.replaceAll("%20%20%20%20", "%20%20");
    return (
        <BubbleMenu tippyOptions={{
            aria: {
                content: 'auto',
                expanded: false,
            },
        }} editor={editor}>
            {!higlighetdwords.match(/[?]+|[!]+|[.]+|[,]+|[:]/g) ? (
                <>
                    <Button role="link" size="small" style={{pointerEvents: "none"}} variant="secondary" onClick={(e) => {
                        e.preventDefault();
                        window.open('https://ordbokene.no/bm,nn/search?q=' + higlighetdwords.toLowerCase(), "_blank");
                    }}>Ordbøkene</Button>
                    <Button role="link" size="small" style={{marginLeft: '-1px', pointerEvents: "none"}} variant="secondary" onClick={(e) => {
                        e.preventDefault();
                        window.open('https://api.nb.no/dhlab/nb_ngram/#ngram/query?terms=' + higlighetdwords.toLowerCase() + '&lang=all&case_sens=0&freq=rel&corpus=avis', "_blank");
                    }}>N-gram</Button>
                    <Button role="link" size="small" style={{marginLeft: '-1px', pointerEvents: "none"}} variant="secondary" onClick={(e) => {
                        e.preventDefault();
                        window.open('https://data.norge.no/concepts?q=' + higlighetdwords.toLowerCase(), "_blank");
                    }}>Begrepskatalog</Button>
                </>
            ) : ( <Button role="link" size="small" variant="secondary" onClick={(e) => {
                e.preventDefault();
                window.open('https://navikt.github.io/spraksjekk/?q=' + higlighetdwords, "_blank");
            }}>Analyser <ExternalLink style={{paddingTop : "1px", pointerEvents: "none"}}/>
            </Button>)}
        </BubbleMenu>
    /*https://www.nb.no/ngram/#1_1_2_' + higlighetdwords + '_1_1_0_1800%2C2021_2_2_2_12_2*/
    );
}

export default FloatMenu;
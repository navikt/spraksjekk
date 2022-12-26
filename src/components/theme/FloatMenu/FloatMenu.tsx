import {ExternalLink} from "@navikt/ds-icons";
import {Button} from "@navikt/ds-react";
import {BubbleMenu} from "@tiptap/react";

function FloatMenu(props) {
    let higlighetdwords = props.higlighetdwords
    let editor = props.editor

    const dictionaryLink = () => {
        window.open('https://ordbokene.no/bm,nn/search?q=' + higlighetdwords.toLowerCase(), "_blank");
    }

    const ngramLink = () => {
        window.open('https://api.nb.no/dhlab/nb_ngram/#ngram/query?terms=' + higlighetdwords.toLowerCase() + '&lang=all&case_sens=0&freq=rel&corpus=avis', "_blank");
    }

    const datanorgeLink = () => {
        window.open('https://data.norge.no/concepts?q=' + higlighetdwords.toLowerCase(), "_blank");
    }

    const analyzeLink = () => {
        higlighetdwords = higlighetdwords.replaceAll("\n", "%20%20");
        higlighetdwords = higlighetdwords.replaceAll("%20%20%20%20", "%20%20");
        window.open('https://navikt.github.io/spraksjekk/?q=' + higlighetdwords, "_blank");
    }
    return (
        <BubbleMenu tippyOptions={{
            aria: {
                content: 'auto',
                expanded: false,
            },
        }} editor={editor}>
            {!higlighetdwords.match(/[?]+|[!]+|[.]+|[,]+|[:]/g) ? (
                <>
                    <Button role="link" size="small" variant="secondary" onClick={() => {
                        dictionaryLink()
                    }}>Ordbøkene</Button>
                    <Button role="link" size="small" style={{marginLeft: '-1px'}} variant="secondary" onClick={() => {
                        ngramLink()
                    }}>N-gram</Button>
                    <Button role="link" size="small" style={{marginLeft: '-1px'}} variant="secondary" onClick={() => {
                        datanorgeLink()
                    }}>Begrepskatalog</Button>
                </>
            ) : (<Button role="link" size="small" variant="secondary" onClick={() => {
                analyzeLink()
            }}>Analyser <ExternalLink style={{paddingTop: "1px"}}/>
            </Button>)}
        </BubbleMenu>
    );
}

export default FloatMenu;
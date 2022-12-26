import {ExternalLink} from "@navikt/ds-icons";
import {Button, Link} from "@navikt/ds-react";
import {BubbleMenu} from "@tiptap/react";

function FloatMenu(props) {
    let higlighetdwords = props.higlighetdwords
    let higlighetdwordsModified = higlighetdwords.replaceAll("\n", "%20%20");
    higlighetdwordsModified = higlighetdwordsModified.replaceAll("%20%20%20%20", "%20%20");

    let editor = props.editor

    const dictionaryLink = "https://ordbokene.no/bm,nn/search?q=" + higlighetdwords.toLowerCase()
    const ngramLink = "https://api.nb.no/dhlab/nb_ngram/#ngram/query?terms=" + higlighetdwords.toLowerCase() + "&lang=all&case_sens=0&freq=rel&corpus=avis"
    const datanorgeLink = "https://data.norge.no/concepts?q=" + higlighetdwords.toLowerCase()
    const analyzeLink = "https://navikt.github.io/spraksjekk/?q=2" + higlighetdwordsModified

    return (
        <BubbleMenu tippyOptions={{
            aria: {
                content: 'auto',
                expanded: false,
            },
        }} editor={editor}>
            {!higlighetdwords.match(/[?]+|[!]+|[.]+|[,]+|[:]/g) ? (
                <>
                    <Link className="navds-button navds-button--secondary navds-button--small" target="_blank" href={dictionaryLink}>Ordbøkene.no</Link>
                    <Link className="navds-button navds-button--secondary navds-button--small" style={{marginLeft: '-1px'}} target="_blank" href={ngramLink}>N-gram</Link>
                    <Link className="navds-button navds-button--secondary navds-button--small" style={{marginLeft: '-1px'}} target="_blank" href={datanorgeLink}>Begrepskatalog</Link>
                </>
            ) : (<Link className="navds-button navds-button--secondary navds-button--small" target="_blank" href={analyzeLink}>Analyser  <ExternalLink style={{paddingTop: "1px"}}/></Link>)}
        </BubbleMenu>
    );
}

export default FloatMenu;
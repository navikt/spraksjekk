import {ExternalLink} from "@navikt/ds-icons";
import {Link} from "@navikt/ds-react";
import {BubbleMenu} from "@tiptap/react";
import {Lix} from "./lix/index";

function FloatMenu(props) {
    let editor = props.editor
    let higlighetdwords = props.higlighetdwords
    let higlighetdwordsModified = higlighetdwords.replaceAll("\n", "%20%20");
    higlighetdwordsModified = higlighetdwordsModified.replaceAll("%20%20%20%20", "%20%20");
    const dictionaryLink = "https://ordbokene.no/bm,nn/search?q=" + higlighetdwords.toLowerCase()
    const ngramLink = "https://api.nb.no/dhlab/nb_ngram/#ngram/query?terms=" + higlighetdwords.toLowerCase() + "&lang=all&case_sens=0&freq=rel&corpus=avis"
    const datanorgeLink = "https://data.norge.no/concepts?q=" + higlighetdwords.toLowerCase()
    const analyzeLink = "https://navikt.github.io/spraksjekk/?q=" + higlighetdwordsModified

    return (
        <BubbleMenu tippyOptions={{
            aria: {
                content: 'auto',
                expanded: false,
            },
        }} editor={editor}>
            {!higlighetdwords.match(/[?]+|[!]+|[.]+|[,]+|[:]/g) ? (
                <>
                    <Link className="navds-button navds-button--secondary navds-button--small navds-label--small" target="_blank" style={{textDecoration : "none"}} href={dictionaryLink}>Ordbøkene.no</Link>
                    <Link className="navds-button navds-button--secondary navds-button--small navds-label--small" style={{marginLeft: '-1px', textDecoration : "none"}} target="_blank" href={ngramLink}>N-gram</Link>
                    <Link className="navds-button navds-button--secondary navds-button--small navds-label--small" style={{marginLeft: '-1px', textDecoration : "none"}} target="_blank" href={datanorgeLink}>Begrepskatalog</Link>
                </>
            ) : (<>{higlighetdwords.match(/[?]+|[!]+|[.]/g) && (
                <>
                <Link className="navds-button navds-button--secondary navds-button--small navds-label--small språkhjelp-nounderline" style={{textDecoration : "none"}} target="_blank" href={analyzeLink}><Lix content={higlighetdwords}/></Link>
                {/*<Link className="navds-button navds-button--secondary navds-button--small navds-label--small språkhjelp-nounderline" style={{textDecoration : "none"}} target="_blank" href={analyzeLink}>Analyser  <ExternalLink style={{paddingTop: "1px"}}/></Link>*/}
                </>
            )}</>)}
        </BubbleMenu>
    );
}

export default FloatMenu;
import React, {useState, useMemo} from "react";
import {Button, Heading, HelpText} from "@navikt/ds-react";
import {TagCloud} from 'react-tagcloud'

function WordCloud(props: { content: any; }) {
    const [words, setWords] = useState("");

    const generateWordCloud = () => {
        setWords("");
        let value = props.content.toLowerCase();
        value = value.replace(/[^\w\sÆØÅæøå\/\\é-]/g, '');
        const content = value.split(" ");
        const frequency = {};

        for (const word of content) {
            if (frequency[word]) {
                frequency[word] += 1;
            } else {
                frequency[word] = 1;
            }
        }

        let words: { value: string; count: number }[] = Object.entries(frequency).map(([value, count]: [string, number]) => ({
            value,
            count
        }));
        words = words.filter(item => !Object.values(item).includes(1));
        /*&& !Object.values(item).includes(2)*/

        words = words.filter(word => word.value.length >= 2)
        // @ts-ignore
        setWords(words);
    };

    const options = useMemo(() => {
        return {
            luminosity: 'dark',
            hue: 'monochrome',
        }
    }, []);

    return (
        <div className="språkhjelp-pt-6">
            <Button onClick={() => generateWordCloud()} variant="secondary">Lag ordsky</Button>
            {words && (
                <>
                    <hr className="språkhjelp-mb-6"/>
                    <Heading spacing level="3" style={{display : "flex"}} size="xsmall" className="språkhjelp-pb-2">
                        Ordsky <HelpText style={{marginLeft : "5px"}} title="Hvilke ord vises?">
                        Ord som går igjen to eller flere ganger vises i ordskyen
                    </HelpText>
                    </Heading>
                    <TagCloud tags={words} minSize={12} colorOptions={options} className="språkhjelp-pb-2"
                              style={{textAlign: 'center'}} maxSize={52} disableRandomColor={false}/>
                    {words.length < 1 && (
                        <>
                            <p aria-live="polite" style={{marginTop: "-1em"}}>
                                Teksten er for kort til å lage en ordsky. Legg til flere ord og prøv på nytt.
                            </p>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default WordCloud;

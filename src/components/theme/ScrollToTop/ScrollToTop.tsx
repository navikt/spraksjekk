import {useEffect, useState} from "react";
import './ScrollToTop.css'
import {Button} from "@navikt/ds-react";

function ScrollToTop() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // The back-to-top button is hidden at the beginning
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {showButton && (
                <Button onClick={scrollToTop} id="språkhjelp-back-to-top">
                    &#8679; Til toppen
                </Button>
            )}
        </>
    );
}

export default ScrollToTop;
import {useEffect, useState} from "react";

function ScrollToTop() {
    // The back-to-top button is hidden at the beginning
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);

    // This function will scroll the window to the top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
        });
    };

    return (
        <>
            {showButton && (
                <button aria-hidden="true" onClick={scrollToTop} className="back-to-top">
                    &#8679; Til toppen
                </button>
            )}
        </>
    );
}

export default ScrollToTop;
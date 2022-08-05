import {useEffect, useState} from "react";

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
                <button onClick={scrollToTop} className="back-to-top">
                    &#8679; Til toppen
                </button>
            )}
        </>
    );
}

export default ScrollToTop;
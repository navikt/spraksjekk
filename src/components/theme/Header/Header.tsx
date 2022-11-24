import {ContentContainer, Heading, Link} from "@navikt/ds-react";
import './Header.css'

function Header() {
    return (
        <nav>
            <header id="språkhjelp-header">
                <ContentContainer id="språkhjelp-headerContainer">
                    <Heading size="xsmall" level="1">
                        <Link id="språkhjelp-headingLink" href=".">
                            Klarspråkhjelpen
                        </Link>
                    </Heading>
                </ContentContainer>
            </header>
        </nav>
    );
}

export default Header;
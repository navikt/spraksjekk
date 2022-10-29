import { ContentContainer, Heading, Link } from "@navikt/ds-react";
import './Header.css'

function Header() {
    return (
        <header id="språkhjelp-header">
        <ContentContainer id="språkhjelp-headerContainer">
          <Heading size="xsmall" level="1">
            <Link id="språkhjelp-headingLink" href="..">
               NAV Språkhjelp
            </Link>
          </Heading>
        </ContentContainer>
      </header>
    );
}

export default Header;
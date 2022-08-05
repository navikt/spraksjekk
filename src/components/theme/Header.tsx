import { ContentContainer, Heading, Link } from "@navikt/ds-react";

function Header() {
    return (
        <header id="header">
        <ContentContainer className="headerContainer">
          <Heading size="xsmall" level="1">
            <Link id="headingLink" href=".">
               NAV Språkhjelp
            </Link>
          </Heading>
        </ContentContainer>
      </header>
    );
}

export default Header;
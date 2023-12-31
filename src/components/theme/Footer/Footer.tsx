"use client";
import { BodyShort, Heading, Link } from "@navikt/ds-react";

const Footer = () => {
  return (
    <div
      className="mt-24 w-full border-t-2"
      style={{ borderColor: "rgb(34, 211, 238)", backgroundColor: "#003453"}}
    >
      <footer
        id="aksel-footer"
        data-theme="dark"
        className="pl-3 flex pt-3 z-10 items-center max-w-[101ch] m-auto justify-between toc-ignore text-text-on-inverted bg-deepblue-800 relative flex justify-center"
      >
        <div className="relative z-10 mx-auto grid w-full max-w-screen-2xl gap-12 px-4 pb-16 pt-12 md:grid-cols-2 md:px-6 lg:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          <LogoBlock />
          <Snarveier />
          <SideLenker />
          <Kontakt />
        </div>
      </footer>
    </div>
  );
};

function LogoBlock() {
  return (
    <div>
      <span className="mt-4 text-2xl whitespace-nowrap">Klarspråkshjelpen</span>
      <p className="mt-3 leading-normal">
        &copy; {new Date().getFullYear()} NAV
      </p>
      <p className="leading-normal">
          Arbeids- og velferdsetaten
      </p>
    </div>
  );
}

function Snarveier() {
  return (
    <div>
      <Heading level="2" size="xsmall">
        Snarveier
      </Heading>
      <BodyShort as="ul" className="mt-3 grid gap-3">
        <FooterLink href="https://github.com/navikt/spraksjekk#readme">Om Klarspråkshjelpen</FooterLink>
        <FooterLink href="https://github.com/navikt/spraksjekk/issues/new">Innspill eller spørsmål</FooterLink>
      </BodyShort>
    </div>
  );
}

function SideLenker() {
  return (
    <div>
      <Heading level="2" size="xsmall">
        Erklæringer
      </Heading>
      <BodyShort as="ul" className="mt-3 grid gap-3">
        <FooterLink href="/#/personvern">Personvern</FooterLink>
        <FooterLink href="/#/tilgjengelighet">Tilgjengelighet</FooterLink>
      </BodyShort>
    </div>
  );
}

function Kontakt() {
  return (
    <div>
      <Heading level="2" size="xsmall">
        Åpen kildekode
      </Heading>
      <BodyShort as="ul" className="mt-3 grid gap-3">
        <FooterLink href="https://github.com/navikt/spraksjekk#readme">
          <svg
            className="align-top"
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.9702 0C4.45694 0 0 4.4898 0 10.0443C0 14.4843 2.85571 18.2427 6.81735 19.5729C7.31265 19.6729 7.49408 19.3567 7.49408 19.0908C7.49408 18.858 7.47775 18.0598 7.47775 17.2282C4.70429 17.8269 4.12673 16.0308 4.12673 16.0308C3.68102 14.8667 3.02061 14.5675 3.02061 14.5675C2.11286 13.9522 3.08673 13.9522 3.08673 13.9522C4.09367 14.0188 4.62204 14.9833 4.62204 14.9833C5.51327 16.5131 6.94939 16.0808 7.52714 15.8147C7.60959 15.1661 7.87388 14.7171 8.15449 14.4678C5.94245 14.2349 3.6151 13.3702 3.6151 9.51204C3.6151 8.41449 4.01102 7.51653 4.63837 6.81816C4.53939 6.56878 4.19265 5.53755 4.73755 4.15735C4.73755 4.15735 5.57939 3.89122 7.47755 5.18837C8.29022 4.9685 9.12832 4.85666 9.9702 4.85571C10.812 4.85571 11.6702 4.97224 12.4627 5.18837C14.361 3.89122 15.2029 4.15735 15.2029 4.15735C15.7478 5.53755 15.4008 6.56878 15.3018 6.81816C15.9457 7.51653 16.3253 8.41449 16.3253 9.51204C16.3253 13.3702 13.998 14.2182 11.7694 14.4678C12.1327 14.7837 12.4461 15.3822 12.4461 16.3302C12.4461 17.6771 12.4298 18.7582 12.4298 19.0906C12.4298 19.3567 12.6114 19.6729 13.1065 19.5731C17.0682 18.2424 19.9239 14.4843 19.9239 10.0443C19.9402 4.4898 15.4669 0 9.9702 0Z"
              fill="currentColor"
            ></path>
          </svg>
          Github
        </FooterLink>
      </BodyShort>
    </div>
  );
}

// @ts-ignore
function FooterLink({ children, href }) {
  return (
    <li>
      <Link
        target="_blank"
        className="text-text-on-inverted focus:shadow-focus focus:text-text-default flex w-fit items-center gap-1 underline hover:no-underline focus:bg-blue-200 focus:shadow-blue-200"
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}

export default Footer;

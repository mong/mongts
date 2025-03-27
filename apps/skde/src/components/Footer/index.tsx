import Image from "next/image";
import { imgLoader } from "qmongjs";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Stack, Container, Box } from "@mui/material";
import { ArrowLink } from "qmongjs/src/components/ArrowLink";
import { Breakpoint } from "@mui/material/styles";

const StyledLink = styled(Link)(() => ({
  color: "#c4dbf3",
  textDecoration: "underline",
}));

type FooterProps = {
  page:
    | "behandlingskvalitet"
    | "helseatlas"
    | "sykehusprofil"
    | "pasientstrømmer";
  maxWidth?: false | Breakpoint;
  className?: string;
};

/**
 * Footer component that renders the footer of the page.
 * @param page - The current page.
 * @param maxWidth - The maximum width of the footer.
 * @param className - The class name of the footer.
 */
export const Footer = ({
  page,
  maxWidth = false,
  className = "footer",
}: FooterProps) => {
  const kvalitet = ["behandlingskvalitet", "sykehusprofil"].includes(page);
  const helseatlas = page === "helseatlas";

  // Logo components
  const skdeLogo = (
    <Link href={"https://www.skde.no/"}>
      <Image
        className="footer-logo"
        id="skde-footer-logo"
        loader={imgLoader}
        src={"/img/logos/logo-skde-neg.svg"}
        alt="SKDE-logo"
        width={129}
        height={52}
      />
    </Link>
  );

  const helseFordeLogo = (
    <Link href="https://helse-forde.no/" title="Link til Helse Førde">
      <Image
        loader={imgLoader}
        src={`/helseatlas/img/logos/helse-forde-hvit.svg`}
        height={52}
        width={234}
        alt="Helse Førde logo"
      />
    </Link>
  );

  const nsmLogo = (
    <Link href={"https://www.kvalitetsregistre.no/"}>
      <Box sx={{ width: "min(467px, 85vw)", height: 52, position: "relative" }}>
        <Image
          className="footer-logo"
          id="nsm-footer-logo"
          loader={imgLoader}
          src={"/img/logos/nsm-hvit.svg"}
          alt="NSM-logo"
          layout="fill"
        />
      </Box>
    </Link>
  );

  const helseVestLogo = (
    <Link href="https://helse-vest.no/" title="Link til Helse Vest">
      <Image
        loader={imgLoader}
        src={`/helseatlas/img/logos/helse-vest-hvit.svg`}
        height={52}
        width={234}
        alt="Helse Vest logo"
      />
    </Link>
  );

  // Logo grids
  const atlasLogoGrid = (
    <>
      <Grid>{skdeLogo}</Grid>
      <Grid>{helseFordeLogo}</Grid>
      <Grid>{helseVestLogo}</Grid>
    </>
  );

  const kvalitetLogoGrid = (
    <>
      <Grid>{skdeLogo}</Grid>
      <Grid>{nsmLogo}</Grid>
    </>
  );

  return (
    <Grid
      container
      sx={{ color: "white", marginTop: "20px", fontSize: "1rem" }}
    >
      <Box
        sx={{ backgroundColor: "#333", width: "100%" }}
        className={className}
      >
        <Container
          maxWidth={maxWidth}
          disableGutters={true}
          sx={{
            a: {
              color: "inherit",
              textDecoration: "none",
            },
          }}
        >
          <Grid size={{ xs: 12 }} container paddingTop={2} paddingBottom={4}>
            <Grid size={{ xs: 12, sm: 6 }} marginBottom={2} marginTop={2}>
              <Stack spacing={3}>
                <h4>OM NETTSTEDET</h4>
                <ArrowLink
                  href={"https://www.skde.no/om-skde/personvern/"}
                  text="Personvern"
                  textVariant="body2"
                />
                <ArrowLink
                  href={"https://www.skde.no/om-skde/informasjonskapsler/"}
                  text="Informasjonskapsler"
                  textVariant="body2"
                />
                <ArrowLink
                  href={
                    "https://uustatus.no/nb/erklaringer/publisert/589a8d23-4993-446e-b7eb-ef310bfe1dd7"
                  }
                  text="Tilgjengelighetserklæring"
                  textVariant="body2"
                  externalLink={true}
                />
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} marginTop={2}>
              <Stack spacing={3}>
                <h4>KONTAKT</h4>
                <ArrowLink
                  href={"https://www.skde.no/om-skde/kontaktinformasjon/"}
                  text="Kontakt SKDE"
                  textVariant="body2"
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{ backgroundColor: "#1A1A1A", width: "100%" }}
        className={className}
      >
        <Container maxWidth={maxWidth} disableGutters={true}>
          <Grid
            size={{ xs: 12 }}
            container
            style={{ background: "#1A1A1A" }}
            paddingBottom={10}
            rowGap={4}
          >
            <Grid
              container
              display="flex"
              size={{ xs: 12 }}
              alignItems="center"
              paddingTop="3rem"
              gap={1}
              justifyContent="space-between"
            >
              {helseatlas ? (
                atlasLogoGrid
              ) : kvalitet ? (
                kvalitetLogoGrid
              ) : (
                <Grid>{skdeLogo}</Grid>
              )}
            </Grid>

            <Grid size={{ xs: 12 }}>
              Senter for klinisk dokumentasjon og evaluering (SKDE) er en enhet
              i Helse Nord.
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack>
                <b>TELEFON</b>
                <StyledLink href={"tel:77755800"}>77 75 58 00</StyledLink>
                <br />
                <b>EPOST</b>
                <StyledLink href={"mailto:postmottak@helse-nord.no"}>
                  postmottak@helse-nord.no
                </StyledLink>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack>
                <b>BESØKSADRESSE</b>
                Sykehusvegen 23 <br />
                9019 TROMSØ
                <StyledLink href={"https://maps.app.goo.gl/ohLzsYb8v6YvEDfL9"}>
                  Vis kart
                </StyledLink>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Grid>
                <Stack>
                  <b>ORGANISASJONSNUMMER</b>
                  883658752
                </Stack>
              </Grid>
              <Grid paddingTop="3.5rem">
                <Link href={"https://www.helse-nord.no/"}>
                  <Image
                    className="footer-logo"
                    id="helse-nord-logo"
                    loader={imgLoader}
                    src={"/img/logos/logo-helse-nord-neg.svg"}
                    alt="Helse Nord logo"
                    width={220}
                    height={52}
                  />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Grid>
  );
};

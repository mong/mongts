import { Box, Container, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { type Breakpoint, styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { imgLoader } from "qmongjs";
import { ArrowLink } from "../ArrowLink";

const StyledLink = styled(Link)(() => ({
  color: "#c4dbf3",
  textDecoration: "underline",
}));

type FooterProps = {
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
  maxWidth = false,
  className = "footer",
}: FooterProps) => {
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
                  href={"https://www.skde.no/personvern/"}
                  text="Personvern"
                  textVariant="body2"
                />
                <ArrowLink
                  href={"https://www.skde.no/informasjonskapsler/"}
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
                  href={"https://www.skde.no/alt-om-oss/kontakt-skde/"}
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
              <Grid>{skdeLogo}</Grid>
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
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Grid>
  );
};

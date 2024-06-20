import Image from "next/image";
import { imgLoader } from "qmongjs";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/material";
import { ArrowLink } from "../ArrowLink";

const FooterWrapper = styled(Paper)(() => ({
  marginTop: 20,
  color: "white",
}));

const FooterGridTop = styled(Grid)(() => ({
  justifyContent: "space-around",
  background: "#333333",
}));

const FooterGridBottom = styled(Grid)(() => ({
  justifyContent: "space-around",
  background: "#1A1A1A",
}));

const StyledLink = styled(Link)(() => ({
  color: "#c4dbf3",
  textDecoration: "underline",
}));

export type FooterProps = {
  page: "behandlingskvalitet" | "helseatlas" | "sykehusprofil";
};

export const Footer = (props: FooterProps) => {
  const { page } = props;

  const leftMargin = 0;
  const topMargin = 2;

  return (
    <FooterWrapper>
      <FooterGridTop
        container
        columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
        className="footer"
        marginTop={0}
        marginBottom={0}
        spacing={4}
      >
        <Grid
          item
          xs={4}
          sm={8}
          md={3}
          lg={3}
          marginTop={topMargin}
          marginLeft={leftMargin}
          marginBottom={2}
        >
          <Stack spacing={3}>
            <h4>OM NETTSTEDET</h4>
            <ArrowLink
              href={"https://www.skde.no/om-skde/personvern/"}
              text="Personvern"
            />
            <ArrowLink
              href={"https://www.skde.no/om-skde/informasjonskapsler/"}
              text="Informasjonskapsler"
            />
            <ArrowLink
              href={
                "https://uustatus.no/nb/erklaringer/publisert/589a8d23-4993-446e-b7eb-ef310bfe1dd7"
              }
              text="Tilgjengelighetserklæring"
              diagonalArrow={true}
            />
          </Stack>
        </Grid>

        <Grid
          item
          xs={4}
          sm={8}
          md={3}
          lg={3}
          marginTop={topMargin}
          marginLeft={leftMargin}
        >
          <Stack spacing={3}>
            <h4>KONTAKT</h4>
            <ArrowLink
              href={"https://www.skde.no/om-skde/kontaktinformasjon/"}
              text="Kontakt SKDE"
              diagonalArrow={false}
              button={false}
            />
          </Stack>
        </Grid>

        <Grid item xs={0} sm={0} md={3} lg={3}></Grid>
        <Grid item xs={0} sm={0} md={3} lg={3}></Grid>
        <Grid item xs={4} sm={8} md={12} lg={12}></Grid>
      </FooterGridTop>

      <FooterGridBottom
        container
        columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
        className="footer"
        marginTop={0}
        spacing={4}
      >
        <Grid item xs={4} sm={8} md={12} lg={12}>
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
        </Grid>

        <Grid item xs={4} sm={8} md={12} lg={12}>
          Senter for klinisk dokumentasjon og evaluering (SKDE) er en enhet i
          Helse Nord.
        </Grid>

        <Grid item xs={4} sm={4} md={4} lg={4}>
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

        <Grid item xs={4} sm={4} md={4} lg={4}>
          <Stack>
            <b>BESØKSADRESSE</b>
            <text>Sykehusvegen 23</text>
            <text> 9019 TROMSØ</text>

            <StyledLink href={"https://maps.app.goo.gl/ohLzsYb8v6YvEDfL9"}>
              Vis kart
            </StyledLink>
          </Stack>
        </Grid>

        <Grid item xs={4} sm={4} md={4} lg={4}>
          <Stack>
            <b>ORGANISASJONSNUMMER</b>
            <text>990803765{"\n"}</text>
            <Box marginTop={6}>
              <Link href={"https://www.helse-nord.no/"}>
                <Image
                  className="footer-logo"
                  id="helse-nord-logo"
                  loader={imgLoader}
                  src={"/img/logos/logo-helse-nord-neg.svg"}
                  alt="Helse Nord logo"
                  width={220}
                  height={76}
                />
              </Link>
            </Box>
          </Stack>
        </Grid>
        {page === "helseatlas" ? (
          <>
            <Grid item xs={4} sm={4} md={8} lg={8}>
              <Link href="https://helse-forde.no/" title="Link til Helse Førde">
                <Image
                  loader={imgLoader}
                  src={`/helseatlas/img/logos/helse-forde-hvit.svg`}
                  height={52}
                  width={(180 * 52) / 40}
                  alt="Helse Førde logo"
                />
              </Link>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <Link href="https://helse-vest.no/" title="Link til Helse Vest">
                <Image
                  loader={imgLoader}
                  src={`/helseatlas/img/logos/helse-vest-hvit.svg`}
                  height={52}
                  width={(180 * 52) / 40}
                  alt="Helse Vest logo"
                />
              </Link>
            </Grid>
          </>
        ) : null}
        <Grid item xs={4} sm={4} md={0} lg={0}></Grid>
      </FooterGridBottom>
    </FooterWrapper>
  );
};

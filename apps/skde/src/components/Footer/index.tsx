import Image from "next/image";
import { imgLoader } from "qmongjs";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { Stack } from "@mui/material";
import { ArrowLink } from "qmongjs/src/components/ArrowLink";

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
};

export const Footer = ({ page }: FooterProps) => {

  const kvalitet = ["behandlingskvalitet", "sykehusprofil"].includes(page);
  const helseatlas = page === "helseatlas";

  return (
    <Grid container style={{ color: "white", marginTop: 20 }}>
      <Grid
        xs={12}
        container
        style={{ background: "#333" }}
        className="footer"
        marginTop={0}
        marginLeft={{ md: 0 }}
        paddingTop={2}
        paddingBottom={4}
        spacing={4}
      >
        <Grid xs={12} md={6} marginBottom={2} marginTop={2}>
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
              externalLink={true}
            />
          </Stack>
        </Grid>

        <Grid xs={12} md={6} marginTop={2}>
          <Stack spacing={3}>
            <h4>KONTAKT</h4>
            <ArrowLink
              href={"https://www.skde.no/om-skde/kontaktinformasjon/"}
              text="Kontakt SKDE"
            />
          </Stack>
        </Grid>
      </Grid>

      <Grid
        container
        className="footer"
        style={{ background: "#1A1A1A" }}
        marginTop={0}
        paddingBottom={10}
        spacing={4}
        sx={{ overflow: "clip" }}
      >
        <Grid container xs={12} alignItems="center">
          <Grid container
            display="flex"
            justifyContent={helseatlas ? "space-around" : "flex-start"}
            spacing={4}
            xs={12}
            lg={kvalitet ? 6 : 12}
            alignItems="center">
            <Grid>
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
            <Grid>
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
            </Grid>
            {helseatlas && (
              <>
                <Grid>
                  <Link href="https://helse-forde.no/" title="Link til Helse Førde">
                    <Image
                      loader={imgLoader}
                      src={`/helseatlas/img/logos/helse-forde-hvit.svg`}
                      height={52}
                      width={234}
                      alt="Helse Førde logo"
                    />
                  </Link>
                </Grid>
                <Grid>
                  <Link href="https://helse-vest.no/" title="Link til Helse Vest">
                    <Image
                      loader={imgLoader}
                      src={`/helseatlas/img/logos/helse-vest-hvit.svg`}
                      height={52}
                      width={234}
                      alt="Helse Vest logo"
                    />
                  </Link>
                </Grid>
              </>)}
          </Grid>
          {kvalitet && (
            <Grid xs={6}>
              <Link href={"https://www.kvalitetsregistre.no/"} >
                <Image
                  className="footer-logo"
                  id="nsm-footer-logo"
                  loader={imgLoader}
                  src={"/img/logos/nsm-hvit.svg"}
                  alt="NSM-logo"
                  width={467}
                  height={52}
                />
              </Link >
            </Grid>)}
        </Grid>

        <Grid xs={12}>
          Senter for klinisk dokumentasjon og evaluering (SKDE) er en enhet i
          Helse Nord.
        </Grid>

        <Grid xs={12} sm={6} md={4}>
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

        <Grid xs={12} sm={6} md={4}>
          <Stack>
            <b>BESØKSADRESSE</b>
            <text>Sykehusvegen 23</text>
            <text>9019 TROMSØ</text>

            <StyledLink href={"https://maps.app.goo.gl/ohLzsYb8v6YvEDfL9"}>
              Vis kart
            </StyledLink>
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <Stack>
            <b>ORGANISASJONSNUMMER</b>
            <text>990803765</text>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

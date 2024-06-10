import Image from "next/image";
import { imgLoader } from "qmongjs";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { ArrowForward, Call, ContactSupport, Email } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/material";

const FooterWrapper = styled(Paper)(() => ({
  marginTop: "calc(20vh)",
  color: "white",
}));

const FooterGridTop = styled(Grid)(() => ({
  justifyContent: "space-around",
  backgroundColor: "#333333",
}));

const FooterGridBottom = styled(Grid)(() => ({
  justifyContent: "space-around",
  backgroundColor: "#1A1A1A",
}));

const FooterItem = styled(Grid)(({ theme }) => ({
  textAlign: "center",
  "& .footer-logo": {
    verticalAlign: "middle",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const FooterListItemIcon = styled(ListItemIcon)(() => ({
  color: "white",
}));

const FooterListItemText = styled(ListItemText)(() => ({
  lineHeight: 1,
  margin: 0,
}));

export const FooterV2 = () => {
  return (
    <FooterWrapper>
      <FooterGridTop
        container
        columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
        className="footer"
      >
        <Grid item xs={4} sm={8} md={3} lg={3}>
          <Stack>
            <h4>OM NETTSTEDET</h4>
            <Link href={"/"}>Personvern</Link>
            <Link href={"/"}>Informasjonskapsler</Link>
            <Link href={"/"}>Tilgjengelighetserklæring</Link>
          </Stack>
        </Grid>

        <Grid item xs={4} sm={8} md={3} lg={3}>
          <Stack>
            <h4>KONTAKT</h4>
            <Link href={"/"}>Kontakt SKDE</Link>
          </Stack>
        </Grid>

        <Grid item xs={0} sm={0} md={3} lg={3}></Grid>
        <Grid item xs={0} sm={0} md={3} lg={3}></Grid>
      </FooterGridTop>

      <FooterGridBottom
        container
        columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
        className="footer"
      >
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <Image
            className="footer-logo"
            id="skde-footer-logo"
            loader={imgLoader}
            src={"/img/logos/SKDE_hvit_lys.png"}
            alt="SKDE logo"
            width={99}
            height={40}
          />
        </Grid>
        <Grid item xs={2} sm={6} md={10} lg={10}></Grid>
        <Grid item xs={4} sm={8} md={12} lg={12}>
          Senter for klinisk dokumentasjon og evaluering (SKDE) er en enhet i
          Helse Nord.
        </Grid>

        <Grid item xs={4} sm={4} md={3} lg={3}>
          <Stack>
            <h4>TELEFON</h4>
            <Link href={"/"}>77 75 58 00</Link>
            <h4>EPOST</h4>
            <Link href={"/"}>postmottak@helse-nord.no</Link>
          </Stack>
        </Grid>

        <Grid item xs={4} sm={4} md={3} lg={3}>
          <Stack>
            <h4>BESØKSADRESSE</h4>
            Sykehusvegen 23 9019 TROMSØ
            <Link href={"/"}>Vis kart</Link>
          </Stack>
        </Grid>

        <Grid item xs={4} sm={4} md={3} lg={3}>
          <Stack>
            <h4>ORGANISASJONSNUMMER</h4>
            990803765
            <Image
              className="footer-logo"
              id="helse-nord-logo"
              loader={imgLoader}
              src={"/img/logos/hf_nord-white.svg"}
              alt="Helse Nord logo"
              width={180}
              height={40}
            />
          </Stack>
        </Grid>
      </FooterGridBottom>
    </FooterWrapper>
  );
};

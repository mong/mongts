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

const FooterWrapper = styled(Paper)(() => ({
  marginTop: "calc(100vh)",
  color: "white",
}));

const FooterGrid = styled(Grid)(() => ({
  justifyContent: "space-around",
  backgroundColor: "#00263d",
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

const FooterDividerBox = styled(Box)(() => ({}));

const FooterDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
}));

export function Footer() {
  return (
    <FooterWrapper>
      <FooterGrid
        container
        columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
        className="footer"
      >
        <FooterItem item xs={4} sm={8} md={2} lg={2}>
          <Link title="Link til SKDEs forside" href="/">
            <Image
              className="footer-logo"
              id="skde-footer-logo"
              loader={imgLoader}
              src={"/img/logos/SKDE_hvit_lys.png"}
              alt="SKDE logo"
              width={99}
              height={40}
            />
          </Link>
        </FooterItem>
        <FooterItem item xs={4} sm={8} md={6} lg={6}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="tel:77755800">
                <FooterListItemIcon>
                  <Call />
                </FooterListItemIcon>
                <FooterListItemText primary="Telefon: 777 55 800" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="mailto:postmottak@helse-nord.no"
              >
                <FooterListItemIcon>
                  <Email />
                </FooterListItemIcon>
                <FooterListItemText primary="E-post: postmottak@helse-nord.no" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="mailto:eva.stensland@helse-nord.no"
              >
                <FooterListItemIcon>
                  <ContactSupport />
                </FooterListItemIcon>
                <FooterListItemText primary="Ansvarlig redaktør: Eva Stensland" />
              </ListItemButton>
            </ListItem>
          </List>
        </FooterItem>
        <FooterItem item xs={4} sm={8} md={4} lg={4}>
          <nav aria-label="Linker til nettstedsinformasjon">
            <List>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/kontakt">
                  <FooterListItemIcon>
                    <ArrowForward />
                  </FooterListItemIcon>
                  <FooterListItemText primary="Kontakt" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/personvern">
                  <FooterListItemIcon>
                    <ArrowForward />
                  </FooterListItemIcon>
                  <FooterListItemText primary="Personvern" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/informasjonskapsler">
                  <FooterListItemIcon>
                    <ArrowForward />
                  </FooterListItemIcon>
                  <FooterListItemText primary="Informasjonskapsler" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </FooterItem>
        <FooterItem item xs={4} sm={8} md={12} lg={12}>
          <FooterDividerBox sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <FooterDivider />
          </FooterDividerBox>
        </FooterItem>
        <FooterItem item xs={4} sm={8} md={4} lg={4}>
          <Link
            title="Link til Helse Nord RHF"
            href="https://www.helse-nord.no"
          >
            <Image
              className="footer-logo"
              id="helse-nord-logo"
              loader={imgLoader}
              src={"/img/logos/hf_nord-white.svg"}
              alt="Helse Nord logo"
              width={180}
              height={40}
            />
          </Link>
        </FooterItem>
        <FooterItem item xs={4} sm={8} md={4} lg={4}>
          <Link
            title="Link til kvalitetsregistre"
            href="https://www.kvalitetsregistre.no"
          >
            <Image
              className="footer-logo"
              id="nsm-logo"
              loader={imgLoader}
              src={"/img/logos/NSM_logo_hvit.png"}
              alt="Nasjonalt servicemiljø logo"
              width={287}
              height={32}
            />
          </Link>
        </FooterItem>
        <FooterItem item xs={4} sm={8} md={4} lg={4}>
          <Link title="Link til helseatlas" href="/helseatlas">
            <Image
              className="footer-logo"
              id="helseatlas-logo"
              loader={imgLoader}
              src={"/img/logos/Logo_atlas_hvit.png"}
              alt="Helseatlas logo"
              width={146}
              height={40}
            />
          </Link>
        </FooterItem>
      </FooterGrid>
    </FooterWrapper>
  );
}

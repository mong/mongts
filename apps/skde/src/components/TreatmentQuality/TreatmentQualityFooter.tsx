import Image from "next/image";
import { imgLoader } from "../../helpers/functions";
import {
  TreatmentQualityFooterWrapper,
  TreatmentQualityFooterItem,
  TreatmentQualityFooterGrid,
  TreatmentQualityFooterListItemIcon,
} from ".";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ArrowForward } from "@mui/icons-material";
import Divider from "@mui/material/Divider";

export function TreatmentQualityFooter() {
  return (
    <TreatmentQualityFooterWrapper>
      <TreatmentQualityFooterGrid
        container
        rowSpacing={{ xs: 2, sm: 4, md: 4, lg: 4 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
        padding={{ xs: 2, sm: 2, md: 4, lg: 4 }}
      >
        <TreatmentQualityFooterItem item xs={4} sm={8} md={12} lg={12}>
          <nav aria-label="Linker til nettstedsinformasjon">
            <List>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/kontakt">
                  <TreatmentQualityFooterListItemIcon>
                    <ArrowForward />
                  </TreatmentQualityFooterListItemIcon>
                  <ListItemText primary="Kontakt" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/personvern">
                  <TreatmentQualityFooterListItemIcon>
                    <ArrowForward />
                  </TreatmentQualityFooterListItemIcon>
                  <ListItemText primary="Personvern" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/informasjonskapsler">
                  <TreatmentQualityFooterListItemIcon>
                    <ArrowForward />
                  </TreatmentQualityFooterListItemIcon>
                  <ListItemText primary="Informasjonskapsler" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Divider color="#27485b" />
        </TreatmentQualityFooterItem>

        <TreatmentQualityFooterItem item xs={4} sm={8} md={4} lg={4}>
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
        </TreatmentQualityFooterItem>
        <TreatmentQualityFooterItem item xs={4} sm={8} md={4} lg={4}>
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
        </TreatmentQualityFooterItem>
        <TreatmentQualityFooterItem item xs={4} sm={8} md={4} lg={4}>
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
        </TreatmentQualityFooterItem>
      </TreatmentQualityFooterGrid>
    </TreatmentQualityFooterWrapper>
  );
}

export default TreatmentQualityFooter;

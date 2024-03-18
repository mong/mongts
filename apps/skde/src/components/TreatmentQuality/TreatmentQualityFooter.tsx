import Grid from "@mui/material/Grid";
import Image from "next/image";
import { imgLoader } from "../../helpers/functions";

import { TreatmentQualityFooterWrapper } from ".";
import Box from "@mui/material/Box";

export function TreatmentQualityFooter() {
  return (
    <TreatmentQualityFooterWrapper>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="space-around"
        alignItems="center"
        sx={{ backgroundColor: "#00263d" }}
      >
        <Grid item sx={{ xs: "4" }}>
          <Image
            loader={imgLoader}
            src={"/img/logos/hf_nord-white.svg"}
            alt="Helse Nord logo"
            width={180}
            height={40}
          />
        </Grid>
        <Grid item sx={{ xs: "4" }}>
          <Image
            loader={imgLoader}
            src={"/img/logos/NSM_logo_hvit.png"}
            alt="Nasjonalt servicemiljø logo"
            width={287}
            height={32}
          />
        </Grid>
        <Grid item sx={{ xs: "4" }}>
          <Image
            loader={imgLoader}
            src={"/img/logos/Logo_atlas_hvit.png"}
            alt="Helseatlas logo"
            width={146}
            height={40}
          />
        </Grid>
      </Grid>
    </TreatmentQualityFooterWrapper>
  );
}

export default TreatmentQualityFooter;

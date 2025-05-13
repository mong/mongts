import { ItemBox } from "../HospitalProfileStyles";
import Grid from "@mui/material/Grid";
import { Stack, Typography, Link } from "@mui/material";
import { ArrowLink } from "qmongjs";
import { getUnitFullName } from "qmongjs";
import { NestedTreatmentUnitName, OptsTu } from "types";
import { useScreenSize } from "@visx/responsive";
import { breakpoints } from "qmongjs";
import { useEffect, useState } from "react";

type HospitalInfoBoxProps = {
  boxHeight: number;
  unitNames: { nestedUnitNames: NestedTreatmentUnitName[]; opts_tu: OptsTu[] };
  selectedTreatmentUnit: string;
  unitUrl: string;
};

export const HospitalInfoBox = (props: HospitalInfoBoxProps) => {
  const { boxHeight, unitNames, selectedTreatmentUnit, unitUrl } = props;

  const imgSize = 270;
  const leftPaddingXs = 5;

  const { width } = useScreenSize({ debounceTime: 150 });

  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    if (selectedTreatmentUnit) {
      setImgSrc(`/img/forsidebilder/${selectedTreatmentUnit}.jpg`);
    }
  }, [selectedTreatmentUnit]);

  return (
    <ItemBox height={boxHeight} sx={{ overflow: "auto" }}>
      <Grid container>
        <Grid size={{ xs: 12, xxl: 6 }}>
          <div
            style={{
              display: "flex",
              justifyContent: width > breakpoints.xxl ? "left" : "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 350,
                height: 350,
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: width > breakpoints.xxl ? 40 : 0,
              }}
            >
              {unitNames && (
                <img
                  src={imgSrc}
                  onError={() => setImgSrc("/img/forsidebilder/Sykehus.jpg")}
                  alt={"Logo"}
                  width={imgSize}
                  height={imgSize}
                  style={{
                    borderRadius: "100%",
                    maxWidth: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          </div>
        </Grid>
        <Grid size={{ xs: 12, xxl: 6 }}>
          <Stack
            direction="column"
            justifyContent="space-between"
            height={width > breakpoints.xxl ? 300 : 100}
            paddingLeft={width < breakpoints.xxl ? leftPaddingXs : 0}
            paddingTop={width > breakpoints.xxl ? 5 : 0}
          >
            {unitUrl ? (
              <ArrowLink
                bold={true}
                textVariant="h5"
                externalLink={true}
                href={unitUrl}
                fontSize="large"
                text={getUnitFullName(
                  unitNames.nestedUnitNames,
                  selectedTreatmentUnit,
                )}
              />
            ) : (
              <Typography variant="h5">
                <b>
                  {unitNames &&
                    getUnitFullName(
                      unitNames.nestedUnitNames,
                      selectedTreatmentUnit,
                    )}
                </b>
              </Typography>
            )}
            <Typography variant="body1">
              Her ser du kvalitetsindikatorene samlet fra de tilknyttede
              behandlingsstedene.
            </Typography>
            <Typography paddingY={1}>
              Under kan du navigere mellom ulike visninger av indikatorene.
            </Typography>
            <Typography paddingY={1}>
              For å se en mer detaljert visning, besøk{" "}
              <Link href="/behandlingskvalitet">Behandlingskvalitet</Link>.
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </ItemBox>
  );
};

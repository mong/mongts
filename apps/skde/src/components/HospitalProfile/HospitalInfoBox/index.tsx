import { ItemBox } from "../HospitalProfileStyles";
import Grid from "@mui/material/Grid2";
import { Stack, Typography } from "@mui/material";
import { ArrowLink } from "qmongjs";
import { getUnitFullName } from "../../../helpers/functions/getUnitFullName";
import { NestedTreatmentUnitName, OptsTu } from "types";
import { useScreenSize } from "@visx/responsive";
import { breakpoints } from "qmongjs";

type HospitalInfoBoxProps = {
  boxHeight: number;
  unitNames: { nestedUnitNames: NestedTreatmentUnitName[]; opts_tu: OptsTu[] };
  selectedTreatmentUnit: string;
  unitUrl: string;
  imgSrc: string;
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
};

export const HospitalInfoBox = (props: HospitalInfoBoxProps) => {
  const {
    boxHeight,
    unitNames,
    selectedTreatmentUnit,
    unitUrl,
    imgSrc,
    setImgSrc,
  } = props;

  const imgSize = 270;
  const { width } = useScreenSize({ debounceTime: 150 });

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
            </div>
          </div>
        </Grid>
        <Grid size={{ xs: 12, xxl: 6 }}>
          <Stack
            direction="column"
            alignItems={width > breakpoints.xxl ? "left" : "center"}
            justifyContent="space-between"
            height={width > breakpoints.xxl ? 300 : 100}
            paddingTop={width > breakpoints.xxl ? 10 : 0}
          >
            <Typography
              variant="h5"
              marginLeft={width > breakpoints.xxl ? -5 : 0}
            >
              <b>
                {unitNames &&
                  getUnitFullName(
                    unitNames.nestedUnitNames,
                    selectedTreatmentUnit,
                  )}
              </b>
            </Typography>

            <div style={{ marginLeft: width > breakpoints.xxl ? -40 : 0 }}>
              {unitUrl ? (
                <ArrowLink
                  href={unitUrl}
                  text="Nettside"
                  externalLink={true}
                  button={true}
                  textVariant="subtitle1"
                />
              ) : null}
            </div>
          </Stack>
        </Grid>
      </Grid>
    </ItemBox>
  );
};

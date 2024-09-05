import { ItemBox } from "../HospitalProfileStyles";
import Grid from "@mui/material/Grid2";
import { Stack, Typography } from "@mui/material";
import { ArrowLink } from "qmongjs";
import { FetchMap } from "../../../helpers/hooks";
import { mapColors, abacusColors } from "../../../charts/colors";
import { geoMercator, geoPath } from "d3-geo";
import { SubUnits } from "../SubUnits";
import { getUnitFullName } from "../../../helpers/functions/getUnitFullName";
import { NestedTreatmentUnitName, OptsTu } from "types";

const makeMap = () => {
  // Copy-paste from helseatlas
  const mapData = FetchMap("/helseatlas/kart/kronikere.geojson").data;

  const mapHeight = 1000;
  const mapWidth = 1000;
  const initCenter = geoPath().centroid(mapData);
  const initOffset: [number, number] = [
    mapWidth / 2,
    mapHeight / 2 - mapHeight * 0.11,
  ];
  const initScale = 150;
  const initialProjection = geoMercator()
    .scale(initScale)
    .center(initCenter)
    .translate(initOffset);
  const initPath = geoPath().projection(initialProjection);

  const bounds = initPath.bounds(mapData);
  const hscale = (initScale * mapWidth) / (bounds[1][0] - bounds[0][0]);
  const vscale = (initScale * mapHeight) / (bounds[1][1] - bounds[0][1]);
  const scale = hscale < vscale ? 0.98 * hscale : 0.98 * vscale;
  const offset: [number, number] = [
    mapWidth - (bounds[0][0] + bounds[1][0]) / 2,
    mapHeight - (bounds[0][1] + bounds[1][1]) / 2,
  ];

  const projection = geoMercator()
    .scale(scale)
    .center(initCenter)
    .translate(offset);

  const pathGenerator = geoPath().projection(projection);

  return {
    mapData: mapData,
    mapWidth: mapWidth,
    mapHeight: mapHeight,
    pathGenerator: pathGenerator,
  };
};

type HospitalInfoBoxProps = {
  unitNames: { nestedUnitNames: NestedTreatmentUnitName[]; opts_tu: OptsTu[] };
  selectedTreatmentUnit: string;
  objectIDList: number[];
  unitUrl: string;
  imgSrc: string;
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
  titleStyle: { marginLeft: number; marginTop: number };
};

export const HospitalInfoBox = (props: HospitalInfoBoxProps) => {
  const {
    unitNames,
    selectedTreatmentUnit,
    objectIDList,
    unitUrl,
    imgSrc,
    setImgSrc,
    titleStyle,
  } = props;
  const { mapData, pathGenerator, mapWidth, mapHeight } = makeMap();

  return (
    <ItemBox height={550} sx={{ overflow: "auto" }}>
      <Grid container>
        <Grid
          size={{ xs: 12, sm: 12, lg: 4, xl: 4, xxl: 4 }}
          alignContent="center"
          style={{ textAlign: "center" }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              alignItems: "center",
            }}
          >
            <svg
              width={"100%"}
              height={"100%"}
              viewBox={`0 0 ${mapWidth} ${mapHeight}`}
              style={{
                backgroundColor: "none",
                maxHeight: "400px",
              }}
            >
              {mapData &&
                mapData.features.map((d, i) => {
                  return (
                    <path
                      key={`map-feature-${i}`}
                      d={pathGenerator(d.geometry)}
                      fill={
                        objectIDList &&
                        objectIDList.includes(d.properties.BoHF_num)
                          ? abacusColors[2]
                          : mapColors[1]
                      }
                      stroke={"black"}
                      strokeWidth={0.4}
                      className={i + ""}
                    />
                  );
                })}
            </svg>
          </div>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 4, xxl: 4 }}>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            height={550}
          >
            <Typography variant="h5" style={{ marginTop: 20, marginLeft: 20 }}>
              <b>
                {unitNames &&
                  getUnitFullName(
                    unitNames.nestedUnitNames,
                    selectedTreatmentUnit,
                  )}
              </b>
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  display: "flex",
                  width: 300,
                  height: 300,
                  justifyContent: "center",
                }}
              >
                <img
                  src={imgSrc}
                  onError={() => setImgSrc("/img/forsidebilder/Sykehus.jpg")}
                  alt={"Logo"}
                  width="100%"
                  height="100%"
                  style={{
                    borderRadius: "100%",
                    maxWidth: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

            <div>
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

        <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 4, xxl: 4 }}>
          <ItemBox height={450} sx={{ overflow: "auto", marginRight: 2 }}>
            <Typography variant="h5" style={titleStyle}>
              <b>Tilknyttede behandlingssteder</b>
            </Typography>
            {unitNames ? (
              <SubUnits
                RHFs={unitNames.nestedUnitNames}
                selectedUnit={selectedTreatmentUnit}
              />
            ) : null}
          </ItemBox>
        </Grid>
      </Grid>
    </ItemBox>
  );
};

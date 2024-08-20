import React, { useState, useEffect } from "react";
import {
  useQueryParam,
  DelimitedArrayParam,
  withDefault,
} from "use-query-params";
import { UseQueryResult } from "@tanstack/react-query";
import {
  Header,
  HeaderData,
  BreadCrumbPath,
} from "../../src/components/Header";
import {
  skdeTheme,
  FilterSettingsValue,
  FilterMenu,
  useUnitNamesQuery,
  useUnitUrlsQuery,
  LowLevelIndicatorList,
  LineStyles,
  newLevelSymbols,
  defaultYear,
} from "qmongjs";
import { Footer } from "../../src/components/Footer";
import { getTreatmentUnitsTree } from "qmongjs/src/components/FilterMenu/TreatmentQualityFilterMenu/filterMenuOptions";
import { TreeViewFilterSection } from "qmongjs/src/components/FilterMenu/TreeViewFilterSection";
import {
  Switch,
  ThemeProvider,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FilterSettings } from "qmongjs/src/components/FilterMenu/FilterSettingsContext";
import IndicatorLinechart, {
  IndicatorLinechartParams,
} from "../../src/charts/IndicatorLinechart";
import {
  MedfieldTable,
  MedfieldTableProps,
} from "../../src/components/MedfieldTable";
import CustomAccordionExpandIcon from "qmongjs/src/components/FilterMenu/CustomAccordionExpandIcon";
import { ClickAwayListener } from "@mui/base";
import { PageWrapper } from "../../src/components/StyledComponents/PageWrapper";
import { SubUnits } from "../../src/components/SubUnits";
import {
  lineChartTheme,
  ItemBox,
} from "../../src/components/HospitalProfileStyles";
import { ExpandableItemBox } from "../../src/components/ExpandableItemBox";
import { URLs } from "types";
import { ArrowLink } from "qmongjs";
import { useRouter } from "next/router";
import { FetchMap } from "../../src/helpers/hooks";
import { mapColors, abacusColors } from "../../src/charts/colors";
import { geoMercator, geoPath } from "d3-geo";
import { scaleThreshold } from "d3-scale";
import { mapUnitName2BohfNames } from "../../src/helpers/functions/unitName2BohfMap";

export const Skde = (): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const [objectIDList, setObjectIDList] = useState([]);

  const treatmentUnitsKey = "selected_treatment_units";

  // Current unit name and its setter function
  const [selectedTreatmentUnits, setSelectedTreatmentUnits] = useQueryParam(
    treatmentUnitsKey,
    withDefault(DelimitedArrayParam, ["Nasjonalt"]),
  );

  // Set infobox image
  const [imgSrc, setImgSrc] = useState("/img/forsidebilder/Nasjonalt.jpg");

  // Infobox URL
  const [unitUrl, setUnitUrl] = useState<string | null>(null);

  // Get unit names

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "all",
    "caregiver",
    "ind",
  );

  const treatmentUnits = getTreatmentUnitsTree(unitNamesQuery);

  // Find the index of "Private" and remove the children. The sub units should not be shown.
  // TreetmentUnits.treedata starts with one element "Nasjonalt". Need to wait for it to build up the rest.
  if (treatmentUnits.treedata.length > 1) {
    const indPrivate = treatmentUnits.treedata.findIndex(
      (x) => x.nodeValue.value === "Private",
    );
    treatmentUnits.treedata[indPrivate].children = [];
  }

  // The following code ensures that the page renders correctly
  const unitUrlsQuery = useUnitUrlsQuery();

  const router = useRouter();

  const [prevReady, setPrevReady] = useState(router.isReady);

  const prerenderFinished =
    prevReady !== router.isReady && !unitUrlsQuery.isFetching;

  useEffect(() => {
    setPrevReady(router.isReady);
  }, [router.isReady]);

  const shouldRefreshInitialState = prerenderFinished;

  // Callback function for updating the filter menu
  const handleChange = (filterInput: FilterSettings) => {
    const newUnit = filterInput.map
      .get(treatmentUnitsKey)
      .map((el) => el.value);

    setExpanded(false);
    setSelectedTreatmentUnits(newUnit);

    setImgSrc("/img/forsidebilder/" + newUnit[0] + ".jpg");

    let unitUrl: URLs | undefined;
    if (unitUrlsQuery.data) {
      unitUrl = unitUrlsQuery.data.filter((row: URLs) => {
        return row.shortName === newUnit[0];
      });
    }

    setObjectIDList(mapUnitName2BohfNames(treatmentUnits.treedata, newUnit[0]));

    if (unitUrl && unitUrl[0]) {
      setUnitUrl(unitUrl[0].url);
    } else {
      setUnitUrl(null);
    }
  };

  // Set the line plot width to fill the available space
  const [width, setWidth] = useState(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      setWidth(event[0].contentBoxSize[0].inlineSize);
    });

    resizeObserver.observe(document.getElementById("plot-window"));
  });

  // Year for filtering
  const lastYear = defaultYear;
  const pastYears = 5;

  // Props
  const indicatorParams: IndicatorLinechartParams = {
    unitNames: [selectedTreatmentUnits[0]],
    context: "caregiver",
    type: "ind",
    width: width,
    height: 600,
    lineStyles: new LineStyles(
      [
        {
          text: "Høy måloppnåelse",
          strokeDash: "0",
          colour: "#3BAA34",
          marker: "circle",
          markEnd: true,
        },
        {
          text: "Moderat måloppnåelse",
          strokeDash: "0",
          colour: "#FD9C00",
          marker: "square",
          markEnd: true,
        },
        {
          text: "Lav måloppnåelse",
          strokeDash: "0",
          colour: "#E30713",
          marker: "triangle",
          markEnd: true,
        },
      ],
      { fontSize: 16, fontFamily: "Arial", fontWeight: 500 },
    ),
    font: {
      fontSize: 18,
      fontWeight: 500,
      fontFamily: "Arial",
    },
    yAxisText: "Antall indikatorer",
    xTicksFont: { fontFamily: "Arial", fontSize: 16, fontWeight: 500 },
    yTicksFont: { fontFamily: "Arial", fontSize: 14, fontWeight: 500 },
    startYear: lastYear - pastYears,
    endYear: lastYear,
    yMin: 0,
    normalise: true,
    useToolTip: true,
  };

  const medfieldTableProps: MedfieldTableProps = {
    unitNames: [selectedTreatmentUnits[0]],
    context: "caregiver",
    type: "ind",
    treatmentYear: lastYear,
  };

  // State logic for normalising the line plot
  const [normalise, setNormalise] = React.useState(indicatorParams.normalise);

  indicatorParams.normalise = normalise;

  const checkNormalise = () => {
    setNormalise(!normalise);
  };

  if (normalise) {
    indicatorParams.yAxisText = "Andel";
  } else {
    indicatorParams.yAxisText = "Antall indikatorer";
  }

  // State logic for ind or dg in medfieldtable
  const [dataQuality, setDataQuality] = React.useState(false);

  if (dataQuality) {
    medfieldTableProps.type = "dg";
  } else {
    medfieldTableProps.type = "ind";
  }

  const checkDataQuality = () => {
    setDataQuality(!dataQuality);
  };

  const breadcrumbs: BreadCrumbPath = {
    path: [
      {
        link: "https://www.skde.no",
        text: "Forside",
      },
      {
        link: "/sykehusprofil/",
        text: "Sykehusprofil",
      },
    ],
  };

  const headerData: HeaderData = {
    title: "Sykehusprofil",
    subtitle: "Resultater fra sykehus",
  };

  const boxMaxHeight = 800;

  const titleStyle = { marginTop: 20, marginLeft: 20 };
  const textMargin = 20;

  const Legend = (props: { itemSpacing: number; symbolSpacing: number }) => {
    const { itemSpacing, symbolSpacing } = props;

    return (
      <Stack direction="row" spacing={itemSpacing} alignItems="center">
        <Stack direction="row" spacing={symbolSpacing} alignItems="center">
          {newLevelSymbols("H")}
          <Typography>Høy måloppnåelse</Typography>
        </Stack>
        <Stack direction="row" spacing={symbolSpacing} alignItems="center">
          {newLevelSymbols("M")}
          <Typography>Moderat måloppnåelse</Typography>
        </Stack>
        <Stack direction="row" spacing={symbolSpacing} alignItems="center">
          {newLevelSymbols("L")}
          <Typography>Lav måloppnåelse</Typography>
        </Stack>
      </Stack>
    );
  };

  // Copy-paste from helseatlas
  const mapData = FetchMap("/helseatlas/kart/kronikere.geojson").data;

  const color = mapColors;
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

  const colorScale = scaleThreshold<number, string>()
    .domain([3, 12, 20])
    .range(color);

  const projection = geoMercator()
    .scale(scale)
    .center(initCenter)
    .translate(offset);

  const pathGenerator = geoPath().projection(projection);

  return (
    <ThemeProvider theme={skdeTheme}>
      <PageWrapper>
        <Header
          bgcolor="surface2.light"
          headerData={headerData}
          breadcrumbs={breadcrumbs}
        >
          <ClickAwayListener onClickAway={() => setExpanded(false)}>
            <Accordion
              expanded={expanded}
              onChange={(e, expanded) => {
                setExpanded(expanded);
              }}
            >
              <AccordionSummary expandIcon={<CustomAccordionExpandIcon />}>
                <h3>
                  {selectedTreatmentUnits[0] === "Nasjonalt"
                    ? "Velg enhet"
                    : selectedTreatmentUnits[0]}
                </h3>
              </AccordionSummary>

              <AccordionDetails>
                <FilterMenu
                  refreshState={shouldRefreshInitialState}
                  onSelectionChanged={handleChange}
                  onFilterInitialized={() => {
                    return null;
                  }}
                >
                  <TreeViewFilterSection
                    refreshState={shouldRefreshInitialState}
                    treedata={treatmentUnits.treedata}
                    defaultvalues={treatmentUnits.defaults}
                    initialselections={
                      selectedTreatmentUnits.map((value) => ({
                        value: value,
                        valueLabel: value,
                      })) as FilterSettingsValue[]
                    }
                    sectionid={treatmentUnitsKey}
                    sectiontitle={"Behandlingsenheter"}
                    filterkey={treatmentUnitsKey}
                    searchbox={true}
                    multiselect={false}
                    accordion={false}
                    noShadow={true}
                  />
                </FilterMenu>
              </AccordionDetails>
            </Accordion>
          </ClickAwayListener>
        </Header>

        <Box marginTop={2} className="hospital-profile-box">
          <Grid container spacing={2}>
            <Grid xs={12}>
              <ItemBox height={550} sx={{ overflow: "auto" }}>
                <Grid container>
                  <Grid
                    xs={12}
                    sm={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    alignContent="center"
                    style={{ textAlign: "center" }}
                  >
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
                          onError={() =>
                            setImgSrc("/img/forsidebilder/Sykehus.jpg")
                          }
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
                  </Grid>

                  <Grid xs={6} sm={6} lg={4} xl={4} xxl={4}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "400px",
                      }}
                    >
                      <Typography
                        variant="h5"
                        style={{ marginTop: 20, marginLeft: 20 }}
                      >
                        {selectedTreatmentUnits[0]}
                      </Typography>

                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          margin: "auto",
                        }}
                      >
                        <svg
                          width={"400px"}
                          height={"100%"}
                          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
                          style={{ backgroundColor: "none" }}
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
                                      : colorScale(d.properties.BoHF_num)
                                  }
                                  stroke={"black"}
                                  strokeWidth={0.4}
                                  className={i + ""}
                                />
                              );
                            })}
                        </svg>
                      </div>

                      <div style={{ marginTop: "auto" }}>
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
                    </div>
                  </Grid>

                  <Grid xs={6} sm={6} lg={4} xl={4} xxl={4}>
                    <ItemBox
                      height={450}
                      sx={{ overflow: "auto", marginRight: 2 }}
                    >
                      <Typography variant="h5" style={titleStyle}>
                        Tilknyttede enheter
                      </Typography>
                      <div style={{ margin: textMargin }}>
                        <Typography variant="body1">
                          Her vises behandlingssteder som er tilhørende til
                          valgt helseforetak.
                        </Typography>
                      </div>
                      {unitNamesQuery.data ? (
                        <SubUnits
                          RHFs={unitNamesQuery.data.nestedUnitNames}
                          selectedUnit={selectedTreatmentUnits[0]}
                        />
                      ) : null}
                    </ItemBox>
                  </Grid>
                </Grid>
              </ItemBox>
            </Grid>

            <Grid xs={12}>
              <ItemBox sx={{ overflow: "auto" }}>
                <Typography variant="h5" style={titleStyle}>
                  Utvikling over tid
                </Typography>
                <div style={{ margin: textMargin }}>
                  <Typography variant="body1">
                    Grafen viser andel eller antall av alle kvalitetsindikatorer
                    fra de nasjonale medisinske kvalitetsregistre. Grafen viser
                    hvilke som har hatt høy, middels eller lav måloppnåelse de
                    siste årene.
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "right",
                      marginRight: 20,
                      marginTop: 40,
                    }}
                  >
                    <Legend itemSpacing={8} symbolSpacing={2} />
                  </div>
                </div>
                <ThemeProvider theme={lineChartTheme}>
                  <div id="plot-window">
                    <IndicatorLinechart {...indicatorParams} />
                  </div>
                </ThemeProvider>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  margin={4}
                >
                  <Typography>Vis andel</Typography>
                  <Switch checked={!normalise} onChange={checkNormalise} />
                  <Typography>Vis antall</Typography>
                </Stack>
              </ItemBox>
            </Grid>

            <Grid xs={12}>
              <ExpandableItemBox collapsedHeight={boxMaxHeight}>
                <Typography variant="h5" style={titleStyle}>
                  Kvalitetsindikatorer fordelt på fagområder
                </Typography>
                <div style={{ margin: textMargin }}>
                  <Typography variant="body1">
                    {dataQuality
                      ? "Her vises dekningsgraden eller datakvaliteten til " +
                        selectedTreatmentUnits[0] +
                        " fordelt på fagområder som forteller om datagrunnlaget fra registrene."
                      : "Her vises alle kvalitetsindikatorene fra " +
                        selectedTreatmentUnits[0] +
                        " fordelt på fagområder. Hver indikator er vist som et symbol for høy, middels eller lav måloppnåelse."}
                  </Typography>
                </div>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  margin={4}
                >
                  <Typography>Vis kvalitetsindikatorer</Typography>
                  <Switch checked={dataQuality} onChange={checkDataQuality} />
                  <Typography>Vis datakvalitet</Typography>
                </Stack>
                <MedfieldTable {...medfieldTableProps} />
              </ExpandableItemBox>
            </Grid>

            <Grid xs={12}>
              <ExpandableItemBox collapsedHeight={boxMaxHeight}>
                <Typography variant="h5" style={titleStyle}>
                  Siste års måloppnåelse
                </Typography>
                <div style={{ margin: textMargin }}>
                  <Typography variant="body1">
                    Liste over kvalitetsindikatorer med beskrivelse som er
                    fordelt på høy, middels eller lav måloppnåelse. Du kan
                    trykke på indikatorene for å se datakvaliteten og mer
                    beskrivelse av indikatorene.
                  </Typography>
                </div>
                <LowLevelIndicatorList
                  context={"caregiver"}
                  type={"ind"}
                  unitNames={[selectedTreatmentUnits[0] || "Nasjonalt"]}
                  year={lastYear}
                />
              </ExpandableItemBox>
            </Grid>
          </Grid>
        </Box>
        <Footer page="sykehusprofil" />
      </PageWrapper>
    </ThemeProvider>
  );
};

export default Skde;

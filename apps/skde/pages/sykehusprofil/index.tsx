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
  Hoverbox,
} from "qmongjs";
import { Footer } from "../../src/components/Footer";
import { getTreatmentUnitsTree } from "qmongjs/src/components/FilterMenu/TreatmentQualityFilterMenu/filterMenuOptions";
import { TreeViewFilterSection } from "qmongjs/src/components/FilterMenu/TreeViewFilterSection";
import {
  ThemeProvider,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Typography,
  Container,
  styled,
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
import { NestedTreatmentUnitName, URLs } from "types";
import { ArrowLink } from "qmongjs";
import { useRouter } from "next/router";
import { FetchMap } from "../../src/helpers/hooks";
import { mapColors, abacusColors } from "../../src/charts/colors";
import { geoMercator, geoPath } from "d3-geo";
import { mapUnitName2BohfNames } from "../../src/helpers/functions/unitName2BohfMap";
import { ChipSelection } from "../../src/components/ChipSelection";

const AccordionWrapper = styled(Box)(() => ({
  "& MuiAccordion-root:before": {
    backgroundColor: "white",
  },
}));

const getUnitFullName = (
  nestedUnitNames: NestedTreatmentUnitName[],
  unitShortName: string,
) => {
  if (!nestedUnitNames || !unitShortName) {
    return null;
  }

  // Check if unit is a RHF
  const isRHF = nestedUnitNames.map((row) => row.rhf).includes(unitShortName);

  if (isRHF) {
    return unitShortName;
  }

  // Check if unit is a HF
  const HFs = nestedUnitNames.map((row) => row.hf).flat();
  const isHF = HFs.map((row) => row.hf).includes(unitShortName);

  if (isHF) {
    return HFs.filter((row) => {
      return row.hf === unitShortName;
    })[0].hf_full;
  }

  // Check if unit is a hospital?
  return unitShortName;
};

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

  // Callback function for initialising the filter meny
  const initialiseFilter = (
    filterInput: Map<string, FilterSettingsValue[]>,
  ) => {
    const newUnit = filterInput.get(treatmentUnitsKey).map((el) => el.value);

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
    subtitle:
      "Her vises alle kvalitetsindikatorer fra nasjonale medisinske kvalitetsregistre i form av sykehusprofiler",
  };

  const boxMaxHeight = 800;

  const titleStyle = { marginTop: 20, marginLeft: 20 };
  const textMargin = 20;

  const Legend = (props: { itemSpacing: number; symbolSpacing: number }) => {
    const { itemSpacing, symbolSpacing } = props;

    return (
      <>
        <Stack direction="row" spacing={itemSpacing} alignItems="center">
          <Hoverbox
            title="Viser andel eller antall kvalitetsindikatorer som har oppnådd høy måloppnåelse i kvalitetsregisteret"
            placement="top"
            offset={[20, 20]}
          >
            <Stack direction="row" spacing={symbolSpacing} alignItems="center">
              {newLevelSymbols("H")}
              <Typography>Høy måloppnåelse</Typography>
            </Stack>
          </Hoverbox>
          <Hoverbox
            title="Viser andel eller antall kvalitetsindikatorer som har oppnådd middels måloppnåelse i kvalitetsregisteret"
            placement="top"
            offset={[20, 20]}
          >
            <Stack direction="row" spacing={symbolSpacing} alignItems="center">
              {newLevelSymbols("M")}
              <Typography>Moderat måloppnåelse</Typography>
            </Stack>
          </Hoverbox>
          <Hoverbox
            title="Viser andel eller antall kvalitetsindikatorer som har oppnådd lav måloppnåelse i kvalitetsregisteret"
            placement="top"
            offset={[20, 20]}
          >
            <Stack direction="row" spacing={symbolSpacing} alignItems="center">
              {newLevelSymbols("L")}
              <Typography>Lav måloppnåelse</Typography>
            </Stack>
          </Hoverbox>
        </Stack>
      </>
    );
  };

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

  // Latout parameters
  const maxWidth = "xxl";
  const titlePadding = 2;

  return (
    <ThemeProvider theme={skdeTheme}>
      <PageWrapper>
        <Header
          bgcolor="surface2.light"
          headerData={headerData}
          breadcrumbs={breadcrumbs}
          maxWidth={maxWidth}
        >
          <ClickAwayListener onClickAway={() => setExpanded(false)}>
            <AccordionWrapper>
              <Accordion
                square={true}
                sx={{
                  width: 400,
                  borderRadius: 15,
                  border: 1,
                  borderColor: skdeTheme.palette.primary.main,
                  backgroundColor: "white",
                  color: skdeTheme.palette.primary.main,
                }}
                expanded={expanded}
                onChange={(e, expanded) => {
                  setExpanded(expanded);
                }}
              >
                <AccordionSummary expandIcon={<CustomAccordionExpandIcon />}>
                  <h3>
                    {selectedTreatmentUnits[0] === "Nasjonalt"
                      ? "Velg behandlingssted"
                      : selectedTreatmentUnits[0]}
                  </h3>
                </AccordionSummary>

                <AccordionDetails>
                  <FilterMenu
                    refreshState={shouldRefreshInitialState}
                    onSelectionChanged={handleChange}
                    onFilterInitialized={initialiseFilter}
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
            </AccordionWrapper>
          </ClickAwayListener>
        </Header>

        <Container maxWidth={maxWidth} disableGutters={true}>
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

                    <Grid xs={12} sm={6} lg={4} xl={4} xxl={4}>
                      <Stack
                        direction="column"
                        alignItems="center"
                        justifyContent="space-between"
                        height={550}
                      >
                        <Typography
                          variant="h5"
                          style={{ marginTop: 20, marginLeft: 20 }}
                        >
                          <b>
                            {unitNamesQuery.data &&
                              getUnitFullName(
                                unitNamesQuery.data.nestedUnitNames,
                                selectedTreatmentUnits[0],
                              )}
                          </b>
                        </Typography>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
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

                    <Grid xs={12} sm={6} lg={4} xl={4} xxl={4}>
                      <ItemBox
                        height={450}
                        sx={{ overflow: "auto", marginRight: 2 }}
                      >
                        <Typography variant="h5" style={titleStyle}>
                          <b>Tilknyttede behandlingssteder</b>
                        </Typography>
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
                  <Box padding={titlePadding}>
                    <Typography variant="h5" style={titleStyle}>
                      <b>Utvikling over tid</b>
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <ChipSelection
                        leftChipLabel="Vis andel"
                        rightChipLabel="Vis Antall"
                        leftChipHelpText=""
                        rightChipHelpText=""
                        hoverBoxOffset={[20, 20]}
                        hoverBoxPlacement="top"
                        hoverBoxMaxWidth={400}
                        state={normalise}
                        stateSetter={setNormalise}
                        trueChip="left"
                      />
                      <Legend itemSpacing={8} symbolSpacing={2} />
                    </Stack>
                    <div style={{ margin: textMargin }}>
                      <Typography variant="body1">
                        {"Grafen gir en oversikt over kvalitetsindikatorer fra de nasjonale medisinske kvalitetsregistrene for " +
                          (unitNamesQuery.data &&
                            getUnitFullName(
                              unitNamesQuery.data.nestedUnitNames,
                              selectedTreatmentUnits[0],
                            )) +
                          ". Her vises andel eller antall av kvalitetsindikatorer som har hatt høy, middels eller lav måloppnåelse de siste årene."}
                      </Typography>
                    </div>
                  </Box>

                  <ThemeProvider theme={lineChartTheme}>
                    <div id="plot-window">
                      <IndicatorLinechart {...indicatorParams} />
                    </div>
                  </ThemeProvider>
                </ItemBox>
              </Grid>

              <Grid xs={12}>
                <ExpandableItemBox collapsedHeight={boxMaxHeight}>
                  <Box padding={titlePadding}>
                    <Typography variant="h5" style={titleStyle}>
                      <b>Kvalitetsindikatorer fordelt på fagområder</b>
                    </Typography>
                    <ChipSelection
                      leftChipLabel="Vis kvalitetsindikatorer"
                      rightChipLabel="Vis datakvalitet"
                      leftChipHelpText="Hver indikator er fremstilt som et symbol som viser om indikatoren er høy, middels eller lav måloppnåelse. Du kan også trykke på fagområde for å se hvilke register kvalitetsindikatorene kommer fra."
                      rightChipHelpText="Datakvalitet representerer for eksempel dekningsgrad som angir andel pasienter eller hendelser som registreres, i forhold til antall som skal registreres i registeret fra behandlingsstedet. Hver indikator er fremstilt som et symbol som viser om indikatoren er høy, middels eller lav måloppnåelse. Du kan også trykke på fagområde for å se hvilke register datakvaliteten er rapportert fra."
                      hoverBoxOffset={[20, 20]}
                      hoverBoxPlacement="top"
                      hoverBoxMaxWidth={400}
                      state={dataQuality}
                      stateSetter={setDataQuality}
                      trueChip="right"
                    />
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
                  </Box>

                  <MedfieldTable {...medfieldTableProps} />
                </ExpandableItemBox>
              </Grid>

              <Grid xs={12}>
                <ExpandableItemBox collapsedHeight={boxMaxHeight}>
                  <Box padding={titlePadding}>
                    <Typography variant="h5" style={titleStyle}>
                      <b>Siste års måloppnåelse</b>
                    </Typography>
                    <div style={{ margin: textMargin }}>
                      <Typography variant="body1">
                        {"Her er en interaktiv liste som gir oversikt over kvalitetsindikatorene ut fra siste års måloppnåelse for " +
                          (unitNamesQuery.data &&
                            getUnitFullName(
                              unitNamesQuery.data.nestedUnitNames,
                              selectedTreatmentUnits[0],
                            )) +
                          ". Du kan trykke på indikatorene for å se mer informasjon om indikatoren og følge oppgitt lenke til mer detaljert beskrivelse av indikatoren."}
                      </Typography>
                    </div>
                  </Box>

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
        </Container>
        <Footer
          page="sykehusprofil"
          maxWidth={maxWidth}
          className="hospital-profile-footer"
        />
      </PageWrapper>
    </ThemeProvider>
  );
};

export default Skde;

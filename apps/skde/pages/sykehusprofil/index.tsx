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
  Container,
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
import {
  lineChartTheme,
  ItemBox,
} from "../../src/components/HospitalProfile/HospitalProfileStyles";
import { ExpandableItemBox } from "../../src/components/HospitalProfile/ExpandableItemBox";
import { URLs } from "types";
import { useRouter } from "next/router";
import { mapUnitName2BohfNames } from "../../src/helpers/functions/unitName2BohfMap";
import { Hoverbox } from "../../src/components/Hoverbox";
import { HelpOutline } from "@mui/icons-material";
import { HospitalInfoBox } from "../../src/components/HospitalProfile/HospitalInfoBox";
import { getUnitFullName } from "../../src/helpers/functions/getUnitFullName";
import { LinePlotLegend } from "../../src/components/HospitalProfile/LinePlotLegend";

export const Skde = (): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const [objectIDList, setObjectIDList] = useState<number[]>([]);

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
    subtitle:
      "Her vises alle kvalitetsindikatorer fra nasjonale medisinske kvalitetsregistre i form av sykehusprofiler",
  };

  const boxMaxHeight = 800;

  const titleStyle = { marginTop: 20, marginLeft: 20 };
  const textMargin = 20;

  const maxWidth = "xxl";

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
            <Accordion
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
          </ClickAwayListener>
        </Header>

        <Container maxWidth={maxWidth} disableGutters={true}>
          <Box marginTop={2} className="hospital-profile-box">
            <Grid container spacing={2}>
              <Grid xs={12}>
                <HospitalInfoBox
                  unitNames={unitNamesQuery.data}
                  selectedTreatmentUnit={selectedTreatmentUnits[0]}
                  objectIDList={objectIDList}
                  unitUrl={unitUrl}
                  imgSrc={imgSrc}
                  setImgSrc={setImgSrc}
                  titleStyle={titleStyle}
                />
              </Grid>
              <Grid xs={12}>
                <ItemBox sx={{ overflow: "auto" }}>
                  <Typography variant="h5" style={titleStyle}>
                    <b>Utvikling over tid</b>
                  </Typography>
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "right",
                        marginRight: 20,
                        marginTop: 40,
                      }}
                    >
                      <LinePlotLegend itemSpacing={8} symbolSpacing={2} />
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
                    <b>Kvalitetsindikatorer fordelt på fagområder</b>
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
                    <Hoverbox
                      title="Hver indikator er fremstilt som et symbol som viser om indikatoren er høy, middels eller lav måloppnåelse. Du kan også trykke på fagområde for å se hvilke register kvalitetsindikatorene kommer fra."
                      placement="top"
                      offset={[20, 20]}
                      maxWidth={400}
                    >
                      <HelpOutline sx={{ fontSize: "18px", marginLeft: 1 }} />
                    </Hoverbox>
                    <Switch checked={dataQuality} onChange={checkDataQuality} />
                    <Typography>Vis datakvalitet</Typography>
                    <Hoverbox
                      title="Datakvalitet representerer for eksempel dekningsgrad som angir andel pasienter eller hendelser som registreres, i forhold til antall som skal registreres i registeret fra behandlingsstedet. Hver indikator er fremstilt som et symbol som viser om indikatoren er høy, middels eller lav måloppnåelse. Du kan også trykke på fagområde for å se hvilke register datakvaliteten er rapportert fra."
                      placement="top"
                      offset={[20, 20]}
                      maxWidth={400}
                    >
                      <HelpOutline sx={{ fontSize: "18px", marginLeft: 1 }} />
                    </Hoverbox>
                  </Stack>
                  <MedfieldTable {...medfieldTableProps} />
                </ExpandableItemBox>
              </Grid>

              <Grid xs={12}>
                <ExpandableItemBox collapsedHeight={boxMaxHeight}>
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

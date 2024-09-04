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
import {
  lineChartTheme,
  ItemBox,
} from "../../src/components/HospitalProfile/HospitalProfileStyles";
import { ExpandableItemBox } from "../../src/components/HospitalProfile/ExpandableItemBox";
import { URLs } from "types";
import { useRouter } from "next/router";
import { mapUnitName2BohfNames } from "../../src/helpers/functions/unitName2BohfMap";
import { HospitalInfoBox } from "../../src/components/HospitalProfile/HospitalInfoBox";
import { getUnitFullName } from "../../src/helpers/functions/getUnitFullName";
import { LinePlotLegend } from "../../src/components/HospitalProfile/LinePlotLegend";
import { ChipSelection } from "../../src/components/ChipSelection";

const AccordionWrapper = styled(Box)(() => ({
  "& MuiAccordion-root:before": {
    backgroundColor: "white",
  },
}));

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
                      <LinePlotLegend itemSpacing={8} symbolSpacing={2} />
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

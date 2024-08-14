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
import { useScreenSize } from "@visx/responsive";
import CustomAccordionExpandIcon from "qmongjs/src/components/FilterMenu/CustomAccordionExpandIcon";
import { ClickAwayListener } from "@mui/base";
import { PageWrapper } from "../../src/components/StyledComponents/PageWrapper";
import { SubUnits } from "../../src/components/SubUnits";
import {
  lineChartTheme,
  ItemBox,
} from "../../src/components/HospitalProfileStyles";
import { ExpandableItemBox } from "../../src/components/ExpandableItemBox";
import logo from "./Logo.png";
import { URLs } from "types";
import { ArrowLink } from "qmongjs";
import { useRouter } from "next/router";

export const Skde = (): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const treatmentUnitsKey = "selected_treatment_units";

  // Current unit name and its setter function
  const [selectedTreatmentUnits, setSelectedTreatmentUnits] = useQueryParam(
    treatmentUnitsKey,
    withDefault(DelimitedArrayParam, ["Nasjonalt"]),
  );

  const [unitUrl, setUnitUrl] = useState<string | null>(null);

  // Get unit names

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "all",
    "caregiver",
    "ind",
  );

  const treatmentUnits = getTreatmentUnitsTree(unitNamesQuery);

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

    let unitUrl: URLs | undefined;

    if (unitUrlsQuery.data) {
      unitUrl = unitUrlsQuery.data.filter((row: URLs) => {
        return row.shortName === newUnit[0];
      });
    }

    if (unitUrl && unitUrl[0]) {
      setUnitUrl(unitUrl[0].url);
    } else {
      setUnitUrl(null);
    }
  };

  const screenSize = useScreenSize({ debounceTime: 150 });

  // Props
  const indicatorParams: IndicatorLinechartParams = {
    unitNames: [selectedTreatmentUnits[0]],
    context: "caregiver",
    type: "ind",
    width: screenSize.width * 0.9,
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
          strokeDash: "1 3",
          colour: "#FD9C00",
          marker: "square",
          markEnd: true,
        },
        {
          text: "Lav måloppnåelse",
          strokeDash: "8 8",
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
    startYear: 2017,
    endYear: 2022,
    yMin: 0,
    normalise: true,
    useToolTip: true,
  };

  const medfieldTableProps: MedfieldTableProps = {
    unitNames: [selectedTreatmentUnits[0]],
    context: "caregiver",
    type: "ind",
    treatmentYear: 2022,
  };

  const medfieldTablePropsDG: MedfieldTableProps = {
    unitNames: [selectedTreatmentUnits[0]],
    context: "caregiver",
    type: "dg",
    treatmentYear: 2022,
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
              <ItemBox height={440} sx={{ overflow: "auto" }}>
                <Grid container>
                  <Grid
                    xs={12}
                    sm={4}
                    lg={4}
                    xl={4}
                    xxl={4}
                    alignContent="center"
                    style={{ textAlign: "center" }}
                  >
                    <img
                      src={logo.src}
                      alt={"Logo"}
                      width="100%"
                      style={{ borderRadius: "50%", maxWidth: 300 }}
                    />
                  </Grid>

                  <Grid xs={6} sm={4} lg={4} xl={4} xxl={4}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "400px",
                      }}
                    >
                      <Typography variant="h5" style={{ marginTop: 20 }}>
                        {selectedTreatmentUnits[0]}
                      </Typography>

                      <div style={{ marginLeft: 0 }}>
                        <Typography variant="body1">
                          Her skal det stå noe om enheten. <br />
                        </Typography>
                      </div>

                      <div style={{ marginTop: "auto" }}>
                        {unitUrl ? (
                          <ArrowLink
                            href={unitUrl}
                            text="Nettside"
                            externalLink={true}
                            button={true}
                          />
                        ) : null}
                      </div>
                    </div>
                  </Grid>

                  <Grid xs={6} sm={4} lg={4} xl={4} xxl={4}>
                    <ItemBox
                      height={440}
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
                </div>
                <ThemeProvider theme={lineChartTheme}>
                  <IndicatorLinechart {...indicatorParams} />
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
                  Fagområder
                </Typography>
                <div style={{ margin: textMargin }}>
                  <Typography variant="body1">
                    Alle kvalitetsindikatorene vist med symbol for høy, middels
                    eller lav måloppnåelse bare fordelt på fagområder. Du kan
                    trykke på fagområde for å vise hvilke registre som er i
                    fagområdet.
                  </Typography>
                </div>
                <MedfieldTable {...medfieldTableProps} />
              </ExpandableItemBox>
            </Grid>

            <Grid xs={12}>
              <ExpandableItemBox collapsedHeight={boxMaxHeight}>
                <Typography variant="h5" style={titleStyle}>
                  Fagområder (dekningsgrad)
                </Typography>
                <div style={{ margin: textMargin }}>
                  <Typography variant="body1">
                    Her vises dekningsgraden eller datakvaliteten fordelt på
                    fagområder som forteller om datagrunnlaget fra registeret
                    med det valgte helseforetak eller sykehuset.
                  </Typography>
                </div>
                <MedfieldTable {...medfieldTablePropsDG} />
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

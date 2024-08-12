import React, { useState } from "react";
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
  FormControlLabel,
  ThemeProvider,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
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
import Divider from "@mui/material/Divider";

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

  const unitUrlsQuery = useUnitUrlsQuery();

  const shouldRefreshInitialState = false;

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

        <Box margin={2}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6} lg={6} xl={6} xxl={6}>
              <ItemBox height={440}>
                <Grid container spacing={2} sx={{ overflow: "clip" }}>
                  <Grid xs={5} margin={2}>
                    <img
                      src={logo.src}
                      alt={"Logo"}
                      width="100%"
                      style={{ borderRadius: "50%", maxWidth: 300 }}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} lg={6} xl={6} xxl={6}>
                    <Stack>
                      <h2 style={titleStyle}>{selectedTreatmentUnits[0]}</h2>
                      <Divider />
                      <Box
                        sx={{
                          marginRight: "20%",
                          marginBottom: 0,
                          display: "flex",
                          justifyContent: "right",
                        }}
                      >
                        {unitUrl ? (
                          <ArrowLink
                            href={unitUrl}
                            text="Nettside"
                            externalLink={true}
                          />
                        ) : null}
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </ItemBox>
            </Grid>

            <Grid xs={12} sm={6}>
              <ExpandableItemBox collapsedHeight={400}>
                <h2 style={titleStyle}>Tilknyttede enheter</h2>
                {unitNamesQuery.data ? (
                  <SubUnits
                    RHFs={unitNamesQuery.data.nestedUnitNames}
                    selectedUnit={selectedTreatmentUnits[0]}
                  />
                ) : null}
              </ExpandableItemBox>
            </Grid>

            <Grid xs={12}>
              <ItemBox sx={{ overflow: "auto" }}>
                <h2 style={titleStyle}>Utvikling over tid</h2>
                <ThemeProvider theme={lineChartTheme}>
                  <IndicatorLinechart {...indicatorParams} />
                </ThemeProvider>
                <FormControlLabel
                  control={
                    <Switch checked={!normalise} onChange={checkNormalise} />
                  }
                  label="Vis antall"
                  sx={{ margin: 2 }}
                />
              </ItemBox>
            </Grid>

            <Grid xs={12}>
              <ExpandableItemBox collapsedHeight={boxMaxHeight}>
                <h2 style={titleStyle}>Fagområder</h2>
                <MedfieldTable {...medfieldTableProps} />
              </ExpandableItemBox>
            </Grid>

            <Grid xs={6}>
              <ExpandableItemBox collapsedHeight={boxMaxHeight}>
                <h2 style={titleStyle}>Fagområder (dekningsgrad)</h2>
                <MedfieldTable {...medfieldTablePropsDG} />
              </ExpandableItemBox>
            </Grid>

            <Grid xs={6}>
              <ExpandableItemBox collapsedHeight={boxMaxHeight}>
                <h2 style={titleStyle}>Siste års måloppnåelse</h2>
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

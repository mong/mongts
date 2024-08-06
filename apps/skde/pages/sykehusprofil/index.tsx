import React, { useState } from "react";
import { Text } from "@visx/text";
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
  Checkbox,
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

    unitUrl && unitUrl[0] ? setUnitUrl(unitUrl[0].url) : setUnitUrl(null);
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
        { text: "Høy måloppnåelse", strokeDash: "0", colour: "#3BAA34" },
        { text: "Moderat måloppnåelse", strokeDash: "1 3", colour: "#FD9C00" },
        { text: "Lav måloppnåelse", strokeDash: "8 8", colour: "#E30713" },
      ],
      { fontSize: 24, fontFamily: "Plus Jakarta Sans", fontWeight: 500 },
    ),
    font: {
      fontSize: 24,
      fontWeight: 700,
      fontFamily: "Plus Jakarta Sans",
    },
    yAxisText: "Antall indikatorer",
    startYear: 2017,
    endYear: 2022,
    yMin: 0,
    normalise: false,
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

        <Box margin={4}>
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
                      <Text
                        x={"10%"}
                        y={"20%"}
                        width={500}
                        verticalAnchor="start"
                        style={{ fontWeight: 700, fontSize: 10 }}
                      >
                        Oppdatert: xx.xx.xx
                      </Text>
                      <Text
                        x={"10%"}
                        y={"-50%"}
                        width={200}
                        verticalAnchor="start"
                        style={{ fontWeight: 700, fontSize: 24 }}
                      >
                        {selectedTreatmentUnits[0]}
                      </Text>
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
                <Text
                  x={"10%"}
                  y={50}
                  width={500}
                  verticalAnchor="start"
                  style={{ fontWeight: 700, fontSize: 24 }}
                >
                  Tilknyttede enheter
                </Text>
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
                <Text
                  x={"10%"}
                  y={50}
                  width={500}
                  verticalAnchor="start"
                  style={{ fontWeight: 700, fontSize: 24 }}
                >
                  Utvikling over tid
                </Text>
                <ThemeProvider theme={lineChartTheme}>
                  <IndicatorLinechart {...indicatorParams} />
                </ThemeProvider>
                <FormControlLabel
                  control={<Checkbox onChange={checkNormalise} />}
                  label="Vis andel"
                  sx={{ margin: 2 }}
                />
              </ItemBox>
            </Grid>

            <Grid xs={12}>
              <ExpandableItemBox collapsedHeight={boxMaxHeight}>
                <Text
                  x={"10%"}
                  y={50}
                  width={500}
                  verticalAnchor="start"
                  style={{ fontWeight: 700, fontSize: 24 }}
                >
                  Fagområder
                </Text>
                <MedfieldTable {...medfieldTableProps} />
              </ExpandableItemBox>
            </Grid>

            <Grid xs={6}>
              <ExpandableItemBox collapsedHeight={boxMaxHeight}>
                <Text
                  x={"10%"}
                  y={50}
                  width={500}
                  verticalAnchor="start"
                  style={{ fontWeight: 700, fontSize: 24 }}
                >
                  Fagområder (dekningsgrad)
                </Text>
                <MedfieldTable {...medfieldTablePropsDG} />
              </ExpandableItemBox>
            </Grid>

            <Grid xs={6}>
              <ExpandableItemBox collapsedHeight={boxMaxHeight}>
                <Text
                  x={"10%"}
                  y={50}
                  width={500}
                  verticalAnchor="start"
                  style={{ fontWeight: 700, fontSize: 24 }}
                >
                  Siste års måloppnåelse
                </Text>
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

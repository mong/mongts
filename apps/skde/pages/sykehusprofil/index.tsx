import React, { useEffect, useState } from "react";
import { Text } from "@visx/text";
import {
  useQueryParam,
  DelimitedArrayParam,
  withDefault,
} from "use-query-params";
import { UseQueryResult } from "@tanstack/react-query";
import { Header } from "../../src/components/HospitalProfile";
import {
  skdeTheme,
  FilterSettingsValue,
  FilterMenu,
  SelectedFiltersSection,
  useUnitNamesQuery,
  LowLevelIndicatorList,
  LineStyles,
} from "qmongjs";
import { Footer } from "../../src/components/Footer";
import { getTreatmentUnitsTree } from "qmongjs/src/components/FilterMenu/TreatmentQualityFilterMenu/filterMenuOptions";
import { TreeViewFilterSection } from "qmongjs/src/components/FilterMenu/TreeViewFilterSection";
import {
  Toolbar,
  styled,
  Typography,
  Checkbox,
  FormControlLabel,
  ThemeProvider,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FilterSettings } from "qmongjs/src/components/FilterMenu/FilterSettingsContext";
import { useRouter } from "next/router";
import IndicatorLinechart, {
  IndicatorLinechartParams,
} from "../../src/charts/IndicatorLinechart";
import {
  MedfieldTable,
  MedfieldTableProps,
} from "../../src/components/MedfieldTable";
import { useScreenSize } from "@visx/responsive";

const lineChartTheme = {
  lineChartBackground: {
    fill: "#FFFFFF",
    rx: 25,
    ry: 25,
  },
};

const StyledToolbarMiddle = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.hospitalProfileHeader.light,
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
}));

const ItemBox = styled(Box)(() => ({
  backgroundColor: "white",
  borderRadius: 24,
}));

export const Skde = (): JSX.Element => {
  const treatmentUnitsKey = "selected_treatment_units";

  // Need this to get filter options from the URL
  const router = useRouter();

  const [prevReady, setPrevReady] = useState(router.isReady);
  const prerenderFinished = prevReady !== router.isReady;

  useEffect(() => {
    setPrevReady(router.isReady);
  }, [router.isReady]);

  // Current unit name and its setter function
  const [selectedTreatmentUnits, setSelectedTreatmentUnits] = useQueryParam(
    treatmentUnitsKey,
    withDefault(DelimitedArrayParam, ["Nasjonalt"]),
  );

  // Get unit names

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "all",
    "caregiver",
    "ind",
  );

  const treatmentUnits = getTreatmentUnitsTree(unitNamesQuery);

  // Make sure everything is good to go
  const [prevApiQueryLoading, setPrevApiQueryLoading] = useState(
    unitNamesQuery.isLoading,
  );
  const apiQueriesCompleted = prevApiQueryLoading && !unitNamesQuery.isLoading;

  const shouldRefreshInitialState = prerenderFinished || apiQueriesCompleted;

  useEffect(() => {
    setPrevApiQueryLoading(unitNamesQuery.isLoading);
  }, [unitNamesQuery.isLoading]);

  // Callback function for updating the filter menu
  const handleChange = (filterInput: FilterSettings) => {
    const newUnit = filterInput.map
      .get(treatmentUnitsKey)
      .map((el) => el.value);

    setSelectedTreatmentUnits(newUnit);
  };

  const { width, height } = useScreenSize({ debounceTime: 150 });

  // Props
  const indicatorParams: IndicatorLinechartParams = {
    unitNames: [selectedTreatmentUnits[0]],
    context: "caregiver",
    type: "ind",
    width: width*0.9,
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
    width: 800,
    treatmentYear: 2022,
  };

  const medfieldTablePropsDG: MedfieldTableProps = {
    unitNames: [selectedTreatmentUnits[0]],
    context: "caregiver",
    type: "dg",
    width: 800,
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

  return (
    <ThemeProvider theme={skdeTheme}>
      <Header />
      <Box sx={{ bgcolor: skdeTheme.palette.background.paper }}>
        <StyledToolbarMiddle className="header-middle">
          <Grid container spacing={2} rowSpacing={6}>
            <Grid xs={12}>
              <Typography variant="h1">Sykehusprofil</Typography>
            </Grid>
            <Grid xs={12}>
              <Typography variant="h6">Resultater fra sykehus</Typography>
            </Grid>
            <Grid xs={6}>
              <FilterMenu
                refreshState={shouldRefreshInitialState}
                onSelectionChanged={handleChange}
                onFilterInitialized={() => {
                  return null;
                }}
              >
                <SelectedFiltersSection
                  accordion="false"
                  filterkey="selectedfilters"
                  sectionid="selectedfilters"
                  sectiontitle="Valgte filtre"
                />
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
                />
              </FilterMenu>
            </Grid>
          </Grid>
        </StyledToolbarMiddle>

        <Box margin={4}>
          <Grid container spacing={2}>
            <Grid xs={6}>
              <ItemBox>
                <Text
                  x={"10%"}
                  y={50}
                  width={500}
                  verticalAnchor="start"
                  style={{ fontWeight: 700, fontSize: 24 }}
                >
                  {selectedTreatmentUnits[0]}
                </Text>
              </ItemBox>
            </Grid>
            <Grid xs={6}>
              <ItemBox>
                <Text
                  x={"10%"}
                  y={50}
                  width={500}
                  verticalAnchor="start"
                  style={{ fontWeight: 700, fontSize: 24 }}
                >
                  Utvalgte indikatorer
                </Text>
              </ItemBox>
            </Grid>

            <Grid xs={12}>
              <ItemBox>
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

            <Grid xs={6}>
              <ItemBox>
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
              </ItemBox>
            </Grid>

            <Grid xs={6}>
              <ItemBox>
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
              </ItemBox>
            </Grid>

            <Grid xs={12}>
              <ItemBox>
                <Box margin={2}>
                  <Text
                    x={"10%"}
                    y={50}
                    width={500}
                    verticalAnchor="start"
                    style={{ fontWeight: 700, fontSize: 24 }}
                  >
                    Indikatorer med lavt målnivå
                  </Text>
                  <LowLevelIndicatorList
                    context={"caregiver"}
                    type={"ind"}
                    unitNames={[selectedTreatmentUnits[0] || "Nasjonalt"]}
                  />
                </Box>
              </ItemBox>
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Skde;

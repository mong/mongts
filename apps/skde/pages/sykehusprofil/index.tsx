import { ThemeProvider } from "@mui/material";
import React from "react";
import { LineStyles } from "qmongjs";
import { Text } from "@visx/text";
import { useQueryParam } from "use-query-params";
import { UseQueryResult } from "@tanstack/react-query";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Header } from "../../src/components/HospitalProfile";
import {
  skdeTheme,
  FilterSettingsValue,
  FilterMenu,
  SelectedFiltersSection,
} from "qmongjs";
import { Footer } from "../../src/components/Footer";
import { getTreatmentUnitsTree } from "qmongjs/src/components/FilterMenu/TreatmentQualityFilterMenu/filterMenuOptions";
import { TreeViewFilterSection } from "qmongjs/src/components/FilterMenu/TreeViewFilterSection";
import { DelimitedArrayParam } from "use-query-params";
import { withDefault } from "use-query-params";
import { Toolbar, styled, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FilterSettings } from "qmongjs/src/components/FilterMenu/FilterSettingsContext";

import IndicatorLinechart, {
  IndicatorLinechartParams,
} from "../../src/charts/IndicatorLinechart";

import { useUnitNamesQuery, LowLevelIndicatorList } from "qmongjs";

import {
  MedfieldTable,
  MedfieldTableProps,
} from "../../src/components/MedfieldTable";

const theme = {
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

export const Skde = (): JSX.Element => {
  const treatmentUnitsKey = "selected_treatment_units";

  const [selectedTreatmentUnits, setSelectedTreatmentUnits] = useQueryParam(
    treatmentUnitsKey,
    withDefault(DelimitedArrayParam, ["Nasjonalt"]),
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "all",
    "caregiver",
    "ind",
  );

  const treatmentUnits = getTreatmentUnitsTree(unitNamesQuery);

  const handleChange = (filterInput: FilterSettings) => {
    const newUnit = filterInput.map
      .get(treatmentUnitsKey)
      .map((el) => el.value);

    setSelectedTreatmentUnits(newUnit);
  };

  const indicatorParams: IndicatorLinechartParams = {
    unitNames: [selectedTreatmentUnits[0]],
    context: "caregiver",
    type: "ind",
    width: 800,
    height: 400,
    lineStyles: new LineStyles(
      [
        { text: "Høy måloppnåelse", strokeDash: "0", colour: "#3BAA34" },
        { text: "Moderat måloppnåelse", strokeDash: "1 3", colour: "#FD9C00" },
        { text: "Lav måloppnåelse", strokeDash: "8 8", colour: "#E30713" },
      ],
      { fontSize: 11, fontFamily: "Plus Jakarta Sans", fontWeight: 500 },
    ),
    font: {
      fontSize: 12,
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

  //State logic for normalising the line plot
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
              refreshState={true}
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
                refreshState={false}
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

      <div>
        <Text
          x={"10%"}
          y={50}
          width={500}
          verticalAnchor="start"
          style={{ fontWeight: 700, fontSize: 24 }}
        >
          {selectedTreatmentUnits[0]}
        </Text>
      </div>
      <div>
        <Text
          x={"10%"}
          y={50}
          width={500}
          verticalAnchor="start"
          style={{ fontWeight: 700, fontSize: 24 }}
        >
          Utvikling over tid
        </Text>
      </div>
      <div>
        <ThemeProvider theme={theme}>
          <IndicatorLinechart {...indicatorParams} />
        </ThemeProvider>
      </div>
      <div>
        <FormControlLabel
          control={<Checkbox onChange={checkNormalise} />}
          label="Vis andel"
        />
      </div>
      <div>
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
      </div>
      <div>
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
      </div>
      <div>
        <LowLevelIndicatorList
          context={"caregiver"}
          type={"ind"}
          unitNames={[selectedTreatmentUnits[0] || "Nasjonalt"]}
        />
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default Skde;

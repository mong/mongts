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

  const handleChange = (a) => {
    const newUnit = a.map
      .get(treatmentUnitsKey)
      .map((el) => el.value)
      .filter((el) => el !== "Nasjonalt");

    let retVal: string[];

    newUnit.length === 0 ? (retVal = ["Nasjonalt"]) : (retVal = newUnit);

    setSelectedTreatmentUnits(retVal);
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

  //State logic for normalising the lien plot
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
          maxselections={2}
        />
      </FilterMenu>
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

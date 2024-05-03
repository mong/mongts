import { ThemeProvider } from "styled-components";
import React from "react";
import IndicatorLinechart, {
  IndicatorLinechartParams,
} from "../../src/charts/IndicatorLinechart";
import { LineStyles } from "qmongjs";
import { Text } from "@visx/text";
import { useQueryParam } from "use-query-params";
import { UseQueryResult } from "@tanstack/react-query";
import {
  SelectTreatmentUnits,
  useUnitNamesQuery,
  NestedTreatmentUnitName,
  mainQueryParamsConfig,
  validateTreatmentUnits,
  UnitNameList,
  LowLevelIndicatorList
} from "qmongjs";
import { OptsTu } from "types";
import { Checkbox, FormControlLabel } from "@mui/material";
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
  // Gjenbruk av kode fra indikatorvisning
  const queryContext = { context: "caregiver", type: "ind" };

  // Hent sykehusnavn fra et register
  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "Hjerteinfarkt",
    queryContext.context,
    queryContext.type,
  );

  const nestedUnitNames: NestedTreatmentUnitName[] | [] =
    unitNamesQuery.data?.nestedUnitNames ?? [];

  const optstu: OptsTu[] | [] = unitNamesQuery.data?.opts_tu ?? [];

  const [treatment_units, update_treatment_units] = useQueryParam(
    "selected_treatment_units",
    mainQueryParamsConfig.selected_treatment_units,
  );

  const validated_treatment_units = validateTreatmentUnits(
    treatment_units as string[],
    optstu,
  ) || ["Nasjonalt"];

  const placeholder = (
    <div>
      <i className="fas fa-search" /> Søk etter behandlingsenheter
    </div>
  );

  const indicatorParams: IndicatorLinechartParams = {
    unitNames: [validated_treatment_units[0]],
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
    unitNames: [validated_treatment_units[0]],
    context: "caregiver",
    type: "ind",
    width: 800,
    treatmentYear: 2022,
  };

  const medfieldTablePropsDG: MedfieldTableProps = {
    unitNames: [validated_treatment_units[0]],
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
    <div>
      <div>
        <Text
          x={"10%"}
          y={50}
          width={500}
          verticalAnchor="start"
          style={{ fontWeight: 700, fontSize: 24 }}
        >
          {validated_treatment_units[0]}
        </Text>
      </div>
      <div>
        <SelectTreatmentUnits
          opts={optstu}
          update_tu={update_treatment_units}
          treatment_unit={validated_treatment_units}
          placeholder={placeholder}
        />
        <UnitNameList
          nestedUnitNames={nestedUnitNames}
          treatment_units={validated_treatment_units}
          update_treatment_units={update_treatment_units}
          multiple_choice={false}
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
        <LowLevelIndicatorList context={"caregiver"} type={"ind"} unitNames={validateTreatmentUnits[0] ? validateTreatmentUnits[0] : "Nasjonalt"}/>
      </div>
    </div>
  );
};

export default Skde;

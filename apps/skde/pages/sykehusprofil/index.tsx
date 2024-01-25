import { ThemeProvider } from "styled-components";
import React from "react";
import IndicatorLinechart, {
  IndicatorLinechartParams,
} from "../../src/charts/IndicatorLinechart";
import { LineStyles, font } from "../../src/charts/LinechartBase";
import { Text } from "@visx/text";
import { useQueryParam } from "use-query-params";
import { UseQueryResult } from "@tanstack/react-query";
import SelectTreatmentUnits from "qmongjs/src/components/SelectTreatmentUnits";
import { useUnitNamesQuery } from "qmongjs/src/helpers/hooks";
import { NestedTreatmentUnitName } from "qmongjs/src/components/RegisterPage/unitnamelist/unitnamelistbody";
import { OptsTu } from "types";
import { mainQueryParamsConfig } from "qmongjs/src/app_config";
import { validateTreatmentUnits } from "qmongjs/src/helpers/functions";
import { UnitNameList } from "qmongjs/src/components/RegisterPage/unitnamelist";
import { Checkbox, FormControlLabel } from "@mui/material";

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
  );

  const placeholder = (
    <div>
      <i className="fas fa-search" /> Søk etter behandlingsenheter
    </div>
  );

  const indicatorParams: IndicatorLinechartParams = {
    unitNames: [validated_treatment_units[0]],
    unitLevel: "hospital",
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
    startYear: 2017,
    endYear: 2022,
    yMin: 0,
    normalise: false,
  };

  //State logic for normalising the lien plot
  const [normalise, setNormalise] = React.useState(indicatorParams.normalise);

  indicatorParams.normalise = normalise;

  const checkNormalise = () => {
    setNormalise(!normalise);
  };

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
        <img
          className="figure"
          alt="Figure"
          src="/img/sykehusprofil/SKDE-innholdsboks3-sykehusprofil.png"
        />
      </div>
    </div>
  );
};

export default Skde;

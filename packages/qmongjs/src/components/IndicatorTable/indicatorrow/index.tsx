import React from "react";
import { useQueryParam } from "use-query-params";

import { IndicatorValue } from "../indicatorvalue";
import { IndicatorDescription } from "../indicatordescription";
import { MaskedIndicator } from "../maskedindicator";
import { ChartRow } from "../chartrow";
import style from "./indicatorrow.module.css";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import { Description, Indicator } from "types";
import { mainQueryParamsConfig } from "../../../app_config";
import { level } from "../../../helpers/functions";

const formatIndicatorValues = (
  description: Description,
  indicator: Indicator,
  showLevelFilter: string,
  unitName: string,
  context: string
) => {
  if (!indicator) {
    return (
      <Tooltip
        title={
          "Gitt indikator har ingen data for valgt " +
          (context === "caregiver" ? "behandler" : "opptaksområde") +
          ". Dette er enten fordi " +
          (context === "caregiver"
            ? "behandler ikke har rapportert data"
            : "det ikke finnes data for valgt opptaksområdet") +
          ", eller fordi antall observasjoner er lavere enn " +
          (description.min_denominator ?? "5") +
          "."
        }
        TransitionComponent={Zoom}
      >
        <td
          key={`${description.id}_${unitName}__su`}
          className={`${
            unitName !== "Nasjonalt" ? style.selected_unit : style.nationally
          }`}
        >
          <MaskedIndicator text="Ingen Data" />
        </td>
      </Tooltip>
    );
  } else if (
    description.type === "dg_andel" ||
    description.type === "dg" ||
    description.type === "dg_beregnet_andel"
  ) {
    const level_class =
      level(indicator) !== showLevelFilter && !!showLevelFilter
        ? "filtered_level"
        : "";
    return (
      <IndicatorValue
        key={`${indicator.ind_id}_${indicator.unit_name}_${indicator.id}_su`}
        indicatorData={indicator}
        format={description.sformat !== null ? description.sformat : ",.0%"}
        td_class={`${
          indicator.unit_level !== "nation" ? "selected_unit" : "nationally"
        }`}
        level_class={level_class}
      />
    );
  } else if ((indicator.dg ?? 1) < 0.6 && indicator.unit_name !== "Nasjonalt") {
    return (
      <Tooltip
        title="Resultater fra enhet med dekningsgrad lavere enn 60 % vises ikke.      
      Dekningsgrad angir andel pasienter eller hendelser som registreres,
      i forhold til antall som skal registreres for gitt indikator. 
      Om en indikatoren har lav dekningsgrad, er det fare for at utvalget 
      er skjevt slik at resultatene kan være misvisende og medføre 
      feilaktige konklusjoner."
        TransitionComponent={Zoom}
      >
        <td
          key={`${indicator.ind_id}_${indicator.unit_name}_${indicator.id}_su`}
          className={`${
            indicator.unit_level !== "nation"
              ? style.selected_unit
              : style.nationally
          }`}
        >
          <MaskedIndicator text="Lav dg" />
        </td>
      </Tooltip>
    );
  } else if (indicator.denominator < (description.min_denominator ?? 5)) {
    return (
      <Tooltip
        title={
          "Gitt indikator for valgt " +
          (context === "caregiver" ? "behandler" : "opptaksområde") +
          " vises ikke fordi antall observasjoner er lavere enn " +
          (description.min_denominator ?? "5") +
          "."
        }
        TransitionComponent={Zoom}
      >
        <td
          key={`${indicator.ind_id}_${indicator.unit_name}_${indicator.id}_su`}
          className={`${
            indicator.unit_level !== "nation"
              ? style.selected_unit
              : style.nationally
          }`}
        >
          <MaskedIndicator text="Lav N" />
        </td>
      </Tooltip>
    );
  } else {
    const level_class =
      level(indicator) !== showLevelFilter && !!showLevelFilter
        ? "filtered_level"
        : "";
    return (
      <IndicatorValue
        key={`${indicator.ind_id}_${indicator.unit_name}_${indicator.id}_su`}
        indicatorData={indicator}
        format={description.sformat !== null ? description.sformat : ",.0%"}
        td_class={`${
          indicator.unit_level !== "nation" ? "selected_unit" : "nationally"
        }`}
        level_class={level_class}
      />
    );
  }
};

export interface IndicatorRowProps {
  context: { context: string; type: string };
  treatmantYear: number;
  description: Description;
  indicatorData: Indicator[];
  unitNames?: string[];
  medicalFieldClass?: string;
  showLevelFilter?: string;
  colspan?: number;
}

export const IndicatorRow: React.FC<IndicatorRowProps> = (props) => {
  const {
    context,
    treatmantYear,
    description,
    indicatorData,
    unitNames = ["Nasjonalt"],
    medicalFieldClass = "",
    showLevelFilter = "",
    colspan,
  } = props;
  const [selected_row, update_selected_row] = useQueryParam(
    "selected_row",
    mainQueryParamsConfig.selected_row
  );

  if (!(description && indicatorData)) {
    return null;
  }
  const ind_id = description.id;
  const tr_indicator_class = `${description.id}  ${description.rname}`;

  const indPerUnit =
    unitNames.length === 0
      ? null
      : unitNames.map((name) => {
          const filteredIndicator = indicatorData.filter(
            (ind) => ind.unit_name === name
          );
          return formatIndicatorValues(
            description,
            filteredIndicator[0],
            showLevelFilter,
            name,
            context.context
          );
        });

  // Add two day to the delivery_latest_affirm date, in case the date is set to late December.
  // Thus, if delivery_latest_affirm date is set to December 31 2020 then new date will be January 2 2021.
  // Then delivery_latest_affirm_year will be defined as 2021 - 1 = 2020.
  const delivery_latest_affirm_year = indicatorData[0].delivery_latest_affirm
    ? new Date(
        new Date(indicatorData[0].delivery_latest_affirm).setDate(
          new Date(indicatorData[0].delivery_latest_affirm).getDate() + 2
        )
      ).getFullYear() - 1
    : undefined;

  // Only define lastCompleteYear if it is before the year of the data.
  const lastCompleteYear =
    delivery_latest_affirm_year && treatmantYear > delivery_latest_affirm_year
      ? delivery_latest_affirm_year
      : undefined;

  const tr_fig =
    selected_row === ind_id ? (
      <ChartRow
        context={context}
        treatmentYear={treatmantYear}
        colspan={colspan}
        description={description}
        figure_class={medicalFieldClass}
        selectedTreatmentUnits={unitNames}
        indicatorData={indicatorData}
        update_selected_row={update_selected_row}
        lastCompleteYear={lastCompleteYear}
      />
    ) : null;

  const tr_click_handler = () => {
    update_selected_row(selected_row === ind_id ? undefined : ind_id);
  };

  return (
    <>
      <tr
        onClick={() => tr_click_handler()}
        id={`${tr_indicator_class}`}
        className={`${tr_indicator_class} ${medicalFieldClass} ${style.indicator}`}
        data-testid={`indicatorrow_${ind_id}`}
      >
        <IndicatorDescription
          description={description}
          lastCompleteYear={lastCompleteYear}
        />
        {indPerUnit}
      </tr>
      {tr_fig}
    </>
  );
};

export default IndicatorRow;

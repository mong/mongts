import style from "./indicatortableheader.module.css";
import { getUnitShortestName } from "../../../helpers/functions/getUnitName";
import { NestedTreatmentUnitName } from "types";

interface IndicatorTableHeaderProps {
  colspan: number;
  descriptionHeader?: string;
  unitNames: string[];
  national?: string;
  selection_bar_height: number | null;
  legend_height: number | null;
  treatmentYear?: number | undefined;
  nestedUnitNames?: NestedTreatmentUnitName[];
}

export const IndicatorTableHeader = (props: IndicatorTableHeaderProps) => {
  const {
    colspan = 2,
    descriptionHeader = "Kvalitetsindikatorer",
    unitNames = [],
    selection_bar_height,
    legend_height,
    treatmentYear,
    nestedUnitNames,
  } = props;

  const offset_top = `${
    (selection_bar_height ?? 0) + (legend_height ? legend_height : 0)
  }px`;
  const width_desc = colspan === 2 ? 60 : colspan === 3 ? 50 : 40;
  const width_tu = (100 - width_desc) / (colspan - 1);
  const style_ind_desc = { width: `${width_desc}%`, top: offset_top };
  const style_treatment_units = { width: `${width_tu}%`, top: offset_top };

  let shortestNames: (string | null)[] | null;

  if (nestedUnitNames) {
    shortestNames = unitNames.map((row) => {
      return getUnitShortestName(nestedUnitNames, row);
    });
  } else {
    shortestNames = null;
  }

  const treatment_unit_th = shortestNames
    ? shortestNames.map((tu) => (
        <th
          className={tu !== "nasjonalt" ? "selected_unit" : "nationally "}
          style={style_treatment_units}
          key={tu}
          data-testid={`tu_header_${tu}`}
        >
          {tu}
        </th>
      ))
    : unitNames.map((tu) => (
        <th
          className={tu !== "nasjonalt" ? "selected_unit" : "nationally "}
          style={style_treatment_units}
          key={tu}
          data-testid={`tu_header_${tu}`}
        >
          {tu}
        </th>
      ));

  return (
    <thead style={{ position: "sticky", zIndex: 1 }}>
      <tr>
        <th
          key="kvind_header"
          className={style.quality_indicator}
          style={style_ind_desc}
        >
          {treatmentYear
            ? descriptionHeader + " for " + treatmentYear.toString()
            : descriptionHeader}
        </th>
        {treatment_unit_th}
      </tr>
    </thead>
  );
};

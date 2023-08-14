import { useRef, useState } from "react";

import ChartButtons from "./chartrowbuttons";
import ChartRowDescription from "./chartrowdescription";
import Chart from "./Chart";
import { level_boundary } from "./tr_utils";
import { useQueryParam } from "use-query-params";
import { mainQueryParamsConfig } from "../../../app_config";
import { Description, Indicator } from "types";
import styles from "./chartrow.module.css";

export interface Props {
  context: { context: string; type: string };
  treatmentYear: number;
  colspan?: number;
  description: Description;
  indicatorData: Indicator[];
  figure_class?: string;
  selectedTreatmentUnits: string[];
  update_selected_row(row: string): void;
  lastCompleteYear?: number;
}

export function ChartRow(props: Props) {
  const {
    context,
    treatmentYear,
    colspan = 3,
    description,
    figure_class,
    update_selected_row,
    selectedTreatmentUnits,
    indicatorData,
    lastCompleteYear,
  } = props;

  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [chart_type = "line", update_chart_type] = useQueryParam<
    string | undefined
  >("chart_type", mainQueryParamsConfig.chart_type);
  const valid_chart_type = chart_type === "bar" ? "bar" : "line";
  const [zoom, update_zoom] = useState(false);
  const [show_level, update_show_level] = useState(
    description.level_green === null ? false : true,
  );

  const levels = level_boundary(description);
  const format = description.sformat ?? undefined;
  const max_value = description.max_value ?? undefined;

  // Use delivery_latest_update if it exists. If not, use delivery_time if it exists.
  const delivery_time = indicatorData[0].delivery_latest_update
    ? new Date(indicatorData[0].delivery_latest_update)
    : indicatorData[0].delivery_time
    ? new Date(indicatorData[0].delivery_time)
    : undefined;

  return (
    <tr className={figure_class}>
      <td colSpan={colspan}>
        <div className={styles.tr_figure}>
          <div className={styles.tr_buttons_container}>
            <ChartButtons
              svgContainer={svgContainerRef}
              show_level={show_level}
              update_show_level={update_show_level}
              zoom={zoom}
              update_zoom={update_zoom}
              update_selected_row={update_selected_row}
              description={description}
              chartType={chart_type}
              treatmentYear={treatmentYear}
              updateChartType={update_chart_type}
            />
          </div>
          <Chart
            svgContainerRef={svgContainerRef}
            context={context}
            description={description}
            chartType={valid_chart_type}
            zoom={zoom}
            showLevel={show_level}
            levels={levels}
            tickformat={format}
            treatmentYear={treatmentYear}
            selectedTreatmentUnits={selectedTreatmentUnits}
            indicatorData={indicatorData}
            max_value={max_value}
            lastCompleteYear={lastCompleteYear}
          />
          <ChartRowDescription
            description_text={description.long_description ?? ""}
            delivery_time={delivery_time}
          />
        </div>
      </td>
    </tr>
  );
}

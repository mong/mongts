import { UseQueryResult } from "@tanstack/react-query";
import { useQueryParam } from "use-query-params";
import { Description, RegisterName, Indicator, OptsTu } from "types";
import { mainQueryParamsConfig } from "../../app_config";

import LEGEND from "../TargetLevels";
import { MedicalFields } from "../MedicalFields";
import { IndicatorTable } from "../IndicatorTable";
import { useMedicalFieldsQuery } from "../../helpers/hooks";
import styles from "./registerPage.module.css";

interface AggData {
  nation: {
    filtered_by_unit: Indicator[];
    filtered_by_year: Indicator[];
  };
  filtered_by_unit: Indicator[];
  filtered_by_year: Indicator[];
  all_filtered_by_year: Indicator[];
}

export interface GraphData {
  agg_data: AggData;
  description: Description[];
}

export interface IndPerReg {
  registry_name: string;
  number_ind: number;
  indicators: Description[];
}

export interface Props {
  context: string;
  optstu: OptsTu[] | [];
  registerNames: RegisterName[];
  treatment_units: string[];
  selected_year: number;
  colspan: number;
  selection_bar_height: number | null;
  legend_height: number | null;
  update_legend_height(height: any): void;
}

interface MedicalFieldObject {
  shortName: string;
  name: string;
  registers: string[];
}

const Main = (props: Props) => {
  const {
    context,
    registerNames,
    treatment_units,
    selected_year,
    colspan,
    selection_bar_height,
    legend_height,
    update_legend_height,
  } = props;

  const [show_level_filter, update_show_level_filter] = useQueryParam<
    string | undefined
  >("level", mainQueryParamsConfig.level);
  const [clicked_med_field, update_clicked_med_field] = useQueryParam<
    string | undefined
  >("indicator", mainQueryParamsConfig.indicator);

  const medicalFieldsQuery: UseQueryResult<any, unknown> =
    useMedicalFieldsQuery();
  const registerList = registerNames.map((d: RegisterName) => d.rname);

  if (medicalFieldsQuery.isLoading) {
    return null;
  }
  const medicalFields: MedicalFieldObject[] = medicalFieldsQuery.data;
  const selectedMedicalField: string[] =
    (clicked_med_field ?? "all") === "all"
      ? registerList
      : medicalFields
          .filter(
            (field: MedicalFieldObject) =>
              field.shortName === clicked_med_field,
          )
          .flatMap((field: MedicalFieldObject) => field.registers);

  const orderedRegisterList: RegisterName[] = Array.from(
    new Set(
      medicalFields.flatMap((field: MedicalFieldObject) => field.registers),
    ),
  )
    .map((reg) => {
      return registerNames.filter((regLit) => regLit.rname === reg)[0];
    })
    .filter((data) => data);

  return (
    <>
      <LEGEND
        update_show_level_filter={update_show_level_filter}
        show_level_filter={show_level_filter}
        selection_bar_height={selection_bar_height}
        update_legend_height={update_legend_height}
        width="undefined"
      />
      <div className={styles.contentContainer}>
        <div className={styles.medFieldContainer}>
          <MedicalFields
            medicalFields={medicalFields}
            clicked_med_field={clicked_med_field ?? "all"}
            update_clicked_med_field={update_clicked_med_field}
            selection_bar_height={selection_bar_height ?? 0}
            legend_height={legend_height}
          />
        </div>
        <div className={styles.mainTableContainer}>
          <IndicatorTable
            context={context}
            tableType="allRegistries"
            registerNames={orderedRegisterList}
            unitNames={[...treatment_units, "Nasjonalt"]}
            treatmentYear={selected_year}
            colspan={colspan}
            medicalFieldFilter={selectedMedicalField}
            showLevelFilter={show_level_filter}
            selection_bar_height={selection_bar_height}
            legend_height={legend_height}
            blockTitle={orderedRegisterList.map(
              (d: RegisterName) => d.full_name,
            )}
          />
        </div>
      </div>
    </>
  );
};

export default Main;

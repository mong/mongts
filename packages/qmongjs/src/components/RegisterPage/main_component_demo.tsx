import { UseQueryResult } from "@tanstack/react-query";
import { useQueryParam } from "use-query-params";
import { Description, RegisterName, Indicator, OptsTu } from "types";
import { mainQueryParamsConfig } from "../../app_config";

import { IndicatorTable } from "../IndicatorTable";
import { useMedicalFieldsQuery } from "../../helpers/hooks";
import styles from "./registerPage.module.css";

import FilterMenu from "../FilterMenu";
import RadioGroupFilterSection from "../FilterMenu/RadioGroupFilterSection";
import SelectedFiltersSection from "../FilterMenu/SelectedFiltersSection";
import TreeViewFilterSection from "../FilterMenu/TreeViewFilterSection";
import { FilterSettingsValue } from "../FilterMenu/FilterSettingsContext";

import { maxYear, minYear, defaultYear } from "../../app_config";

import { mathClamp, validateTreatmentUnits } from "../../helpers/functions";
import { useUnitNamesQuery } from "../../helpers/hooks";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

//

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
  update_treatment_units: (units: string[] | undefined) => void;
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
    update_treatment_units,
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

  const queryContext = { context: "caregiver", type: "ind" };

  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "all",
    queryContext.context,
    queryContext.type,
  );

  const optstu: OptsTu[] | [] = unitNamesQuery.data?.opts_tu ?? [];

  // Added for filter menu year selector
  const [selectedYear, updateSelectedYear] = useQueryParam(
    "year",
    mainQueryParamsConfig.year,
  );

  const validatedSelectedYear = mathClamp(
    selected_year || defaultYear,
    minYear,
    maxYear,
  );

  const validatedTreatmentUnits = validateTreatmentUnits(
    treatment_units as string[],
    optstu,
  );

  const validYears = Array.from(Array(maxYear - minYear + 1).keys()).map(
    (v) => minYear + v,
  );

  // END: Added for filter menu year selector
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
      medicalFields.flatMap((field: MedicalFieldObject) =>
        field.registers.sort(),
      ),
    ),
  )
    .map((reg) => {
      return registerNames.filter((regLit) => regLit.rname === reg)[0];
    })
    .filter((data) => data);

  const getLevelLabel = (level: string | undefined) => {
    if (level) {
      switch (level) {
        case "H":
          return "Høy måloppnåelse";
        case "M":
          return "Moderat måloppnåelse";
        case "L":
          return "Lav måloppnåelse";
        default:
          return "Alle måloppnåelser";
      }
    } else {
      return "Alle måloppnåelser";
    }
  };

  const getMedicalFieldLabel = (medicalFieldValue: string, medicalFields: MedicalFieldObject[]) => {
    return medicalFields.find((medField) => medField.shortName === medicalFieldValue)?.name ?? "Alle fagområder";
  };


  const getTreatmentUnitsTree = (unitNamesQuery: UseQueryResult<any, unknown>) => {
    const unitnames = unitNamesQuery.data?.nestedUnitNames;
    if (unitnames === undefined)
      return { defaults: [], treedata: [] };

    return {
      defaults: [{ value: "Nasjonalt", valueLabel: "Nasjonalt" }],
      treedata: [
        { nodeValue: { value: "Nasjonalt", valueLabel: "Nasjonalt" } },
        ...unitnames.map((unit: any) => {
          return {
            nodeValue: {
              value: unit.rhf,
              valueLabel: unit.rhf,
            },
            children: unit.hf.map((hf: any) => {
              return {
                nodeValue: {
                  value: hf.hf,
                  valueLabel: hf.hf_full,
                },
                children: hf.hospital.map((hospital: any) => {
                  return {
                    nodeValue: {
                      value: hospital,
                      valueLabel: hospital,
                    },
                  };
                }),
              };
            }),
          };
        }),
      ],
    };
  };

  const levelValue = show_level_filter ?? "";
  const levelLabel = getLevelLabel(levelValue);
  const levelInitialSections: FilterSettingsValue[] = [
    { value: levelValue, valueLabel: levelLabel }
  ];

  const medicalFieldValue = clicked_med_field ?? "all";
  const medicalFieldLabel = getMedicalFieldLabel(medicalFieldValue, medicalFields);
  const medicalFieldsInitialSections: FilterSettingsValue[] = [{ value: medicalFieldValue, valueLabel: medicalFieldLabel }];

  const treatmentUnitsTreeAndDefaults = getTreatmentUnitsTree(unitNamesQuery);

  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.medFieldContainer}>
          <div
            style={{
              top: `${(legend_height ?? 0) + (selection_bar_height ?? 0)}px`,
            }}
          />
          <Container sx={{ width: 420 }}>
            <Box sx={{
              bgcolor: "#00263d",
              width: 325,
              height: 50,
              color: "white",
              display: "flex",
              justifyContent: "left",
              paddingLeft: 1,
              alignItems: "center",
              marginLeft: 3,
              boxShadow: "0 4px 5px -1px #dcdcdc",
              fontSize: "0.9rem",
              fontWeight: "bold",
            }}>
              Filtering av indikatorer
            </Box>
            <FilterMenu
              onSelectionChanged={(newSettings, oldSettings, action) => {
                switch (action.sectionSetting.key) {
                  case "fagområder":
                    {
                      const sectionValues = newSettings.map.get("fagområder");
                      if (
                        sectionValues !== undefined &&
                        sectionValues.length === 1
                      ) {
                        update_clicked_med_field(sectionValues[0].value);
                      }
                    }
                    break;

                  case "year":
                    {
                      const sectionValues = newSettings.map.get("year");
                      if (
                        sectionValues !== undefined &&
                        sectionValues.length === 1
                      ) {
                        updateSelectedYear(parseInt(sectionValues[0].value));
                      }
                    }
                    break;

                  case "level":
                    {
                      const sectionValues = newSettings.map.get("level");
                      if (
                        sectionValues !== undefined &&
                        sectionValues.length === 1
                      ) {
                        const level = sectionValues[0].value;
                        if (level !== "")
                          update_show_level_filter(sectionValues[0].value);
                        else update_show_level_filter(undefined);
                      } else {
                        update_show_level_filter(undefined);
                      }
                    }
                    break;

                  case "selected_treatment_units":
                    const selectedUnits = newSettings.map.get("selected_treatment_units");
                    update_treatment_units(selectedUnits?.map((unit) => unit.value));
                    break;

                  default:
                    break;
                }
              }}
            >
              <SelectedFiltersSection
                accordion="false"
                filterkey="selectedfilters"
                sectionid="selectedfilters"
                sectiontitle="Valgte filtre"
              />
              <RadioGroupFilterSection
                defaultvalues={[
                  {
                    value: "all",
                    valueLabel: "Alle fagområder",
                  },
                ]}
                initialselections={medicalFieldsInitialSections}
                filterkey="fagområder"
                radios={[
                  {
                    value: "all",
                    valueLabel: "Alle fagområder",
                  },
                  ...medicalFields.map((field) => {
                    return { value: field.shortName, valueLabel: field.name };
                  }),
                ]}
                sectionid="fagområder"
                sectiontitle="Fagområder"
              />
              <RadioGroupFilterSection
                defaultvalues={[
                  {
                    value: "2022",
                    valueLabel: "2022",
                  },
                ]}
                initialselections={[
                  {
                    value: validatedSelectedYear.toString(),
                    valueLabel: validatedSelectedYear.toString(),
                  },
                ]}
                filterkey="year"
                radios={[
                  ...validYears.map((field) => {
                    return {
                      value: field.toString(),
                      valueLabel: field.toString(),
                    };
                  }),
                ]}
                sectionid="year"
                sectiontitle="År"
              />
              <RadioGroupFilterSection
                defaultvalues={[{ value: "", valueLabel: "Alle måloppnåelser" }]}
                initialselections={levelInitialSections}
                filterkey="level"
                radios={[
                  { value: "", valueLabel: getLevelLabel("") },
                  { value: "H", valueLabel: getLevelLabel("H") },
                  { value: "M", valueLabel: getLevelLabel("M") },
                  { value: "L", valueLabel: getLevelLabel("L") },
                ]}
                sectionid="level"
                sectiontitle="Måloppnåelse"
              />
              <TreeViewFilterSection
                filterkey="selected_treatment_units"
                initialselections={validatedTreatmentUnits.map((unit) => ({
                  value: unit,
                  valueLabel: unit,
                }))}
                sectionid="treatmentUnits"
                sectiontitle="Behandlingsenheter"
                maxselections={5}
                treedata={treatmentUnitsTreeAndDefaults.treedata}
                defaultvalues={treatmentUnitsTreeAndDefaults.defaults}
              />
            </FilterMenu>
          </Container >
        </div >
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
      </div >
    </>
  );
};

export default Main;

import { defaultYear } from "qmongjs";
import { FilterSettingsValue } from "../components/FilterMenu/FilterSettingsContext";
import { levelKey } from "../components/FilterMenu/TreatmentQualityFilterMenu";
import { tableContextKey } from "../components/FilterMenu/TreatmentQualityFilterMenu";
import { treatmentUnitsKey } from "../components/FilterMenu/TreatmentQualityFilterMenu";
import { yearKey } from "../components/FilterMenu/TreatmentQualityFilterMenu";
import { medicalFieldKey } from "../components/FilterMenu/TreatmentQualityFilterMenu";
import { dataQualityKey } from "../components/FilterMenu/TreatmentQualityFilterMenu";
import getMedicalFieldFilterRegisters from "./getMedicalFieldFilterRegisters";

export const defaultTableContext = "caregiver";

export const valueOrDefault = (
  key: string,
  filterSettings: { map: Map<string, FilterSettingsValue[]> },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registers?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  medicalFields?: any,
) => {
  switch (key) {
    case tableContextKey: {
      return (
        filterSettings.map.get(tableContextKey)?.[0].value ??
        defaultTableContext
      );
    }
    case yearKey: {
      return filterSettings.map.get(yearKey)[0].value ?? defaultYear.toString();
    }
    case levelKey: {
      return filterSettings.map.get(levelKey)?.[0]?.value ?? undefined;
    }
    case medicalFieldKey: {
      const medicalFieldFilter = filterSettings.map
        .get(medicalFieldKey)
        ?.map((value) => value.value);
      const registerFilter = getMedicalFieldFilterRegisters(
        medicalFieldFilter,
        registers,
        medicalFields,
      );
      return registerFilter;
    }
    case treatmentUnitsKey: {
      return filterSettings.map
        .get(treatmentUnitsKey)
        .map((value) => value.value);
    }
    case dataQualityKey: {
      return filterSettings.map.get(dataQualityKey)?.[0].value === "true"
        ? true
        : false;
    }
    default:
      break;
  }
};

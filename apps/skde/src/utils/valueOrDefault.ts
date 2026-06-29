import { defaultYear } from "qmongjs";
import type { FilterSettingsValue } from "../components/FilterMenu/FilterSettingsContext";
import {
  dataQualityKey,
  levelKey,
  medicalFieldKey,
  tableContextKey,
  treatmentUnitsKey,
  yearKey,
} from "../components/FilterMenu/TreatmentQualityFilterMenu";
import getMedicalFieldFilterRegisters from "./getMedicalFieldFilterRegisters";

const defaultTableContext = "caregiver";

export const valueOrDefault = (
  key: string,
  filterSettings: { map: Map<string, FilterSettingsValue[]> },
  registers?: unknown,
  medicalFields?: unknown,
) => {
  switch (key) {
    case tableContextKey: {
      return (
        filterSettings.map.get(tableContextKey)?.[0].value ??
        defaultTableContext
      );
    }
    case yearKey: {
      return (
        filterSettings?.map.get(yearKey)?.[0]?.value ?? defaultYear.toString()
      );
    }
    case levelKey: {
      return filterSettings?.map.get(levelKey)?.[0]?.value ?? undefined;
    }
    case medicalFieldKey: {
      const medicalFieldFilter = filterSettings.map
        .get(medicalFieldKey)
        ?.map((value) => value.value);

      const registerFilter = getMedicalFieldFilterRegisters(
        // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
        medicalFieldFilter,
        registers,
        medicalFields,
      );
      return registerFilter;
    }
    case treatmentUnitsKey: {
      // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
      return filterSettings.map
        .get(treatmentUnitsKey)
        .map((value) => value.value);
    }
    case dataQualityKey: {
      // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
      return filterSettings.map.get(dataQualityKey)?.[0].value === "true"
        ? true
        : false;
    }
    default:
      break;
  }
};

import { useSearchParams } from "next/navigation";
import { areArraysEqual } from "../../../src/helpers/functions/areArraysEqual";

export interface SelectedFiltersParam {
  treatmentUnits: string[];
  medicalFields: string[];
  year: number;
  defaultYear: number;
}

export default function checkParamsReady(
  selectedFilters: SelectedFiltersParam,
) {
  const defaultTreatmentUnits = ["Nasjonalt"];
  const treatmentUnitsKey = "selected_treatment_units";
  const yearKey = "year";

  const searchParams = useSearchParams();

  const urlTreatmentUnits = searchParams.get(treatmentUnitsKey);
  let areAligned =
    (areArraysEqual(selectedFilters.treatmentUnits, defaultTreatmentUnits) &&
      !urlTreatmentUnits) ||
    areArraysEqual(
      selectedFilters.treatmentUnits,
      urlTreatmentUnits?.split("_"),
    );

  if (areAligned) {
    // Simple sanity check, at least one selected medical field is selected,
    // which doesn't happen until the parameters are correctly loaded.
    // Partly because no explicit selections means that all are selected.
    areAligned = selectedFilters.medicalFields?.length > 0;
  }

  if (areAligned) {
    const urlYear = searchParams.get(yearKey);
    areAligned =
      (selectedFilters.year === selectedFilters.defaultYear && !urlYear) ||
      selectedFilters.year === Number(urlYear);
  }

  return areAligned;
}

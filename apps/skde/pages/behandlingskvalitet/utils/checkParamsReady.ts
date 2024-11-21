import { areArraysEqual } from "../../../src/helpers/functions/areArraysEqual";
import { useEffect, useState } from "react";

export interface SelectedFiltersParam {
  treatmentUnits: string[];
  medicalFields: string[];
  year: number;
  defaultYear: number;
}

const defaultTreatmentUnits = ["Nasjonalt"];
const treatmentUnitsKey = "selected_treatment_units";
const yearKey = "year";

export default function checkParamsReady(
  selectedFilters: SelectedFiltersParam,
) {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!isMounted) {
    return false;
  }

  if (typeof window === "undefined") {
    return false;
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const urlTreatmentUnits = urlParams.get(treatmentUnitsKey);
  const urlYear = urlParams.get(yearKey);

  let areAligned: boolean =
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
    areAligned =
      !!selectedFilters.medicalFields &&
      selectedFilters.medicalFields.length > 0;
  }

  if (areAligned) {
    areAligned =
      (selectedFilters.year === selectedFilters.defaultYear && !urlYear) ||
      selectedFilters.year === Number(urlYear);
  }

  return areAligned;
}

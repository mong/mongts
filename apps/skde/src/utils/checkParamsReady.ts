import { areArraysEqual } from "../helpers/functions/areArraysEqual";
import { useEffect, useState } from "react";

interface SelectedFiltersParam {
  treatmentUnits: string[];
  treatmentUnitsKey: string;
  defaultTreatmentUnits: string[];
  year: number;
  yearKey: string;
  defaultYear: number;
  medicalFields: string[];
}

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
  const urlTreatmentUnits = urlParams.get(selectedFilters.treatmentUnitsKey);
  const urlYear = urlParams.get(selectedFilters.yearKey);

  let areAligned: boolean =
    (areArraysEqual(
      selectedFilters.treatmentUnits,
      selectedFilters.defaultTreatmentUnits,
    ) &&
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

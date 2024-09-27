import { NestedTreatmentUnitName } from "types";

export const getUnitFullName = (
  nestedUnitNames: NestedTreatmentUnitName[],
  unitShortName: string,
) => {
  if (!nestedUnitNames || !unitShortName) {
    return null;
  }

  // Check if unit is a RHF
  const isRHF = nestedUnitNames.map((row) => row.rhf).includes(unitShortName);

  if (isRHF) {
    return unitShortName;
  }

  // Check if unit is a HF
  const HFs = nestedUnitNames.map((row) => row.hf).flat();
  const isHF = HFs.map((row) => row.hf).includes(unitShortName);

  if (isHF) {
    return HFs.filter((row) => {
      return row.hf === unitShortName;
    })[0].hf_full;
  }

  // Check if unit is a hospital?
  return unitShortName;
};

export const getUnitShortestName = (
  nestedUnitNames: NestedTreatmentUnitName[],
  unitShortName: string,
) => {
  if (!nestedUnitNames || !unitShortName) {
    return null;
  }

  // Check if unit is a RHF
  const isRHF = nestedUnitNames.map((row) => row.rhf).includes(unitShortName);

  if (isRHF) {
    return nestedUnitNames.filter((row) => {
      return row.rhf === unitShortName;
    })[0].rhf_shortest;
  }

  // Check if unit is a HF
  const HFs = nestedUnitNames.map((row) => row.hf).flat();
  const isHF = HFs.map((row) => row.hf).includes(unitShortName);

  if (isHF) {
    return HFs.filter((row) => {
      return row.hf === unitShortName;
    })[0].hf_shortest;
  }

  // Check if unit is a hospital?
  return unitShortName;
};

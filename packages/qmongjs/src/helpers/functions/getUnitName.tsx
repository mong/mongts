import type { NestedTreatmentUnitName } from "types";

export const getUnitFullName = (
  nestedUnitNames: NestedTreatmentUnitName[],
  unitShortName: string,
) => {
  if (!nestedUnitNames || !unitShortName) {
    return null;
  }

  // Check if unit is a RHF
  const isRHF = nestedUnitNames.map((row) => row.rhf).includes(unitShortName);
  console.log("isRHF", isRHF);
  if (isRHF) {
    return unitShortName;
  }

  // Check if unit is a HF
  const HFs = nestedUnitNames.flatMap((row) => row.hf);
  const isHF = HFs.map((row) => row.hf).includes(unitShortName);

  if (isHF) {
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    return HFs.find((row) => row.hf === unitShortName)!.hf_full;
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
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    return nestedUnitNames.find((row) => row.rhf === unitShortName)!
      .rhf_shortest;
  }

  // Check if unit is a HF
  const HFs = nestedUnitNames.flatMap((row) => row.hf);
  const isHF = HFs.map((row) => row.hf).includes(unitShortName);

  if (isHF) {
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    return HFs.find((row) => row.hf === unitShortName)!.hf_shortest;
  }

  // Check if unit is a hospital?
  return unitShortName;
};

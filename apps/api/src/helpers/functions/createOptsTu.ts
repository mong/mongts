import { OptsTu, TuName } from "types";

export const createOptsTu = (
  distinctUnitNames: { unit_name: string }[],
  allUnitNames: TuName[],
): OptsTu[] => {
  const dunArray = distinctUnitNames.map((names) => names.unit_name);

  const opts_hosp = allUnitNames
    .filter((unitName) => dunArray.includes(unitName.hospital))
    .map((unitName) => {
      return {
        label: unitName.hospital,
        value: unitName.hospital,
      };
    });
  const opts_hf = Array.from(
    new Set(
      allUnitNames
        .filter((unitName) => dunArray.includes(unitName.hf))
        .map((unitName) => unitName.hf),
    ),
  ).map((unitName) => {
    return {
      label: unitName,
      value: unitName,
    };
  });
  const opts_rhf = Array.from(
    new Set(
      allUnitNames
        .filter((unitName) => dunArray.includes(unitName.rhf))
        .map((unitName) => unitName.rhf),
    ),
  ).map((unitName) => {
    return {
      label: unitName,
      value: unitName,
    };
  });

  const opts_tu: OptsTu[] = [
    { label: "Sykehus", options: opts_hosp },
    { label: "HF", options: opts_hf },
    { label: "RHF", options: opts_rhf },
  ];

  return opts_tu;
};

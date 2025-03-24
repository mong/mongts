export const validateTreatmentUnits = function (
  treatment_units: string[],
  valid_treatment_units: {
    label: string;
    options: { value: string; label: string }[];
  }[],
) {
  if (!treatment_units || valid_treatment_units.length === 0) {
    return [];
  }
  const unitsHosp = treatment_units
    .filter((unit) =>
      valid_treatment_units
        .find((opts) => opts.label === "Sykehus")!
        .options.map((hospName) => hospName.value)
        .includes(unit),
    )
    .sort();

  const unitsHF = treatment_units
    .filter((unit) =>
      valid_treatment_units
        .find((opts) => opts.label === "HF")!
        .options.map((HFName) => HFName.value)
        .includes(unit),
    )
    .sort();

  const unitsRHF = treatment_units
    .filter((unit) =>
      valid_treatment_units
        .find((opts) => opts.label === "RHF")!
        .options.map((RHFName) => RHFName.value)
        .includes(unit),
    )
    .sort();

  return unitsHosp.concat(unitsHF, unitsRHF);
};

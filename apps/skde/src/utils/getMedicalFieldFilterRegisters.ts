import { decodeRegisterQueryParam } from "qmongjs";

/**
 * Get the register names for the selected medical fields and registers
 *
 * @param medicalFieldFilter Array of medical field and register names
 * @returns Array of register names
 */
export default function getMedicalFieldFilterRegisters(
  medicalFieldFilter: string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registers: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  medicalFields: any,
) {
  if (!Array.isArray(medicalFields) || !Array.isArray(registers)) {
    return [];
  }

  let registerFilter: string[];

  if (!Array.isArray(medicalFieldFilter) || medicalFieldFilter[0] === "all") {
    registerFilter = registers.map((register) => register.rname);
  } else {
    const selectedMedicalFields = medicalFields.filter((field) =>
      medicalFieldFilter.includes(field.shortName),
    );
    const selectedMedicalFieldNames = selectedMedicalFields.map(
      (field) => field.shortName,
    );
    const selectedRegisters = medicalFieldFilter.filter(
      (name) => !selectedMedicalFieldNames.includes(name),
    );
    registerFilter = Array.from(
      new Set<string>([
        ...selectedMedicalFields.flatMap((field) => field.registers),
        ...selectedRegisters.map((register) =>
          decodeRegisterQueryParam(register),
        ),
      ]),
    );
  }

  return registerFilter;
}

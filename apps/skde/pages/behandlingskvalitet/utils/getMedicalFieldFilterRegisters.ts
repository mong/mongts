  import { decodeRegisterQueryParam } from "qmongjs"; 

/**
   * Get the register names for the selected medical fields and registers
   *
   * @param medicalFieldFilter Array of medical field and register names
   * @returns Array of register names
   */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function getMedicalFieldFilterRegisters(medicalFieldFilter: string[], registers: any, medicalFields: any) {
    let registerFilter: string[];

    if (!medicalFieldFilter || medicalFieldFilter[0] === "all") {
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
  };
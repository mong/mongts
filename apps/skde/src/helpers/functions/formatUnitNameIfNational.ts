/**
 * Format unit name if unit name is 'Nasjonalt'.
 * @param {string} unitName - Unit name to be formatted.
 * @param {boolean} firstLettetUpperCase - Should the first letter of the formatted unit name be upper cased.
 * @returns {string} Formatted unit name.
 */
export const formatUnitNameIfNational = (
  unitName: string,
  firstLettetUpperCase: boolean,
) => {
  let formattedUnitName = unitName;

  if (unitName === "Nasjonalt" && firstLettetUpperCase) {
    formattedUnitName = "Hele landet";
  } else if (unitName === "Nasjonalt" && !firstLettetUpperCase) {
    formattedUnitName = "hele landet";
  }

  return formattedUnitName;
};

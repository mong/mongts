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

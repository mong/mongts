import { RegisterData, IndicatorData, DataPoint, Registry } from "types";

export const nestedData = (
  registries: Registry[],
  indicators: IndicatorData[],
  aggdata: DataPoint[],
  medfields: { medfield_id: number; registry_id: number }[],
): RegisterData[] => {
  const allIndicators = indicators.reduce((acc, cur) => {
    const currentDatapoints = aggdata
      .filter((x) => x.indicatorID === cur.indicatorID)
      .filter(
        (x) =>
          cur.minDenominator === null ||
          x.denominator >= cur.minDenominator ||
          cur.indType === "dg_andel",
      );

    if (currentDatapoints.length > 0) {
      const entry = {
        ...cur,
        data: currentDatapoints,
      };
      acc = [...acc, entry];
    }
    return acc;
  }, [] as IndicatorData[]);

  /* Create nested data */
  const mydata = registries.reduce((acc, cur) => {
    const myIndicators = allIndicators.filter(
      (x) => x.registerID === cur.registerID,
    );
    const medfieldList = medfields
      .filter((el) => el.registry_id === cur.registerID)
      .map((element) => element.medfield_id);

    if (myIndicators.length > 0) {
      const entry = {
        ...cur,
        medfieldID: medfieldList,
        indicatorData: myIndicators,
      };

      acc = [...acc, entry];
    }
    return acc;
  }, [] as RegisterData[]);

  return mydata;
};

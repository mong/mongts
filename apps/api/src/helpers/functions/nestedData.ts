import { RegisterData, IndicatorData, DataPoint, Registry } from "types";

export const nestedData = (
  registries: Registry[],
  indicators: IndicatorData[],
  aggdata: DataPoint[],
): RegisterData[] => {
  const allIndicators = indicators.reduce((acc, cur) => {
    const currentDatapoints = aggdata.filter(
      (x) => x.indicatorID === cur.indicatorID,
    );

    if (currentDatapoints.length > 0) {
      const entry = {
        indicatorID: cur.indicatorID,
        indicatorTitle: cur.indicatorTitle,
        levelGreen: cur.levelGreen,
        levelYellow: cur.levelYellow,
        levelDirection: cur.levelDirection,
        minDenominator: cur.minDenominator,
        minValue: cur.minValue,
        maxValue: cur.maxValue,
        shortDescription: cur.shortDescription,
        longDescription: cur.longDescription,
        indType: cur.indType,
        sortingName: cur.sortingName,
        format: cur.format,
        registerID: cur.registerID,
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

    const entry = {
      registerFullName: cur.registerFullName,
      registerName: cur.registerName,
      registerShortName: cur.registerShortName,
      registerID: cur.registerID,
      medfieldID: cur.medfieldID,
      indicatorData: myIndicators,
    };

    acc = [...acc, entry];
    return acc;
  }, [] as RegisterData[]);

  return mydata;
};

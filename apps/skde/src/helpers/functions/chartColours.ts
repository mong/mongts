import { Dispatch, SetStateAction } from "react";

// Generated with https://medialab.github.io/iwanthue/ except for chartColours[0].
// Settings:
//  H: [0, 360]
//  C: [40, 70]
//  L: [15, 85]
//  20 colours with k-Means
//  Colourblind friendly
const chartColours = [
  "#00263d",
  "#d38241",
  "#6971d7",
  "#92b540",
  "#583788",
  "#57c26a",
  "#bf72ca",
  "#507f30",
  "#d56cad",
  "#60b878",
  "#8a2962",
  "#43c8ac",
  "#de595a",
  "#628ed6",
  "#cd9c2e",
  "#d4557f",
  "#989743",
  "#ac424f",
  "#be9248",
  "#c1542e",
  "#99472b",
];

const getChartColour = (i: number) => {
  return chartColours[i % chartColours.length];
};

export type ColourMap = { unitName: string; colour: string };

export const updateColourMap = (
  colourMap: ColourMap[],
  setColourMap: Dispatch<SetStateAction<ColourMap[]>>,
  newUnits: string[],
) => {
  newUnits.map((unit) => {
    if (!colourMap.map((row) => row.unitName).includes(unit)) {
      colourMap.push({
        unitName: unit,
        colour: getChartColour(colourMap.length),
      });
      setColourMap(colourMap);
    }
  });
};

export const getSortedList = (
  colourMap: ColourMap[],
  selectedTreatmentUnits: string[],
  value: "units" | "colours",
) => {
  const sortedMap = colourMap
    .filter((el) => selectedTreatmentUnits.includes(el.unitName))
    .sort(
      (a: ColourMap, b: ColourMap) =>
        selectedTreatmentUnits.indexOf(a.unitName) -
        selectedTreatmentUnits.indexOf(b.unitName),
    );

  if (value === "units") {
    return sortedMap.map((el) => el.unitName);
  } else if (value === "colours") {
    return sortedMap.map((el) => el.colour);
  } else return [];
};

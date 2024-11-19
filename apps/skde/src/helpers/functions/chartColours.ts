import { Dispatch, SetStateAction } from "react";

const chartColours = [
  "#00263d",
  "#4F9A94",
  "#90CAF9",
  "#B0BEC5",
  "#FFE082",
  "#2962FF",
  "#CE93D8",
  "#9C786C",
  "#BCAAA4",
  "#F8BBD0",
  "#9FA8DA",
  "#80DEEA",
  "#A5D6A7",
  "#E6EE9C",
  "#FFAB91",
  "#78909C",
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

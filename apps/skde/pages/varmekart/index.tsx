import React from "react";
import { HeatMap, HeatMapColumn } from "../../src/charts/HeatMap";

const width = 400;
const gap = 5;

const binData: HeatMapColumn[] = [
  {
    bin: 0,
    bins: [
      { bin: 0, count: 1 },
      { bin: 1, count: 2 },
      { bin: 2, count: 1 },
      { bin: 3, count: 2 },
    ],
  },
  {
    bin: 1,
    bins: [
      { bin: 0, count: 0 },
      { bin: 1, count: 2 },
      { bin: 2, count: 1 },
      { bin: 3, count: 2 },
    ],
  },
  {
    bin: 2,
    bins: [
      { bin: 0, count: 0 },
      { bin: 1, count: 1 },
      { bin: 2, count: 0 },
      { bin: 3, count: 0 },
    ],
  },
  {
    bin: 3,
    bins: [
      { bin: 0, count: 0 },
      { bin: 1, count: 2 },
      { bin: 2, count: 2 },
      { bin: 3, count: 2 },
    ],
  },
  {
    bin: 4,
    bins: [
      { bin: 0, count: 0 },
      { bin: 1, count: 2 },
      { bin: 2, count: 1 },
      { bin: 3, count: 2 },
    ],
  },
];

export const Skde = (): JSX.Element => {
  return (
    <div>
      <HeatMap data={binData} width={width} separation={gap}></HeatMap>
    </div>
  );
};

export default Skde;

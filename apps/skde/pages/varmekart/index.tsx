import React from "react";
import { HeatMap } from "../../src/charts/HeatMap";

const box_size = 400;

export const Skde = (): JSX.Element => {
  return (
    <div>
      <HeatMap width={box_size} height={box_size}></HeatMap>
    </div>
  );
};

export default Skde;

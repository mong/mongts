import React from "react";
import Example from "../../src/charts/HeatMap";

const box_size = 500;

export const Skde = (): JSX.Element => {
  return (
    <div>
      <Example width={box_size} height={box_size}></Example>
    </div>
  );
};

export default Skde;

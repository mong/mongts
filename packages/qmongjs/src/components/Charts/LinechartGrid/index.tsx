import React from "react";

type LinechartGridProps = {
  xStart: number;
  xStop: number;
  yStart: number;
  yStop: number;
  levelGreen: number;
  levelYellow: number;
  levelDirection: number;
};

export const LinechartGrid = (props: LinechartGridProps) => {
  const {
    xStart,
    xStop,
    yStart,
    yStop,
    levelGreen,
    levelYellow,
    levelDirection,
  } = props;

  if (levelDirection === 1) {
    return (
      <React.Fragment>
        <rect
          x={xStart}
          width={xStop - xStart}
          y={yStart}
          height={levelGreen - yStart}
          fill="green"
          opacity={"50%"}
        />

        <rect
          x={xStart}
          width={xStop - xStart}
          y={levelGreen}
          height={levelYellow - levelGreen}
          fill="yellow"
          opacity={"50%"}
        />

        <rect
          x={xStart}
          width={xStop - xStart}
          y={levelYellow}
          height={yStop - levelYellow}
          fill="red"
          opacity={"50%"}
        />
      </React.Fragment>
    );
  } else if (levelDirection === 0) {
    return (
      <React.Fragment>
        <rect
          x={xStart}
          width={xStop - xStart}
          y={yStart}
          height={levelYellow - yStart}
          fill="red"
          opacity={"50%"}
        />

        <rect
          x={xStart}
          width={xStop - xStart}
          y={levelYellow}
          height={levelGreen - levelYellow}
          fill="yellow"
          opacity={"50%"}
        />

        <rect
          x={xStart}
          width={xStop - xStart}
          y={levelGreen}
          height={yStop - levelGreen}
          fill="green"
          opacity={"50%"}
        />
      </React.Fragment>
    );
  } else {
    return null;
  }
};

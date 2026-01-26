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

  const opacity = "100%";

  if (levelDirection === 1) {
    return (
      <React.Fragment>
        <rect
          x={xStart}
          width={xStop - xStart}
          y={yStart}
          height={levelGreen - yStart}
          fill="#EAF6EB"
          opacity={opacity}
        />

        <rect
          x={xStart}
          width={xStop - xStart}
          y={levelGreen}
          height={levelYellow - levelGreen}
          fill="#FFEFC7"
          opacity={opacity}
        />

        <rect
          x={xStart}
          width={xStop - xStart}
          y={levelYellow}
          height={yStop - levelYellow}
          fill="#FFE5E2"
          opacity={opacity}
        />

        <line
          x1={xStart}
          y1={levelGreen}
          x2={xStop}
          y2={levelGreen}
          stroke="#66CCA1"
          strokeWidth={"2px"}
        />
        <line
          x1={xStart}
          y1={levelYellow}
          x2={xStop}
          y2={levelYellow}
          stroke="#E8D360"
          strokeWidth={"2px"}
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
          fill="#FFE5E2"
          opacity={opacity}
        />

        <rect
          x={xStart}
          width={xStop - xStart}
          y={levelYellow}
          height={levelGreen - levelYellow}
          fill="#FFEFC7"
          opacity={opacity}
        />

        <rect
          x={xStart}
          width={xStop - xStart}
          y={levelGreen}
          height={yStop - levelGreen}
          fill="#EAF6EB"
          opacity={opacity}
        />
      </React.Fragment>
    );
  } else {
    return null;
  }
};

type BarchartGridProps = {
  xStart: number;
  xStop: number;
  yStart: number;
  yStop: number;
  levelGreen: number;
  levelYellow: number;
  levelDirection: number;
};

export const BarchartGrid = (props: BarchartGridProps) => {
  const {
    xStart,
    xStop,
    yStart,
    yStop,
    levelGreen,
    levelYellow,
    levelDirection,
  } = props;

  const opacity = "100%";

  if (levelDirection === 1) {
    return (
      <React.Fragment>
        <rect
          x={xStart}
          width={levelYellow - xStart}
          y={yStop}
          height={yStart - yStop}
          fill="#FFE5E2"
          opacity={opacity}
        />

        <rect
          x={levelYellow}
          width={levelGreen - levelYellow}
          y={yStop}
          height={yStart - yStop}
          fill="#FFEFC7"
          opacity={opacity}
        />

        <rect
          x={levelGreen}
          width={xStop - levelGreen}
          y={yStop}
          height={yStart - yStop}
          fill="#EAF6EB"
          opacity={opacity}
        />
      </React.Fragment>
    );
  } else if (levelDirection === 0) {
    return (
      <React.Fragment>
        <rect
          x={xStart}
          width={levelGreen - xStart}
          y={yStop}
          height={yStart - yStop}
          fill="#EAF6EB"
          opacity={opacity}
        />

        <rect
          x={levelGreen}
          width={levelYellow - levelGreen}
          y={yStop}
          height={yStart - yStop}
          fill="#FFEFC7"
          opacity={opacity}
        />

        <rect
          x={levelYellow}
          width={xStop - levelYellow}
          y={yStop}
          height={yStart - yStop}
          fill="#FFE5E2"
          opacity={opacity}
        />
      </React.Fragment>
    );
  } else {
    return null;
  }
};

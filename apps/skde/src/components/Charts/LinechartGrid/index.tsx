import React from "react";

type LinechartGridProps = {
  xStart: number;
  xStop: number;
  yStart: number;
  yStop: number;
  levelGreen: number;
  levelYellow: number;
  levelDirection: number;
  lines?: boolean;
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
    lines,
  } = props;

  const opacity = "100%";
  const showYellow =
    levelDirection === 1 ? levelYellow > levelGreen : levelYellow < levelGreen;
  const yellowBoundary = showYellow ? levelYellow : levelGreen;

  if (levelDirection === 1) {
    return (
      <React.Fragment>
        {levelGreen > yStart && (
          <rect
            x={xStart}
            width={xStop - xStart}
            y={yStart}
            height={Math.min(yStop, levelGreen) - yStart}
            fill="#EAF6EB"
            opacity={opacity}
          />
        )}

        {showYellow && levelYellow > yStart && (
          <rect
            x={xStart}
            width={xStop - xStart}
            y={Math.max(yStart, levelGreen)}
            height={Math.min(yStop, levelYellow) - Math.max(yStart, levelGreen)}
            fill="#FFEFC7"
            opacity={opacity}
          />
        )}

        <rect
          x={xStart}
          width={xStop - xStart}
          y={Math.max(yStart, yellowBoundary)}
          height={yStop - Math.max(yStart, yellowBoundary)}
          fill="#FFE5E2"
          opacity={opacity}
        />

        {lines && levelGreen > yStart && levelGreen < yStop && (
          <line
            x1={xStart}
            y1={levelGreen}
            x2={xStop}
            y2={levelGreen}
            stroke="#66CCA1"
            strokeWidth={"2px"}
          />
        )}

        {lines && showYellow && levelYellow > yStart && levelYellow < yStop && (
          <line
            x1={xStart}
            y1={levelYellow}
            x2={xStop}
            y2={levelYellow}
            stroke="#E8D360"
            strokeWidth={"2px"}
          />
        )}
      </React.Fragment>
    );
  } else if (levelDirection === 0) {
    return (
      <React.Fragment>
        <rect
          x={xStart}
          width={xStop - xStart}
          y={yStart}
          height={Math.min(yStop, yellowBoundary) - yStart}
          fill="#FFE5E2"
          opacity={opacity}
        />

        {showYellow && levelYellow > yStart && (
          <rect
            x={xStart}
            width={xStop - xStart}
            y={Math.max(yStart, yellowBoundary)}
            height={
              Math.min(yStop, levelGreen) - Math.max(yStart, yellowBoundary)
            }
            fill="#FFEFC7"
            opacity={opacity}
          />
        )}
        <rect
          x={xStart}
          width={xStop - xStart}
          y={Math.max(yStart, levelGreen)}
          height={yStop - Math.max(yStart, levelGreen)}
          fill="#EAF6EB"
          opacity={opacity}
        />
        {lines && levelGreen >= yStart && levelGreen <= yStop && (
          <line
            x1={xStart}
            y1={levelGreen}
            x2={xStop}
            y2={levelGreen}
            stroke="#66CCA1"
            strokeWidth={"2px"}
          />
        )}
        {lines &&
          showYellow &&
          levelYellow >= yStart &&
          levelYellow <= yStop && (
            <line
              x1={xStart}
              y1={levelYellow}
              x2={xStop}
              y2={levelYellow}
              stroke="#E8D360"
              strokeWidth={"2px"}
            />
          )}
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
  lines?: boolean;
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
    lines,
  } = props;

  const opacity = "100%";

  if (levelDirection === 1) {
    return (
      <React.Fragment>
        <rect
          x={xStart}
          width={Math.min(xStop, levelYellow) - xStart}
          y={yStop}
          height={yStart - yStop}
          fill="#FFE5E2"
          opacity={opacity}
        />

        {levelYellow < xStop && (
          <rect
            x={levelYellow}
            width={Math.min(xStop, levelGreen) - levelYellow}
            y={yStop}
            height={yStart - yStop}
            fill="#FFEFC7"
            opacity={opacity}
          />
        )}

        {levelGreen < xStop && (
          <rect
            x={levelGreen}
            width={xStop - levelGreen}
            y={yStop}
            height={yStart - yStop}
            fill="#EAF6EB"
            opacity={opacity}
          />
        )}

        {lines && levelGreen < xStop && (
          <line
            x1={levelGreen}
            y1={yStart}
            x2={levelGreen}
            y2={yStop}
            stroke="#66CCA1"
            strokeWidth={"2px"}
          />
        )}
        {lines && levelYellow < xStop && (
          <line
            x1={levelYellow}
            y1={yStart}
            x2={levelYellow}
            y2={yStop}
            stroke="#E8D360"
            strokeWidth={"2px"}
          />
        )}
      </React.Fragment>
    );
  } else if (levelDirection === 0) {
    return (
      <React.Fragment>
        <rect
          x={xStart}
          width={Math.min(xStop, levelGreen) - xStart}
          y={yStop}
          height={yStart - yStop}
          fill="#EAF6EB"
          opacity={opacity}
        />

        {levelGreen < xStop && (
          <rect
            x={levelGreen}
            width={Math.min(xStop, levelYellow) - levelGreen}
            y={yStop}
            height={yStart - yStop}
            fill="#FFEFC7"
            opacity={opacity}
          />
        )}

        {levelYellow < xStop && (
          <rect
            x={levelYellow}
            width={xStop - levelYellow}
            y={yStop}
            height={yStart - yStop}
            fill="#FFE5E2"
            opacity={opacity}
          />
        )}

        {lines && levelGreen < xStop && (
          <line
            x1={levelGreen}
            y1={yStart}
            x2={levelGreen}
            y2={yStop}
            stroke="#66CCA1"
            strokeWidth={"2px"}
          />
        )}

        {lines && levelYellow < xStop && (
          <line
            x1={levelYellow}
            y1={yStart}
            x2={levelYellow}
            y2={yStop}
            stroke="#E8D360"
            strokeWidth={"2px"}
          />
        )}
      </React.Fragment>
    );
  } else {
    return null;
  }
};

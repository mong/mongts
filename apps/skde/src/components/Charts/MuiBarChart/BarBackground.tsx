import { useXScale } from "@mui/x-charts";
import type { IndicatorData } from "types";
import { BarchartGrid } from "../LinechartGrid";

type BarBackgroundProps = {
  data: IndicatorData;
  figureHeight: number;
  percentage: boolean;
  backgroundMargin: number;
  lines: boolean;
  zoom: boolean;
  xMaxLimit: number;
};

export const BarBackground = (props: BarBackgroundProps) => {
  const {
    data,
    figureHeight,
    percentage,
    backgroundMargin,
    lines,
    zoom,
    xMaxLimit,
  } = props;

  const levelGreen = data.levelGreen;
  const levelYellow = data.levelYellow;
  const levelDirection = data.levelDirection;
  const xMin = 0;
  const xScale = useXScale();

  if (data.data === undefined) {
    return null;
  }

  const xMax = percentage && !zoom ? 1 : xMaxLimit;

  const xStart = xScale(xMin);
  const xStop = xScale(xMax);
  const yStart = figureHeight - backgroundMargin - 26; // Hardkodet, må fikses
  const yStop = 0 + backgroundMargin;

  const greenStart = levelGreen && xScale(levelGreen);
  const yellowStart = levelYellow && xScale(levelYellow);

  const validGrid =
    xStart &&
    xStop &&
    greenStart &&
    yellowStart &&
    (levelDirection === 0 || levelDirection === 1);

  return (
    validGrid &&
    BarchartGrid({
      xStart: xStart,
      xStop: xStop,
      yStart: yStart,
      yStop: yStop,
      levelGreen: greenStart,
      levelYellow: yellowStart,
      levelDirection: levelDirection,
      lines: lines,
    })
  );
};

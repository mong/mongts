import { IndicatorData } from "types";
import { LinechartGrid } from "../LinechartGrid";
import { useXScale, useYScale } from "@mui/x-charts";

type LineBackgroundProps = {
  data: IndicatorData;
  years: number[];
  lines: boolean;
  percentage: boolean;
  zoom: boolean;
  yMaxLimit: number;
  yMinLimit: number;
};

export const LineBackground = (props: LineBackgroundProps) => {
  const { data, years, lines, percentage, zoom, yMaxLimit, yMinLimit } = props;

  if (data.data === undefined) {
    return null;
  }

  const levelGreen = data.levelGreen;
  const levelYellow = data.levelYellow;
  const levelDirection = data.levelDirection;

  const yMin = zoom ? yMinLimit : 0;
  const yMax = percentage && !zoom ? 1 : yMaxLimit;

  const xMin = Math.min(...years);
  const xMax = Math.max(...years);

  const xScale = useXScale();
  const yScale = useYScale();

  const xStart = xScale(xMin);
  const xStop = xScale(xMax);
  const yStart = yScale(yMax);
  const yStop = yScale(yMin);

  const greenStart = levelGreen !== null ? yScale(levelGreen) : undefined;
  const yellowStart = levelYellow !== null ? yScale(levelYellow) : undefined;

  const validGrid =
    xStart !== undefined &&
    yStart !== undefined &&
    xStop !== undefined &&
    yStop !== undefined &&
    greenStart !== undefined &&
    yellowStart !== undefined &&
    (levelDirection === 0 || levelDirection === 1);

  return (
    validGrid &&
    LinechartGrid({
      xStart: xStart,
      xStop: xStop,
      yStart: yStart,
      yStop: yStop,
      levelGreen: greenStart,
      levelYellow: yellowStart,
      levelDirection: levelDirection,
      lines,
    })
  );
};

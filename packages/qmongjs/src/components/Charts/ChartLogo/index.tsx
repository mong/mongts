import { useXScale } from "@mui/x-charts";

type LineChartLogoProps = {
  years: number[];
  width: number;
};

export const LineChartLogo = (props: LineChartLogoProps) => {
  const { years, width } = props;

  const xMax = Math.max(...years);

  const xScale = useXScale();

  const xStop = xScale(xMax);

  const widthHeightRatio = 5 / 2;

  return (
    <img
      src="/img/logos/logo-skde-graa.svg"
      width={width}
      style={{
        position: "relative",
        left: xStop && xStop - width,
        top: width / widthHeightRatio,
      }}
    />
  );
};

type BarChartLogoProps = {
  percentage: boolean;
  zoom: boolean;
  xMaxLimit: number;
  width: number;
};

export const BarChartLogo = (props: BarChartLogoProps) => {
  const { percentage, zoom, xMaxLimit, width } = props;

  const xMax = percentage && !zoom ? 1 : xMaxLimit;

  const xScale = useXScale();
  const xStop = xScale(xMax);

  const widthHeightRatio = 5 / 2;

  return (
    <img
      src="/img/logos/logo-skde-graa.svg"
      width={width}
      style={{
        position: "relative",
        left: xStop && xStop - width,
        top: width / widthHeightRatio / 2,
      }}
    />
  );
};

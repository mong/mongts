import { Stack } from "@mui/material";

type LineChartLogoProps = {
  width: number;
  marginRight: number;
};

export const ChartLogo = (props: LineChartLogoProps) => {
  const { width, marginRight } = props;

  return (
    <Stack
      direction="row"
      width="100%"
      sx={{ justifyContent: "flex-end", marginRight: marginRight }}
    >
      <img src="/img/logos/logo-skde.svg" width={width} />
    </Stack>
  );
};

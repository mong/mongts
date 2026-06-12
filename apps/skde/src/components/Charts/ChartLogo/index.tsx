import { SkdeLogo } from "@mong/material-ui";
import { Stack } from "@mui/material";

type LineChartLogoProps = {
  width: number;
  marginRight: number;
};

export const ChartLogo = (props: LineChartLogoProps) => {
  const { marginRight } = props;

  return (
    <Stack
      direction="row"
      width="100%"
      sx={{ justifyContent: "flex-end", marginRight: marginRight }}
    >
      <SkdeLogo />
    </Stack>
  );
};

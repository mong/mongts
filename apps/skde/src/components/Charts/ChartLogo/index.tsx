import { Box, SkdeLogo } from "@mong/material-ui";

type LineChartLogoProps = {
  width: number;
  marginRight: number;
};

export const ChartLogo = (props: LineChartLogoProps) => {
  props;

  return (
    <Box className="flex w-full justify-end pe-6" padded={false}>
      <SkdeLogo />
    </Box>
  );
};

import { Stack } from "@mui/material";
import Image from "next/image";

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
      <Image
        src="/img/logos/logo-skde.svg"
        width={width}
        height={width * 0.233}
        alt="SKDE Logo"
      />
    </Stack>
  );
};

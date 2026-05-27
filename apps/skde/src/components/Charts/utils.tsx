import { Box } from "@mui/material";
import { useChartRootRef } from "@mui/x-charts";

export const CustomChartWrapper = ({ children }: React.PropsWithChildren) => {
  const chartRootRef = useChartRootRef();

  return (
    <Box
      ref={chartRootRef}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      sx={{ padding: 4 }}
    >
      {children}
    </Box>
  );
};

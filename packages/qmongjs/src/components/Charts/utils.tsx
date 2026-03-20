import { useChartRootRef } from "@mui/x-charts";

export function levelColor(level: string) {
  switch (level) {
    case "high":
      return "#3baa34";
    case "mid":
      return "#fd9c00";
    case "low":
      return "#e30713";
    default:
      throw new Error(`${level} is not a valid level`);
  }
}

export const CustomChartWrapper = ({ children }: React.PropsWithChildren) => {
  const chartRootRef = useChartRootRef();

  return (
    <div
      ref={chartRootRef}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {children}
    </div>
  );
};

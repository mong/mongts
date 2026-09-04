import { HeroBanner } from "@mong/material-ui";
import { Box } from "@mui/system";
import { LineChart } from "@mui/x-charts";
import { useEffect, useRef, useState } from "react";
import { testData } from "../../src/data/data";

type DataPoint = (typeof testData)[number];

type ChartSeries = {
  data: Array<number | null>;
  denominators: Array<number | null>;
  label: string;
};

type ChartItem = {
  series: ChartSeries[];
  title: string;
  xLabels: number[];
};

function useElementWidth<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateWidth = () => {
      const nextWidth = element.getBoundingClientRect().width;
      setWidth((currentWidth) =>
        currentWidth === nextWidth ? currentWidth : nextWidth,
      );
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, width };
}

export default function NordiskeSammenlingninger() {
  const chartData = buildChartData(testData);
  const margin = { top: 20, right: 25, bottom: 20, left: 20 };

  return (
    <Box>
      <HeroBanner
        description="Her kan du se resultater fra nasjonale medisinske kvalitetsregistre, og sammenligne indikatorer mellom nordiske land"
        title="Nordisk profil"
        image="/hero-bg-4.jpg"
      />
      <div className="flex w-full items-center justify-center bg-neutral-0 px-6 py-12 sm:px-12">
        <div className="grid h-full w-full max-w-360 grid-cols-1 gap-12 lg:grid-cols-2">
          {chartData.map((item) => (
            <ChartCard key={item.title} item={item} margin={margin} />
          ))}
        </div>
      </div>
    </Box>
  );
}

function ChartCard({
  item,
  margin,
}: {
  item: ChartItem;
  margin: { top: number; right: number; bottom: number; left: number };
}) {
  const { ref, width } = useElementWidth();
  const chartWidth = Math.max(width - 40, 0);

  return (
    <div
      ref={ref}
      className="min-w-0 overflow-hidden rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-4 flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-neutral-800">{item.title}</h3>
        <p className="text-sm text-neutral-500">
          Nordisk sammenligning av utvikling over tid
        </p>
      </div>

      {chartWidth > 0 && (
        <LineChart
          series={item.series.map((series) => ({
            curve: "linear",
            data: series.data,
            label: series.label,
            showMark: true,
            // Format the value with its corresponding denominator if available
            valueFormatter: (
              value: number | null,
              context: { dataIndex: number },
            ) => {
              if (value == null) return "";
              // Get the corresponding denominator for this data point
              const denominator =
                series.denominators[context.dataIndex] ?? null;
              const denominatorText =
                denominator == null ? "" : ` (N = ${denominator})`;

              return `${(value * 100).toFixed(1)}%${denominatorText}`;
            },
          }))}
          xAxis={[
            {
              scaleType: "point",
              data: item.xLabels,
              valueFormatter: (value: number) => `${value}`,
              height: 44,
              tickLabelStyle: {
                fontSize: 12,
                fill: "#4b5563",
              },
              disableLine: true,
              labelStyle: {
                fontSize: 14,
                fontWeight: 600,
                fill: "#111827",
              },
            },
          ]}
          yAxis={[
            {
              width: 72,
              min: 0,
              max: 1,
              valueFormatter: (value: number | null) =>
                value == null ? "" : `${(value * 100).toFixed(0)}%`,
              tickLabelStyle: {
                fontSize: 12,
                fill: "#4b5563",
              },
              disableLine: true,
              disableTicks: true,
              labelStyle: {
                fontSize: 14,
                fontWeight: 600,
                fill: "#111827",
              },
            },
          ]}
          margin={margin}
          height={500}
          width={chartWidth}
          axisHighlight={{ x: "line", y: "line" }}
          sx={{
            width: "100%",
            maxWidth: "100%",
            "& .MuiChartsAxis-label": {
              letterSpacing: "0.02em",
            },
            "& .MuiChartsAxis-tickLabel": {
              fontWeight: 500,
            },
            "& .MuiMarkElement-root": {
              strokeWidth: 2,
            },
          }}
          slotProps={{
            tooltip: {
              trigger: "axis",
              sx: {
                "& .MuiChartsTooltip-table caption": {
                  captionSide: "bottom",
                  fontSize: 14,
                  lineHeight: 1.25,
                  color: "#6b7280",
                  paddingTop: 1,
                },
              },
            },
          }}
          grid={{ horizontal: true }}
        />
      )}
    </div>
  );
}

function buildChartData(records: DataPoint[]): ChartItem[] {
  // Double check data is national level
  const nationRecords = records.filter(
    (record) => record.unit_level === "nation",
  );

  // Group the national records by indicator ID
  const groupedByIndicator = new Map<string, DataPoint[]>();
  for (const record of nationRecords) {
    const currentRecords = groupedByIndicator.get(record.ind_id) ?? [];
    currentRecords.push(record);
    groupedByIndicator.set(record.ind_id, currentRecords);
  }

  // Build the chart data for each indicator
  return Array.from(groupedByIndicator.values()).map((indicatorRecords) => {
    const xLabels = Array.from(
      new Set(indicatorRecords.map((record) => record.year)),
    ).sort((left, right) => left - right);
    // Extract unique unit names for the current indicator
    const unitNames = Array.from(
      new Set(indicatorRecords.map((record) => record.unit_name)),
    );
    // Build the series data for each unit name
    const series = unitNames.map((unitName) => {
      const valuesByYear = new Map<number, number>();
      const denominatorsByYear = new Map<number, number>();

      for (const record of indicatorRecords) {
        if (record.unit_name === unitName) {
          valuesByYear.set(record.year, record.var);
          denominatorsByYear.set(record.year, record.denominator);
        }
      }
      // Return the series data for the current unit name
      return {
        label: formatUnitName(unitName),
        data: xLabels.map((year) => valuesByYear.get(year) ?? null),
        denominators: xLabels.map(
          (year) => denominatorsByYear.get(year) ?? null,
        ),
      };
    });
    // Return the chart data for the current indicator
    return {
      series,
      title: indicatorRecords[0]?.ind_title ?? "Uten tittel",
      xLabels,
    };
  });
}

// Format capital first letter
function formatUnitName(unitName: string) {
  return unitName.charAt(0).toUpperCase() + unitName.slice(1);
}

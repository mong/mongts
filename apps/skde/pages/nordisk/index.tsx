import { Button, Dropdown, HeroBanner, PageContent } from "@mong/material-ui";
import { type SelectChangeEvent, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { LineChart } from "@mui/x-charts";
import { useEffect, useRef, useState } from "react";
import { useQueryParam } from "use-query-params";
import { mainQueryParamsConfig } from "../../src/app_config";
import { MedicalFieldPopup } from "../../src/components/DialogBox/MedicalFieldPopup";
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

  const [selectedLanguage, setSelectedLanguage] = useState("no");
  const handleLanguageChange = (
    event: SelectChangeEvent<string | string[]>,
  ) => {
    const nextValue = event.target.value;
    setSelectedLanguage(
      Array.isArray(nextValue) ? (nextValue[0] ?? "no") : nextValue,
    );
  };
  const languageDropdownItems = {
    groups: [
      {
        items: [
          { value: "no", label: "Norsk" },
          { value: "sv", label: "Svensk" },
          { value: "da", label: "Dansk" },
          { value: "fi", label: "Finsk" },
        ],
      },
    ],
  };

  const [selectedMedicalFields = [], setSelectedMedicalFields] = useQueryParam<
    string[] | undefined
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  >("registries", mainQueryParamsConfig.registries as any);

  const [medicalFieldPopupOpen, setMedicalFieldPopupOpen] = useState(false);

  const handleMedicalFieldButtonClick = () => {
    setMedicalFieldPopupOpen(true);
  };

  return (
    <Box>
      <HeroBanner
        description="Her kan du se resultater fra nasjonale medisinske kvalitetsregistre, og sammenligne indikatorer mellom nordiske land"
        title="Nordisk profil"
        image="/hero-bg-4.jpg"
      />
      <div className="flex bg-neutral-0 w-full align-middle items-center justify-center px-12">
        <div className="flex flex-col w-full h-full max-w-360">
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            <Stack direction="row" spacing={3}>
              <div className="flex flex-col text-small font-semibold text-brand-primary-900">
                Fagområde
                <Button onClick={handleMedicalFieldButtonClick}>
                  Velg fagområde
                </Button>
              </div>
              <MedicalFieldPopup
                open={medicalFieldPopupOpen}
                updateRegistries={setSelectedMedicalFields}
                setOpen={setMedicalFieldPopupOpen}
                onSubmit={setSelectedMedicalFields}
              />
              <div className="flex flex-col text-small  font-semibold  text-brand-primary-900">
                Språk
                <Dropdown
                  value={selectedLanguage.toString()}
                  onChange={handleLanguageChange}
                  items={languageDropdownItems}
                />
              </div>
            </Stack>
          </Stack>
        </div>
      </div>
      <PageContent>
        {selectedMedicalFields.length > 0 ? (
          <div className="flex w-full items-center justify-center px-6 py-12 sm:px-12">
            <div className="grid h-full w-full max-w-360 md:grid-cols-1 lg:grid-cols-2 gap-12">
              {chartData.map((item) => (
                <ChartCard key={item.title} item={item} margin={margin} />
              ))}
            </div>
          </div>
        ) : (
          <Stack
            spacing={6}
            sx={{
              width: "100%",
              height: "100px",
              marginTop: 3,
              background: "#FFFFFF",
              border: "1px solid #F5F5F5",
              borderRadius: "16px",
              justifyContent: "center",
              paddingLeft: 4,
              paddingRight: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                width: "100%",
              }}
            >
              <h3>
                {selectedMedicalFields.length === 0
                  ? "Velg et fagområde du vil se resultater fra"
                  : ""}
              </h3>
              <Button onClick={handleMedicalFieldButtonClick}>
                Velg fagområde
              </Button>
            </Box>
          </Stack>
        )}
      </PageContent>
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

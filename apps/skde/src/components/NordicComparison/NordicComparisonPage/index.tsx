"use client";

import {
  Button,
  Dropdown,
  HeroBanner,
  Icon,
  PageContent,
} from "@mong/material-ui";
import {
  Paper,
  type SelectChangeEvent,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { LineChart } from "@mui/x-charts";
import { useQueryState } from "nuqs";
import { useIndicatorQuery, useRegisterNamesQuery } from "qmongjs";
import { useEffect, useRef, useState } from "react";
import type { Indicator, RegisterName } from "types";
import { mainQueryStateConfig } from "@/app_config";
import { MedicalFieldPopup } from "@/components/DialogBox/MedicalFieldPopup";

type DataPoint = Indicator;

type ChartSeries = {
  data: Array<number | null>;
  denominators: Array<number | null>;
  label: string;
};

type ChartItem = {
  indicatorId: string;
  registryName: string;
  registryFullName: string;
  registryShortName: string;
  series: ChartSeries[];
  title: string;
  xLabels: number[];
};

// Hook for tracking the width of an element
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
  const [selectedMedicalFields, setSelectedMedicalFields] = useQueryState(
    "registries",
    mainQueryStateConfig.registries,
  );

  const [selectedLanguage, setSelectedLanguage] = useState("no");
  const handleLanguageChange = (
    event: SelectChangeEvent<string | string[]>,
  ) => {
    const nextValue = event.target.value;
    setSelectedLanguage(
      Array.isArray(nextValue) ? (nextValue[0] ?? "no") : nextValue,
    );
  };

  const indicatorQuery = useIndicatorQuery({
    registerShortName: "all",
    context: "caregiver",
    language: selectedLanguage,
    type: "ind",
    unitLevel: "nation",
    nordic: true,
  });

  const registerNamesQuery = useRegisterNamesQuery();

  const nordicRegistries = new Set(
    ((registerNamesQuery.data as RegisterName[] | undefined) ?? [])
      .filter((registry) => registry.nordic === 1)
      .map((registry) => registry.rname),
  );

  const indicatorRows = Array.isArray(indicatorQuery.data)
    ? (indicatorQuery.data as DataPoint[])
    : [];

  const nordicRows =
    nordicRegistries.size === 0
      ? indicatorRows
      : indicatorRows.filter((row) => nordicRegistries.has(row.registry_name));

  const chartData = buildChartData(nordicRows, selectedLanguage);
  const selectedRegistriesSet = new Set(selectedMedicalFields);
  const filteredChartData =
    selectedRegistriesSet.size === 0
      ? []
      : chartData.filter((item) =>
          selectedRegistriesSet.has(item.registryName),
        );
  const chartDataByRegistry = groupChartDataByRegistry(filteredChartData);
  const margin = { top: 20, right: 25, bottom: 20, left: 20 };

  const languageDropdownItems = {
    groups: [
      {
        items: [
          { value: "no", label: "Norsk" },
          { value: "se", label: "Svenska" },
          { value: "dk", label: "Dansk" },
          { value: "fi", label: "Suomi" },
          { value: "is", label: "Íslenska" },
          { value: "en", label: "English" },
        ],
      },
    ],
  };

  const [medicalFieldPopupOpen, setMedicalFieldPopupOpen] = useState(false);

  const handleMedicalFieldButtonClick = () => {
    setMedicalFieldPopupOpen(true);
  };

  const [urlCopied, setUrlCopied] = useState<boolean>(false);
  const urlCopiedTimeout = 3000;

  return (
    <Box>
      <HeroBanner
        description="Her kan du se resultater fra nasjonale medisinske kvalitetsregistre, og sammenligne indikatorer mellom nordiske land"
        title="Nordisk profil"
        image="/hero-bg-6.jpg"
      />
      <div className="flex bg-neutral-0 w-full align-middle justify-center px-6 md:px-12 sticky top-0 z-60 shadow-xs">
        <div className="flex flex-col w-full h-full max-w-360">
          <Toolbar disableGutters={true}>
            <div className="flex flex-row max-w-360 w-full justify-between items-center pb-2 md:pb-4">
              <div className="flex flex-row md:flex-row gap-6 md:gap-4 w-full">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex flex-col text-small font-semibold text-brand-primary-900">
                    Fagområde
                    <Button
                      onClick={handleMedicalFieldButtonClick}
                      data-testid="MedicalFieldPopUpButton"
                    >
                      Velg fagområde
                    </Button>
                  </div>
                  <MedicalFieldPopup
                    open={medicalFieldPopupOpen}
                    updateRegistries={setSelectedMedicalFields}
                    setOpen={setMedicalFieldPopupOpen}
                    onSubmit={setSelectedMedicalFields}
                    nordicOnly
                  />
                  <div className="flex flex-col text-small font-semibold text-brand-primary-900">
                    Språk
                    <Dropdown
                      value={selectedLanguage.toString()}
                      onChange={handleLanguageChange}
                      items={languageDropdownItems}
                    />
                  </div>
                </div>
              </div>
              <div
                className="pb-4 pl-6 hidden md:block"
                data-testid="copy-url-button"
              >
                <Button
                  startIcon={<Icon size="small" symbol="content_copy" />}
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setUrlCopied(true);
                    setTimeout(() => {
                      setUrlCopied(false);
                    }, urlCopiedTimeout);
                  }}
                >
                  {urlCopied ? "Link kopiert" : "Kopier denne visningen"}
                </Button>
              </div>
            </div>
          </Toolbar>
        </div>
      </div>
      <PageContent>
        {indicatorQuery.isLoading ? (
          <Stack
            spacing={2}
            sx={{
              minHeight: "320px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Laster nordiske data...</Typography>
          </Stack>
        ) : indicatorQuery.isError ? (
          <Stack
            spacing={2}
            sx={{
              minHeight: "320px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Kunne ikke hente nordiske data</Typography>
          </Stack>
        ) : chartDataByRegistry.length > 0 ? (
          <div className="flex w-full items-center justify-center px-6 py-12 sm:px-12">
            <Stack spacing={5} className="h-full w-full max-w-360">
              {chartDataByRegistry.map(([registryKey, items]) => (
                <Stack key={registryKey} spacing={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      alignItems: "center",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                      px: 4,
                      py: 2.5,
                    }}
                  >
                    <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                      <Typography
                        variant="h4"
                        sx={{
                          color: "#1E4EA1",
                          fontSize: { xs: "1.6rem", md: "2rem" },
                          fontWeight: 700,
                          lineHeight: 1.2,
                        }}
                      >
                        {items[0]?.registryShortName ?? "Ukjent register"}
                      </Typography>
                    </Stack>
                    <Button
                      disabled={false}
                      fullWidth={false}
                      loading={false}
                      onClick={() => {}}
                      startIcon={<Icon size="small" symbol="more_vert" />}
                      variant="secondary"
                    >
                      Last ned
                    </Button>
                  </Paper>

                  <div
                    // Container for chart, if only 1 chart it will span the full width, otherwise it will be a responsive grid
                    className={`grid h-full w-full gap-12 ${
                      items.length === 1
                        ? "grid-cols-1"
                        : "md:grid-cols-1 lg:grid-cols-2"
                    }`}
                  >
                    {items.map((item) => (
                      <ChartCard
                        key={`${item.registryName}-${item.indicatorId}`}
                        item={item}
                        margin={margin}
                      />
                    ))}
                  </div>
                </Stack>
              ))}
            </Stack>
          </div>
        ) : (
          <Stack
            spacing={6}
            sx={{
              height: "484px",
              justifyContent: "center",
              alignItems: "center",
              background: "#FFFFFF",
              border: "1px solid #2354AE",
              borderRadius: "16px",
            }}
          >
            <h3>
              {selectedMedicalFields.length > 0
                ? "Ingen nordiske data for valgt fagområde"
                : "Velg et fagområde for å se resultater"}
            </h3>
            {selectedMedicalFields.length === 0 && (
              <Button onClick={handleMedicalFieldButtonClick}>
                Velg fagområde
              </Button>
            )}
          </Stack>
        )}
      </PageContent>
    </Box>
  );
}

// Component for rendering individual chart cards
function ChartCard({
  item,
  margin,
}: {
  item: ChartItem;
  margin: { top: number; right: number; bottom: number; left: number };
}) {
  const { ref, width } = useElementWidth();
  const chartWidth = Math.max(width - 40, 0);
  const [zoom, setZoom] = useState<boolean>(false);

  const yValues = item.series
    .flatMap((series) => series.data)
    .filter((value): value is number => value != null);

  const yAxisBounds =
    yValues.length === 0
      ? { min: 0, max: 1 }
      : (() => {
          const rawMin = Math.min(...yValues);
          const rawMax = Math.max(...yValues);

          return {
            min: rawMin,
            max: rawMax,
          };
        })();

  return (
    <div
      ref={ref}
      className="min-w-0 overflow-hidden rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-neutral-800">
              {item.title}
            </h3>
            <p className="text-sm text-neutral-500">{item.registryFullName}</p>
          </div>
          <Button
            onClick={() => {
              setZoom(!zoom);
            }}
            startIcon={<Icon symbol="search" size="medium" />}
            variant="filled"
          >
            Zoom
          </Button>
        </div>
      </div>

      {chartWidth > 0 && (
        <LineChart
          series={item.series.map((series) => ({
            curve: "linear",
            data: series.data,
            label: series.label,
            showMark: true,
            shape: "circle",
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
              width: 48,
              min: zoom ? yAxisBounds.min : 0,
              max: zoom ? yAxisBounds.max : 1,
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

function buildChartData(records: DataPoint[], language: string): ChartItem[] {
  // Group the records by indicator ID
  const groupedByIndicator = new Map<string, DataPoint[]>();
  for (const record of records) {
    const currentRecords = groupedByIndicator.get(record.ind_id) ?? [];
    currentRecords.push(record);
    groupedByIndicator.set(record.ind_id, currentRecords);
  }

  // Build the chart data for each indicator
  return Array.from(groupedByIndicator.values()).map((indicatorRecords) => {
    // Extract the unique years for the x-axis labels
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
        label: formatUnitName(unitName, language),
        data: xLabels.map((year) => valuesByYear.get(year) ?? null),
        denominators: xLabels.map(
          (year) => denominatorsByYear.get(year) ?? null,
        ),
      };
    });
    // Return the chart data for the current indicator
    return {
      indicatorId: indicatorRecords[0]?.ind_id ?? "",
      registryName: indicatorRecords[0]?.registry_name ?? "",
      registryShortName:
        indicatorRecords[0]?.registry_short_name ?? "Ukjent register",
      registryFullName:
        indicatorRecords[0]?.registry_full_name ?? "Ukjent register",
      series,
      title: indicatorRecords[0]?.ind_title ?? "Uten tittel",
      xLabels,
    };
  });
}

// Format unit names based on the selected language
function formatUnitName(unitName: string, language: string) {
  const translations: Record<string, Record<string, string>> = {
    no: {
      Nasjonalt: "Norge",
      Sverige: "Sverige",
      Danmark: "Danmark",
      Finland: "Finland",
      Island: "Island",
    },
    se: {
      Nasjonalt: "Norge",
      Sverige: "Sverige",
      Danmark: "Danmark",
      Finland: "Finland",
      Island: "Island",
    },
    dk: {
      Nasjonalt: "Norge",
      Sverige: "Sverige",
      Danmark: "Danmark",
      Finland: "Finland",
      Island: "Island",
    },
    fi: {
      Nasjonalt: "Norja",
      Sverige: "Ruotsi",
      Danmark: "Tanska",
      Finland: "Suomi",
      Island: "Islanti",
    },
    is: {
      Nasjonalt: "Noregur",
      Sverige: "Svíþjóð",
      Danmark: "Danmörk",
      Finland: "Finnland",
      Island: "Ísland",
    },
    en: {
      Nasjonalt: "Norway",
      Sverige: "Sweden",
      Danmark: "Denmark",
      Finland: "Finland",
      Island: "Iceland",
    },
  };

  const translatedUnitName = translations[language]?.[unitName];
  if (translatedUnitName) return translatedUnitName;

  // If no translation is found, return the original unit name with the first letter capitalized
  return unitName.charAt(0).toUpperCase() + unitName.slice(1);
}

// Group chart data by registry
function groupChartDataByRegistry(chartItems: ChartItem[]) {
  const groupedByRegistry = new Map<string, ChartItem[]>();

  for (const item of chartItems) {
    const groupKey = `${item.registryName}::${item.registryShortName}::${item.registryFullName}`;
    const currentItems = groupedByRegistry.get(groupKey) ?? [];
    currentItems.push(item);
    groupedByRegistry.set(groupKey, currentItems);
  }

  return Array.from(groupedByRegistry.entries());
}

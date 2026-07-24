import { Box, Button, Dropdown, Icon, SplitButton } from "@mong/material-ui";
import { type SelectChangeEvent, Stack } from "@mui/material";
import { useChartProApiRef } from "@mui/x-charts-pro";
import { getLastCompleteYear } from "qmongjs/src/helpers/functions";
import { useState } from "react";
import type { DataPoint, IndicatorData, OptsTu } from "types";
import {
  formatMuiChartData,
  makeOnBeforeExport,
} from "../../../helpers/functions/formatMuiChartData";
import { MuiBarChart } from "../../Charts/MuiBarChart";
import { MuiLineChart } from "../../Charts/MuiLineChart";
import { DataQualityPopup } from "./DataQualityPopup";

type chartRowV2Props = {
  data: IndicatorData;
  unitNames: string[];
  medfield: string;
  context: string;
  type: string;
  year: number;
  treatmentUnitsByLevel: OptsTu[];
  indID: string;
  registryName: string;
  showDGButton?: boolean;
};

export const DataQualityChartRow = (props: chartRowV2Props) => {
  const {
    data,
    unitNames,
    context,
    type,
    year,
    treatmentUnitsByLevel,
    medfield,
    indID,
    registryName,
    showDGButton,
  } = props;

  const [coveragePopupOpen, setCoveragePopupOpen] = useState(false);

  const numberOfTimePointsArray = unitNames.map(
    (unitName: string) =>
      // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
      data.data!.filter((point: DataPoint) => point.unitName === unitName)
        .length,
  );

  const numberOfTimePoints = Math.max(...numberOfTimePointsArray);

  const [figureType, setFigureType] = useState(
    numberOfTimePoints > 1 ? "line" : "bar",
  );

  const [barChartType, setBarChartType] = useState("selected");

  const [zoom, setZoom] = useState<boolean>(false);

  if (data.data === undefined) {
    return <div>No data</div>;
  }

  // Callback functions for dropdown menus
  const handleBarChartTypeChange = (event: SelectChangeEvent) => {
    setBarChartType(event.target.value as string);
  };

  const handleFigureTypeChange = (event: SelectChangeEvent) => {
    setFigureType(event.target.value as string);
  };
  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const lineChartApiRef = useChartProApiRef<"line">();
  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const barChartApiRef = useChartProApiRef<"bar">();

  const figureHeight = 650;
  const backgroundMargin = 20;

  const dataFormat = data.format ? data.format : ",.0%";
  const percentage = dataFormat.includes("%");

  const { lineData, uniqueYears } = formatMuiChartData(
    data,
    unitNames,
    context,
    dataFormat,
  );

  // The delivery_latest_affirm date can be different depending on the year.
  // Find the latest year and use that.
  const affirmYears = data.data.map((row) => {
    return getLastCompleteYear(row.affirmTime, 0, true);
  }) as number[];

  const lastAffirmYear = Math.max(...affirmYears);

  const valueAxisFormatter = (value: number) => {
    return percentage ? `${Math.round(value * 100)} %` : `${value}`;
  };

  const figureTypeItems = {
    groups: [
      {
        items:
          numberOfTimePoints > 1
            ? [
                { value: "line", label: "Tidstrend" },
                { value: "bar", label: "Enkeltår" },
              ]
            : [{ value: "bar", label: "Enkeltår" }],
      },
    ],
  };

  const barChartTypeItems = {
    groups: [
      {
        items: [
          { value: "selected", label: "Valgte enheter" },
          { value: "rhf", label: "Regioner" },
          { value: "hf", label: "Helseforetak" },
          { value: "hospital", label: "Sykehus" },
        ],
      },
    ],
  };

  return (
    <Box className="w-full flex-row justify-between items-end px-7">
      <div className="flex flex-row items-end gap-1">
        <div className="flex flex-col text-small font-semibold text-brand-primary-900">
          Årstall
          <Dropdown
            value={figureType}
            onChange={handleFigureTypeChange}
            items={figureTypeItems}
          />
        </div>
        {figureType === "bar" && (
          <div className="flex flex-col text-small font-semibold text-brand-primary-900">
            Behandlingssteder
            <Dropdown
              value={barChartType}
              onChange={handleBarChartTypeChange}
              items={barChartTypeItems}
            />
          </div>
        )}
        {showDGButton && (
          <Button
            startIcon={<Icon symbol="data_loss_prevention" size="medium" />}
            onClick={() => {
              setCoveragePopupOpen(true);
            }}
          >
            Datakvalitet
          </Button>
        )}
        <Button
          onClick={() => {
            setZoom(!zoom);
          }}
          startIcon={<Icon symbol="search" size="medium" />}
          variant="filled"
        >
          Zoom
        </Button>
        <DataQualityPopup
          open={coveragePopupOpen}
          setOpen={setCoveragePopupOpen}
          unitNames={unitNames}
          year={year}
          context={context}
          medfield={medfield}
          treatmentUnitsByLevel={treatmentUnitsByLevel}
          registryName={registryName}
          dataQualityIndId={data.dataQualityIndicatorID}
        />
      </div>
      <div>
        {showDGButton && (
          <SplitButton
            label="Last ned"
            onClick={() => {
              const apiRef =
                figureType === "line" ? lineChartApiRef : barChartApiRef;
              // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
              apiRef.current!.exportAsImage({
                onBeforeExport: makeOnBeforeExport(
                  data.indicatorTitle || "",
                  registryName,
                ),
              });
            }}
            options={["Last ned som bilde"]}
            steps="one-step"
          />
        )}
      </div>
      <div className="w-full min-h-max flex-shrink-0 block clear-both">
        {/* biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future */}
        {figureType == "line" ? (
          <MuiLineChart
            data={data}
            figureHeight={figureHeight}
            lineData={lineData}
            uniqueYears={uniqueYears}
            percentage={percentage}
            valueAxisFormatter={valueAxisFormatter}
            lastAffirmYear={lastAffirmYear}
            zoom={zoom}
            apiRef={lineChartApiRef}
            tickFontSize={14}
          />
        ) : figureType === "bar" ? (
          <MuiBarChart
            data={data}
            figureSpacingFactor={30}
            figureSpacingConstant={2.2}
            backgroundMargin={backgroundMargin}
            unitNames={unitNames}
            percentage={percentage}
            barChartType={barChartType}
            dataFormat={dataFormat}
            valueAxisFormatter={valueAxisFormatter}
            treatmentUnitsByLevel={treatmentUnitsByLevel}
            context={context}
            type={type}
            medfield={medfield}
            year={year}
            indID={indID}
            tickFontSize={14}
            yAxisWidth={160}
            zoom={zoom}
            apiRef={barChartApiRef}
          />
        ) : null}
      </div>
    </Box>
  );
};

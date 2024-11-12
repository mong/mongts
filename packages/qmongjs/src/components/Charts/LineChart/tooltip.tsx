import { defaultStyles, Tooltip } from "@visx/tooltip";

import React from "react";
import { Indicator } from "types";
import { IndicatorData } from "../../IndicatorTable/indicatorvalue";

const tooltipStyles: React.CSSProperties = {
  ...defaultStyles,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  minWidth: 60,
  padding: "calc(10rem / 16)",
  backgroundColor: "white",
  opacity: 0.8,
  color: "black",
};

type ChartTooltipProps = {
  tooltipOpen: boolean;
  tooltipLeft?: number;
  tooltipTop: number | undefined;
  tooltipData?: Indicator;
  format?: string;
};

export const LineChartTooltip = ({
  tooltipData,
  tooltipLeft,
  tooltipOpen,
  tooltipTop,
  format,
}: ChartTooltipProps) => {
  return (
    <>
      {tooltipOpen && tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          <div
            style={{
              marginBottom: "calc(10rem / 16)",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            {tooltipData.unit_name}
          </div>
          {tooltipData.year}
          <IndicatorData
            headerStyle={{ fontSize: "1rem" }}
            indicatorData={tooltipData}
            format={format}
          />
        </Tooltip>
      )}
    </>
  );
};

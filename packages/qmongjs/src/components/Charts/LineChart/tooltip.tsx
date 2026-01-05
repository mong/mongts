import { defaultStyles, Tooltip } from "@visx/tooltip";

import React from "react";
import { Indicator } from "types";
import { IndicatorData } from "../../IndicatorTable/indicatorvalue";

// @ts-expect-error Type discrepancy between visx and React
const tooltipStyles: React.CSSProperties = {
  ...defaultStyles,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  minWidth: 60,
  padding: "0.625rem",
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
        // @ts-expect-error Type discrepancy between visx and React
        <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          <div
            style={{
              marginBottom: "0.625rem",
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

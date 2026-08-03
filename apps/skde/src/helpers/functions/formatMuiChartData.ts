import type { LineSeriesType } from "@mui/x-charts";
import { customFormat } from "qmongjs/src/helpers/functions";
import type { DataPoint, IndicatorData } from "types";

type Point = { x: number; y: number | null; n: number | null };

// Format to {x, y}
export const reshapeData = (
  data: IndicatorData,
  unitNames: string[],
  context: string,
) => {
  const reshapedData = unitNames.map((unitName: string) => {
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    return data
      .data!.filter((row: DataPoint) => {
        return row.unitName === unitName && row.context === context;
      })
      .map((row: DataPoint) => {
        return { x: row.year, y: row.var, n: row.denominator } as Point;
      });
  });

  return reshapedData;
};

export const reshapeDataV2 = (
  data: IndicatorData,
  unitNames: string[],
  context: "caregiver" | "resident" | undefined,
) => {
  const reshapedData = unitNames.map((unitName: string) => {
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    return data
      .data!.filter((row: DataPoint) => {
        return row.unitName === unitName && row.context === context;
      })
      .map((row: DataPoint) => {
        return { x: row.year, y: row.var, n: row.denominator } as Point;
      });
  });

  return reshapedData;
};

// Get the years from the data
const getUniqueYears = (data: Point[][]) => {
  const years = data.flatMap((row: Point[]) => {
    return row.map((point) => point.x);
  });

  const uniqueYears = [...new Set(years)];

  return uniqueYears;
};

// Make datapoints for the missing years with value null
const padData = (data: Point[][], uniqueYears: number[]) => {
  // missing years from each series
  const missingYears = data.map((row: Point[]) => {
    return uniqueYears.filter(
      (year: number) => !row.map((point: Point) => point.x).includes(year),
    );
  });

  const missingData = missingYears.map((row) => {
    return row.map((element) => {
      return { x: element, y: null, n: null } as Point;
    });
  });

  // Combine and sort by year
  const paddedData = data
    .map((row, i) => {
      return row.concat(missingData[i]);
    })
    .map((row) => {
      return row.sort((a: Point, b: Point) => {
        if (a.x < b.x) {
          return -1;
        }

        if (a.x > b.x) {
          return 1;
        }

        return 0;
      });
    });

  return paddedData;
};

const formatLineData = (
  data: Point[][],
  unitNames: string[],
  dataFormat: string,
) => {
  // Add unit name label

  const lineData = data.map((row, i) => {
    return {
      data: row.map((point) => point.y),
      label: unitNames[i],
      curve: "linear",
      type: "line",
      connectNulls: true,
      valueFormatter: (
        value: number | null,
        { dataIndex }: { dataIndex: number },
      ) => {
        // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
        return `${value && customFormat(dataFormat)(value) + " (N =  " + row[dataIndex].n + ")"}`;
      },
    } as LineSeriesType;
  });

  return lineData;
};

export const formatBarData = (data: Point[][], year: number) => {
  const barData = data.flatMap((row) => {
    return row
      .filter((point) => {
        return point.x === year;
      })
      .map((row) => row.y);
  });

  return barData;
};

export const formatMuiChartData = (
  data: IndicatorData,
  unitNames: string[],
  context: string,
  dataFormat: string,
) => {
  const reshapedData = reshapeData(data, unitNames, context);
  const uniqueYears = getUniqueYears(reshapedData);
  const paddedData = padData(reshapedData, uniqueYears);
  const lineData = formatLineData(paddedData, unitNames, dataFormat);

  return {
    lineData: lineData,
    uniqueYears: uniqueYears,
  };
};

export const formatMuiChartDataV2 = (
  data: IndicatorData,
  unitNames: string[],
  context: "caregiver" | "resident" | undefined,
  dataFormat: string,
) => {
  const reshapedData = reshapeDataV2(data, unitNames, context);
  const uniqueYears = getUniqueYears(reshapedData);
  const paddedData = padData(reshapedData, uniqueYears);
  const lineData = formatLineData(paddedData, unitNames, dataFormat);

  return {
    lineData: lineData,
    uniqueYears: uniqueYears,
  };
};

// added for export image title and source
export const makeOnBeforeExport =
  (titleText: string, sourceName: string) => (iframe: HTMLIFrameElement) => {
    const doc = iframe.contentDocument;
    if (!doc) return;
    doc.body.style.padding = "16px";
    doc.body.style.boxSizing = "border-box";
    const figure = doc.body.firstElementChild as HTMLElement | null;

    if (figure) {
      figure.style.padding = "0";
      figure.style.margin = "0";
    }
    const title = doc.createElement("div");
    title.textContent = titleText;
    title.style.cssText = `
        font-size: 20px;
        font-weight: 600;
        text-align: left;
      `;

    const source = doc.createElement("div");
    source.textContent = `Kilde: ${sourceName}`;
    source.style.cssText = `
        font-size: 12px;
      `;

    doc.body.prepend(title);
    doc.body.appendChild(source);
  };

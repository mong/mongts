import { Grid, Axis, LineSeries, XYChart, Tooltip } from "@visx/xychart";
import { scaleOrdinal } from "@visx/scale";
import { customFormat } from "qmongjs";
import { ColorLegend } from "./ColorLegend";
import { linechartColors } from "../colors";
import { Box } from "@mui/material";
import { DataItemPoint } from "../../types";

type LinechartProps = {
  data: DataItemPoint[];
  x: string[];
  linevars: string[];
  linevarsLabels: { en: string[]; nb: string[]; nn: string[] };
  lang: "en" | "nb" | "nn";
  xLabel?: { en: string; nb: string; nn: string };
  yLabel?: { en: string; nb: string; nn: string };
  format_x?: string;
  format_y?: string;
  linecolors?: string[];
  national?: string;
  forfatter: "SKDE" | "Helse Førde";
};

export const Linechart = ({
  data,
  x,
  linevars,
  linevarsLabels,
  lang,
  xLabel,
  yLabel,
  format_x,
  format_y,
  linecolors,
  forfatter,
}: LinechartProps) => {
  const getLinevarLabel = (linevar: string) =>
    linevarsLabels[lang][linevars.findIndex((v) => v === linevar)];

  const values = linevars.map((linevar) => {
    return {
      linevar: linevar,
      linevarLabel: getLinevarLabel(linevar),
      points: data
        .map((d) => ({ x: d[x[0]] as number, y: d[linevar] as number }))
        .sort((a, b) => a.x - b.x),
    };
  });

  const accessors = {
    xAccessor: (d) =>
      format_x === "month"
        ? new Date(2020, d.x - 1).toLocaleString(lang, { month: "long" })
        : d.x,
    yAccessor: (d) => (format_y ? customFormat(format_y, lang)(d.y) : d.y),
  };

  const yvaluesMaxTextLength = Math.max(
    ...data.flatMap((d) =>
      linevars.map(
        (linevar) =>
          (format_y
            ? customFormat(format_y, lang)(d[linevar] as number)
            : d[linevar]
          ).toString().length,
      ),
    ),
  );
  const colorScale = scaleOrdinal({
    domain: values.map((s) => s.linevar),
    range: [...(linecolors || []), ...linechartColors],
  });

  return (
    <Box style={{ width: "auto", margin: "auto" }}>
      <Box
        sx={{
          backgroundImage: `url(${
            {
              "Helse Førde": "/helseatlas/img/logos/helse-forde-graa.svg",
              SKDE: "/img/logos/logo-skde-graa.svg",
            }[forfatter]
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: lang === "nn" ? "max(5rem, 20%)" : "max(3rem, 10%)",
          backgroundPosition: "top 2.25rem right 5%",
        }}
      >
        <XYChart
          height={500}
          xScale={{ type: "band", paddingOuter: 0 }}
          yScale={{ type: "linear" }}
          margin={{
            top: 70,
            right: 50,
            bottom: 50,
            left: 55 + yvaluesMaxTextLength,
          }}
        >
          <Axis
            orientation="bottom"
            label={xLabel[lang]}
            labelProps={{
              fontSize: 14,
              textAnchor: "middle",
              fontWeight: "bold",
            }}
            tickLabelProps={() => ({
              fontSize: 14,
              fill: "black",
            })}
            tickFormat={(val) =>
              format_x === "month"
                ? new Date(2020, val - 1).toLocaleString(lang, {
                    month: "short",
                  })
                : val
            }
            numTicks={11}
          />
          <Axis
            orientation="left"
            tickLabelProps={() => ({
              fontSize: 14,
              fill: "black",
              textAnchor: "end",
            })}
            numTicks={4}
            label={yLabel[lang]}
            labelProps={{
              fontSize: 14,
              textAnchor: "start",
              fontWeight: "bold",
              x: -50,
              y: 25,
              transform: "",
            }}
            stroke="black"
            tickFormat={(val) =>
              format_y ? customFormat(format_y, lang)(val) : val.toString()
            }
          />
          <Grid columns={false} numTicks={4} />
          {values.map((plots, i) => (
            <LineSeries
              strokeWidth={2}
              dataKey={plots.linevar}
              data={plots.points}
              xAccessor={(d) => d.x}
              yAccessor={(d) => d.y}
              key={i}
              colorAccessor={colorScale}
            />
          ))}
          <Tooltip
            snapTooltipToDatumX
            snapTooltipToDatumY
            showVerticalCrosshair
            showSeriesGlyphs
            glyphStyle={{ fill: linechartColors[0] }}
            renderTooltip={({ tooltipData }) => (
              <>
                {xLabel[lang].split(/[^A-Za-zæøåÆØÅ]/)[0]}
                {": "}
                {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                {Object.keys(tooltipData.datumByKey)
                  .filter((value) => linevars.includes(value))
                  .map((d) => {
                    return (
                      <div key={d}>
                        <div style={{ color: colorScale(d) }}>
                          {getLinevarLabel(d)}
                          {": "}
                          {accessors.yAccessor(tooltipData.datumByKey[d].datum)}
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          />
        </XYChart>
      </Box>
      <ColorLegend
        colorScale={colorScale}
        values={linevars}
        getLabel={getLinevarLabel}
      />
    </Box>
  );
};

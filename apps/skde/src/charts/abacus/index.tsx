import { AxisBottom } from "@visx/axis";
import { scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { max } from "d3-array";
import classNames from "../barcharts/ChartLegend.module.css";
import {
  customFormat,
  customFormatEng,
} from "../../helpers/functions/localFormater";
import { useRouter } from "next/router";
import { abacusColors } from "../colors";
import { nationalLabelList } from "../../app_config";

type AbacusData<Data, X extends keyof Data, ColorBy extends keyof Data> = {
  [k in X]: number;
} & {
  [k in ColorBy]?: number | string;
} & {
  [k in keyof Data]?: number | string;
};

type AbacusProps<
  Data,
  X extends string & keyof Data,
  ColorBy extends keyof Data
> = {
  data: AbacusData<Data, X, ColorBy>[];
  lang: "en" | "nb" | "nn";
  x: X;
  width?: number;
  height?: number;
  margin?: { top: number; bottom: number; right: number; left: number };
  colorLegend?: boolean;
  colorBy?: ColorBy;
  label?: string;
  xMin?: number;
  xMax?: number;
  backgroundColor?: string;
  axisLineStroke?: string;
  axisTickStroke?: string;
  axisLineStrokeWidth?: number;
  circleFillDefalt?: string;
  circleRadiusDefalt?: number;
  tickLength?: number;
  tickLabelSize?: number;
  labelSize?: number;
  markerOpacity?: number;
  format?: string;
};

export const Abacus = <
  Data,
  X extends string & keyof Data,
  ColorBy extends string & keyof Data
>({
  width = 950,
  height = 100,
  margin = {
    top: 30,
    bottom: 5,
    right: 30,
    left: 30,
  },
  colorLegend = false,
  colorBy,
  data,
  lang,
  label,
  x,
  xMin = 0,
  xMax,
  backgroundColor = "white",
  axisLineStroke = "black",
  axisLineStrokeWidth = 2,
  axisTickStroke = "black",
  circleRadiusDefalt = 20,
  tickLength = 20,
  tickLabelSize = 22,
  labelSize = 22,
  format,
}: AbacusProps<Data, X, ColorBy>) => {
  // Pick out bohf query from the url
  const router = useRouter();
  const selected_bohf = [router.query.bohf].flat();

  // Move national values to the end of data to plot,
  // so they will be on top of the other circles.
  var figData = data
    .filter((d) => !nationalLabelList.includes(d["bohf"]))
    .concat(data.filter((d) => nationalLabelList.includes(d["bohf"]))[0]);

  if (selected_bohf) {
    // Move selected bohf to the end of data to plot (if it exists in the data),
    // so they will be on top of the other circles.
    figData = figData
      .filter((d) => !selected_bohf.includes(String(d["bohf"])))
      .concat(figData.filter((d) => selected_bohf.includes(String(d["bohf"]))));
  }

  const values = [...figData.flatMap((dt) => parseFloat(dt[x.toString()]))];
  const xMaxVal = xMax ? xMax : max(values) * 1.1;
  const innerWidth = width - margin.left - margin.right;
  const colors = abacusColors;

  const valuesLabel = {
    en: "Referral areas",
    nb: "Opptaksområder",
    nn: "Buområda",
  };
  const nationalLabel = { en: "Norway", nb: "Norge", nn: "Noreg" };

  const xScale = scaleLinear<number>({
    domain: [xMin, xMaxVal],
    range: [0, innerWidth],
  });
  return (
    <>
      <svg
        width="100%"
        height={height}
        style={{ backgroundColor, display: "block", margin: "auto" }}
        viewBox={`0 0 ${width} ${height + margin.top}`}
      >
        <Group left={margin.left} top={margin.top}>
          <AxisBottom
            top={0}
            scale={xScale}
            strokeWidth={axisLineStrokeWidth}
            stroke={axisLineStroke}
            numTicks={4}
            tickFormat={(val) =>
              format
                ? lang === "en"
                  ? customFormatEng(format)(val)
                  : customFormat(format)(val)
                : val.toString()
            }
            tickLength={tickLength}
            tickStroke={axisTickStroke}
            tickTransform={`translate(0,-${tickLength / 2})`}
            tickLabelProps={() => ({
              fontSize: tickLabelSize,
              fill: "black",
              textAnchor: "middle",
              y: 50,
            })}
            label={label}
            labelProps={{
              fontSize: labelSize,
              textAnchor: "middle",
              fontWeight: "bold",
            }}
          />
        </Group>
        <Group left={margin.left} top={margin.top}>
          {figData.map((d, i) => (
            <circle
              key={`${d[x]}${i}`}
              r={circleRadiusDefalt}
              cx={xScale(d[x])}
              fill={
                selected_bohf.includes(String(d["bohf"]))
                  ? colors[2]
                  : nationalLabelList.includes(String(d["bohf"]))
                  ? colors[1]
                  : colors[0]
              }
              data-testid={
                selected_bohf.includes(String(d["bohf"]))
                  ? `circle_${d["bohf"]}_selected`
                  : `circle_${d["bohf"]}_unselected`
              }
            />
          ))}
        </Group>
      </svg>
      <div className={classNames.legendContainer}>
        <ul className={classNames.legendUL}>
          <li key={"hf"} className={classNames.legendLI}>
            <div className={classNames.legendAnnualVar}>
              <svg width="20px" height="20px">
                <circle r={7} cx={10} cy={10} fill={colors[0]} />
              </svg>
            </div>
            {valuesLabel[lang]}
          </li>
          <li key={"norge"} className={classNames.legendLI}>
            <div className={classNames.legendAnnualVar}>
              <svg width="20px" height="20px">
                <circle r={7} cx={10} cy={10} fill={colors[1]} />
              </svg>
            </div>
            {nationalLabel[lang]}
          </li>
          {selected_bohf[0] != undefined ? (
            <li key={"selected_bohf"} className={classNames.legendLI}>
              <>
                <div className={classNames.legendAnnualVar}>
                  <svg width="20px" height="20px">
                    <circle r={7} cx={10} cy={10} fill={colors[2]} />
                  </svg>
                </div>
                {selected_bohf.length === 1
                  ? selected_bohf[0]
                  : lang === "en"
                  ? `Selected ${valuesLabel[lang].toLowerCase()}`
                  : `Valgte ${valuesLabel[lang].toLowerCase()}`}
              </>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </>
  );
};

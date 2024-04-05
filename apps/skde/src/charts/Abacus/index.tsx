import { AxisBottom } from "@visx/axis";
import { scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { max } from "d3-array";
import classNames from "../Barchart/ChartLegend.module.css";
import { customFormat, customFormatEng } from "qmongjs";
import { useRouter } from "next/router";
import { abacusColors } from "../colors";

type AbacusData<Data, X extends keyof Data> = {
  [k in X]: number;
} & {
  [k in keyof Data]?: number | string;
};

type AbacusProps<Data, X extends string & keyof Data> = {
  data: AbacusData<Data, X>[];
  lang: "en" | "nb" | "nn";
  x: X;
  width?: number;
  height?: number;
  margin?: { top: number; bottom: number; right: number; left: number };
  colorLegend?: boolean;
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
  national: string;
};

export const Abacus = <Data, X extends string & keyof Data>({
  width = 950,
  height = 100,
  margin = {
    top: 30,
    bottom: 5,
    right: 30,
    left: 30,
  },
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
  national,
}: AbacusProps<Data, X>) => {
  // Pick out bohf query from the url
  const router = useRouter();
  const selected_bohf = [router.query.bohf].flat();

  // Move Norge to the end of data to plot,
  // so they will be on top of the other circles.
  var figData = data
    .filter((d) => d["bohf"] != national)
    .concat(data.filter((d) => d["bohf"] === national)[0]);

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
    nn: "Opptaksområde",
  };
  const selectedText = {
    en: "Selected",
    nb: "Valgte",
    nn: "Valde",
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
                  : d["bohf"] === national
                    ? colors[1]
                    : colors[0]
              }
              data-testid={
                selected_bohf.includes(String(d["bohf"]))
                  ? `circle_${d["bohf"]}_selected`
                  : `circle_${d["bohf"]}_unselected`
              }
              onClick={(event) => {
                // Add HF to query param if clicked on.
                // Remove HF from query param if it already is selected.
                // Only possible to click on HF, and not on national data
                d["bohf"] != national
                  ? router.replace(
                      {
                        query: {
                          ...router.query,
                          bohf:
                            selected_bohf[0] === undefined
                              ? d["bohf"]
                              : selected_bohf.includes(d["bohf"])
                                ? selected_bohf.filter((f) => f != d["bohf"])
                                : selected_bohf.concat(d["bohf"]),
                        },
                      },
                      undefined,
                      { shallow: true },
                    )
                  : undefined;
                event.stopPropagation();
              }}
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
          <li key={"national"} className={classNames.legendLI}>
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
                  : `${selectedText[lang]} ${valuesLabel[lang].toLowerCase()}`}
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

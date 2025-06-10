import { geoMercator, geoPath } from "d3-geo";
import { scaleThreshold } from "d3-scale";
import { customFormat } from "qmongjs";
import { mapColors, abacusColors } from "../colors";
import { useAreaQueryParam } from "../../helpers/hooks";
import { DataItemPoint } from "../../types";

type FeatureShape = {
  type: "Feature";
  id: string;
  geometry: {
    type: "MultiPolygon";
    coordinates: [number, number][][][];
  };
  properties: {
    OBJECTID_1: number;
    BoHF_num: number;
    OBJECTID: number;
    Shape_Leng: number;
    Shape_Le_1: number;
    Shape_Area: number;
  };
};

type MapData = {
  type: "FeatureCollection";
  features: FeatureShape[];
};

type MapProps = {
  mapData: MapData;
  data: DataItemPoint[];
  attrName?: string;
  jenks: number[];
  caption?: string;
  format?: string;
  areaType: string;
  lang: "en" | "nb" | "nn";
};

export const Map = ({
  mapData,
  data,
  attrName,
  jenks,
  caption,
  format,
  areaType,
  lang,
}: MapProps) => {
  // Pick out area query from the url
  const [selectedAreas, toggleArea] = useAreaQueryParam("", areaType);

  const width = 1000;
  const height = 1000;
  const initCenter = geoPath().centroid(mapData);
  const initOffset: [number, number] = [
    (width / 2) * 1.02,
    height / 2 - height * 0.08,
  ];
  const initScale = 150;
  const initialProjection = geoMercator()
    .scale(initScale)
    .center(initCenter)
    .translate(initOffset);
  const initPath = geoPath().projection(initialProjection);

  const bounds = initPath.bounds(mapData);
  const hscale = (initScale * width) / (bounds[1][0] - bounds[0][0]);
  const vscale = (initScale * height) / (bounds[1][1] - bounds[0][1]);
  const scale = hscale < vscale ? 0.98 * hscale : 0.95 * vscale;
  const offset: [number, number] = [
    width - (bounds[0][0] + bounds[1][0]) / 2,
    height - (bounds[0][1] + bounds[1][1]) / 2,
  ];

  const colorScale = scaleThreshold<number, string>()
    .domain(jenks)
    .range(mapColors);

  const projection = geoMercator()
    .scale(scale)
    .center(initCenter)
    .translate(offset);
  const pathGenerator = geoPath().projection(projection);
  return (
    <>
      <div style={{ width: "100%", height: "100%", margin: "auto" }}>
        <svg
          width={"100%"}
          height={"100%"}
          viewBox={`0 0 ${width} ${height}`}
          style={{ backgroundColor: "none" }}
        >
          {mapData.features.map((d, i) => {
            const area = d.properties["area"];
            const val = data.find((attribute) => attribute["area"] === area)?.[
              attrName
            ];

            return (
              <path
                key={`map-feature-${i}`}
                d={pathGenerator(d.geometry)}
                fill={
                  selectedAreas.has(area as string)
                    ? abacusColors[2]
                    : val
                      ? colorScale(val as number)
                      : "none"
                }
                stroke={"black"}
                strokeWidth={0.4}
                className={i + ""}
                data-testid={`maparea_${area}`}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => toggleArea(area as string)}
              />
            );
          })}
          <g>
            {colorScale.range().map((d, i) => {
              const w = 90;
              return (
                <g key={d + i}>
                  {" "}
                  <rect x={i * w} width={w} height="20" fill={d} />
                  {i !== 0 && (
                    <>
                      <line
                        x1={i * w}
                        x2={i * w}
                        y1={0}
                        y2={30}
                        strokeWidth="2"
                        stroke="black"
                      />
                      <text
                        x={i * w}
                        y={60}
                        textAnchor="middle"
                        fontSize={Math.max(...jenks) > 9999 ? 25 : 30}
                      >
                        {customFormat(
                          format ? format : ".1f",
                          lang,
                        )(colorScale.invertExtent(d)[0])}
                      </text>
                    </>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <div
        style={{
          fontWeight: "400",
          fontSize: "0.875rem",
          lineHeight: "1.43",
          letterSpacing: "0.01071rem",
          padding: "1rem",
          color: "rgba(0, 0, 0, 0.6)",
          textAlign: "left",
          captionSide: "bottom",
        }}
        data-testid="mapCaption"
      >
        {caption}
      </div>
    </>
  );
};

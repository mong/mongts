import { geoMercator, geoPath } from "d3-geo";
import { scaleThreshold } from "d3-scale";
import {
  customFormat,
  customFormatEng,
} from "../../helpers/functions/localFormater";
import { mapColors, abacusColors } from "../colors";
import { useRouter } from "next/router";

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

export type MapData = {
  type: "FeatureCollection";
  features: FeatureShape[];
};

type MapProps = {
  mapData: MapData;
  mapAttr?: any[];
  dataToMap?: any[];
  connection?: any;
  attrName?: string;
  classes?: number[];
  caption?: string;
  format?: string;
  lang: "en" | "nb" | "nn";
};

const ObjectIDToBoHF = [
  { BoHF_num: 1, bohf: "Finnmark" },
  { BoHF_num: 2, bohf: "UNN" },
  { BoHF_num: 3, bohf: "Nordland" },
  { BoHF_num: 4, bohf: "Helgeland" },
  { BoHF_num: 6, bohf: "Nord-Trøndelag" },
  { BoHF_num: 7, bohf: "St. Olav" },
  { BoHF_num: 8, bohf: "Møre og Romsdal" },
  { BoHF_num: 10, bohf: "Førde" },
  { BoHF_num: 11, bohf: "Bergen" },
  { BoHF_num: 12, bohf: "Fonna" },
  { BoHF_num: 13, bohf: "Stavanger" },
  { BoHF_num: 14, bohf: "Østfold" },
  { BoHF_num: 15, bohf: "Akershus" },
  { BoHF_num: 16, bohf: "OUS" },
  { BoHF_num: 17, bohf: "Lovisenberg" },
  { BoHF_num: 18, bohf: "Diakonhjemmet" },
  { BoHF_num: 19, bohf: "Innlandet" },
  { BoHF_num: 20, bohf: "Vestre Viken" },
  { BoHF_num: 21, bohf: "Vestfold" },
  { BoHF_num: 22, bohf: "Telemark" },
  { BoHF_num: 23, bohf: "Sørlandet" },
];

export const Map: React.FC<MapProps> = ({
  mapData,
  mapAttr,
  dataToMap = ObjectIDToBoHF,
  connection = { mapData: "BoHF_num", mapAttr: "bohf" },
  attrName,
  classes,
  caption,
  format,
  lang,
}) => {
  // Pick out bohf query from the url
  const router = useRouter();
  const selected_bohf = [router.query.bohf].flat();

  const color = mapColors;
  const width = 1000;
  const height = 1000;
  const initCenter = geoPath().centroid(mapData);
  const initOffset: [number, number] = [width / 2, height / 2 - height * 0.11];
  const initScale = 150;
  const initialProjection = geoMercator()
    .scale(initScale)
    .center(initCenter)
    .translate(initOffset);
  const initPath = geoPath().projection(initialProjection);

  const bounds = initPath.bounds(mapData);
  const hscale = (initScale * width) / (bounds[1][0] - bounds[0][0]);
  const vscale = (initScale * height) / (bounds[1][1] - bounds[0][1]);
  const scale = hscale < vscale ? 0.98 * hscale : 0.98 * vscale;
  const offset: [number, number] = [
    width - (bounds[0][0] + bounds[1][0]) / 2,
    height - (bounds[0][1] + bounds[1][1]) / 2,
  ];

  const colorScale = scaleThreshold<number, string>()
    .domain(classes ? classes : [])
    .range(color ? color : []);

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
            const mapId = connection.mapData;
            const attrID = connection.mapAttr;
            const hf = dataToMap.filter(
              (dtm) => dtm[mapId] === d.properties[mapId]
            )[0][attrID];

            const attr = mapAttr.filter((attribute) => {
              return attribute[attrID] === hf;
            })[0];
            const val = attr ? attr[attrName] : undefined;
            return (
              <path
                key={`map-feature-${i}`}
                d={pathGenerator(d.geometry)}
                fill={
                  selected_bohf.includes(String(hf))
                    ? abacusColors[2]
                    : val
                    ? colorScale(val)
                    : "none"
                }
                stroke={"black"}
                strokeWidth={0.4}
                className={i + ""}
                data-testid={`maphf_${hf}`}
              />
            );
          })}
          {classes && (
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
                          fontSize={30}
                        >
                          {lang === "en"
                            ? customFormatEng(format ? format : ".1f")(
                                colorScale.invertExtent(d)[0]
                              )
                            : customFormat(format ? format : ".1f")(
                                colorScale.invertExtent(d)[0]
                              )}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}
            </g>
          )}
        </svg>
      </div>
      <div
        style={{
          fontFamily: "Roboto, Helvetica, Arial, sans-serif",
          fontWeight: "400",
          fontSize: "0.875rem",
          lineHeight: "1.43",
          letterSpacing: "0.01071em",
          padding: "16px",
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

import { Abacus } from "../../charts/Abacus";
import { AtlasDataItem, BarchartItem, DataItemPoint } from "../../types";

type BeadLineProps = {
  boxData: AtlasDataItem[];
  lang: "nb" | "nn" | "en";
};

/**
 * A component for rendering a BeadLine visualization.
 *
 * @param boxData A list of objects, where the first element is the map data and the second element is the abacus data.
 * @param lang The language of the visualization. May be "nb", "nn", or "en".
 *
 * The component renders an {@link Abacus} component with the given data and language.
 *
 * @example
 * <BeadLine boxData={boxData} lang="nb" />
 */
export default function BeadLine({ boxData, lang }: BeadLineProps) {
  const abacusX = boxData.find((boxd) => boxd.type === "map").x;

  const nationalName = boxData.find((o) => o.type === "data")["national"];

  const figData: DataItemPoint[] = boxData.find((o) => o.type === "data")[
    "data"
  ];

  return (
    <Abacus
      data={figData}
      lang={lang}
      x={abacusX}
      label={(boxData[0] as BarchartItem).xLabel[lang]}
      format={(boxData[0] as BarchartItem).format}
      national={nationalName}
    />
  );
}

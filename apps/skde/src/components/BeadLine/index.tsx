import { Abacus } from "../../charts/Abacus";
import { AtlasData } from "../../types/AtlasData";

type BeadLineProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  boxData: any;
  lang: "nb" | "nn" | "en";
};

export default function BeadLine({ boxData, lang }: BeadLineProps) {
  const abacusX: Exclude<keyof AtlasData, "year" | "bohf"> = boxData.find(
    (boxd) => boxd.type === "map",
  ).x;

  const nationalName = boxData.find((o) => o.type === "data")["national"];

  const figData: AtlasData[] = boxData.find((o) => o.type === "data")["data"];

  return (
    <Abacus
      data={figData}
      lang={lang}
      x={abacusX}
      label={boxData[0].xLabel[lang]}
      backgroundColor="inherit"
      format={boxData[0].format}
      national={nationalName}
    />
  );
}

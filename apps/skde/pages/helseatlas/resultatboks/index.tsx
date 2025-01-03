import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ThemeProvider } from "@mui/material";
import { skdeTheme } from "qmongjs";
import { Carousel, CarouselItem } from "../../../src/components/Carousel";
import { Map } from "../../../src/charts/Map";
import { AtlasData } from "../../../src/types/AtlasData";
import { Barchart } from "../../../src/charts/Barchart";
import { Linechart } from "../../../src/charts/Linechart";
import { DataTable } from "../../../src/charts/Table";
import { FetchMap } from "../../../src/helpers/hooks";
import getDataUrl from "../../../src/helpers/functions/getDataUrl";
import ensureValidLang from "../../../src/helpers/functions/ensureValidLang";
import queryResultPendingOrFailed from "../../../src/helpers/functions/queryResultPendingOrFailed";
import ResultBoxSkeleton from "./resultBoxSkeleton";
import { useBohfSync } from "../../../src/helpers/hooks/useBohfSync";

export default function ResultBoxPage() {
  useBohfSync();

  const [selection] = useState("");
  const searchParams = useSearchParams();

  const atlasParam = searchParams.get("atlas");
  const dataParam = searchParams.get("data");
  const mapParam = searchParams.get("map");
  const langParam = searchParams.get("lang");
  const lang = ensureValidLang(langParam);
  const mapFileName = mapParam ? `${mapParam}.geojson` : "kart_2024.geojson";
  const dataUrl = getDataUrl(atlasParam, dataParam);

  const { data: mapData } = FetchMap(`/helseatlas/kart/${mapFileName}`);
  const dataFetchResult = FetchMap(dataUrl || "");

  if (queryResultPendingOrFailed(dataFetchResult)) {
    return <ResultBoxSkeleton />;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const boxData: any = Object.values(dataFetchResult.data)[0];
  const nationalName = boxData.find((o) => o.type === "data")["national"];

  const dataCarousel = (
    <Carousel active={0} selection={selection} lang={lang}>
      {boxData
        .map((bd, i) => {
          const figData: AtlasData[] =
            bd.type !== "data"
              ? boxData.find((o) => o.type === "data" && o.label === bd.data)[
                  "data"
                ]
              : undefined;
          if (bd.type === "barchart") {
            return (
              <CarouselItem
                style={{ width: "auto" }}
                key={bd.type + i}
                label={bd.type}
              >
                <Barchart
                  {...bd}
                  data={figData}
                  lang={lang}
                  national={nationalName}
                />
              </CarouselItem>
            );
          }
          if (bd.type === "linechart") {
            return (
              <CarouselItem
                style={{ width: "auto" }}
                key={bd.type + i}
                label={bd.type}
              >
                <Linechart
                  {...bd}
                  data={figData}
                  lang={lang}
                  national={nationalName}
                />
              </CarouselItem>
            );
          }
          if (bd.type === "table") {
            return (
              <CarouselItem
                key={bd.type + i}
                style={{ width: "auto" }}
                label={bd.type}
              >
                <DataTable
                  headers={bd.columns}
                  data={figData}
                  caption={bd.caption[lang]}
                  lang={lang}
                  national={nationalName}
                />
              </CarouselItem>
            );
          }
          if (bd.type === "map") {
            const jenks = bd.jenks
              ? bd.jenks.map((j) => parseFloat(j.grense))
              : undefined;

            return (
              <CarouselItem
                key={bd.type + i}
                style={{ width: "auto" }}
                label={bd.type}
              >
                {jenks && (
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "30rem",
                      margin: "auto",
                    }}
                  >
                    <Map
                      mapData={mapData}
                      classes={jenks}
                      attrName={bd.x}
                      mapAttr={figData}
                      format={bd.format}
                      caption={bd.caption[lang]}
                      lang={lang}
                    />
                  </div>
                )}
              </CarouselItem>
            );
          }

          return false;
        })
        .filter(Boolean)}
    </Carousel>
  );

  return <ThemeProvider theme={skdeTheme}>{dataCarousel}</ThemeProvider>;
}

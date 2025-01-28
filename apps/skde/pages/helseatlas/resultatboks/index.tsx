import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ThemeProvider } from "@mui/material";
import { skdeTheme } from "qmongjs";
import { Carousel, CarouselItem } from "../../../src/components/Carousel";
import { Map } from "../../../src/charts/Map";
import { AtlasDataItem, DataItemPoint } from "../../../src/types";
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

  const boxData: AtlasDataItem[] = dataFetchResult.data["innhold"];
  const nationalName = boxData.find((o) => o.type === "data")["national"];

  const dataCarousel = (
    <Carousel active={0} selection={selection} lang={lang}>
      {boxData
        .filter((dataItem) => dataItem.type !== "data")
        .map((dataItem, i) => {
          const figData = boxData.find(
            (item) => item.type === "data" && item.label === dataItem.data,
          )["data"] as DataItemPoint[];
          if (dataItem.type === "barchart") {
            return (
              <CarouselItem
                style={{ width: "auto" }}
                key={dataItem.type + i}
                label={dataItem.type}
              >
                <Barchart
                  {...dataItem}
                  data={figData}
                  lang={lang}
                  national={nationalName}
                />
              </CarouselItem>
            );
          }
          if (dataItem.type === "linechart") {
            return (
              <CarouselItem
                style={{ width: "auto" }}
                key={dataItem.type + i}
                label={dataItem.type}
              >
                <Linechart
                  {...dataItem}
                  data={figData}
                  lang={lang}
                  national={nationalName}
                />
              </CarouselItem>
            );
          }
          if (dataItem.type === "table") {
            return (
              <CarouselItem
                key={dataItem.type + i}
                style={{ width: "auto" }}
                label={dataItem.type}
              >
                <DataTable
                  headers={dataItem.columns}
                  data={figData}
                  caption={dataItem.caption[lang]}
                  lang={lang}
                  national={nationalName}
                />
              </CarouselItem>
            );
          }
          if (dataItem.type === "map") {
            const jenks = dataItem.jenks
              ? dataItem.jenks.map((j) => j.grense)
              : undefined;

            return (
              <CarouselItem
                key={dataItem.type + i}
                style={{ width: "auto" }}
                label={dataItem.type}
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
                      attrName={dataItem.x}
                      mapAttr={figData}
                      format={dataItem.format}
                      caption={dataItem.caption[lang]}
                      lang={lang}
                    />
                  </div>
                )}
              </CarouselItem>
            );
          }
        })}
    </Carousel>
  );

  return <ThemeProvider theme={skdeTheme}>{dataCarousel}</ThemeProvider>;
}

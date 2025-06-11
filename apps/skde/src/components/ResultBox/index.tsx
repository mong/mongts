import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useTransition, animated, easings } from "react-spring";

import { Carousel, CarouselItem } from "../Carousel";
import { Barchart } from "../../charts/Barchart";
import { Abacus } from "../../charts/Abacus";
import {
  Atlas,
  AtlasData,
  AtlasDataItem,
  BarchartItem,
  DataItemPoint,
} from "../../types";
import classNames from "./ResultBox.module.css";
import { Markdown } from "../Markdown";
import { DataTable } from "../../charts/Table";
import { Map } from "../../charts/Map";
import { timeFormat } from "d3-time-format";
import { FetchMap } from "../../helpers/hooks";
import { Linechart } from "../../charts/Linechart";

type ResultBoxProps = {
  atlas: Atlas;
  atlasData: AtlasData;
  title: string;
  data_filename: string;
  intro: string;
  selection: string;
  result: string;
  id: string;
  published: Date;
  updated: Date;
  map: string | undefined;
};

export const ResultBox = ({
  atlas,
  atlasData,
  title,
  intro,
  selection,
  result,
  id,
  data_filename,
  published,
  updated,
  map,
}: ResultBoxProps) => {
  // Keep track of current screen width
  const [screenWidth, setScreenWidth] = useState<number>();

  const handleWindowSizeChange = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  /* Define dates as days from 1. jan. 1970 */
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const published_date = Math.floor(new Date(published).getTime() / day);
  const updated_date = Math.floor(new Date(updated).getTime() / day);

  const [expandedResultBox, setExpandedResultBox] =
    React.useState<boolean>(false);

  const height_ref = React.useRef(null);

  const mapFile = map ? map : "kart_2024.geojson";
  const { data: mapData } = FetchMap(`/helseatlas/kart/${mapFile}`);

  const boxData: AtlasDataItem[] = atlasData[data_filename];

  const areaType = (boxData[0] as BarchartItem).yLabel[atlas.lang];

  const transitions = useTransition(expandedResultBox, {
    initial: { transform: "translate(0,0)" },
    from: { transform: "translate(0,-2.5rem)" },
    enter: { transform: "translate(0,0)" },
    leave: { transform: "translate(0,-2.5rem)" },

    config: () => ({
      easing: easings.easeInQuad, // : easings.easeOutQuad,
      duration: 200,
    }),
  });

  if (!boxData) {
    return;
  }

  const nationalName = boxData.find((o) => o.type === "data")["national"];

  const dataCarousel = (
    <Carousel active={0} selection={selection} lang={atlas.lang}>
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
                key={dataItem.type + i + id}
                label={dataItem.type}
              >
                <Barchart
                  {...dataItem}
                  data={figData}
                  lang={atlas.lang}
                  national={nationalName}
                  areaType={areaType}
                  forfatter={atlas.forfatter}
                />
              </CarouselItem>
            );
          }
          if (dataItem.type === "linechart") {
            return (
              <CarouselItem
                style={{ width: "auto" }}
                key={dataItem.type + i + id}
                label={dataItem.type}
              >
                <Linechart
                  {...dataItem}
                  data={figData}
                  lang={atlas.lang}
                  national={nationalName}
                  forfatter={atlas.forfatter}
                />
              </CarouselItem>
            );
          }
          if (dataItem.type === "table") {
            return (
              <CarouselItem
                key={dataItem.type + i + id}
                style={{ width: "auto" }}
                label={dataItem.type}
              >
                <DataTable
                  headers={dataItem.columns}
                  data={figData}
                  caption={dataItem.caption[atlas.lang]}
                  areaType={areaType}
                  lang={atlas.lang}
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
                key={dataItem.type + i + id}
                style={{ width: "auto" }}
                label={dataItem.type}
              >
                {jenks && (
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "32rem",
                      margin: "auto",
                    }}
                  >
                    <Map
                      mapData={mapData}
                      jenks={jenks}
                      attrName={dataItem.x as string}
                      data={figData}
                      format={dataItem.format}
                      caption={dataItem.caption[atlas.lang]}
                      areaType={areaType}
                      lang={atlas.lang}
                    />
                  </div>
                )}
              </CarouselItem>
            );
          }
        })}
    </Carousel>
  );

  const abacusX = boxData.find((boxd) => boxd.type === "map").x;

  const figData = boxData.find((o) => o.type === "data")["data"];

  const handleClick = () => {
    // The coordinates of the whole result box relative to the viewport
    // elemCoords.y is the number of pixels scrolled past the top edge
    const elemCoords = height_ref.current.offsetParent.getBoundingClientRect();

    // The table of contents moves to the top of the screen if the screen width is less than 943 pixels
    const screenWidthCutoff = 943;

    // Height of the table of contents bar
    const tocHeight = 70;

    // Add a bit of space between the top of the box and the screen
    const topSpacing = 20;

    let topMargin: number;

    if (screenWidth < screenWidthCutoff) {
      topMargin = tocHeight + topSpacing;
    } else {
      topMargin = topSpacing;
    }

    if (expandedResultBox && elemCoords.y < topMargin) {
      window.scrollTo({
        top: scrollY + elemCoords.y - topMargin,
        behavior: "smooth",
      });
    } else {
      if (elemCoords.y < topMargin) {
        window.scrollTo({
          top: window.scrollY + elemCoords.y - topMargin,
          behavior: "smooth",
        });
      }
    }
    setExpandedResultBox(!expandedResultBox);
  };

  return (
    <div
      id={id}
      className={classNames.resultBoxWrapper}
      data-testid="resultbox"
    >
      <Accordion
        disableGutters
        sx={{
          boxShadow: 6,
          borderBottom: "0.1875rem solid #033F85",
        }}
        expanded={expandedResultBox}
        onChange={() => setExpandedResultBox(!expandedResultBox)}
      >
        <AccordionSummary
          aria-controls={`${id}-content`}
          id={`${id}-header`}
          sx={{
            backgroundColor: "#FAFAFA",
            fontSize: "1.1rem",
            ":hover": {
              backgroundColor: "rgb(241, 241, 241)",
              transition: "200ms ease-in",
            },
          }}
          onClick={handleClick}
        >
          <div
            className={classNames.resultBoxTitleWrapper}
            data-testid="resultbox_ingress"
          >
            <h3 data-testid="resultbox_title"> {title} </h3>
            <Markdown lang={atlas.lang}>{intro}</Markdown>
            {figData && (
              <Abacus
                data={figData}
                lang={atlas.lang}
                x={abacusX}
                label={(boxData[0] as BarchartItem).xLabel[atlas.lang]}
                areaType={areaType}
                format={(boxData[0] as BarchartItem).format}
                national={nationalName}
              />
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: "#FAFAFA",
          }}
          ref={height_ref}
        >
          {dataCarousel}

          <div className={classNames.resultBoxSelectionContent}>
            {" "}
            <Markdown lang={atlas.lang}>{result}</Markdown>
            {updated_date > published_date && (
              <p>
                {atlas.lang === "en" ? (
                  <em>Updated {timeFormat("%m/%d/%Y")(new Date(updated))}</em>
                ) : (
                  <em>Oppdatert {timeFormat("%d.%m.%Y")(new Date(updated))}</em>
                )}
              </p>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
      <div
        className={classNames.crossWrapper}
        role="button"
        aria-label="Open"
        onClick={handleClick}
        data-testid="resultbox_expandButton"
      >
        <span className={classNames.horizontal}></span>
        {transitions(
          (styles, items) =>
            !items && (
              <animated.span
                className={classNames.vertical}
                style={{
                  ...styles,
                }}
              />
            ),
        )}
      </div>
    </div>
  );
};

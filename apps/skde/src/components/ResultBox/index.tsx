import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useTransition, animated, easings } from "react-spring";

import { Carousel, CarouselItem } from "../Carousel";
import { Barchart } from "../../charts/Barchart";
import { Abacus } from "../../charts/Abacus";
import { AtlasData } from "../../types";
import classNames from "./ResultBox.module.css";
import { DataContext } from "../Context";
import { Markdown } from "../Markdown";
import { DataTable } from "../../charts/Table";
import { Map } from "../../charts/Map";
import { timeFormat } from "d3-time-format";
import { FetchMap } from "../../helpers/hooks";
import { Linechart } from "../../charts/Linechart";

type ResultBoxProps = {
  title: string;
  carousel: string;
  intro: string;
  selection: string;
  result: string;
  id: string;
  lang: "nb" | "en" | "nn";
  published: Date;
  updated: Date;
  map: string | undefined;
};

export const ResultBox = ({
  title,
  intro,
  selection,
  result,
  id,
  lang,
  carousel,
  published,
  updated,
  map,
}: ResultBoxProps) => {
  /* Define dates as days from 1. jan. 1970 */
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const published_date = Math.floor(new Date(published).getTime() / day);
  const updated_date = Math.floor(new Date(updated).getTime() / day);

  const [expandedResultBox, setExpandedResultBox] =
    React.useState<boolean>(false);

  const height_ref = React.useRef(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const atlasData: { atlasData: any } = React.useContext(DataContext);

  const mapFile = map ? map : "kronikere.geojson";
  const { data: mapData } = FetchMap(`/helseatlas/kart/${mapFile}`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const boxData: any =
    atlasData.atlasData[carousel] !== undefined
      ? Object.values(JSON.parse(atlasData.atlasData[carousel]))[0]
      : undefined;

  const transitions = useTransition(expandedResultBox, {
    initial: { transform: "translate(0,0)" },
    from: { transform: "translate(0,-40px)" },
    enter: { transform: "translate(0,0)" },
    leave: { transform: "translate(0,-40px)" },

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
                key={bd.type + i + id}
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
                key={bd.type + i + id}
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
                key={bd.type + i + id}
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
                key={bd.type + i + id}
                style={{ width: "auto" }}
                label={bd.type}
              >
                {jenks && (
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "500px",
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

  const abacusX: Exclude<keyof AtlasData, "year" | "bohf"> = boxData.find(
    (boxd) => boxd.type === "map",
  ).x;

  const figData: AtlasData[] = boxData.find((o) => o.type === "data")["data"];

  const handleClick = () => {
    // The coordinates of the whole result box
    const elemCoords = height_ref.current.offsetParent.getBoundingClientRect();
    console.log(elemCoords.y);

    const topMargin = 50;

    if (expandedResultBox && elemCoords.y < 0) {
      window.scrollTo({
        top: scrollY + elemCoords.y - topMargin,
        behavior: "smooth",
      });
    } else {
      if (elemCoords.y < 0) {
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
          borderBottom: "3px solid #033F85",
        }}
        expanded={expandedResultBox}
        onChange={() => setExpandedResultBox(!expandedResultBox)}
      >
        <AccordionSummary
          aria-controls={`${id}-content`}
          id={`${id}-header`}
          sx={{
            backgroundColor: "#FAFAFA",
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
            <Markdown lang={lang}>{intro}</Markdown>
            {figData && (
              <Abacus
                data={figData}
                lang={lang}
                x={abacusX}
                label={boxData[0].xLabel[lang]}
                backgroundColor="inherit"
                format={boxData[0].format}
                national={nationalName}
              />
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: "#F2F2F2",
          }}
          ref={height_ref}
        >
          {dataCarousel}

          <div className={classNames.resultBoxSelectionContent}>
            {" "}
            <Markdown lang={lang}>{result}</Markdown>
            {updated_date > published_date && (
              <p>
                {lang === "en" ? (
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

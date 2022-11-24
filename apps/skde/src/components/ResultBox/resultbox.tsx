import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useTransition, animated, easings } from "react-spring";

import { Carousel } from "../carousel";
import { CarouselItem } from "../carousel/carouelitem";
import { Barchart } from "../../charts/barcharts";
import { Abacus } from "../../charts/abacus";
import {
  AtlasData,
  MapData,
  BarchartTypes,
  TableTypes,
  MapTypes,
  DataTypes,
  DataProps,
} from "../../types";
import classNames from "./resultbox.module.css";
import { DataContext } from "../Context";
import { Markdown } from "../Markdown";
import { DataTable } from "../Table";
import { Map } from "../../charts/map";
import { timeFormat } from "d3-time-format";

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
};

export const ResultBox: React.FC<ResultBoxProps> = ({
  title,
  intro,
  selection,
  result,
  id,
  lang,
  carousel,
  published,
  updated,
}) => {
  /* Define dates as days from 1. jan. 1970 */
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const published_date = Math.floor(new Date(published).getTime() / day);
  const updated_date = Math.floor(new Date(updated).getTime() / day);

  const [expandedResultBox, setExpandedResultBox] =
    React.useState<boolean>(false);

  const atlasData: { atlasData: any; mapData: MapData } =
    React.useContext(DataContext);

  //    console.log(atlasData.atlasData[carousel]);

  const mapData = atlasData.mapData;
  const boxData: any =
    atlasData.atlasData[carousel] !== undefined
      ? Object.values(JSON.parse(atlasData.atlasData[carousel]))[0]
      : undefined;

  const transitions = useTransition(expandedResultBox, {
    initial: { transform: "translate(0,0)" },
    from: { transform: "translate(0,-40px)" },
    enter: { transform: "translate(0,0)" },
    leave: { transform: "translate(0,-40px)" },

    config: (it, ind, state) => ({
      easing: easings.easeInQuad, // : easings.easeOutQuad,
      duration: 200,
    }),
  });
  const figData = boxData.filter((o) => o.type === "data")[0]["data"];

  const dataCarousel =
    boxData !== undefined ? (
      <Carousel active={0} selection={selection} lang={lang}>
        {boxData
          .map(
            (
              bd: BarchartTypes | TableTypes | MapTypes | DataTypes,
              i: number
            ) => {
              if (bd.type === "barchart") {
                return (
                  <CarouselItem
                    style={{ width: "auto" }}
                    key={bd.type + i + id}
                    label={bd.type}
                  >
                    <Barchart {...bd} data={figData} lang={lang} />
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
                    />
                  </CarouselItem>
                );
              }
              if (bd.type === "map") {
                const jenks = bd.jenks.map((j) => j.grense);

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

              return null;
            }
          )
          .filter((elm) => elm !== null)}
      </Carousel>
    ) : undefined;

  const figdata: AtlasData[] = boxData
    ? boxData.filter((d) => d.type === "data")[0]["data"]
    : null;
  const abacusX: Exclude<keyof AtlasData, "year" | "bohf"> = boxData
    .filter((boxd) => boxd.type === "map")
    .map((boxd) => boxd.x)[0];

  const handleChange = (cb: React.Dispatch<React.SetStateAction<boolean>>) =>
    cb((state) => !state);
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
        onChange={() => handleChange(setExpandedResultBox)}
      >
        <AccordionSummary
          aria-controls={`${id}-content`}
          id={`${id}-header`}
          sx={{
            backgroundColor: "#FAFAFA",
            ":hover": {
              backgroundColor: expandedResultBox ? "" : "rgb(241, 241, 241)",
              transition: "200ms ease-in",
            },
          }}
        >
          <div
            className={classNames.resultBoxTitleWrapper}
            data-testid="resultbox_ingress"
          >
            <h3 data-testid="resultbox_title"> {title} </h3>
            <Markdown lang={lang}>{intro}</Markdown>
            {figdata && (
              <Abacus
                data={figdata}
                lang={lang}
                x={abacusX}
                colorBy="bohf"
                label={boxData[0].xLabel[lang]}
                backgroundColor="inherit"
                format={boxData[0].format}
              />
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: "#F2F2F2",
          }}
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
        aria-controls={`${id}-content-selection`}
        onClick={() => setExpandedResultBox(!expandedResultBox)}
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
            )
        )}
      </div>
    </div>
  );
};

import React from "react";
import style from "./chartrowbuttons.module.css";
import { UrlUpdateType } from "use-query-params";
import { VscZoomOut, VscZoomIn } from "react-icons/vsc";
import { BiBarChart, BiLineChart } from "react-icons/bi";

import { Description } from "types";

interface Props {
  show_level: boolean;
  zoom: boolean;
  update_zoom: React.Dispatch<React.SetStateAction<boolean>>;
  update_show_level: (
    newValue: true | false,
    updateType?: UrlUpdateType | undefined,
  ) => void;
  description: Description;
  chartType: string;
  updateChartType: (
    newValue: "line" | "bar",
    updateType?: UrlUpdateType | undefined,
  ) => void;
}

export const FigureButtons = (props: Props) => {
  const {
    show_level,
    update_show_level,
    zoom,
    update_zoom,
    description,
    chartType,
    updateChartType,
  } = props;

  const buttonValues = [
    {
      label:
        chartType === "line" ? (
          <>
            <BiBarChart style={{ transform: "rotate(90deg)" }} />{" "}
            <span>Søyle</span>
          </>
        ) : (
          <>
            <BiLineChart /> Linje
          </>
        ),
      click: () => updateChartType(chartType === "line" ? "bar" : "line"),
      class: "btn-charttype",
      //style: { border: "2px solid rgba(0, 0, 0, 0.1)" },
      title: chartType === "line" ? "Søyle" : "Linje",
    },
    {
      label: show_level ? "Skjul målnivå" : "Vis målnivå",
      click: () => update_show_level(show_level === true ? false : true),
      class: "btn-level",
      //style: { border: "2px solid rgba(0, 0, 0, 0.1)" },
      title: show_level ? "Skjul målnivå" : "Vis målnivå",
    },
    {
      label: zoom ? <VscZoomOut /> : <VscZoomIn />,
      click: () => update_zoom((zoom) => !zoom),
      class: "btn-zoom",
      style: {},
      title: zoom ? "zoom ut" : "zoom in",
    },
  ];

  const buttons = buttonValues
    .filter(
      (btn) => description.level_green !== null || btn.class !== "btn-level",
    )
    .map((btn) => {
      return (
        <button
          key={btn.class}
          aria-pressed={false}
          aria-label={btn.title}
          className={style[btn.class]}
          onClick={btn.click}
          title={btn.title ?? undefined}
          style={{ ...btn.style }}
        >
          {" "}
          {btn.label}{" "}
        </button>
      );
    });
  return <div className={style["btn-container"]}>{buttons}</div>;
};

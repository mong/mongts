import React from "react";
import { Indicator } from "types";
import style from "./indicatorvalue.module.css";
import { customFormat, level } from "../../../helpers/functions";
import { levelSymbols } from "../../../helpers/functions";

export interface IndicatorValueProps {
  td_class?: string;
  indicatorData: Indicator;
  level_class?: "filtered_level" | "";
  format?: string;
  headerStyle?: React.CSSProperties;
}

export const IndicatorValue = (props: IndicatorValueProps) => {
  const {
    td_class = "selected_unit",
    indicatorData,
    level_class = "",
    format,
  } = props;

  const filter_level = level_class === "" ? "" : style.filtered_level;

  return (
    <td
      className={
        td_class === "selected_unit"
          ? `${style.selected_unit} ${filter_level}`
          : `${style.nationally} ${filter_level}`
      }
    >
      <IndicatorData indicatorData={indicatorData} format={format} />
    </td>
  );
};

export const IndicatorData = ({
  indicatorData,
  format,
  headerStyle,
}: IndicatorValueProps) => {
  const numberFormat = format === undefined ? ",.0%" : format;
  const theLevel = level(indicatorData);
  const denominator =
    indicatorData.type === "andel" ? indicatorData.denominator : 0;
  const numerator =
    indicatorData.type === "andel"
      ? Math.round(indicatorData.var * denominator)
      : 0;

  return (
    <>
      <div className={style.level} aria-label={`Achieved level ${theLevel}`}>
        <h4 style={headerStyle}>
          {customFormat(numberFormat)(indicatorData.var)}
          <i style={{ paddingLeft: "0.2em" }}>{levelSymbols(theLevel)}</i>
        </h4>
      </div>
      {indicatorData.type === "andel" && (
        <div className={style.summary}>{`${numerator} av ${denominator}`}</div>
      )}
    </>
  );
};

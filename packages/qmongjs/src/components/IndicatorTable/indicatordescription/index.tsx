import { Description } from "types";
import style from "./indicatordescription.module.css";
import { customFormat } from "../../../helpers/functions/localFormater";

interface DescriptionProps {
  description: Description;
  lastCompleteYear?: number;
  lastCompleteDateString?: string;
}

export const IndicatorDescription = (props: DescriptionProps) => {
  const { description, lastCompleteYear, lastCompleteDateString } = props;
  const numberFormat: string =
    description.sformat === undefined || description.sformat === null
      ? ",.0%"
      : description.sformat;

  const title = description.title;
  const short_description = description.short_description;
  const level_direction = description.level_direction;
  const level_green = description.level_green;

  const level_sign =
    level_direction === 1
      ? String.fromCodePoint(parseInt("2265", 16))
      : String.fromCodePoint(parseInt("2264", 16));

  return (
    <td className={style.quality_indicator}>
      <div className={style.quality_indicator_name}>
        <h1>{title}</h1>
      </div>
      <div className={style.qi_long_description}>
        <p>{short_description}</p>
      </div>
      {level_green !== null && (
        <div className={style.desired_target_level}>
          <h4>
            ØNSKET MÅLNIVÅ: {level_sign}{" "}
            {customFormat(numberFormat)(level_green)}
          </h4>
        </div>
      )}
      {lastCompleteYear && (
        <div className={style.not_complete_year}>
          <h4>Data er komplett til {lastCompleteDateString}.</h4>
        </div>
      )}
    </td>
  );
};

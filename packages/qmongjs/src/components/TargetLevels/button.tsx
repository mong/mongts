import { levelSymbols } from "../../helpers/functions";
import styles from "./index.module.css";

interface Props {
  level: string;
  legend_btn_class: string;
  update_show_level_filter(p: string | undefined): void;
  show_level_filter: string | undefined;
}

function LEGEND_BTN(props: Props) {
  const {
    level,
    legend_btn_class,
    update_show_level_filter,
    show_level_filter,
  } = props;

  const level_filter = legend_btn_class[0].toUpperCase();
  const checked_class = level_filter === show_level_filter ? "checked" : "";
  const handle_level_filter = (
    current_state: string | undefined,
    update_state: string,
  ) => {
    current_state === update_state
      ? update_show_level_filter(undefined)
      : update_show_level_filter(update_state);
  };

  return (
    <button
      className={
        checked_class === "checked" ? styles.button_checked : undefined
      }
      onClick={() => handle_level_filter(show_level_filter, level_filter)}
    >
      <i style={{ paddingRight: "0.2em" }}>{levelSymbols(level_filter)}</i>
      <div className="legend-text">{level}</div>
    </button>
  );
}

export default LEGEND_BTN;
